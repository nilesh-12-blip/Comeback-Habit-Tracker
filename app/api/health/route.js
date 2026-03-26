import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "comeback-habit-tracker",
    timestamp: new Date().toISOString(),
  });
}
