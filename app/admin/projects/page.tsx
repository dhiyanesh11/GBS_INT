import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { AdminProjects } from "./projects-editor";
export const metadata: Metadata = { title: "Manage projects", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export default async function AdminProjectsPage(){if(!await isAdmin())redirect("/admin/login");return <main className="admin-shell admin-shell-wide"><AdminProjects /></main>}
