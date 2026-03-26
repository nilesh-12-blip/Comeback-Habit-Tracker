# Quick Start Guide - Comeback Habit Tracker

## ⚡ 5-Minute Setup

### Step 1: Install Node.js
If you don't have Node.js:
1. Visit [nodejs.org](https://nodejs.org)
2. Download the LTS version
3. Install it (accept defaults)

### Step 2: Clone/Download Project
```bash
cd "Comeback Habit Tracker"
```

### Step 3: Install Dependencies
```bash
npm install
```

This downloads all required packages.

### Step 4: Start Development Server
```bash
npm run dev
```

Your browser will automatically open to `http://localhost:5173`

### Step 5: Start Using the App!

1. **Sign In**
   - Enter any email (example@email.com)
   - Enter your name
   - Click "Begin My Comeback 🔥"

2. **Add Your First Habit**
   - Click "Habits" in sidebar
   - Click "+ Add Habit"
   - Enter habit name (e.g., "Morning Run")
   - Select category
   - Click "Add Habit"

3. **Track Daily**
   - Go to Dashboard
   - Click on today's habit to mark it complete
   - Watch your streak grow! 🔥

4. **Explore Features**
   - **Dashboard**: See today's progress
   - **Habits**: Manage your habits
   - **Analytics**: View your performance
   - **Timeline**: See long-term growth
   - **Badges**: Unlock achievements
   - **Settings**: Manage your profile

## 📱 Features to Try

### Quick Wins
- ✅ Mark a habit complete → see the checkmark
- ✅ Mark it incomplete → watch it disappear
- ✅ Add 3 habits → unlock "Habit Builder"
- ✅ Complete all habits today → "Perfect Day" badge

### Explore Data
- Click Analytics → See weekly chart
- Click Timeline → Select "Year" to see full view
- Go to Badges → See locked badges you can unlock
- Check Settings → Export your data

## 🎯 First Week Challenge

- **Day 1**: Add 3-5 habits you care about
- **Day 2**: Log activities daily
- **Day 3**: Check your comeback score
- **Day 4**: View analytics to see patterns
- **Day 5**: Unlock your first badge!
- **Week 1**: Export and share your progress

## 💡 Pro Tips

### Make Habits Stick
- Start with 2-3 habits (not 10!)
- Pick habits you actually do daily
- Set specific times (e.g., "5:30 AM Run")
- Add helpful notes

### Understand Your Score
- **90+**: You're crushing it! 🔥
- **70-89**: Great momentum! ⚡
- **50-69**: Keep pushing! 💪
- **<50**: You've got this! 🌱

### Data is Yours
- All data saved in browser (no internet needed)
- Export anytime (Settings → Export Data)
- Data persists across sessions (even after closing)
- Click "Sign Out" but your data stays

## ❓ Common Questions

### Q: Will my data disappear?
**A**: No! Data is saved locally in your browser. It only disappears if you:
- Clear browser cache
- Delete the site data
- Click "Clear All Habits"

### Q: What if I close the browser?
**A**: Your data is safe! It's saved in browser storage.

### Q: Can I use on multiple devices?
**A**: Each device has its own storage. Future version will sync to cloud.

### Q: Can I edit past days?
**A**: No, but you can view them in Analytics and Timeline.

### Q: How do streaks work?
**A**: Complete a habit daily to maintain streak. Missing a day breaks it.

### Q: What's the Comeback Score?
**A**: It measures how well you recover after missed days (50%) + consistency (50%)

## 🐛 Troubleshooting

### App won't start
```bash
# Try this
npm install
npm run dev
```

### Data disappeared
```bash
# Check if data is still there
# Open DevTools (F12) → Application → Local Storage
```

### Habit not saving
- Check browser console for errors
- Try refreshing the page
- Ensure LocalStorage is enabled

### Port already in use
```bash
# Use different port
npm run dev -- --port 3000
```

## 📚 Learn More

- **Development**: Read [DEVELOPMENT.md](./DEVELOPMENT.md)
- **Deployment**: Read [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Features**: See [FEATURES.md](./FEATURES.md)
- **Full Docs**: See [README.md](./README.md)

## 🚀 Next Steps

1. **Customize It**: Edit colors, fonts, features
2. **Deploy It**: Share your build with the world
3. **Extend It**: Add notifications, backend, etc.
4. **Share It**: Tell friends about your tracker

## 📞 Need Help?

1. Check the README.md for full documentation
2. Look at DEVELOPMENT.md for coding help
3. Check browser console (F12) for errors

## 🔥 Let's Go!

You're now ready to track habits and achieve greatness!

```
Your comeback is stronger than any setback.
```

Start your journey with:
```bash
npm run dev
```

---

**Happy habit tracking!** 💪
