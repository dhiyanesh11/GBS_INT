import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { CtaBand } from "@/components/cta-band";

export async function generateStaticParams() {
  return (await getBlogPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Journal story not found" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      images: [post.cover],
      publishedTime: post.date,
    },
  };
}

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const others = (await getBlogPosts())
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);

  return (
    <main className="article">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/blog">Journal</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{post.title}</span>
        </nav>

        <header className="article-header">
          <span className="kicker">
            Design notes · {post.readingTime} min read ·{" "}
            {new Date(post.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <h1>{post.title}</h1>
          <p className="article-lead">{post.description}</p>
        </header>

        <div className="article-image">
          <Image
            src={post.cover}
            alt={post.coverAlt || post.title}
            fill
            priority
            sizes="100vw"
          />
        </div>

        <div className="article-layout">
          <div className="prose">
            <MDXRemote source={post.body} />
          </div>
          <aside className="article-aside">
            <span className="kicker">The studio</span>
            <h3 style={{ marginTop: 12 }}>
              Working on something similar?
            </h3>
            <p>
              Send the rooms involved and the city. We will reply with a sensible
              next step.
            </p>
            <Link className="btn" href="/contact">
              Book a consultation <span aria-hidden="true">↗</span>
            </Link>
            <Link
              className="text-link"
              href="/estimate"
              style={{ marginTop: 14, display: "inline-flex" }}
            >
              Plan your scope
            </Link>
          </aside>
        </div>

        {others.length > 0 && (
          <section style={{ paddingBottom: "clamp(56px, 8vw, 100px)" }}>
            <div className="section-head">
              <div>
                <span className="kicker">Keep reading</span>
                <h2>
                  More from
                  <br />
                  <em>the journal.</em>
                </h2>
              </div>
              <Link className="text-link section-head-link" href="/blog">
                All stories <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="journal-grid">
              {others.map((item) => (
                <article className="journal-card" key={item.slug}>
                  <Link
                    className="journal-image"
                    href={`/blog/${item.slug}`}
                    aria-label={item.title}
                  >
                    <Image
                      src={item.cover}
                      alt={item.coverAlt || item.title}
                      fill
                      sizes="(max-width: 860px) 100vw, 33vw"
                    />
                  </Link>
                  <span className="kicker" style={{ marginTop: 14 }}>
                    {item.readingTime} min read
                  </span>
                  <h3>
                    <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p>{item.description}</p>
                  <Link className="text-link" href={`/blog/${item.slug}`}>
                    Read story <span aria-hidden="true">↗</span>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      <CtaBand
        kicker="From reading to planning"
        title={
          <>
            Put the ideas
            <br />
            <em>into a plan.</em>
          </>
        }
        secondary={{ href: "/gallery", label: "Browse the gallery" }}
      />
    </main>
  );
}
