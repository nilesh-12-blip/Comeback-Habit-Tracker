import { redirect } from "next/navigation";
import { getAuthSession } from "../../lib/auth";
import MonthlyTrackClient from "./track-client";

export default async function MonthlyTrackPage() {
  const session = await getAuthSession();
  if (!session?.user?.email) redirect("/login");
  return <MonthlyTrackClient />;
}
