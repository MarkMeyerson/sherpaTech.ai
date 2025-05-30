# Backend Integration Plan for Training App

## Overview
Transform the current localStorage-based system into a robust backend solution that allows users to access their training progress from any device using their name or email.

## Current System Analysis

### Current Data Structure (localStorage)
```javascript
// User Data
userData: { name: 'John Doe', email: 'john@example.com' }

// Progress Tracking
currentWeek: 2
completedItems: Set(['w1_v1', 'w1_r1', 'w2_v1', ...])
quizScores: { 'week1': 85, 'week2': 92 }
```

## Proposed Backend Architecture

### 1. Database Schema

#### Users Table
```sql
users (
  id: UUID PRIMARY KEY,
  name: VARCHAR(255) NOT NULL,
  email: VARCHAR(255) UNIQUE NOT NULL,
  created_at: TIMESTAMP DEFAULT NOW(),
  updated_at: TIMESTAMP DEFAULT NOW(),
  last_login: TIMESTAMP
)
```

#### User Progress Table
```sql
user_progress (
  id: UUID PRIMARY KEY,
  user_id: UUID REFERENCES users(id),
  current_week: INTEGER DEFAULT 1,
  completed_items: JSONB DEFAULT '[]', -- Array of completed item IDs
  quiz_scores: JSONB DEFAULT '{}',     -- Object with week scores
  created_at: TIMESTAMP DEFAULT NOW(),
  updated_at: TIMESTAMP DEFAULT NOW()
)
```

#### Session Log Table (Optional)
```sql
session_logs (
  id: UUID PRIMARY KEY,
  user_id: UUID REFERENCES users(id),
  action_type: VARCHAR(50), -- 'login', 'item_completed', 'quiz_submitted'
  action_data: JSONB,
  ip_address: INET,
  user_agent: TEXT,
  created_at: TIMESTAMP DEFAULT NOW()
)
```

### 2. API Endpoints

#### Authentication & User Management
```
POST /api/auth/login
- Body: { email: string, name?: string }
- Returns: { user, progress, token }

POST /api/auth/register  
- Body: { name: string, email: string }
- Returns: { user, progress, token }

GET /api/auth/lookup
- Query: ?email=john@example.com OR ?name=John%20Doe
- Returns: { user, progress } or 404
```

#### Progress Management
```
GET /api/progress/:userId
- Returns: { currentWeek, completedItems, quizScores, lastUpdated }

PUT /api/progress/:userId
- Body: { currentWeek?, completedItems?, quizScores? }
- Returns: { success, updatedProgress }

POST /api/progress/:userId/item-complete
- Body: { itemId: string, completed: boolean }
- Returns: { success, newProgress }

POST /api/progress/:userId/quiz-submit
- Body: { week: number, score: number, answers: object }
- Returns: { success, newProgress }
```

#### Analytics (Optional)
```
GET /api/analytics/overview
- Returns: aggregate statistics for admin panel

GET /api/analytics/user/:userId
- Returns: detailed user analytics
```

### 3. Implementation Options

#### Option A: Supabase (Recommended)
**Pros:**
- PostgreSQL database with real-time subscriptions
- Built-in authentication
- Auto-generated REST API
- Free tier available
- Easy to integrate with React

**Setup:**
```javascript
// supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)
```

#### Option B: Firebase/Firestore
**Pros:**
- NoSQL document database
- Real-time sync
- Google authentication integration
- Generous free tier

#### Option C: Custom Node.js/Express + PostgreSQL
**Pros:**
- Full control over backend logic
- Can integrate with existing systems
- Custom business logic implementation

### 4. Frontend Integration

#### New Service Layer
```javascript
// services/trainingService.js
class TrainingService {
  async loginUser(email, name) {
    // Try to find existing user or create new one
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name })
    });
    return response.json();
  }

  async saveProgress(userId, progressData) {
    // Sync progress to backend
    const response = await fetch(`/api/progress/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(progressData)
    });
    return response.json();
  }

  async loadProgress(userId) {
    // Load user progress from backend
    const response = await fetch(`/api/progress/${userId}`);
    return response.json();
  }

  async lookupUser(identifier) {
    // Find user by email or name
    const isEmail = identifier.includes('@');
    const query = isEmail ? `email=${identifier}` : `name=${encodeURIComponent(identifier)}`;
    
    const response = await fetch(`/api/auth/lookup?${query}`);
    if (response.ok) {
      return response.json();
    }
    return null;
  }
}

