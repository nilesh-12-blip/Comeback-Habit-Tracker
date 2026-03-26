import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { requireUser } from "../../../lib/api-auth";
import { rateLimit } from "../../../lib/rate-limit";

const habitSchema = z.object({
  name: z.string().trim().min(2).max(80),
});

export async function GET() {
  const auth = await requireUser();
  if (auth.error) return auth.error;
  const { user } = auth;
  const habits = await prisma.habit.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ habits });
}

export async function POST(request) {
  try {
    const auth = await requireUser();
    if (auth.error) return auth.error;
    const { user } = auth;

    const check = rateLimit(`habit-create:${user.id}`, 30, 60_000);
    if (!check.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

    const body = await request.json();
    const parsed = habitSchema.parse(body);

    const habit = await prisma.habit.create({
      data: {
        name: parsed.name,
        userId: user.id,
      },
    });
    return NextResponse.json({ habit }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
