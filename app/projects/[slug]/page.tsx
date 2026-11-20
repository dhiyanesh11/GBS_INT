import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects } from "@/lib/projects";
export const dynamic = "force-dynamic";
export default async function ProjectDetail({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=(await getProjects()).find(p=>p.slug===slug);if(!project)notFound();return <main className="inner-page"><div className="detail-hero" style={{backgroundImage:`url(${project.images[0]})`}}/><div className="detail-heading"><div><div className="section-kicker">{project.type.toUpperCase()} · {project.location.toUpperCase()}</div><h1>{project.title}</h1></div><p>{project.description}</p></div>{project.images.slice(1).map((image,i)=><div className="detail-extra" key={`${image}-${i}`} style={{backgroundImage:`url(${image})`}}/>)}<div className="detail-note">LAST UPDATED {new Date(project.updatedAt).toLocaleDateString("en-IN")}</div><Link className="text-link" href="/projects">← Back to projects</Link></main>}
