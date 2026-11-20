import Link from "next/link";

const links = [["Services", "/services"], ["Projects", "/projects"], ["About", "/about"], ["Journal", "/blog"]];

export function SiteHeader() {
  return <header className="site-header"><Link className="wordmark" href="/" aria-label="GBS Interiors home"><span className="mark">G<span>B</span>S</span><span className="wordmark-caption">INTERIORS</span></Link><nav aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav><Link className="button button-small" href="/contact">Let’s talk <span aria-hidden="true">↗</span></Link></header>;
}

export function SiteFooter() {
  const email = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "hello@gbsinteriors.in";
  const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "+91 00000 00000";
  return <footer className="site-footer"><div><Link className="wordmark footer-logo" href="/"><span className="mark">G<span>B</span>S</span><span className="wordmark-caption">INTERIORS</span></Link><p>Considered spaces.<br />Made for real life.</p></div><div className="footer-links"><span>START A PROJECT</span><a href={`mailto:${email}`}>{email}</a><a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a></div><div className="footer-note">© {new Date().getFullYear()} GBS Interiors<br />Designed with intention.</div></footer>;
}
