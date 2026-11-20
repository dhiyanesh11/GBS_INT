import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function WorkCard({
  project,
  priority = false,
  index,
}: {
  project: Project;
  priority?: boolean;
  index?: number;
}) {
  return (
    <Link className="work-card" href={`/projects/${project.slug}`}>
      <div className="work-media">
        <Image
          src={project.images[0]}
          alt={`${project.title} — ${project.type.toLowerCase()} interior in ${project.location}`}
          fill
          priority={priority}
          sizes="(max-width: 860px) 100vw, 50vw"
        />
        <span className="work-tag">{project.type}</span>
      </div>
      <div className="work-info">
        <div>
          <h3>{project.title}</h3>
          <p>
            {project.location} · {project.type}
            {typeof index === "number" ? ` · 0${index + 1}` : ""}
          </p>
        </div>
        <span className="work-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
    </Link>
  );
}
