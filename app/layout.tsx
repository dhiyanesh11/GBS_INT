import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "./site-chrome";

export const metadata: Metadata = {
  title: { default: "GBS Interiors | Spaces with purpose", template: "%s | GBS Interiors" },
  description: "Thoughtful residential and commercial interiors, designed around the way you live and work.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context": "https://schema.org", "@type": "InteriorDesigner", name: process.env.NEXT_PUBLIC_COMPANY_NAME || "GBS Interiors", url: process.env.NEXT_PUBLIC_SITE_URL, telephone: process.env.NEXT_PUBLIC_COMPANY_PHONE || undefined, email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || undefined, address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS ? { "@type": "PostalAddress", streetAddress: process.env.NEXT_PUBLIC_COMPANY_ADDRESS, addressCountry: "IN" } : undefined };
  const jsonLd = JSON.stringify(structuredData).replace(/</g, "\\u003c");
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} /><SiteHeader />{children}<SiteFooter /></body></html>;
}
