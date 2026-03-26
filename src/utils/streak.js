/**
 * Recalculate streak based on an array of dates when the habit was completed.
 * @param {string[]} doneDates - Array of YYYY-MM-DD strings
 * @returns {number}
 */
export function recalcStreak(doneDates) {
  if (!doneDates || doneDates.length === 0) return 0;
  
  const set = new Set(doneDates);
  let streak = 0;
  const d = new Date(); // Start from today

  // Check today
  let key = d.toISOString().split("T")[0];
  
  // If not done today, check if it was done yesterday. 
  // If not even yesterday, streak is broken (0).
  if (!set.has(key)) {
    d.setDate(d.getDate() - 1);
    key = d.toISOString().split("T")[0];
    if (!set.has(key)) return 0;
  }

  // Count backwards
  while (set.has(key)) {
    streak++;
    d.setDate(d.getDate() - 1);
    key = d.toISOString().split("T")[0];
  }

  return streak;
}
