import Link from "next/link";
import type { Metadata } from "next";
import { company, faqs, photos } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { EstimateWizard } from "@/components/estimate-wizard";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Estimate planner",
  description:
    "Build a project brief in four steps. GBS Interiors recommends the right package and explains the next step. Costs are confirmed in a written proposal.",
  alternates: { canonical: "/estimate" },
};

export default function EstimatePage() {
  const estimateFaqs = faqs.filter(
    (item) =>
      item.category === "Cost & timeline" ||
      item.question === "How do I start a project with GBS Interiors?"
  );

  return (
    <main>
      <PageHero
        kicker="Estimate planner"
        breadcrumbs={[{ label: "Estimate" }]}
        title={
          <>
            A brief first.
            <br />
            <em>Numbers after.</em>
          </>
        }
        intro="Four short steps to a clearer scope. We will recommend the right package and tell you what we need to confirm costs. We do not publish fixed prices because the site, the plan and the finishes change the answer."
        image={photos.detail.src}
        imageAlt={photos.detail.alt}
      />

      <section className="section">
        <div className="container">
          <div className="estimate-layout">
            <EstimateWizard />
            <aside className="estimate-aside">
              <div className="aside-card">
                <h3>How this works</h3>
                <ul>
                  <li>No prices are published on this site.</li>
                  <li>
                    The planner suggests a package and the decisions that come
                    next.
                  </li>
                  <li>
                    If you send the brief, we reply with a time for a short call
                    or a site visit.
                  </li>
                </ul>
              </div>
              <div className="aside-card">
                <h3>What changes the cost</h3>
                <ul>
                  <li>The measured area and number of rooms</li>
                  <li>Joinery, storage and false ceiling scope</li>
                  <li>Materials, finishes and hardware</li>
                  <li>Site condition and access</li>
                  <li>How much execution we coordinate</li>
                </ul>
              </div>
              <div className="aside-card">
                <h3>Prefer to talk?</h3>
                <p>
                  Call the studio on {company.phone}, {company.hours}.
                </p>
                <div className="split-actions" style={{ marginTop: 14 }}>
                  <a className="text-link" href={company.phoneHref}>
                    Call now
                  </a>
                  <Link className="text-link" href="/contact">
                    Contact page
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">Cost and timeline</span>
              <h2>
                What we can
                <br />
                <em>commit to.</em>
              </h2>
            </div>
            <Link className="text-link section-head-link" href="/faq">
              All questions <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <FaqList items={estimateFaqs} grouped={false} />
        </div>
      </section>

      <CtaBand
        kicker="Ready for a real conversation?"
        title={
          <>
            Send the brief.
            <br />
            <em>We&apos;ll do the rest.</em>
          </>
        }
        secondary={{ href: "/packages", label: "Compare packages" }}
      />
    </main>
  );
}
