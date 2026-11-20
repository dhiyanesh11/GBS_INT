import type {MetadataRoute} from "next";
import {getProjects} from "@/lib/projects";
export const dynamic="force-dynamic";
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const base=(process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000").replace(/\/$/,"");const fixed=["","/services","/projects","/about","/blog","/contact","/privacy"].map(path=>({url:`${base}${path}`,lastModified:new Date()}));const projects=(await getProjects()).map(p=>({url:`${base}/projects/${p.slug}`,lastModified:new Date(p.updatedAt)}));return [...fixed,...projects]}
