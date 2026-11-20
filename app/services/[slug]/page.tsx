import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { faqs, gallery, packages, processSteps, services } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";
import { EnquiryForm } from "@/app/contact/enquiry-form";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.title,
      description: service.description,
      images: [service.image],
    },
  };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const relatedGallery = gallery.slice(0, 3);
  const serviceFaqs = faqs.slice(0, 4);
  const relatedPackage = packages.find((pack) =>
    service.slug === "turnkey-interiors"
      ? pack.slug === "turnkey"
      : service.slug === "design-consultation"
        ? pack.slug === "design-only"
        : pack.slug === "design-build"
  );

  return (
    <main>
      <PageHero
        kicker="Service"
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        title={service.title}
        intro={service.description}
        image={service.image}
        imageAlt={service.imageAlt}
        actions={
          <>
            <Link className="btn btn-light" href="/contact">
              Book a consultation <span aria-hidden="true">↗</span>
            </Link>
            <Link className="btn btn-ghost" href="/estimate">
              Plan your scope
            </Link>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <span className="kicker">What&apos;s included</span>
              <h2>
                The work behind
                <br />
                <em>the finished room.</em>
              </h2>
              <p>{service.bestFor}.</p>
              <div className="info-card" style={{ marginTop: 24, padding: 0 }}>
                <ul style={{ margin: 0 }}>
                  {service.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="split-media">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="info-grid" style={{ marginTop: 56 }}>
            <div className="info-card">
              <h3>What you receive</h3>
              <ul>
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="info-card">
              <h3>How the work runs</h3>
              <ul>
                {processSteps.slice(0, 4).map((step) => (
                  <li key={step.number}>
                    {step.number} — {step.title}: {step.summary}
                  </li>
                ))}
              </ul>
            </div>
            {relatedPackage && (
              <div
                className="info-card"
                style={{ gridColumn: "1 / -1", background: "var(--concrete)" }}
              >
                <h3>Usually paired with {relatedPackage.name}</h3>
                <p>{relatedPackage.tagline}</p>
                <Link className="text-link" href="/packages" style={{ marginTop: 16 }}>
                  Compare packages <span aria-hidden="true">↗</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-tight section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">Reference imagery</span>
              <h2>
                A sense of
                <br />
                <em>the direction.</em>
              </h2>
            </div>
            <Link className="text-link section-head-link" href="/gallery">
              Open the gallery <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="gallery-strip">
            {relatedGallery.map((item, index) => (
              <Link
                className="gallery-tile"
                href="/gallery"
                key={`${item.src}-${index}`}
                aria-label={`${item.room}, ${item.style}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 860px) 50vw, 25vw"
                />
              </Link>
            ))}
          </div>
          <p className="form-note" style={{ marginTop: 20 }}>
            Representative imagery, not completed client projects.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">Questions</span>
              <h2>
                Worth asking
                <br />
                <em>before you start.</em>
              </h2>
            </div>
            <Link className="text-link section-head-link" href="/faq">
              All questions <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <FaqList items={serviceFaqs} grouped={false} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="contact-layout">
            <EnquiryForm
              source={`service:${service.slug}`}
              defaultService={service.title}
              heading={`Enquire about ${service.title.toLowerCase()}`}
              intro="Share the rooms involved, the city and your timeline. We will reply with a sensible next step."
            />
            <aside className="contact-aside">
              <div className="contact-card">
                <span className="kicker">Studio</span>
                <h2 style={{ marginTop: 12 }}>GBS Interiors</h2>
                <p>
                  {service.bestFor}. We work across Tamil Nadu and take on a
                  limited number of projects at a time.
                </p>
                <Link className="text-link" href="/about" style={{ marginTop: 16 }}>
                  About the studio <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Next step"
        title={
          <>
            Prefer to talk it
            <br />
            <em>through first?</em>
          </>
        }
        secondary={{ href: "/packages", label: "Compare packages" }}
      />
    </main>
  );
}
