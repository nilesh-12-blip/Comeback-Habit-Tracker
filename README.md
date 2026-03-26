# Comeback Habit Tracker

A modern, premium web application designed to help users rebuild discipline, track habits, and achieve long-term personal growth.

## 🔥 Features

### User Authentication
- Email-based login/signup system
- Clean, modern login UI
- No password required
- Local storage for data persistence

### Dashboard
- Overview of today's habits with completion progress
- Current streak and longest streak tracking
- Comeback Score (based on consistency and recovery from missed days)
- Quick stats (completion rate, active habits)

### Habit Tracking
- Add, edit, and delete habits
- Mark habits as completed or missed daily
- Categorize habits (Fitness, Study, Mental Health, Nutrition, Sleep, Custom)
- Visual 7-day mini heatmap for each habit
- Streak counter and best streak tracking

### Timeline-Based Tracking
- Weekly tracking
- Monthly tracking
- 3-month progress
- 6-month progress
- Yearly progress
- Visual timeline UI showing growth journey

### Streak System
- Daily streak tracking for each habit
- Best streak record
- Visual streak indicators
- Fire emoji animations

### Comeback Score System
- Proprietary comeback score out of 100
- Tracks recovery after missed days
- Calculates recovery rate (50%) and consistency (50%)
- Encourages restart instead of quitting
- Provides insights on recovery patterns

### Analytics & Insights
- Weekly bar charts showing completion rates
- Monthly heatmaps visualizing activity
- Category performance breakdown
- Smart insights about habits
- Identifies weak days of the week
- Comeback score analysis

### Badge & Achievement System
- 9 unlockable badges for milestones:
  - 🌱 Beginner - Add your first habit
  - 🔥 3-Day Fire - 3-day streak
  - ⚡ Week Warrior - 7-day streak
  - 👑 Monthly Master - 30-day streak
  - 💥 Comeback Kid - Strong recovery
  - ✨ Perfect Day - Complete all habits in one day
  - 🏗️ Habit Builder - Track 5+ habits
  - 🎖️ Centurion - 100-day streak
  - 🥇 Iron Will - Never missed a day in a month

### User Interface
- Dark mode (premium, modern design)
- Smooth animations and transitions
- Fully responsive (mobile + desktop)
- Collapsible sidebar for better space management
- Clean, futuristic design

### Data Storage
- LocalStorage for frontend-only persistence
- No server required for MVP
- Export/backup functionality
- Clean logout and data management

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd "Comeback Habit Tracker"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open `http://localhost:5173` in your browser

### Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder that can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## 📁 Project Structure

```
src/
├── main.jsx                 # Entry point
├── App.jsx                  # Main app component
├── components/
│   ├── GlobalStyles.jsx     # Global CSS and themes
│   ├── Sidebar.jsx          # Navigation sidebar
│   └── pages/
│       ├── LoginPage.jsx    # Login/signup flow
│       ├── Dashboard.jsx    # Main dashboard
│       ├── HabitManager.jsx # Habit CRUD operations
│       ├── Analytics.jsx    # Analytics and insights
│       ├── Timeline.jsx     # Progress timeline
│       ├── BadgesPage.jsx   # Achievements
│       └── Settings.jsx     # User settings
├── utils/
│   ├── helpers.js          # Helper functions and constants
│   └── storage.js          # LocalStorage utilities
├── index.html              # HTML template
├── package.json            # Dependencies
└── vite.config.js          # Vite configuration
```

## 🎨 Design System

### Color Palette
- **Primary Accent**: #f97316 (Orange) - Energy, motivation
- **Background**: #080c10 (Dark Blue) - Premium feel
- **Success**: #22c55e (Green) - Completion, progress
- **Warning**: #eab308 (Yellow) - Insights
- **Error**: #ef4444 (Red) - Missed days

### Typography
- Display Font: Bebas Neue (Bold headings)
- Body Font: DM Sans (Clean, readable)
- Mono Font: JetBrains Mono (Data, codes)

## 💾 Data Structure

### User Data
```javascript
{
  email: "user@example.com",
  name: "User Name"
}
```

### Habit Data
```javascript
{
  id: "1234567890",
  name: "Morning Run",
  category: "fitness",
  goal: "daily",
  note: "5km run",
  streak: 7,
  bestStreak: 14,
  logs: {
    "2024-01-01": true,
    "2024-01-02": false,
    "2024-01-03": true,
    ...
  },
  createdAt: "2024-01-01"
}
```

## 📊 Comeback Score Algorithm

The comeback score is calculated by analyzing recovery and consistency:

```
Recovery Rate = (Completions after missed day) / (Total missed days) * 100
Consistency Rate = (Total completions) / (Total days logged) * 100
Comeback Score = (Recovery * 50% + Consistency * 50%) / Number of habits
```

## 🚀 Future Enhancements

### Phase 2: Backend Integration
- User authentication with backend
- Database storage (MySQL/MongoDB)
- Cloud synchronization
- Multi-device support

### Phase 3: Advanced Features
- AI-based habit suggestions
- Social features (leaderboards, challenges)
- Push notifications (mobile app)
- Calendar integration
- Habit dependencies and routines

### Phase 4: Mobile App
- React Native mobile app
- Offline support
- Native notifications
- Wearable device integration

### Phase 5: Premium Features
- Subscription model
- Advanced analytics
- Custom reports
- Coaching features
- Community challenges

## 📄 License

MIT License - feel free to use this for personal or commercial projects!

## 🤝 Contributing

Contributions are welcome! Feel free to fork, modify, and improve the application.

## 📞 Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Remember**: Every comeback is stronger than every setback. 🔥

Built with React + Vite, styled with CSS variables, and powered by motivation.
