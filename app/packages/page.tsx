import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { claims, faqs, packages, photos } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Three ways to work with GBS Interiors: design only, design plus build, and turnkey interiors. Scope and responsibilities confirmed in writing.",
  alternates: { canonical: "/packages" },
};

const comparison = [
  { label: "Brief, site study and measured drawings", values: [true, true, true] },
  { label: "Space plan and furniture layout", values: [true, true, true] },
  { label: "Material, finish and lighting direction", values: [true, true, true] },
  { label: "Working drawings and joinery details", values: [true, true, true] },
  { label: "Scheduled site visits", values: [true, true, true] },
  { label: "Vendor and contractor coordination", values: [false, true, true] },
  { label: "Procurement and sample approvals", values: [false, true, true] },
  { label: "Stage-wise site supervision", values: [false, true, true] },
  { label: "Joinery, finishes and installation", values: [false, false, true] },
  { label: "Styling, snag list and handover", values: [false, true, true] },
  { label: "Care guide and aftercare", values: [false, false, true] },
];

export default function Packages() {
  const packageFaqs = faqs.filter((item) =>
    [
      "How much does an interior project cost?",
      "How do payments work?",
      "How long does a project take?",
      "Can you work with my contractor?",
    ].includes(item.question)
  );

  return (
    <main>
      <PageHero
        kicker="Ways to work together"
        breadcrumbs={[{ label: "Packages" }]}
        title={
          <>
            The right amount
            <br />
            <em>of help.</em>
          </>
        }
        intro="Some clients need a complete design package. Others want one team from the first drawing to handover. We agree the scope, responsibilities and payment stages in writing before work begins."
        image={photos.studio.src}
        imageAlt={photos.studio.alt}
      />

      <section className="section">
        <div className="container">
          <div className="package-grid">
            {packages.map((pack) => (
              <div
                className={`package-card${pack.slug === "design-build" ? " featured" : ""}`}
                key={pack.slug}
              >
                {pack.slug === "design-build" && (
                  <span className="package-badge">Most common</span>
                )}
                <h3>{pack.name}</h3>
                <p className="package-tagline">{pack.tagline}</p>
                <ul>
                  {pack.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="package-note">{pack.note}</p>
                <Link
                  className={`btn${pack.slug === "design-build" ? " btn-light" : ""}`}
                  href={`/contact?package=${pack.slug}`}
                >
                  Enquire about {pack.name.toLowerCase()}{" "}
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            ))}
          </div>

          <div className="trust-inner" style={{ marginTop: 56 }}>
            {claims.map((claim) => (
              <div className="trust-item" key={claim.label}>
                <strong>{claim.label}</strong>
                <span>{claim.value}</span>
              </div>
            ))}
          </div>
          <p className="form-note" style={{ marginTop: 16 }}>
            Timelines, delivery stages and warranty terms are confirmed in the
            written proposal. Nothing on this page is a fixed quotation.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">Side by side</span>
              <h2>
                What each route
                <br />
                <em>covers.</em>
              </h2>
            </div>
          </div>
          <div className="compare-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th scope="col">Included</th>
                  {packages.map((pack) => (
                    <th scope="col" key={pack.slug}>
                      {pack.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    {row.values.map((value, index) => (
                      <td key={index}>
                        {value ? (
                          <span className="yes" aria-label="Included">
                            ✓
                          </span>
                        ) : (
                          <span className="no" aria-label="Not included">
                            —
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <span className="kicker">How costs work</span>
              <h2>
                No published prices.
                <br />
                <em>No vague numbers.</em>
              </h2>
              <p>
                Two homes of the same size can need very different work. The
                estimate depends on the plan, the condition of the site, the
                finishes you choose and how much execution we coordinate.
              </p>
              <p>
                We give you a written scope and estimate after the brief and
                site visit, so you can compare like for like.
              </p>
              <div className="split-actions">
                <Link className="btn" href="/estimate">
                  Build your brief <span aria-hidden="true">↗</span>
                </Link>
                <Link className="btn btn-ghost" href="/contact">
                  Book a consultation
                </Link>
              </div>
            </div>
            <div className="split-media landscape">
              <Image
                src={photos.detail.src}
                alt={photos.detail.alt}
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">Questions</span>
              <h2>
                Cost, scope and
                <br />
                <em>payments.</em>
              </h2>
            </div>
            <Link className="text-link section-head-link" href="/faq">
              All questions <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <FaqList items={packageFaqs} grouped={false} />
        </div>
      </section>

      <CtaBand
        kicker="Still deciding?"
        title={
          <>
            A short call usually
            <br />
            <em>makes it clear.</em>
          </>
        }
        secondary={{ href: "/process", label: "See the process" }}
      />
    </main>
  );
}
