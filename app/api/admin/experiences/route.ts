import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db, schema } from "@/lib/prisma";
import { eq } from "drizzle-orm";

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { experiences } = await request.json();

  if (!Array.isArray(experiences)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const currentIds = db.select({ id: schema.experiences.id }).from(schema.experiences).all().map((r: any) => r.id);
  const incomingIds = new Set(experiences.filter((e: any) => e.id && e.id > 0).map((e: any) => e.id));

  for (const id of currentIds) {
    if (!incomingIds.has(id)) {
      db.delete(schema.experiences).where(eq(schema.experiences.id, id)).run();
    }
  }

  experiences.forEach((e: any, i: number) => {
    if (e.id && e.id > 0) {
      const setData: any = {
        type: e.type, title: e.title, subtitle: e.subtitle,
        period: e.period, description: e.description || "", order: i,
      };
      if (e.workContent !== undefined) setData.workContent = e.workContent;
      if (e.achievements !== undefined) setData.achievements = e.achievements;
      if (e.growth !== undefined) setData.growth = e.growth;
      if (e.panel1Title !== undefined) setData.panel1Title = e.panel1Title;
      if (e.panel2Title !== undefined) setData.panel2Title = e.panel2Title;
      if (e.panel3Title !== undefined) setData.panel3Title = e.panel3Title;
      if (e.panel4Title !== undefined) setData.panel4Title = e.panel4Title;
      if (e.detail1 !== undefined) setData.detail1 = e.detail1;
      if (e.detail2 !== undefined) setData.detail2 = e.detail2;
      if (e.panels !== undefined) setData.panels = typeof e.panels === 'string' ? e.panels : JSON.stringify(e.panels);
      if (e.style !== undefined) setData.style = e.style;
      db.update(schema.experiences).set(setData).where(eq(schema.experiences.id, e.id)).run();
    } else {
      db.insert(schema.experiences).values({
        type: e.type, title: e.title, subtitle: e.subtitle, period: e.period,
        description: e.description || "",
        detail1: e.detail1 || "", detail2: e.detail2 || "",
        workContent: e.workContent || "", achievements: e.achievements || "", growth: e.growth || "",
        panel1Title: e.panel1Title || "", panel2Title: e.panel2Title || "",
        panel3Title: e.panel3Title || "", panel4Title: e.panel4Title || "",
        panels: typeof e.panels === 'string' ? e.panels : JSON.stringify(e.panels || []),
        style: e.style || "{}",
        order: i,
      }).run();
    }
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await request.json();
  if (id && id > 0) {
    db.delete(schema.experiences).where(eq(schema.experiences.id, id)).run();
  }
  return NextResponse.json({ success: true });
}
