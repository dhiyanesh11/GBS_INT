import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import { getProjectNotes } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { WorkCard } from "@/components/work-card";
import { CtaBand } from "@/components/cta-band";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getProjects()).find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.images[0] ? [project.images[0]] : undefined,
    },
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const notes = getProjectNotes(project.slug, project.description);
  const others = projects.filter((item) => item.id !== project.id).slice(0, 2);

  return (
    <main>
      <PageHero
        kicker={`${project.type} · ${project.location}`}
        breadcrumbs={[
          { label: "Work", href: "/projects" },
          { label: project.title },
        ]}
        title={project.title}
        intro={project.description}
        image={project.images[0]}
        imageAlt={`${project.title} interior in ${project.location}`}
        actions={
          <Link className="btn btn-light" href="/contact">
            Start a similar project <span aria-hidden="true">↗</span>
          </Link>
        }
      />

      <section className="section">
        <div className="container">
          <dl className="project-facts">
            <div>
              <dt>Scope</dt>
              <dd>{notes.scope}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{project.location}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{project.type}</dd>
            </div>
          </dl>

          <div className="info-grid" style={{ marginTop: 40 }}>
            <div className="info-card">
              <span className="kicker">The brief</span>
              <p style={{ marginTop: 12 }}>{notes.brief}</p>
            </div>
            <div className="info-card">
              <span className="kicker">The approach</span>
              <p style={{ marginTop: 12 }}>{notes.approach}</p>
            </div>
            <div className="info-card" style={{ gridColumn: "1 / -1" }}>
              <span className="kicker">The result</span>
              <p style={{ marginTop: 12, maxWidth: "70ch" }}>{notes.result}</p>
            </div>
          </div>
        </div>
      </section>

      {project.images.length > 1 && (
        <section className="section-tight section-alt">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="kicker">Inside the project</span>
                <h2>
                  Rooms and <em>details.</em>
                </h2>
              </div>
            </div>
            <div className="project-gallery">
              {project.images.slice(1).map((image, index) => (
                <figure key={`${image}-${index}`}>
                  <Image
                    src={image}
                    alt={`${project.title} — interior view ${index + 2}`}
                    fill
                    sizes="(max-width: 860px) 100vw, 50vw"
                  />
                </figure>
              ))}
            </div>
            <p className="form-note" style={{ marginTop: 16 }}>
              Representative imagery. Real project photography will replace
              these images as case studies are published.
            </p>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="kicker">More work</span>
                <h2>
                  Keep <em>looking.</em>
                </h2>
              </div>
              <Link className="text-link section-head-link" href="/projects">
                All work <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="more-work">
              {others.map((item, index) => (
                <WorkCard key={item.id} project={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        kicker="A similar brief?"
        title={
          <>
            Let&apos;s work out
            <br />
            <em>what your space needs.</em>
          </>
        }
        secondary={{ href: "/packages", label: "Compare packages" }}
      />
    </main>
  );
}
