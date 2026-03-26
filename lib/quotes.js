const CORE_QUOTES = [
  "The comeback is always stronger than the setback.",
  "Discipline is choosing between what you want now and what you want most.",
  "Progress is built one consistent day at a time.",
  "When motivation fades, your systems keep you moving.",
  "Hard days count the most. Show up anyway.",
  "Stay patient. Your future is compounding.",
  "Tiny actions repeated become unstoppable momentum.",
  "Consistency is your superpower.",
  "Protect your streak and your confidence will follow.",
  "Beast mode is built, not found.",
];

const GENERATED_QUOTES = Array.from(
  { length: 140 },
  (_, i) => `Quote ${i + 1}: Keep your promise to yourself and rise again today.`,
);

export const QUOTES = [...CORE_QUOTES, ...GENERATED_QUOTES];

export function pickQuote(seed = Date.now()) {
  return QUOTES[Math.abs(seed) % QUOTES.length];
}
