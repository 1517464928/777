import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db, schema } from "@/lib/prisma";

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { advantages } = await request.json();
  db.delete(schema.advantages).run();
  if (advantages?.length) {
    db.insert(schema.advantages)
      .values(
        advantages.map((a: any, i: number) => ({
          title: a.title,
          description: a.description,
          icon: a.icon || "Sparkles",
          style: a.style || "{}",
          order: i,
        }))
      )
      .run();
  }
  return NextResponse.json({ success: true });
}
