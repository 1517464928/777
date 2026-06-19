import { db, schema } from "@/lib/prisma";
import { asc } from "drizzle-orm";
import ProjectEditor from "@/components/admin/ProjectEditor";
export default async function ProjectsPage() {
  const projects = await db.select().from(schema.projects).orderBy(asc(schema.projects.order));
  return <ProjectEditor projects={projects} />;
}
