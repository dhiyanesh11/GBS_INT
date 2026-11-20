import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/blog";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes on materials, space planning and making a home that works, from the GBS Interiors studio.",
  alternates: { canonical: "/blog" },
};

export const revalidate = 600;

export default async function Blog() {
  const posts = await getBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <main>
      <PageHero
        kicker="The journal"
        breadcrumbs={[{ label: "Journal" }]}
        title={
          <>
            Ideas for more
            <br />
            <em>thoughtful spaces.</em>
          </>
        }
        intro="Notes on materials, the details that matter, and making a home your own — written from the studio, not a content farm."
        image={featured?.cover}
        imageAlt={featured?.coverAlt}
      />

      <section className="section">
        <div className="container">
          {featured && (
            <article className="journal-feature">
              <Link
                className="journal-feature-media"
                href={`/blog/${featured.slug}`}
                aria-label={featured.title}
              >
                <Image
                  src={featured.cover}
                  alt={featured.coverAlt || featured.title}
                  fill
                  priority
                  sizes="(max-width: 860px) 100vw, 55vw"
                />
              </Link>
              <div>
                <span className="kicker">
                  Featured · {featured.readingTime} min read
                </span>
                <h2>
                  <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p>{featured.description}</p>
                <Link className="text-link" href={`/blog/${featured.slug}`}>
                  Read story <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          )}

          {rest.length > 0 && (
            <div className="journal-grid">
              {rest.map((post) => (
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
                    {post.readingTime} min read ·{" "}
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      month: "short",
                      year: "numeric",
                    })}
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
          )}

          {posts.length === 0 && (
            <p className="gallery-empty">
              The first journal entries are being written.
            </p>
          )}
        </div>
      </section>

      <CtaBand
        kicker="Beyond the journal"
        title={
          <>
            A drawing is worth
            <br />
            <em>a conversation.</em>
          </>
        }
        secondary={{ href: "/process", label: "See the process" }}
      />
    </main>
  );
}
