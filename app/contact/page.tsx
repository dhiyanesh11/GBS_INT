import type { Metadata } from "next";
import { company } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { EnquiryForm } from "./enquiry-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send an enquiry to GBS Interiors in Dindigul, Tamil Nadu about a home or workplace project.",
  alternates: { canonical: "/contact" },
};

const packageServices: Record<string, string> = {
  "design-only": "Design only",
  "design-build": "Design + build",
  turnkey: "Turnkey interiors",
};

export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const { package: pack } = await searchParams;
  const defaultService = pack ? packageServices[pack] || "" : "";

  return (
    <main>
      <PageHero
        kicker="Contact"
        breadcrumbs={[{ label: "Contact" }]}
        title={
          <>
            Good things begin
            <br />
            <em>with a conversation.</em>
          </>
        }
        intro="Tell us about the space, the city and the decision you are trying to make. We will reply with a sensible next step."
      />

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            <EnquiryForm
              source="contact"
              defaultService={defaultService}
              heading="Send an enquiry"
              intro="Fields marked required are enough to start. Share as much or as little as you like."
            />

            <aside className="contact-aside">
              <div className="contact-card">
                <span className="kicker">Direct</span>
                <h2 style={{ marginTop: 12 }}>Write to the studio</h2>
                <a href={`mailto:${company.email}`}>{company.email}</a>
                <span className="contact-small">{company.hours}</span>
                <span className="contact-small">{company.responseTime}</span>
              </div>

              <div className="contact-card">
                <span className="kicker">Visit</span>
                <h2 style={{ marginTop: 12 }}>{company.name}</h2>
                <p>{company.address}</p>
                <p className="contact-small">
                  Studio visits by appointment so we can set aside time.
                </p>
                <a
                  href={company.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginTop: 12 }}
                >
                  Open in Google Maps ↗
                </a>
              </div>

              <div className="contact-card" style={{ background: "var(--graphite)", color: "var(--limewash)" }}>
                <span className="kicker" style={{ color: "rgba(247,246,242,.6)" }}>
                  What happens next
                </span>
                <ol style={{ marginTop: 14, paddingLeft: 18, display: "grid", gap: 8, fontSize: 15 }}>
                  <li>We read the enquiry and check the fit.</li>
                  <li>We reply by email to discuss next steps or arrange a site visit.</li>
                  <li>If it feels right, we scope the work in writing.</li>
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
