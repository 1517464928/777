import { db, schema } from "@/lib/prisma";
import { asc } from "drizzle-orm";
import ExperienceEditor from "@/components/admin/ExperienceEditor";
export default async function ExperiencesPage() {
  const experiences = await db.select().from(schema.experiences).orderBy(asc(schema.experiences.order));
  return <ExperienceEditor experiences={experiences} />;
}
