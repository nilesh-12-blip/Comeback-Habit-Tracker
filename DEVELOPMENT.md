# Development Guide

## Local Development Setup

### Prerequisites
- Node.js v16+ (download from [nodejs.org](https://nodejs.org))
- npm (comes with Node.js)
- A code editor (VS Code recommended)

### Quick Start

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm run dev
```

3. **Open in Browser**
Browser should auto-open to `http://localhost:5173`

4. **Make Changes**
The app will hot-reload as you edit files

## Project Architecture

### Component Structure
- **Global**: `App.jsx` - Main app container
- **Layout**: `Sidebar.jsx` - Navigation sidebar
- **Pages**: Components in `src/components/pages/`
  - `LoginPage.jsx` - Authentication
  - `Dashboard.jsx` - Home view
  - `HabitManager.jsx` - CRUD operations
  - `Analytics.jsx` - Data visualization
  - `Timeline.jsx` - Progress visualization
  - `BadgesPage.jsx` - Achievements
  - `Settings.jsx` - User preferences

### Utility Files
- `utils/helpers.js` - Constants and calculation functions
- `utils/storage.js` - LocalStorage helpers
- `components/GlobalStyles.jsx` - All CSS styles

### Data Flow

```
User Input (Form)
    ↓
Update State (useState)
    ↓
Trigger Calculation (useCallback)
    ↓
Save to LocalStorage (useEffect)
    ↓
Update UI (Component Re-render)
```

## Common Development Tasks

### Adding a New Habit Feature

1. **Update Data Structure** (`utils/helpers.js`)
```javascript
export const CATEGORIES = [
  // Add new category here
];
```

2. **Update Calculation Logic** (`utils/helpers.js`)
```javascript
export function calcComebackScore(habits) {
  // Update algorithm if needed
}
```

3. **Update UI Component** (`components/pages/HabitManager.jsx`)
```javascript
// Add form field or display logic
```

4. **Test Locally**
```bash
npm run dev
# Create test habit and verify it works
```

### Adding a New Page

1. **Create Component** (`src/components/pages/NewPage.jsx`)
```javascript
export default function NewPage() {
  return <div>Your content here</div>;
}
```

2. **Add to Navigation** (`src/components/Sidebar.jsx`)
```javascript
const nav = [
  // ... existing items
  { id: "newpage", label: "New Page", icon: "📄" },
];
```

3. **Add Route** (`src/App.jsx`)
```javascript
const pageMap = {
  // ... existing pages
  newpage: <NewPage />,
};
```

4. **Import Component** (Top of `src/App.jsx`)
```javascript
import NewPage from "./components/pages/NewPage.jsx";
```

### Modifying Styles

All styles are in `src/components/GlobalStyles.jsx`:

```javascript
// CSS variables
:root {
  --accent: #f97316;
  // ... other colors
}

// Component styles
.btn { /* button styles */ }
.card { /* card styles */ }
// ... more styles
```

### Adding Badges

Edit `utils/helpers.js`:

```javascript
export const BADGES = [
  {
    id: "new_badge",
    label: "Badge Name",
    desc: "Badge description",
    emoji: "🎖️",
    condition: (state) => {
      // Return true/false based on state
      return state.habits.length >= 10;
    }
  },
  // ... other badges
];
```

## Testing

### Manual Testing Checklist

- [ ] Login with email and name
- [ ] Add a new habit
- [ ] Mark habit as complete today
- [ ] Edit habit details
- [ ] Delete a habit
- [ ] Check dashboard stats update
- [ ] View analytics and charts
- [ ] Check timeline visualization
- [ ] Verify badges unlock
- [ ] Export data
- [ ] Refresh page - data persists
- [ ] Sign out and log back in

### Browser DevTools

1. **Open DevTools** (F12 or Right-click → Inspect)
2. **Check Console** for errors
3. **Check Network** for slow requests
4. **Check Application → LocalStorage** for data
5. **Test Responsive Design** (Ctrl+Shift+M)

## Performance Tips

### Bundle Size
```bash
# Check what's contributing to bundle
npm run build

# Look at dist/ folder size
# Goal: Keep index.js under 200KB
```

### React Performance
```javascript
// Use memo for expensive components
import { memo } from 'react';

const MyComponent = memo(({ prop }) => {
  return <div>{prop}</div>;
});
```

### LocalStorage Performance
```javascript
// Cache frequently accessed data
const habits = load("cb_habits", []);

// Only save when needed (already done in useEffect)
useEffect(() => {
  save("cb_habits", habits);
}, [habits]);
```

## Debugging Tips

### View Comeback Score Calculation
```javascript
// Add to App.jsx temporarily
useEffect(() => {
  console.log('Comeback Score:', comebackScore);
  console.log('Habits:', habits);
}, [comebackScore, habits]);
```

### View All LocalStorage Data
Open Browser Console and run:
```javascript
Object.entries(localStorage).forEach(([key, value]) => {
  console.log(key, JSON.parse(value));
});
```

### Clear All Data (Reset App)
```javascript
// In Browser Console
localStorage.clear();
location.reload();
```

## Code Style Guide

### Naming Conventions
- Components: `PascalCase` (Dashboard.jsx)
- Functions: `camelCase` (getLast7Days)
- Constants: `UPPERCASE` (CATEGORIES)
- CSS Variables: `kebab-case` (--accent-glow)

### Component Structure
```javascript
// 1. Imports
import { useState } from 'react';

// 2. Component definition
export default function ComponentName({ prop1, prop2 }) {
  // 3. State
  const [state, setState] = useState(null);

  // 4. Effects
  useEffect(() => {
    // Side effects
  }, [dependency]);

  // 5. Handlers
  const handleClick = () => {
    // Handle event
  };

  // 6. render/return
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Inline Styles
Use `style` prop for component-specific styles:
```javascript
<div style={{
  display: 'flex',
  gap: '16px',
  padding: '20px',
  background: 'var(--surface)',
}}>
  Content
</div>
```

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build production
npm run preview         # Preview production build

# Cleanup
rm -rf node_modules dist   # Clear cache
npm install            # Reinstall dependencies
npm cache clean --force # Nuclear option for npm cache

# Git
git add .              # Stage changes
git commit -m "msg"    # Commit
git push               # Push to GitHub
```

## Version Control

### Branch Strategy
```bash
# Main development
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Merge to main when ready
# (Create Pull Request on GitHub)
```

## Resources

- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **JavaScript Docs**: https://developer.mozilla.org/en-US/docs/Web/JavaScript

## Next Steps

1. ✅ Understand the current code
2. ✅ Make small changes to test
3. ✅ Build your first feature
4. ✅ Deploy and share!

---

**Happy coding!** 💻
