import type { Metadata } from "next";
import { company } from "@/lib/site";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How GBS Interiors collects, uses and stores information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <main>
      <PageHero
        kicker="Privacy"
        breadcrumbs={[{ label: "Privacy" }]}
        title={
          <>
            Your
            <br />
            <em>information.</em>
          </>
        }
        intro="This draft explains how we handle information shared through this website. It should be reviewed by the business before publication."
      />

      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>What we collect</h2>
            <p>
              When you submit an enquiry or use the estimate planner, we collect
              your name, phone number, optional email, city or project location,
              property type, requested service, optional budget, the details you
              choose to share, and your consent to be contacted.
            </p>
            <p>
              The site also processes basic technical information needed to
              protect forms from abuse, such as a rate-limit key derived from
              your connection. If anti-bot verification is enabled, a token is
              processed by Cloudflare Turnstile.
            </p>

            <h2>How we use it</h2>
            <p>
              We use enquiry details to respond, understand your requirements and
              follow up about the requested services. We do not sell enquiry
              data.
            </p>

            <h2>Where it is stored</h2>
            <p>
              Enquiries are stored in the studio&apos;s private database or, in
              local development, a private file on the server. Access is limited
              to the people who need it to respond.
            </p>

            <h2>How long we keep it</h2>
            <p>
              We keep enquiry records for as long as needed to respond and
              maintain a record of the project discussion, unless a longer period
              is required by law or agreed with you.
            </p>

            <h2>Your choices</h2>
            <p>
              You can ask us to correct or delete your enquiry details, or to stop
              contacting you, by emailing{" "}
              <a href={`mailto:${company.email}`}>{company.email}</a>.
            </p>

            <h2>Cookies</h2>
            <p>
              This site does not set advertising cookies. Third-party services
              such as Turnstile or an embedded scheduling link may set their own
              cookies when you choose to use them.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
