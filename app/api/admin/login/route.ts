import { NextResponse } from "next/server";
import { setAdminSession, verifyPassword } from "@/lib/admin-auth";
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return NextResponse.json({ error: "Request rejected." }, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 2_048) return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  let body: { password?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const password = typeof body.password === "string" ? body.password : "";
  if (password.length > 1024 || !verifyPassword(password)) return NextResponse.json({ error: "Password is incorrect." }, { status: 401 });
  await setAdminSession();
  return NextResponse.json({ ok: true });
}
