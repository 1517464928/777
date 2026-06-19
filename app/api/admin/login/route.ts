import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST(request: Request) {
  const { password } = await request.json();
  const session = await getSession();
  if (password === process.env.ADMIN_PASSWORD) {
    session.isLoggedIn = true;
    await session.save();
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "密码错误" }, { status: 401 });
}

export async function GET() {
  const session = await getSession();
  return NextResponse.json({ isLoggedIn: !!session.isLoggedIn });
}
