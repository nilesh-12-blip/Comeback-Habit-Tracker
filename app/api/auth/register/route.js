import { NextResponse } from "next/server";
import { z } from "zod";
import { hash } from "bcryptjs";
import { prisma } from "../../../../lib/prisma";
import { rateLimit } from "../../../../lib/rate-limit";

const schema = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  email: z.string().trim().email(),
  password: z.string().min(8).max(100),
});

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local";
    const check = rateLimit(`register:${ip}`, 8, 60_000);
    if (!check.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

    const body = await request.json();
    const parsed = schema.parse(body);
    const email = parsed.email.toLowerCase();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

    const passwordHash = await hash(parsed.password, 12);
    const user = await prisma.user.create({
      data: { email, name: parsed.name || null, passwordHash },
      select: { id: true, email: true, name: true },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (_error) {
    return NextResponse.json({ error: "Invalid registration input" }, { status: 400 });
  }
}
