import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

export function PageHero({
  kicker,
  title,
  intro,
  image,
  imageAlt,
  breadcrumbs,
  actions,
  children,
}: {
  kicker?: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  imageAlt?: string;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
  children?: ReactNode;
}) {
  const hasMedia = Boolean(image);

  return (
    <section className={`page-hero${hasMedia ? " has-media" : ""}`}>
      {hasMedia && (
        <div className="page-hero-media">
          <Image
            src={image!}
            alt={imageAlt || ""}
            fill
            priority
            sizes="100vw"
          />
        </div>
      )}
      <div className="container">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.label} style={{ display: "contents" }}>
                <span aria-hidden="true">/</span>
                {crumb.href ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span aria-current="page">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {kicker && <span className="kicker">{kicker}</span>}
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
        {actions && <div className="page-hero-actions">{actions}</div>}
        {children}
      </div>
    </section>
  );
}
