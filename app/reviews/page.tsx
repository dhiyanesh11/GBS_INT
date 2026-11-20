import Link from "next/link";
import type { Metadata } from "next";
import { clientStories, company, photos, testimonial } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Client stories",
  description:
    "Reviews and client stories from GBS Interiors. Published only with client approval.",
  alternates: { canonical: "/reviews" },
};

export default function Reviews() {
  const hasStories = clientStories.length > 0;

  return (
    <main>
      <PageHero
        kicker="Client stories"
        breadcrumbs={[{ label: "Client stories" }]}
        title={
          <>
            In their
            <br />
            <em>own words.</em>
          </>
        }
        intro="We publish a story only when the client has approved it. Until then, this page holds the standard we design to rather than invented praise."
        image={photos.bedroom.src}
        imageAlt={photos.bedroom.alt}
      />

      <section className="section">
        <div className="container">
          <div className="rating-summary">
            <div>
              <div className="rating-score">
                {company.googleRating || "—"}
                <span style={{ fontSize: 18, color: "var(--granite)" }}>/5</span>
              </div>
              <div className="rating-stars" aria-hidden="true">
                ★★★★★
              </div>
            </div>
            <div>
              <p>
                {company.googleRating
                  ? "Average rating from published Google reviews."
                  : "No rating is displayed until verified reviews are linked."}
              </p>
              {company.googleReviewsUrl ? (
                <a
                  className="text-link"
                  href={company.googleReviewsUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginTop: 10 }}
                >
                  Read Google reviews <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <p className="form-note" style={{ marginTop: 8 }}>
                  Add your Google Business profile link in the site settings to
                  show verified reviews here.
                </p>
              )}
            </div>
          </div>

          {hasStories ? (
            <div className="review-grid" style={{ marginTop: 32 }}>
              {clientStories.map((story, index) => (
                <article className="review-card" key={index}>
                  <div className="rating-stars" aria-hidden="true">
                    ★★★★★
                  </div>
                  <blockquote>{story.quote}</blockquote>
                  <footer>
                    {story.name}
                    <span>{story.project}</span>
                  </footer>
                </article>
              ))}
            </div>
          ) : (
            <div className="info-grid" style={{ marginTop: 32 }}>
              <div className="info-card">
                <h3>Why this page is quiet</h3>
                <p>
                  Invented testimonials are easy to spot and impossible to
                  defend. When clients approve a story, it will appear here with
                  the project and the scope.
                </p>
              </div>
              <div className="info-card">
                <h3>What we ask clients</h3>
                <p>
                  Whether the brief was understood, how the site was handled,
                  and what they would tell someone starting the same project.
                </p>
              </div>
            </div>
          )}

          <div className="quote-block" style={{ marginTop: 64 }}>
            <div>
              <span className="kicker">The studio principle</span>
            </div>
            <div>
              <blockquote>{testimonial.quote}</blockquote>
              <p className="quote-attribution">
                {testimonial.name}
                <span>{testimonial.project}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">See the work</span>
              <h2>
                Judgement is easier
                <br />
                <em>with evidence.</em>
              </h2>
              <p>
                Look at the drawings, the material choices and the finished
                rooms. Ask us the same questions you would ask a past client.
              </p>
            </div>
            <Link className="text-link section-head-link" href="/projects">
              View selected work <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="split-actions">
            <Link className="btn" href="/contact">
              Book a consultation <span aria-hidden="true">↗</span>
            </Link>
            <Link className="btn btn-ghost" href="/process">
              See the process
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Worked with us?"
        title={
          <>
            If we built your space,
            <br />
            <em>we&apos;d love your words.</em>
          </>
        }
        intro="Tell us what was useful and what could have been better. Approved stories help the next client decide."
        primary={{ href: "/contact", label: "Share your experience" }}
        secondary={null}
      />
    </main>
  );
}
