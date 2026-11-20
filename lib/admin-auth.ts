import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "gbs_admin_session";
const maxAge = 60 * 60 * 8;
function secret() {
  const value = process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD;
  if (!value) throw new Error("Set ADMIN_PASSWORD in the environment.");
  return value;
}
export function verifyPassword(password: string) {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured) return false;
  const actual = Buffer.from(password);
  const expected = Buffer.from(configured);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("hex"); }
export async function setAdminSession() {
  const exp = Math.floor(Date.now() / 1000) + maxAge;
  const payload = `admin:${exp}`;
  const jar = await cookies();
  jar.set(cookieName, `${payload}.${sign(payload)}`, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge });
}
export async function clearAdminSession() {
  const jar = await cookies();
  jar.set(cookieName, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 });
}
export async function isAdmin() {
  if (!process.env.ADMIN_PASSWORD) return false;
  try {
    const value = (await cookies()).get(cookieName)?.value;
    if (!value) return false;
    const index = value.lastIndexOf(".");
    const payload = value.slice(0, index);
    const signature = value.slice(index + 1);
    if (!payload || !/^[a-f0-9]{64}$/i.test(signature)) return false;
    const expected = Buffer.from(sign(payload), "hex");
    const received = Buffer.from(signature, "hex");
    if (expected.length !== received.length || !timingSafeEqual(expected, received)) return false;
    const [sessionEmail, exp] = payload.split(":");
    return sessionEmail === "admin" && Number(exp) > Math.floor(Date.now() / 1000);
  } catch { return false; }
}
