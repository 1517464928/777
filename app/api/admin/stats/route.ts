import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db, schema } from "@/lib/prisma";
import { eq } from "drizzle-orm";

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { stats } = await request.json();

  if (!Array.isArray(stats)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  if (stats.length === 1) {
    const s = stats[0];
    if (s.id && s.id > 0) {
      db.update(schema.stats)
        .set({ label: s.label, value: s.value })
        .where(eq(schema.stats.id, s.id))
        .run();
    }
  } else {
    db.delete(schema.stats).run();
    db.insert(schema.stats).values(stats.map((s: any, i: number) => ({
      label: s.label, value: s.value, order: i,
    }))).run();
  }

  return NextResponse.json({ success: true });
}
