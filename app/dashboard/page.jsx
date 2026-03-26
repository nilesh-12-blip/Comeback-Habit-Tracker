import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import { getAuthSession } from "../../lib/auth";

export default async function DashboardPage() {
  const session = await getAuthSession();
  if (!session?.user?.email) redirect("/login");
  return <DashboardClient userName={session.user.name || session.user.email} />;
}
