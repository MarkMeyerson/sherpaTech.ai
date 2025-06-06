// Training Service - Backend integration layer
import { createClient } from '@supabase/supabase-js';

// Supabase configuration (you'll need to replace these with your actual values)
// Vite exposes env vars with VITE_ prefix, but we'll support both for compatibility
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.REACT_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.REACT_APP_SUPABASE_ANON_KEY;

// Only create supabase client if we have valid configuration
let supabase = null;
const isConfigured = supabaseUrl && supabaseKey &&
                     supabaseUrl !== 'YOUR_SUPABASE_URL' &&
                     supabaseKey !== 'YOUR_SUPABASE_ANON_KEY' &&
                     supabaseUrl.startsWith('http');

if (isConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Supabase client:', error);
  }
} else {
  console.log('⚠️ Supabase not configured - running in offline mode');
  console.log('Environment check (local):', { // Keep existing log for local comparison
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey,
    urlValue: supabaseUrl ? supabaseUrl.substring(0, 20) + '...' : 'undefined',
    keyValue: supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'undefined'
  });
  // Detailed Vercel diagnostic log
  console.log('Vercel Env Check for Supabase Config:', {
    viteUrlReceived: import.meta.env.VITE_SUPABASE_URL,
    viteKeyReceived: import.meta.env.VITE_SUPABASE_ANON_KEY,
    reactAppUrlReceived: import.meta.env.REACT_APP_SUPABASE_URL,
    reactAppKeyReceived: import.meta.env.REACT_APP_SUPABASE_ANON_KEY,
    finalSupabaseUrl: supabaseUrl,
    finalSupabaseKey: supabaseKey,
    isUrlValid: !!supabaseUrl,
    isKeyValid: !!supabaseKey,
    isUrlNotPlaceholder: supabaseUrl !== 'YOUR_SUPABASE_URL',
    isKeyNotPlaceholder: supabaseKey !== 'YOUR_SUPABASE_ANON_KEY',
    doesUrlStartWithHttp: supabaseUrl ? supabaseUrl.startsWith('http') : false,
    isUltimatelyConfigured: isConfigured
  });
}

class TrainingService {
  constructor() {
    this.isConfigured = isConfigured && supabase !== null;
  }

  // Check if Supabase is properly configured
  isBackendAvailable() {
    return this.isConfigured;
  }
  // Find or create user account
  async loginUser(email, name) {
    if (!this.isBackendAvailable() || !supabase) {
      console.log('Backend not configured, using localStorage only');
      return { user: { name, email }, progress: null, isOffline: true };
    }

    try {
      // First, try to find existing user
      let { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      // If user doesn't exist, create new one
      if (!user) {
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert([{ name, email }])
          .select()
          .single();

        if (createError) throw createError;
        user = newUser;

        // Create initial progress record
        const { error: progressError } = await supabase
          .from('user_progress')
          .insert([{
            user_id: user.id,
            current_week: 1,
            completed_items: [],
            quiz_scores: {}
          }]);

        if (progressError) throw progressError;
      }

      // Load user progress
      const progress = await this.loadProgress(user.id);
      
      return { user, progress, isOffline: false };
    } catch (error) {
      console.error('Backend login failed, falling back to localStorage:', error);
      return { user: { name, email }, progress: null, isOffline: true };
    }
  }
  // Find user by email or name
  async lookupUser(identifier) {
    if (!this.isBackendAvailable() || !supabase) {
      return null;
    }

    try {
      const isEmail = identifier.includes('@');
      
      let query = supabase.from('users').select('*');
      
      if (isEmail) {
        query = query.eq('email', identifier);
      } else {
        query = query.ilike('name', `%${identifier}%`);
      }

      const { data: users, error } = await query;

      if (error) throw error;

      if (users && users.length > 0) {
        const user = users[0];
        const progress = await this.loadProgress(user.id);
        return { user, progress };
      }

      return null;
    } catch (error) {
      console.error('User lookup failed:', error);
      return null;
    }
  }
  // Load user progress from backend
  async loadProgress(userId) {
    if (!this.isBackendAvailable() || !userId || !supabase) {
      return null;
    }

    try {
      const { data: progress, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      return {
        currentWeek: progress.current_week,
        completedItems: new Set(progress.completed_items || []),
        quizScores: progress.quiz_scores || {}
      };
    } catch (error) {
      console.error('Failed to load progress:', error);
      return null;
    }
  }
  // Save progress to backend
  async saveProgress(userId, progressData) {
    if (!this.isBackendAvailable() || !userId || !supabase) {
      return false;
    }

    try {
      const { error } = await supabase
        .from('user_progress')
        .update({
          current_week: progressData.currentWeek,
          completed_items: Array.from(progressData.completedItems),
          quiz_scores: progressData.quizScores,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Failed to save progress:', error);
      return false;
    }
  }
  // Log session activity (optional)
  async logActivity(userId, actionType, actionData) {
    if (!this.isBackendAvailable() || !userId || !supabase) {
      return;
    }

    try {
      await supabase
        .from('session_logs')
        .insert([{
          user_id: userId,
          action_type: actionType,
          action_data: actionData
        }]);
    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  }

  // Merge local and server data (server takes precedence)
  mergeProgressData(localData, serverData) {
    if (!serverData) return localData;

    return {
      currentWeek: serverData.currentWeek || localData.currentWeek,
      completedItems: serverData.completedItems || localData.completedItems,
      quizScores: { ...localData.quizScores, ...serverData.quizScores }
    };
  }
}

export default new TrainingService();
