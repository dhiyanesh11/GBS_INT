import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getProjects, saveProjects, type Project } from "@/lib/projects";

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || new URL(origin).host === new URL(request.url).host;
}
export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  return NextResponse.json(await getProjects(), { headers: { "Cache-Control": "no-store" } });
}
export async function PUT(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Request rejected." }, { status: 403 });
  if (!await isAdmin()) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (Number(request.headers.get("content-length") || 0) > 1_000_000) return NextResponse.json({ error: "Project data is too large." }, { status: 413 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (!Array.isArray(body) || body.length > 100) return NextResponse.json({ error: "Invalid project list." }, { status: 400 });
  const projects: Project[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const item of body) {
    if (!item || typeof item !== "object") return NextResponse.json({ error: "Invalid project." }, { status: 400 });
    const p = item as Record<string, unknown>;
    const title = typeof p.title === "string" ? p.title.trim().slice(0, 100) : "";
    const slug = typeof p.slug === "string" ? p.slug.trim().toLowerCase().slice(0, 100) : "";
    const type = p.type === "Commercial" ? "Commercial" : p.type === "Residential" ? "Residential" : null;
    const location = typeof p.location === "string" ? p.location.trim().slice(0, 100) : "";
    const description = typeof p.description === "string" ? p.description.trim().slice(0, 2000) : "";
    const images = Array.isArray(p.images) ? p.images.filter((u): u is string => typeof u === "string").map(u => u.trim()).filter(Boolean).slice(0, 20) : [];
    if (!title || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !type || !location || !description || images.length < 1 || images.some(u => { try { return new URL(u).protocol !== "https:"; } catch { return true; } })) {
      return NextResponse.json({ error: "Each project needs a title, valid URL slug, type, location, description, and at least one HTTPS photo URL." }, { status: 400 });
    }
    const id = typeof p.id === "string" && /^[a-zA-Z0-9_-]{1,80}$/.test(p.id) ? p.id : randomUUID();
    if (ids.has(id) || slugs.has(slug)) return NextResponse.json({ error: "Project IDs and URL slugs must be unique." }, { status: 400 });
    ids.add(id); slugs.add(slug);
    projects.push({ id, title, slug, type, location, description, images, updatedAt: new Date().toISOString() });
  }
  await saveProjects(projects);
  return NextResponse.json(projects);
}
