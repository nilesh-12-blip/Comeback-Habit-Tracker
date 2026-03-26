import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { BADGE_LEVELS } from "../../../lib/badges";
import { pickQuote } from "../../../lib/quotes";
import { requireUser } from "../../../lib/api-auth";

export async function GET() {
  const auth = await requireUser();
  if (auth.error) return auth.error;
  const { user } = auth;

  const habits = await prisma.habit.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  const existingUnlocks = await prisma.badgeUnlock.findMany({ where: { userId: user.id } });
  const existingIds = new Set(existingUnlocks.map((u) => u.badgeId));

  const bestStreak = habits.reduce((m, h) => Math.max(m, h.bestStreak || 0, h.streak || 0), 0);
  const newlyUnlocked = BADGE_LEVELS.filter((b) => bestStreak >= b.days && !existingIds.has(b.id));

  if (newlyUnlocked.length) {
    await prisma.badgeUnlock.createMany({
      data: newlyUnlocked.map((b) => ({ badgeId: b.id, userId: user.id })),
      skipDuplicates: true,
    });
  }

  const unlockCount = existingUnlocks.length + newlyUnlocked.length;
  const nextBadge = BADGE_LEVELS.find((b) => bestStreak < b.days) || null;
  const latestUnlock = newlyUnlocked.at(-1) || null;

  return NextResponse.json({
    bestStreak,
    unlockedCount: unlockCount,
    totalBadges: BADGE_LEVELS.length,
    nextBadge,
    latestUnlock,
    quote: pickQuote(bestStreak + unlockCount),
  });
}
