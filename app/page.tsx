import Link from "next/link";
import { getProjects } from "@/lib/projects";
export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = (await getProjects()).slice(0, 3);
  return <main>
    <section className="hero"><div className="hero-copy"><p className="eyebrow"><i /> INTERIOR DESIGN · INDIA</p><h1>Spaces that feel<br />like <em>you.</em></h1><p className="hero-intro">Thoughtful interiors for the way you live, work, and everything in between.</p><Link href="/contact" className="button">Let’s make room for better <span>↗</span></Link><div className="hero-foot"><span>RESIDENTIAL &amp; COMMERCIAL</span><span>01 — 04</span></div></div><div className="hero-image" role="img" aria-label="Warm modern living room with natural materials"><div className="image-tag"><span>01 / 04</span><b>A home in balance</b><small>BENGALURU · 2025</small></div></div><div className="hero-side-note">DESIGNED AROUND YOU · BUILT TO LAST</div></section>

    <section className="intro section-pad"><div className="section-kicker">01 / OUR APPROACH</div><div className="intro-content"><h2>Good design makes<br />everyday feel <em>different.</em></h2><div><p>We create considered spaces that look beautiful, work hard, and feel unmistakably yours. From the first sketch to the final detail, every choice has a reason.</p><Link className="text-link" href="/about">A little about us <span>↗</span></Link></div></div></section>

    <section className="projects section-pad"><div className="section-heading"><div><div className="section-kicker">02 / SELECTED WORK</div><h2>Made for <em>living.</em></h2></div><Link className="text-link" href="/projects">View all projects <span>↗</span></Link></div><div className="project-grid">{projects.map((p, i) => <Link href={`/projects/${p.slug}`} className={`project-card ${i === 0 ? "project-large" : ""}`} key={p.id}><div className="project-photo" style={{ backgroundImage: `url(${p.images[0]})` }}><span className="project-index">0{i + 1}</span></div><div className="project-meta"><div><h3>{p.title}</h3><span>{p.type.toUpperCase()} · {p.location.toUpperCase()}</span></div><span className="round-arrow">↗</span></div></Link>)}</div></section>

    <section className="services-band"><div className="section-kicker">03 / WHAT WE DO</div><div className="services-layout"><h2>From blank canvas<br />to <em>beautifully lived in.</em></h2><div className="service-list"><Link href="/services"><span>01</span>Residential interiors<i>↗</i></Link><Link href="/services"><span>02</span>Commercial spaces<i>↗</i></Link><Link href="/services"><span>03</span>Design consultation<i>↗</i></Link></div></div></section>

    <section className="cta section-pad"><div className="cta-stamp">GOOD<br />THINGS<br />BEGIN HERE</div><div><div className="section-kicker">HAVE A SPACE IN MIND?</div><h2>Let’s make it<br /><em>feel like yours.</em></h2><Link href="/contact" className="button">Tell us what you’re dreaming of <span>↗</span></Link></div><span className="cta-number">GBS — 2025</span></section>
  </main>;
}
