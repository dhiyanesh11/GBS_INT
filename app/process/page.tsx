import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { faqs, photos, processSteps } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How a GBS Interiors project runs: brief, concept, detail, estimate, execution and handover, with deliverables and client decisions at each step.",
  alternates: { canonical: "/process" },
};

const clientDecisions = [
  {
    step: "Brief",
    decision: "The rooms in scope, the budget direction and the non-negotiables.",
  },
  {
    step: "Concept",
    decision: "The layout direction and the material palette.",
  },
  {
    step: "Detail",
    decision: "Joinery, storage, lighting and finishes, item by item.",
  },
  {
    step: "Estimate",
    decision: "The scope and payment stages, in writing.",
  },
  {
    step: "Execution",
    decision: "Approvals, changes and the sequence of site work.",
  },
  {
    step: "Handover",
    decision: "The snag list, styling and care instructions.",
  },
];

export default function Process() {
  const processFaqs = faqs.filter((item) =>
    [
      "How do I start a project with GBS Interiors?",
      "How long does a project take?",
      "What is included in the first consultation?",
      "Do you provide 3D visuals?",
    ].includes(item.question)
  );

  return (
    <main>
      <PageHero
        kicker="The process"
        breadcrumbs={[{ label: "Process" }]}
        title={
          <>
            Clear steps,
            <br />
            <em>fewer surprises.</em>
          </>
        }
        intro="A project moves through six stages. Each one has a defined output, so you know what you are approving and what happens next."
        image={photos.detail.src}
        imageAlt={photos.detail.alt}
      />

      <section className="section">
        <div className="container">
          <div className="process-list">
            {processSteps.map((step) => (
              <div className="process-step" key={step.number}>
                <span className="step-number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.summary}</p>
                </div>
                <div className="process-deliverables">
                  {step.deliverables.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="form-note" style={{ marginTop: 20 }}>
            Durations are confirmed in the written schedule after the brief and
            scope are agreed. Site conditions and material lead times can change
            the sequence.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">Your side of the table</span>
              <h2>
                What we need
                <br />
                <em>from you.</em>
              </h2>
            </div>
          </div>
          <div className="info-grid">
            {clientDecisions.map((item) => (
              <div className="info-card" key={item.step}>
                <h3>{item.step}</h3>
                <p>{item.decision}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <span className="kicker">Working together</span>
              <h2>
                Design is a
                <br />
                <em>two-way brief.</em>
              </h2>
              <p>
                The best outcomes come from clients who can tell us how they
                actually use a room, not only how they want it to look. We will
                ask about storage, morning routines, guests, work, cooking and
                the things you already own.
              </p>
              <p>
                Bring photographs, measurements, a rough budget and a list of
                what is not working. That is enough to start.
              </p>
              <div className="split-actions">
                <Link className="btn" href="/contact">
                  Book a consultation <span aria-hidden="true">↗</span>
                </Link>
                <Link className="btn btn-ghost" href="/estimate">
                  Build your brief
                </Link>
              </div>
            </div>
            <div className="split-media">
              <Image
                src={photos.studio.src}
                alt={photos.studio.alt}
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
                Before the
                <br />
                <em>first meeting.</em>
              </h2>
            </div>
            <Link className="text-link section-head-link" href="/faq">
              All questions <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <FaqList items={processFaqs} grouped={false} />
        </div>
      </section>

      <CtaBand
        kicker="Ready when you are"
        title={
          <>
            Start with a
            <br />
            <em>30-minute call.</em>
          </>
        }
        secondary={{ href: "/packages", label: "Compare packages" }}
      />
    </main>
  );
}
