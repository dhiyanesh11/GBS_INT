import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { getBlogPosts } from "@/lib/blog";
import { services } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  const fixed = [
    "",
    "/projects",
    "/services",
    "/packages",
    "/estimate",
    "/gallery",
    "/process",
    "/about",
    "/reviews",
    "/faq",
    "/locations",
    "/blog",
    "/contact",
    "/credits",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    priority: path === "" ? 1 : 0.7,
  }));

  const servicePages = services.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const projects = (await getProjects()).map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    priority: 0.6,
  }));

  const posts = (await getBlogPosts()).map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.5,
  }));

  return [...fixed, ...servicePages, ...projects, ...posts];
}
