import Link from "next/link";
import type { ReactNode } from "react";
import { company } from "@/lib/site";

export function CtaBand({
  kicker = "Start a project",
  title,
  intro,
  primary = { href: "/contact", label: "Book a consultation" },
  secondary = { href: "/estimate", label: "Plan your scope" },
}: {
  kicker?: string;
  title?: ReactNode;
  intro?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string } | null;
}) {
  return (
    <section className="cta-band">
      <div className="container">
        <div className="cta-inner">
          <div>
            <span className="kicker">{kicker}</span>
            <h2>
              {title || (
                <>
                  Tell us about the space. We&apos;ll take it{" "}
                  <em>from there.</em>
                </>
              )}
            </h2>
            {intro && <p style={{ marginTop: 18, maxWidth: "48ch" }}>{intro}</p>}
          </div>
          <div className="cta-actions">
            <Link className="btn" href={primary.href}>
              {primary.label} <span aria-hidden="true">↗</span>
            </Link>
            {secondary && (
              <Link className="btn btn-ghost" href={secondary.href}>
                {secondary.label}
              </Link>
            )}
            <a className="btn btn-ghost" href={company.phoneHref}>
              Call {company.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
