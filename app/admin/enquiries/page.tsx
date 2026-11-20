import type {Metadata} from "next";import {redirect} from "next/navigation";import {isAdmin} from "@/lib/admin-auth";import {AdminEnquiries} from "./table";
export const metadata:Metadata={title:"Enquiries",robots:{index:false,follow:false}};export const dynamic="force-dynamic";
export default async function EnquiriesPage(){if(!await isAdmin())redirect("/admin/login");return <main className="admin-shell admin-shell-wide"><AdminEnquiries/></main>}