export default new TrainingService();
```

#### Updated TrainingApp Component
```javascript
// Modified loadFromStorage to use backend
const loadUserData = async () => {
  // First try localStorage for offline capability
  const localData = localStorage.getItem('sherpa-training-userData');
  
  if (localData) {
    const userData = JSON.parse(localData);
    if (userData.email) {
      // Try to sync with backend
      try {
        const serverData = await trainingService.loadProgress(userData.id);
        if (serverData) {
          // Merge local and server data (server takes precedence)
          return mergeProgressData(userData, serverData);
        }
      } catch (error) {
        console.log('Offline mode - using local data');
      }
    }
  }
  
  return defaultData;
};
```

### 5. Migration Strategy

#### Phase 1: Dual Storage (Backwards Compatible)
- Keep localStorage as fallback
- Add backend sync on user actions
- Graceful degradation if backend unavailable

#### Phase 2: Backend Primary
- Backend becomes source of truth
- localStorage only for offline caching
- Real-time sync capabilities

#### Phase 3: Enhanced Features
- Cross-device progress sync
- Admin dashboard
- Progress analytics
- Email notifications

### 6. User Experience Improvements

#### Enhanced User Registration
```javascript
// Enhanced UserRegistration component
const UserRegistration = ({ onRegister }) => {
  const [mode, setMode] = useState('new'); // 'new' or 'returning'
  const [identifier, setIdentifier] = useState('');
  
  const handleReturningUser = async () => {
    const userData = await trainingService.lookupUser(identifier);
    if (userData) {
      onRegister(userData);
    } else {
      setError('User not found. Please check your email or name.');
    }
  };

  return (
    <div>
      <div className="tabs">
        <button onClick={() => setMode('new')}>New User</button>
        <button onClick={() => setMode('returning')}>Returning User</button>
      </div>
      
      {mode === 'returning' ? (
        <div>
          <input 
            placeholder="Enter your email or full name"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <button onClick={handleReturningUser}>Continue Training</button>
        </div>
      ) : (
        // Existing new user form
        <NewUserForm onRegister={onRegister} />
      )}
    </div>
  );
};
```

### 7. Security Considerations

- **Input Validation**: Sanitize all user inputs
- **Rate Limiting**: Prevent abuse of lookup endpoints
- **Data Privacy**: Encrypt sensitive user data
- **CORS Configuration**: Properly configure for your domain
- **Authentication**: Implement JWT tokens for API access

### 8. Deployment Options

#### Option A: Supabase (Recommended for MVP)
- 5-minute setup
- Automatic scaling
- Built-in security

#### Option B: Vercel + Supabase
- Frontend on Vercel
- Database on Supabase
- Serverless functions for custom logic

#### Option C: Full Custom Deployment
- Backend: Railway, Render, or AWS
- Database: PostgreSQL on AWS RDS or similar
- Frontend: Vercel, Netlify, or AWS S3

## Implementation Timeline

### Week 1: Backend Setup
- Choose platform (Supabase recommended)
- Set up database schema
- Create basic API endpoints
- Test with sample data

### Week 2: Frontend Integration
- Create service layer
- Update TrainingApp to use backend
- Implement dual storage (local + remote)
- Add user lookup functionality

### Week 3: Enhanced UX
- Improve user registration flow
- Add progress synchronization
- Implement offline fallback
- Testing and bug fixes

### Week 4: Production & Analytics
- Deploy to production
- Set up monitoring
- Add basic analytics
- Documentation and training

## Cost Estimates

### Supabase (Recommended)
- **Free Tier**: Up to 500MB database, 50,000 monthly active users
- **Pro Tier**: $25/month for more storage and users
- **Perfect for**: MVP and early growth

### Custom Solution
- **Database**: $10-50/month (managed PostgreSQL)
- **Backend Hosting**: $5-20/month (Vercel, Railway)
- **Total**: $15-70/month depending on scale

## Next Steps

1. **Choose your backend platform** (Supabase recommended for quick start)
2. **Set up development environment**
3. **Create database schema**
4. **Build API endpoints**
5. **Update frontend components**
6. **Test end-to-end flow**
7. **Deploy and monitor**

Would you like me to start implementing any specific part of this plan?
