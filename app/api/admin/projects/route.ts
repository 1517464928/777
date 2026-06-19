import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db, schema } from "@/lib/prisma";

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { projects } = await request.json();
  db.delete(schema.projects).run();
  if (projects?.length) {
    db.insert(schema.projects).values(projects.map((p: any, i: number) => ({
      title: p.title,
      description: p.description,
      imageUrl: p.imageUrl || "",
      videoUrl: p.videoUrl || "",
      link: p.link || "",
      style: p.style || "{}",
      order: i,
    }))).run();
  }
  return NextResponse.json({ success: true });
}
