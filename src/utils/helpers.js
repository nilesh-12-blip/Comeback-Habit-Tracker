export const today = () => new Date().toISOString().split("T")[0];
export const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
export const daysBetween = (a, b) => Math.floor((new Date(a) - new Date(b)) / 86400000);

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const CATEGORIES = [
  { id: "fitness", label: "Fitness", emoji: "💪", color: "#f97316" },
  { id: "study", label: "Study", emoji: "📚", color: "#3b82f6" },
  { id: "mental", label: "Mental Health", emoji: "🧠", color: "#a855f7" },
  { id: "nutrition", label: "Nutrition", emoji: "🥗", color: "#22c55e" },
  { id: "sleep", label: "Sleep", emoji: "😴", color: "#06b6d4" },
  { id: "custom", label: "Custom", emoji: "⭐", color: "#eab308" },
];

const CORE_QUOTES = [
  "Every day is a new beginning. Take a deep breath and start again.",
  "The comeback is always stronger than the setback.",
  "Fall seven times, stand up eight.",
  "Small steps every day lead to big changes every year.",
  "You do not have to be perfect. You just have to keep going.",
  "Progress, not perfection.",
  "Your only competition is who you were yesterday.",
  "Discipline is choosing between what you want now and what you want most.",
  "It is not about how many times you fall. It is about how many times you get back up.",
  "Champions are built one habit at a time.",
  "The secret of getting ahead is getting started.",
  "Do not watch the clock; do what it does. Keep going.",
  "Consistency beats intensity when repeated for long enough.",
  "A strong life is made from ordinary disciplined days.",
  "You are one focused day away from momentum.",
  "Respect your plan and your future self will thank you.",
  "When motivation is low, discipline carries the mission.",
  "Tiny wins create unstoppable confidence.",
  "Your streak is your promise to yourself.",
  "Hard days count double. Show up anyway.",
];

const GENERATED_QUOTES = Array.from({ length: 120 }, (_, i) => {
  const day = i + 1;
  return `Day ${day}: Stay consistent, protect your streak, and build the life you promised yourself.`;
});

export const QUOTES = [...CORE_QUOTES, ...GENERATED_QUOTES];

const maxBestStreak = (habits) => habits.reduce((m, h) => Math.max(m, h.bestStreak || 0, h.streak || 0), 0);

export const BADGES = [
  { id: "lvl1_3", level: 1, days: 3, label: "Spark", desc: "3-day consistency streak", emoji: "🔥", condition: (s) => maxBestStreak(s.habits) >= 3 },
  { id: "lvl2_7", level: 2, days: 7, label: "Weekly Warrior", desc: "7-day weekly streak", emoji: "⚔️", condition: (s) => maxBestStreak(s.habits) >= 7 },
  { id: "lvl3_14", level: 3, days: 14, label: "Fortnight Focus", desc: "14-day consistency streak", emoji: "🎯", condition: (s) => maxBestStreak(s.habits) >= 14 },
  { id: "lvl4_21", level: 4, days: 21, label: "Habit Builder", desc: "21-day streak milestone", emoji: "🏗️", condition: (s) => maxBestStreak(s.habits) >= 21 },
  { id: "lvl5_30", level: 5, days: 30, label: "Monthly Master", desc: "30-day monthly badge", emoji: "👑", condition: (s) => maxBestStreak(s.habits) >= 30 },
  { id: "lvl6_60", level: 6, days: 60, label: "Momentum Mode", desc: "60-day consistency streak", emoji: "🚀", condition: (s) => maxBestStreak(s.habits) >= 60 },
  { id: "lvl7_90", level: 7, days: 90, label: "Quarter Champion", desc: "3-month (90-day) badge", emoji: "🥇", condition: (s) => maxBestStreak(s.habits) >= 90 },
  { id: "lvl8_180", level: 8, days: 180, label: "Half-Year Hero", desc: "6-month (180-day) badge", emoji: "🛡️", condition: (s) => maxBestStreak(s.habits) >= 180 },
  { id: "lvl9_270", level: 9, days: 270, label: "Relentless", desc: "270-day advanced streak", emoji: "💎", condition: (s) => maxBestStreak(s.habits) >= 270 },
  { id: "lvl10_365", level: 10, days: 365, label: "The Beast Mode", desc: "1-year (365-day) badge", emoji: "🐺", condition: (s) => maxBestStreak(s.habits) >= 365 },
];

export function calcComebackScore(habits) {
  if (!habits.length) return 0;
  let totalScore = 0;
  habits.forEach(h => {
    const logs = h.logs || {};
    const dates = Object.keys(logs).sort();
    if (dates.length < 2) { 
      totalScore += 70; 
      return; 
    }
    let missFollowedByComplete = 0, totalMisses = 0;
    for (let i = 1; i < dates.length; i++) {
      if (logs[dates[i - 1]] === false) {
        totalMisses++;
        if (logs[dates[i]] === true) missFollowedByComplete++;
      }
    }
    const recovery = totalMisses > 0 ? (missFollowedByComplete / totalMisses) * 100 : 80;
    const consistency = (Object.values(logs).filter(Boolean).length / dates.length) * 100;
    totalScore += (recovery * 0.5 + consistency * 0.5);
  });
  return Math.min(100, Math.round(totalScore / habits.length));
}

export function getLast7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });
}

export function getLast30Days() {
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split("T")[0];
  });
}
