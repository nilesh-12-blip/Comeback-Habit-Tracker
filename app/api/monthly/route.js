import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { requireUser } from "../../../lib/api-auth";

function monthDates(year, month) {
  const days = new Date(year, month, 0).getDate();
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(Date.UTC(year, month - 1, i + 1));
    return d.toISOString().slice(0, 10);
  });
}

export async function GET(request) {
  const auth = await requireUser();
  if (auth.error) return auth.error;
  const { user } = auth;

  const { searchParams } = new URL(request.url);
  const ym = searchParams.get("month");
  if (!ym || !/^\d{4}-\d{2}$/.test(ym)) {
    return NextResponse.json({ error: "month must be YYYY-MM" }, { status: 400 });
  }

  const [year, month] = ym.split("-").map(Number);
  const dates = monthDates(year, month);

  const habits = await prisma.habit.findMany({
    where: { userId: user.id },
    include: {
      logs: {
        where: { date: { in: dates } },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  const rows = habits.map((h) => {
    const doneSet = new Set(h.logs.filter((l) => l.done).map((l) => l.date));
    const completed = dates.filter((d) => doneSet.has(d)).length;
    return {
      id: h.id,
      name: h.name,
      completed,
      percentage: dates.length ? Math.round((completed / dates.length) * 100) : 0,
      byDate: Object.fromEntries(dates.map((d) => [d, doneSet.has(d)])),
    };
  });

  return NextResponse.json({ month: ym, dates, rows });
}
