import { NextResponse } from "next/server";
import { prisma } from "./prisma";
import { getAuthSession } from "./auth";

export async function requireUser() {
  const session = await getAuthSession();
  if (!session?.user?.email) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return { error: NextResponse.json({ error: "User not found" }, { status: 404 }) };
  }

  return { user };
}
