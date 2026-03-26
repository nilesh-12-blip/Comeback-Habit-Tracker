export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function recalcStreak(logs) {
  const set = new Set(logs.filter((l) => l.done).map((l) => l.date));
  let streak = 0;
  const d = new Date();

  while (true) {
    const key = d.toISOString().slice(0, 10);
    if (!set.has(key)) break;
    streak += 1;
    d.setDate(d.getDate() - 1);
  }

  return streak;
}
