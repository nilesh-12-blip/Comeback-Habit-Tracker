// LocalStorage API for habits (frontend-only)
import { today } from './helpers';
import { recalcStreak } from './streak';

export const getHabits = () => {
  try {
    const raw = localStorage.getItem('comeback_habits') || '[]';
    let habits = JSON.parse(raw);
    habits = habits.map(h => ({
      ...h,
      logs: typeof h.logs === 'object' ? h.logs : {},
      streak: h.streak || 0,
      bestStreak: h.bestStreak || 0
    }));
    return habits;
  } catch {
    return [];
  }
};

export const toggleHabit = (id) => {
  const habits = getHabits();
  const habit = habits.find(h => h.id === id);
  if (habit) {
    const todayStr = today();
    habit.logs[todayStr] = !(habit.logs[todayStr] || false);
    habit.streak = recalcStreak(Object.keys(habit.logs));
    habit.bestStreak = Math.max(habit.bestStreak || 0, habit.streak);
    localStorage.setItem('comeback_habits', JSON.stringify(habits));
  }
};

export const getUser = () => {
  const user = localStorage.getItem('comeback_user');
  return user ? JSON.parse(user) : null;
};

export const saveHabit = (habit) => {
  const habits = getHabits();
  if (habit.id) {
    const idx = habits.findIndex(h => h.id === habit.id);
    if (idx !== -1) habits[idx] = habit;
  } else {
    habit.id = Date.now().toString();
    habit.logs = {};
    habit.streak = 0;
    habit.bestStreak = 0;
    habit.createdAt = new Date().toISOString();
    habits.push(habit);
  }
  localStorage.setItem('comeback_habits', JSON.stringify(habits));
  return habit;
};

export const deleteHabit = (id) => {
  const habits = getHabits().filter(h => h.id !== id);
  localStorage.setItem('comeback_habits', JSON.stringify(habits));
};
