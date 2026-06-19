import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db, schema } from "@/lib/prisma";

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { socialLinks } = await request.json();
  db.delete(schema.socialLinks).run();
  if (socialLinks?.length) {
    db.insert(schema.socialLinks).values(socialLinks.map((l: any, i: number) => ({
      platform: l.platform, url: l.url, label: l.label, order: i
    }))).run();
  }
  return NextResponse.json({ success: true });
}
