import "server-only";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import {db} from "@/lib/db";

export type Project = { id: string; title: string; slug: string; type: "Residential" | "Commercial"; location: string; description: string; images: string[]; updatedAt: string };

const seed: Project[] = [
  { id: "quiet-house", title: "The quiet house", slug: "the-quiet-house", type: "Residential", location: "Bengaluru", description: "A calm, considered home shaped by natural textures, warm light, and the rhythms of everyday life.", images: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"], updatedAt: new Date(0).toISOString() },
  { id: "softer-workspace", title: "A softer workspace", slug: "a-softer-workspace", type: "Commercial", location: "Mysuru", description: "A welcoming workspace with room to think and collaborate.", images: ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85"], updatedAt: new Date(0).toISOString() },
  { id: "everyday-elevated", title: "Everyday, elevated", slug: "everyday-elevated", type: "Residential", location: "Bengaluru", description: "Thoughtful details make everyday living feel special.", images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85"], updatedAt: new Date(0).toISOString() },
];

const file = path.join(process.cwd(), "data", "projects.json");
export async function getProjects(): Promise<Project[]> {
  if (process.env.DATABASE_URL) {const result=await db().query("SELECT id,title,slug,type,location,description,images,updated_at FROM projects ORDER BY sort_order,created_at");if(!result.rows.length&&process.env.NODE_ENV!=="production")return seed;return result.rows.map(r=>({id:r.id,title:r.title,slug:r.slug,type:r.type as Project["type"],location:r.location,description:r.description,images:r.images as string[],updatedAt:new Date(r.updated_at).toISOString()}));}
  if(process.env.NODE_ENV==="production")throw new Error("Project storage is not configured.");
  try { return JSON.parse(await readFile(file, "utf8")) as Project[]; }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    return seed;
  }
}
export async function saveProjects(projects: Project[]) {
  if (process.env.DATABASE_URL) {
    const client=await db().connect();try{await client.query("BEGIN");const ids=projects.map(p=>p.id);if(ids.length)await client.query("DELETE FROM projects WHERE NOT(id=ANY($1::text[]))",[ids]);else await client.query("DELETE FROM projects");for(const [sort,p]of projects.entries())await client.query(`INSERT INTO projects(id,title,slug,type,location,description,images,sort_order) VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT(id) DO UPDATE SET title=EXCLUDED.title,slug=EXCLUDED.slug,type=EXCLUDED.type,location=EXCLUDED.location,description=EXCLUDED.description,images=EXCLUDED.images,sort_order=EXCLUDED.sort_order,updated_at=NOW()`,[p.id,p.title,p.slug,p.type,p.location,p.description,p.images,sort]);await client.query("COMMIT")}catch(e){await client.query("ROLLBACK");throw e}finally{client.release()}
    return;
  }
  if(process.env.NODE_ENV==="production")throw new Error("Project storage is not configured.");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(projects, null, 2)}\n`, "utf8");
}
