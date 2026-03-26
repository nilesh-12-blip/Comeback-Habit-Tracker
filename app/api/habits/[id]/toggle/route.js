import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { recalcStreak, todayISO } from "../../../../../lib/streak";
import { requireUser } from "../../../../../lib/api-auth";
import { rateLimit } from "../../../../../lib/rate-limit";

export async function POST(_request, { params }) {
  const auth = await requireUser();
  if (auth.error) return auth.error;
  const { user } = auth;

  const check = rateLimit(`habit-toggle:${user.id}`, 120, 60_000);
  if (!check.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const { id } = await params;
  if (!id) return NextResponse.json({ error: "Habit id required" }, { status: 400 });

  const habit = await prisma.habit.findUnique({
    where: { id },
    include: { logs: true },
  });

  if (!habit || habit.userId !== user.id) return NextResponse.json({ error: "Habit not found" }, { status: 404 });

  const today = todayISO();
  const existing = habit.logs.find((l) => l.date === today);

  if (existing) {
    await prisma.habitLog.update({
      where: { id: existing.id },
      data: { done: !existing.done },
    });
  } else {
    await prisma.habitLog.create({
      data: {
        date: today,
        done: true,
        habitId: habit.id,
      },
    });
  }

  const updated = await prisma.habit.findUnique({
    where: { id },
    include: { logs: true },
  });

  const streak = recalcStreak(updated.logs);
  const bestStreak = Math.max(updated.bestStreak, streak);

  const saved = await prisma.habit.update({
    where: { id: habit.id },
    data: { streak, bestStreak },
  });

  return NextResponse.json({ habit: saved });
}
