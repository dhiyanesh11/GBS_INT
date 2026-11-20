import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  claims,
  company,
  materialPalette,
  photos,
  stats,
  values,
} from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "GBS Interiors is an interior design studio in Dindigul, Tamil Nadu, working on homes and workplaces across the region.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <main>
      <PageHero
        kicker="The studio"
        breadcrumbs={[{ label: "Studio" }]}
        title={
          <>
            Design with care.
            <br />
            <em>Made to be lived in.</em>
          </>
        }
        intro={`${company.name} is an interior design studio in ${company.city}, working with homeowners and businesses across ${company.region}.`}
        image={photos.studio.src}
        imageAlt={photos.studio.alt}
      />

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <span className="kicker">Our point of view</span>
              <h2>
                Beautiful is good.
                <br />
                <em>Beautiful and useful is better.</em>
              </h2>
              <p>
                The best interiors start with listening. How you move through a
                room. What you want to feel when you come home. How your team
                does its best work.
              </p>
              <p>
                From that understanding we build one clear direction — plan,
                materials, joinery and light — and carry it through the details
                that get used every day.
              </p>
              <div className="split-actions">
                <Link className="text-link" href="/process">
                  How we work <span aria-hidden="true">↗</span>
                </Link>
                <Link className="text-link" href="/projects">
                  See selected work <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
            <div className="split-media">
              <Image
                src={photos.detail.src}
                alt={photos.detail.alt}
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
              />
            </div>
          </div>

          {stats.length > 0 && (
            <div className="stat-row" style={{ marginTop: 64 }}>
              {stats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">What we believe</span>
              <h2>
                Four things
                <br />
                <em>we don&apos;t compromise on.</em>
              </h2>
            </div>
          </div>
          <div className="info-grid">
            {values.map((value) => (
              <div className="info-card" key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">A working palette</span>
              <h2>
                Materials that
                <br />
                <em>age well.</em>
              </h2>
              <p>
                Not a fixed house style. A starting point we return to because
                these materials wear in rather than out.
              </p>
            </div>
          </div>
          <div className="palette-grid">
            {materialPalette.map((material) => (
              <div className="swatch" key={material.name}>
                <div
                  className="swatch-color"
                  style={{ background: material.color }}
                  aria-hidden="true"
                />
                <div className="swatch-meta">
                  <strong>{material.name}</strong>
                  <span>{material.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-concrete">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">How we work</span>
              <h2>
                Straight answers,
                <br />
                <em>in writing.</em>
              </h2>
            </div>
          </div>
          <div className="trust-inner">
            {claims.map((claim) => (
              <div className="trust-item" key={claim.label}>
                <strong>{claim.label}</strong>
                <span>{claim.value}</span>
              </div>
            ))}
          </div>
          <p className="form-note" style={{ marginTop: 16 }}>
            These lines are placeholders until the studio confirms its exact
            commitments. They are managed in the site settings, not invented in
            the code.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split reverse">
            <div className="split-media landscape">
              <Image
                src={photos.livingLight.src}
                alt={photos.livingLight.alt}
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="kicker">Working together</span>
              <h2>
                One studio,
                <br />
                <em>one point of contact.</em>
              </h2>
              <p>
                You deal with the people doing the thinking and the drawing. If
                we coordinate execution, the same team stays through site checks
                and handover.
              </p>
              <p>
                We take on a limited number of projects at a time so that the
                detail does not get diluted.
              </p>
              <div className="split-actions">
                <Link className="btn" href="/contact">
                  Book a consultation <span aria-hidden="true">↗</span>
                </Link>
                <Link className="btn btn-ghost" href="/packages">
                  Compare packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Say hello"
        title={
          <>
            Tell us what
            <br />
            <em>you&apos;re planning.</em>
          </>
        }
        secondary={{ href: "/locations", label: "Find the studio" }}
      />
    </main>
  );
}
