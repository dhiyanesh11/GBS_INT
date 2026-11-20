import Link from "next/link";
import type { Metadata } from "next";
import { faqs, photos } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Answers about working with GBS Interiors: cost, timeline, scope, materials, payments, warranty and changes.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PageHero
        kicker="Questions"
        breadcrumbs={[{ label: "FAQ" }]}
        title={
          <>
            The things people
            <br />
            <em>ask first.</em>
          </>
        }
        intro="Cost, timeline, scope, payments and changes. If your question is not here, ask us directly — we would rather answer it before you commit."
        image={photos.livingLight.src}
        imageAlt={photos.livingLight.alt}
      />

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 900 }}>
            <FaqList items={faqs} />
          </div>
          <div className="note" style={{ marginTop: 40, maxWidth: 900 }}>
            Still unsure?{" "}
            <Link href="/contact" style={{ textDecoration: "underline" }}>
              Send the question
            </Link>{" "}
            or call the studio. We answer enquiries in the order they arrive.
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Ask us anything"
        title={
          <>
            A good question
            <br />
            <em>saves a bad decision.</em>
          </>
        }
        secondary={{ href: "/process", label: "See the process" }}
      />
    </main>
  );
}
