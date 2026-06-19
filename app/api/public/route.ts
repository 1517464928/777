import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "public", "data.json");
    const raw = readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch {
    // Fallback: read from database (local dev only)
    const { db, schema } = await import("@/lib/prisma");
    const { asc } = await import("drizzle-orm");
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
}
