import { prisma } from "./prisma";

export const DEMO_EMAIL = "demo@comeback.app";

export async function ensureDemoUser() {
  return prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: {},
    create: { email: DEMO_EMAIL, name: "Demo User" },
  });
}
