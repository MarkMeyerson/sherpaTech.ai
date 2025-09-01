// Performance optimization plan for SherpaTech.AI

## CRITICAL FIXES NEEDED:

### 1. LAZY LOAD ROUTE COMPONENTS
Current bundle: 288KB - Target: <150KB

Replace in App.jsx:
```jsx
// ❌ Current: Eager loading all components
import SherpaSkill from './components/SherpaSkill';
import TrainingApp from './components/TrainingApp';

// ✅ Better: Lazy loading
const SherpaSkill = lazy(() => import('./components/SherpaSkill'));
const TrainingApp = lazy(() => import('./components/TrainingApp'));
```

### 2. CONSOLIDATE HUBSPOT FORMS
Remove 9 duplicate form components, keep only:
- HubSpotForm.jsx (main production form)
- Remove: SimpleHubSpotForm, DirectHubSpotForm, RobustHubSpotForm, etc.

### 3. STYLED-COMPONENTS OPTIMIZATION
Move styled components outside render functions:
```jsx
// ❌ Current: Creates new classes every render
const Component = () => {
  const StyledDiv = styled.div`...`;
  return <StyledDiv />;
}

// ✅ Better: Define outside component
const StyledDiv = styled.div`...`;
const Component = () => <StyledDiv />;
```

### 4. FONT OPTIMIZATION
Replace Google Fonts CDN with:
- Font preload links in index.html
- Font-display: swap for better loading

### 5. IMAGE OPTIMIZATION
- Convert images to WebP format
- Add proper lazy loading with intersection observer
- Implement responsive images with srcset

### 6. CODE SPLITTING BY ROUTE
Split large components:
- SherpaSkill → Split into smaller chunks
- FiveWeekJourney → Lazy load when scrolled into view
- WhoIsThisFor → Load on interaction

## EXPECTED IMPROVEMENTS:
- Bundle size: 288KB → ~120KB (-58%)
- First Load: ~3s → ~1.2s (-60%)
- Mobile performance score: +40 points
