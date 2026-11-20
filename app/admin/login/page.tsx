import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { AdminLoginForm } from "./login-form";
export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export default async function AdminLogin(){if(await isAdmin())redirect("/admin/projects");return <main className="admin-shell"><div className="admin-card"><div className="section-kicker">GBS INTERIORS · ADMIN</div><h1>Welcome <em>back.</em></h1><p>Enter the admin password to manage showcase projects.</p><AdminLoginForm /></div></main>}
