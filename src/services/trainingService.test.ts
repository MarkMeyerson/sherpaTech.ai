import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock Supabase before importing trainingService
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: null, error: null })),
        })),
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: { id: '1', email: 'test@test.com', name: 'Test' }, error: null })),
        })),
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ error: null })),
      })),
    })),
  })),
}));

// Note: Since trainingService exports a singleton instance and relies on import.meta.env,
// we test the class methods behavior based on different scenarios

describe('TrainingService', () => {
  describe('mergeProgressData', () => {
    // We can test the mergeProgressData function directly as it's a pure function
    it('should return local data when server data is null', async () => {
      // Dynamic import to get fresh instance
      const { default: trainingService } = await import('./trainingService.js');

      const localData = {
        currentWeek: 2,
        completedItems: new Set(['item1', 'item2']),
        quizScores: { quiz1: 80 },
      };

      const result = trainingService.mergeProgressData(localData, null);

      expect(result).toBe(localData);
    });

    it('should prefer server data when available', async () => {
      const { default: trainingService } = await import('./trainingService.js');

      const localData = {
        currentWeek: 1,
        completedItems: new Set(['item1']),
        quizScores: { quiz1: 70 },
      };

      const serverData = {
        currentWeek: 3,
        completedItems: new Set(['item1', 'item2', 'item3']),
        quizScores: { quiz1: 90, quiz2: 85 },
      };

      const result = trainingService.mergeProgressData(localData, serverData);

      expect(result.currentWeek).toBe(3);
      expect(result.completedItems).toEqual(new Set(['item1', 'item2', 'item3']));
      expect(result.quizScores).toEqual({ quiz1: 90, quiz2: 85 });
    });

    it('should merge quiz scores from both sources', async () => {
      const { default: trainingService } = await import('./trainingService.js');

      const localData = {
        currentWeek: 1,
        completedItems: new Set<string>(),
        quizScores: { quiz1: 70, quiz3: 60 },
      };

      const serverData = {
        currentWeek: 2,
        completedItems: new Set<string>(),
        quizScores: { quiz1: 90, quiz2: 85 },
      };

      const result = trainingService.mergeProgressData(localData, serverData);

      // Server scores should override local, but local-only scores should be preserved
      expect(result.quizScores).toEqual({ quiz1: 90, quiz2: 85, quiz3: 60 });
    });

    it('should fall back to local data for missing server fields', async () => {
      const { default: trainingService } = await import('./trainingService.js');

      const localData = {
        currentWeek: 5,
        completedItems: new Set(['item1', 'item2']),
        quizScores: { quiz1: 100 },
      };

      const serverData = {
        currentWeek: null as unknown as number,
        completedItems: null as unknown as Set<string>,
        quizScores: {},
      };

      const result = trainingService.mergeProgressData(localData, serverData);

      expect(result.currentWeek).toBe(5);
      expect(result.completedItems).toEqual(new Set(['item1', 'item2']));
    });
  });

  describe('isBackendAvailable', () => {
    it('should return a boolean indicating backend availability', async () => {
      const { default: trainingService } = await import('./trainingService.js');

      const result = trainingService.isBackendAvailable();

      expect(typeof result).toBe('boolean');
    });
  });

  describe('offline mode behavior', () => {
    it('should handle loginUser in offline mode gracefully', async () => {
      // Reset modules to ensure clean state
      vi.resetModules();

      // Mock environment without Supabase config
      vi.stubEnv('VITE_SUPABASE_URL', '');
      vi.stubEnv('VITE_SUPABASE_ANON_KEY', '');

      const { default: trainingService } = await import('./trainingService.js');

      // Even if backend is not available, loginUser should return a valid response
      const result = await trainingService.loginUser('test@example.com', 'Test User');

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('isOffline');

      vi.unstubAllEnvs();
    });

    it('should return null for lookupUser when backend is unavailable', async () => {
      vi.resetModules();
      vi.stubEnv('VITE_SUPABASE_URL', '');
      vi.stubEnv('VITE_SUPABASE_ANON_KEY', '');

      const { default: trainingService } = await import('./trainingService.js');

      const result = await trainingService.lookupUser('test@example.com');

      expect(result).toBeNull();

      vi.unstubAllEnvs();
    });

    it('should return null for loadProgress when backend is unavailable', async () => {
      vi.resetModules();
      vi.stubEnv('VITE_SUPABASE_URL', '');
      vi.stubEnv('VITE_SUPABASE_ANON_KEY', '');

      const { default: trainingService } = await import('./trainingService.js');

      const result = await trainingService.loadProgress('user-123');

      expect(result).toBeNull();

      vi.unstubAllEnvs();
    });

    it('should return false for saveProgress when backend is unavailable', async () => {
      vi.resetModules();
      vi.stubEnv('VITE_SUPABASE_URL', '');
      vi.stubEnv('VITE_SUPABASE_ANON_KEY', '');

      const { default: trainingService } = await import('./trainingService.js');

      const progressData = {
        currentWeek: 1,
        completedItems: new Set(['item1']),
        quizScores: { quiz1: 80 },
      };

      const result = await trainingService.saveProgress('user-123', progressData);

      expect(result).toBe(false);

      vi.unstubAllEnvs();
    });
  });

  describe('input validation', () => {
    it('should handle null userId in loadProgress', async () => {
      const { default: trainingService } = await import('./trainingService.js');

      const result = await trainingService.loadProgress(null as unknown as string);

      expect(result).toBeNull();
    });

    it('should handle undefined userId in saveProgress', async () => {
      const { default: trainingService } = await import('./trainingService.js');

      const progressData = {
        currentWeek: 1,
        completedItems: new Set<string>(),
        quizScores: {},
      };

      const result = await trainingService.saveProgress(undefined as unknown as string, progressData);

      expect(result).toBe(false);
    });
  });
});
