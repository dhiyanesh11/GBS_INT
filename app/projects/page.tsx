import Link from "next/link";
import type {Metadata} from "next";
import {getProjects} from "@/lib/projects";

export const metadata:Metadata={title:"Projects"};
export const dynamic="force-dynamic";

export default async function Projects(){
  const work=await getProjects();
  return <main className="inner-page">
    <div className="inner-hero"><div className="section-kicker">A FEW FAVOURITES</div><h1>Spaces made for<br/><em>real life.</em></h1><p>A collection of homes and workspaces, each shaped around the people who use them.</p></div>
    <div className="gallery-grid">{work.map(project=><Link className="gallery-card" href={`/projects/${project.slug}`} key={project.id}>
      <div className="gallery-photo" role="img" aria-label={`${project.title} interior in ${project.location}`} style={{backgroundImage:`url(${project.images[0]})`}}/>
      <span className="section-kicker">{project.location.toUpperCase()} · {project.type.toUpperCase()}</span>
      <h2>{project.title}<i aria-hidden="true">↗</i></h2>
      <p className="gallery-description">{project.description}</p>
    </Link>)}</div>
  </main>;
}
