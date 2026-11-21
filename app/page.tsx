import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";
import { getProjects } from "@/lib/projects";
import {
  claims,
  company,
  faqs,
  gallery,
  packages,
  photos,
  processSteps,
  services,
  stats,
  testimonial,
} from "@/lib/site";
import { WorkCard } from "@/components/work-card";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, posts] = await Promise.all([
    getProjects(),
    getBlogPosts(),
  ]);
  const selected = projects.slice(0, 3);
  const faqTeaser = faqs.filter((item) =>
    ["How much does an interior project cost?", "How long does a project take?", "Do you take on a single room?", "Can you work with my contractor?"].includes(item.question)
  );
  const galleryTeaser = [gallery[0], gallery[11], gallery[8], gallery[15]];

  return (
    <main>
      <section className="hero">
        <div className="hero-media">
          <Image
            src={photos.hero.src}
            alt={photos.hero.alt}
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">
              Interior design studio · {company.region}
            </span>
            <h1>
              Spaces that feel
              <br />
              <em>like you.</em>
            </h1>
            <p className="hero-intro">
              Considered residential and commercial interiors, designed around
              the way you actually live and work — from the first drawing to the
              final detail.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-light" href="/contact">
                Book a consultation <span aria-hidden="true">↗</span>
              </Link>
              <Link className="btn btn-ghost" href="/projects">
                See selected work
              </Link>
            </div>
          </div>
          <div className="hero-foot">
            <span>
              <strong>{company.city}</strong> · {company.region} · Residential
              &amp; commercial
            </span>
            <span>{company.availability}</span>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="At a glance">
        <div className="container">
          <div className="trust-inner">
            <div className="trust-item">
              <strong>Design and execution</strong>
              <span>One team, or design only</span>
            </div>
            <div className="trust-item">
              <strong>Homes and workplaces</strong>
              <span>Full homes, kitchens, offices</span>
            </div>
            <div className="trust-item">
              <strong>Across Tamil Nadu</strong>
              <span>Dindigul, Madurai, Coimbatore, Theni</span>
            </div>
            <div className="trust-item">
              <strong>First step</strong>
              <span>{claims[0].value}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div className="split-media landscape">
              <Image
                src={photos.studio.src}
                alt={photos.studio.alt}
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="kicker">The studio</span>
              <h2>
                A drawing is only
                <br />
                <em>the beginning.</em>
              </h2>
              <p>
                We design the plan, the materials, the joinery and the light as
                one idea — then stay close enough to site that the finished room
                still feels like the drawing you approved.
              </p>
              <p>
                That means fewer surprises, better storage, and spaces that get
                easier to live in over time rather than more precious.
              </p>
              <div className="split-actions">
                <Link className="text-link" href="/about">
                  About the studio <span aria-hidden="true">↗</span>
                </Link>
                <Link className="text-link" href="/process">
                  How we work <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>

          {stats.length > 0 && (
            <div className="stat-row" style={{ marginTop: 64 }}>
              {stats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">Selected work</span>
              <h2>
                Made for <em>living.</em>
              </h2>
              <p>
                Homes and workplaces shaped around the people who use them.
                Imagery is representative until real project photography is
                published.
              </p>
            </div>
            <Link className="text-link section-head-link" href="/projects">
              View all work <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="work-grid">
            {selected.map((project, index) => (
              <WorkCard
                key={project.id}
                project={project}
                index={index}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">What we do</span>
              <h2>
                One studio,
                <br />
                <em>several ways in.</em>
              </h2>
            </div>
            <Link className="text-link section-head-link" href="/services">
              All services <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <Link
                className="service-card"
                href={`/services/${service.slug}`}
                key={service.slug}
              >
                <span className="service-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{service.title}</h3>
                <p>{service.short}</p>
                <span className="service-link">
                  Explore service <span aria-hidden="true">↗</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-concrete">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">Ways to work together</span>
              <h2>
                The right amount
                <br />
                <em>of help.</em>
              </h2>
              <p>
                Some clients need a complete design package. Others want one
                team from drawing to handover. We scope it in writing before
                anything begins.
              </p>
            </div>
            <Link className="text-link section-head-link" href="/packages">
              Compare packages <span aria-hidden="true">↗</span>
            </Link>
          </div>
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
                  {pack.includes.slice(0, 4).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="package-note">{pack.bestFor}</p>
                <Link
                  className={`btn${pack.slug === "design-build" ? " btn-light" : ""}`}
                  href="/contact"
                >
                  Start a conversation <span aria-hidden="true">↗</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="estimate-layout">
            <div>
              <span className="kicker">Not sure where to start?</span>
              <h2
                style={{
                  fontSize: "clamp(34px, 4.6vw, 58px)",
                  margin: "18px 0 20px",
                }}
              >
                Build a brief in
                <br />
                <em>four short steps.</em>
              </h2>
              <p style={{ color: "var(--granite)", maxWidth: "50ch" }}>
                Answer a few questions about the space, the scope and the level
                of finish. We will suggest the right package and tell you what
                happens next. No prices are published — costs are confirmed in
                writing.
              </p>
              <div className="split-actions" style={{ marginTop: 26 }}>
                <Link className="btn" href="/estimate">
                  Plan your project <span aria-hidden="true">↗</span>
                </Link>
                <Link className="btn btn-ghost" href="/packages">
                  See packages
                </Link>
              </div>
            </div>
            <div className="estimate-aside">
              <div className="aside-card">
                <h3>What you get</h3>
                <ul>
                  <li>A recommended package for your scope</li>
                  <li>A clear list of the next decisions</li>
                  <li>A chance to share more details by email</li>
                </ul>
              </div>
              <div className="aside-card" style={{ background: "var(--graphite)", color: "var(--limewash)" }}>
                <h3 style={{ color: "var(--limewash)" }}>Have a question?</h3>
                <p style={{ color: "rgba(247,246,242,.72)" }}>
                  Email the studio and we will get back to you.
                </p>
                <a
                  className="text-link"
                  href={`mailto:${company.email}`}
                  style={{ marginTop: 14, borderColor: "rgba(247,246,242,.4)" }}
                >
                  Email us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">The process</span>
              <h2>
                Clear steps,
                <br />
                <em>fewer surprises.</em>
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
              <span className="kicker">A look around</span>
              <h2>
                Rooms and
                <br />
                <em>details.</em>
              </h2>
            </div>
            <Link className="text-link section-head-link" href="/gallery">
              Open the gallery <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="gallery-strip">
            {galleryTeaser.map((item, index) => (
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
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="quote-block">
            <div>
              <span className="kicker">A principle, not a slogan</span>
              <p style={{ marginTop: 18, color: "rgba(247,246,242,.6)", fontSize: 15 }}>
                We publish client stories only when the client has approved
                them. Until then, this is the standard we design to.
              </p>
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

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">The journal</span>
              <h2>
                Notes on making
                <br />
                <em>a home.</em>
              </h2>
            </div>
            <Link className="text-link section-head-link" href="/blog">
              Read the journal <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="journal-grid">
            {posts.slice(0, 3).map((post) => (
              <article className="journal-card" key={post.slug}>
                <Link
                  className="journal-image"
                  href={`/blog/${post.slug}`}
                  aria-label={post.title}
                >
                  <Image
                    src={post.cover}
                    alt={post.coverAlt || post.title}
                    fill
                    sizes="(max-width: 860px) 100vw, 33vw"
                  />
                </Link>
                <span className="kicker" style={{ marginTop: 14 }}>
                  {post.readingTime} min read
                </span>
                <h3>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.description}</p>
                <Link className="text-link" href={`/blog/${post.slug}`}>
                  Read story <span aria-hidden="true">↗</span>
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
              <span className="kicker">Common questions</span>
              <h2>
                The things people
                <br />
                <em>ask first.</em>
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
        intro="Tell us the rooms involved, the city and the decision you are trying to make. We will reply with a sensible next step."
        secondary={{ href: "/estimate", label: "Plan your scope" }}
      />
    </main>
  );
}
