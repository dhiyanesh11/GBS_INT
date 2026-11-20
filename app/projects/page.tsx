import Link from "next/link";
import type { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import { photos } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { WorkCard } from "@/components/work-card";
import { CtaBand } from "@/components/cta-band";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected residential and commercial interiors by GBS Interiors across Tamil Nadu. Representative imagery until real project photography is published.",
  alternates: { canonical: "/projects" },
};

const filters = [
  { label: "All work", value: "" },
  { label: "Residential", value: "Residential" },
  { label: "Commercial", value: "Commercial" },
];

export default async function Projects({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const all = await getProjects();
  const active = filters.some((filter) => filter.value === type)
    ? type || ""
    : "";
  const work = active ? all.filter((project) => project.type === active) : all;

  return (
    <main>
      <PageHero
        kicker="Selected work"
        breadcrumbs={[{ label: "Work" }]}
        title={
          <>
            Spaces made for
            <br />
            <em>real life.</em>
          </>
        }
        intro="A collection of homes and workspaces, each shaped around the people who use them, the light the room gets, and the way a day actually moves."
        image={photos.livingLight.src}
        imageAlt={photos.livingLight.alt}
      />

      <section className="section">
        <div className="container">
          <div className="filter-bar">
            <span className="filter-label">Filter</span>
            {filters.map((filter) => (
              <Link
                key={filter.label}
                className={`chip${active === filter.value ? " is-active" : ""}`}
                href={filter.value ? `/projects?type=${filter.value}` : "/projects"}
              >
                {filter.label}
              </Link>
            ))}
          </div>

          <p className="form-note" style={{ marginBottom: 28 }}>
            Project names and imagery are representative until real case studies
            and photography are published.
          </p>

          {work.length === 0 ? (
            <p className="gallery-empty">
              No {active.toLowerCase()} projects are published yet.{" "}
              <Link className="text-link" href="/projects">
                See all work
              </Link>
            </p>
          ) : (
            <div className="work-grid">
              {work.map((project, index) => (
                <WorkCard
                  key={project.id}
                  project={project}
                  index={index}
                  priority={index === 0}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand
        kicker="Your project"
        title={
          <>
            Have a space that needs
            <br />
            <em>a clear plan?</em>
          </>
        }
        intro="Send the rooms involved, the city and your timeline. We will tell you what the first step looks like."
        secondary={{ href: "/gallery", label: "Browse the gallery" }}
      />
    </main>
  );
}
