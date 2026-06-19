import { NextResponse } from "next/server";
import { db, schema } from "@/lib/prisma";
import { asc } from "drizzle-orm";

export async function GET() {
  const [stats, experiences, advantages, projects, socialLinks, config] = await Promise.all([
    db.select().from(schema.stats).orderBy(asc(schema.stats.order)),
    db.select().from(schema.experiences).orderBy(asc(schema.experiences.order)),
    db.select().from(schema.advantages).orderBy(asc(schema.advantages.order)),
    db.select().from(schema.projects).orderBy(asc(schema.projects.order)),
    db.select().from(schema.socialLinks).orderBy(asc(schema.socialLinks.order)),
    db.select().from(schema.siteConfig).limit(1),
  ]);
  return NextResponse.json({ stats, experiences, advantages, projects, socialLinks, siteConfig: config[0] });
}
