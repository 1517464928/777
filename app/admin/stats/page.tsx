import { db, schema } from "@/lib/prisma";
import { asc } from "drizzle-orm";
import StatsEditor from "@/components/admin/StatsEditor";
export default async function StatsPage() {
  const stats = await db.select().from(schema.stats).orderBy(asc(schema.stats.order));
  return <StatsEditor stats={stats} />;
}
