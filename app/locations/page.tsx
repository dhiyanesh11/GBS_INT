import Link from "next/link";
import type { Metadata } from "next";
import { cities, company, faqs, photos } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "GBS Interiors works across Tamil Nadu from its studio in Dindigul, including Madurai, Coimbatore and Theni.",
  alternates: { canonical: "/locations" },
};

export default function Locations() {
  const locationFaqs = faqs.filter((item) =>
    ["Do you work outside Dindigul?", "Do you take on a single room?", "How do I start a project with GBS Interiors?"].includes(item.question)
  );

  return (
    <main>
      <PageHero
        kicker="Locations"
        breadcrumbs={[{ label: "Locations" }]}
        title={
          <>
            Based in Dindigul.
            <br />
            <em>Working across Tamil Nadu.</em>
          </>
        }
        intro="Site visits are by appointment. If your project is outside the cities listed here, tell us where it is — we will say honestly whether we can service it well."
        image={photos.exterior.src}
        imageAlt={photos.exterior.alt}
      />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">The studio</span>
              <h2>
                Come and see
                <br />
                <em>the materials.</em>
              </h2>
              <p>
                Samples, drawings and finish options are easier to judge in
                person. Email ahead so we can set aside time.
              </p>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <h3>Studio address</h3>
              <p>{company.address}</p>
              <a
                className="text-link"
                href={company.mapsUrl}
                target="_blank"
                rel="noreferrer"
                style={{ marginTop: 16 }}
              >
                Open in Maps <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="info-card">
              <h3>Hours and contact</h3>
              <p>{company.hours}</p>
              <p style={{ marginTop: 10 }}>
                <br />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">Service areas</span>
              <h2>
                Where we
                <br />
                <em>work.</em>
              </h2>
            </div>
          </div>
          <div className="info-grid">
            {cities.map((city) => (
              <div className="info-card" key={city}>
                <h3>{city}</h3>
                <p>
                  Residential and commercial interiors, with site visits by
                  appointment. Travel and site supervision are agreed as part of
                  the scope.
                </p>
              </div>
            ))}
            <div className="info-card" style={{ background: "var(--concrete)" }}>
              <h3>Elsewhere in Tamil Nadu?</h3>
              <p>
                Remote design is possible with local site coordination. Send the
                location and scope and we will tell you what we can realistically
                oversee.
              </p>
              <Link className="text-link" href="/contact" style={{ marginTop: 16 }}>
                Ask about your city <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">Questions</span>
              <h2>
                Working
                <br />
                <em>locally.</em>
              </h2>
            </div>
            <Link className="text-link section-head-link" href="/faq">
              All questions <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <FaqList items={locationFaqs} grouped={false} />
        </div>
      </section>

      <CtaBand
        kicker="Plan a visit"
        title={
          <>
            See the samples.
            <br />
            <em>Bring your plans.</em>
          </>
        }
        primary={{ href: "/contact", label: "Book a studio visit" }}
        secondary={{ href: "/estimate", label: "Plan your scope" }}
      />
    </main>
  );
}
