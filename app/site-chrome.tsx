"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { company, nav, photos, services, socials } from "@/lib/site";

type NavChild = { label: string; href: string; note?: string };

const navGroups: Record<string, { children: NavChild[]; feature?: { src: string; alt: string; caption: string } }> = {
  Work: {
    children: [
      { label: "All work", href: "/projects", note: "Selected projects" },
      { label: "Residential", href: "/projects?type=Residential", note: "Homes" },
      { label: "Commercial", href: "/projects?type=Commercial", note: "Workplaces" },
      { label: "Gallery", href: "/gallery", note: "Rooms and details" },
    ],
    feature: {
      src: photos.living.src,
      alt: photos.living.alt,
      caption: "Residential and commercial work",
    },
  },
  Services: {
    children: services.map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
      note: service.bestFor,
    })),
    feature: {
      src: photos.kitchen.src,
      alt: photos.kitchen.alt,
      caption: "Design, materials and execution",
    },
  },
};

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      className={`brand${footer ? " brand-footer" : ""}`}
      href="/"
      aria-label={`${company.name} home`}
    >
      <span className="brand-mark">GBS</span>
      <span className="brand-word">Interiors</span>
    </Link>
  );
}

function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      setScrolled(y > 24);
      if (y < 120) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const transparent = pathname === "/" && !scrolled && !open;

  return (
    <>
      <header
        className={`site-header ${transparent ? "is-transparent" : "is-solid"}${
          open ? " is-open" : ""
        }${hidden && !open ? " is-hidden" : ""}`}
      >
        <div className="header-inner">
          <Brand />
          <nav className="nav" aria-label="Main navigation">
            {nav.map((item) => {
              const group = navGroups[item.label];
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <div className="nav-item" key={item.href}>
                  <Link
                    href={item.href}
                    className="nav-link"
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                    {group && <span className="chevron" aria-hidden="true" />}
                  </Link>
                  {group && (
                    <div className="mega">
                      <div className="mega-grid">
                        <div className="mega-links">
                          {group.children.map((child) => (
                            <Link key={child.href} href={child.href}>
                              {child.label}
                              {child.note && <span>{child.note}</span>}
                            </Link>
                          ))}
                        </div>
                        {group.feature && (
                          <Link className="mega-feature" href={item.href}>
                            <Image
                              src={group.feature.src}
                              alt={group.feature.alt}
                              fill
                              sizes="240px"
                            />
                            <span>{group.feature.caption}</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <div className="header-actions">
            <Link className="btn btn-primary btn-sm header-cta" href="/contact">
              Book a consultation <span aria-hidden="true">↗</span>
            </Link>
            <button
              type="button"
              className={`menu-toggle${open ? " is-open" : ""}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu${open ? " is-open" : ""}`}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
        <div className="mobile-contact">
          <span>{company.availability}</span>
          <a href={company.phoneHref}>{company.phone}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <p>{company.address}</p>
          <p>{company.hours}</p>
          {socials.length > 0 && (
            <div className="mobile-socials">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
        <Link className="btn btn-primary mobile-menu-cta" href="/contact">
          Book a consultation <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </>
  );
}

function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand footer />
            <p>Considered spaces. Made for real life.</p>
            <span className="footer-availability">{company.availability}</span>
            {socials.length > 0 && (
              <div className="footer-socials">
                {socials.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="footer-col">
            <h3>Explore</h3>
            <Link href="/projects">Work</Link>
            <Link href="/services">Services</Link>
            <Link href="/packages">Packages</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/estimate">Estimate</Link>
          </div>

          <div className="footer-col">
            <h3>Studio</h3>
            <Link href="/about">About</Link>
            <Link href="/process">Process</Link>
            <Link href="/reviews">Client stories</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/locations">Locations</Link>
            <Link href="/blog">Journal</Link>
          </div>

          <div className="footer-col footer-contact">
            <h3>Contact</h3>
            <a href={company.phoneHref}>{company.phone}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <span>{company.address}</span>
            <span>{company.hours}</span>
            <a href={company.mapsUrl} target="_blank" rel="noreferrer">
              Open in Maps ↗
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {company.name}
          </span>
          <span className="footer-bottom-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/credits">Credits</Link>
            <span>Representative imagery</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

function MobileActionBar() {
  return (
    <div className="mobile-action-bar" aria-label="Quick contact">
      <a href={company.phoneHref} aria-label={`Call ${company.phone}`}>
        Call
      </a>
      <a
        href={company.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Message on WhatsApp"
      >
        WhatsApp
      </a>
      <Link href="/contact" aria-label="Book a consultation">
        Book
      </Link>
    </div>
  );
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <SiteHeader />
      <div id="main">{children}</div>
      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
