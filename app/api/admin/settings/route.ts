import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db, schema } from "@/lib/prisma";

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { heroTitle, heroButtonText, style } = await request.json();
  db.delete(schema.siteConfig).run();
  db.insert(schema.siteConfig).values({ heroTitle, heroButtonText, style: style || "{}" }).run();
  return NextResponse.json({ success: true });
}
