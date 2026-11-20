import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { faqs, photos, processSteps, services } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential and commercial interior design, modular kitchens, wardrobes, turnkey interiors and design consultations in Tamil Nadu.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  const faqTeaser = faqs.filter((item) =>
    ["Do you take on a single room?", "Can you work with my contractor?", "What is included in the first consultation?"].includes(item.question)
  );

  return (
    <main>
      <PageHero
        kicker="What we do"
        breadcrumbs={[{ label: "Services" }]}
        title={
          <>
            One studio,
            <br />
            <em>several ways in.</em>
          </>
        }
        intro="Whether you need a full home, a single kitchen, or a second opinion before you build, the work starts in the same place: understanding how the space needs to function."
        image={photos.kitchen.src}
        imageAlt={photos.kitchen.alt}
      />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">Services</span>
              <h2>
                Choose the scope
                <br />
                <em>that fits.</em>
              </h2>
              <p>
                Each service can stand alone or combine into a complete design
                and build package.
              </p>
            </div>
          </div>

          <div className="service-tiles">
            {services.map((service) => (
              <article className="service-tile" key={service.slug}>
                <Link
                  className="service-tile-media"
                  href={`/services/${service.slug}`}
                  aria-label={service.title}
                >
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 860px) 100vw, 33vw"
                  />
                </Link>
                <h3>
                  <Link href={`/services/${service.slug}`}>{service.title}</Link>
                </h3>
                <p>{service.short}</p>
                <Link
                  className="text-link"
                  href={`/services/${service.slug}`}
                >
                  Explore service <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">How it works</span>
              <h2>
                A clear sequence,
                <br />
                <em>start to finish.</em>
              </h2>
            </div>
            <Link className="text-link section-head-link" href="/process">
              Full process <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="process-list">
            {processSteps.slice(0, 4).map((step) => (
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
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">Common questions</span>
              <h2>
                Before you
                <br />
                <em>commit.</em>
              </h2>
            </div>
            <Link className="text-link section-head-link" href="/faq">
              All questions <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <FaqList items={faqTeaser} grouped={false} />
        </div>
      </section>

      <CtaBand
        kicker="Not sure which service?"
        title={
          <>
            Tell us the space.
            <br />
            <em>We&apos;ll suggest the scope.</em>
          </>
        }
        secondary={{ href: "/estimate", label: "Plan your scope" }}
      />
    </main>
  );
}
