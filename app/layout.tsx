import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "./site-chrome";
import { cities, company, photos, siteUrl, socials } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Interior design studio in ${company.region}`,
    template: `%s | ${company.name}`,
  },
  description:
    "Considered residential and commercial interiors in Tamil Nadu. Space planning, material direction, joinery and turnkey execution — designed around the way you live and work.",
  keywords: [
    "interior designer",
    "interior design",
    "residential interiors",
    "commercial interiors",
    "modular kitchen",
    "wardrobes",
    "turnkey interiors",
    "Dindigul",
    "Madurai",
    "Coimbatore",
    "Tamil Nadu",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: company.name,
    title: `${company.name} | Interior design studio`,
    description:
      "Considered residential and commercial interiors in Tamil Nadu. Design, materials and execution under one roof.",
    images: [{ url: photos.hero.src, width: 1600, height: 1067, alt: photos.hero.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | Interior design studio`,
    description:
      "Considered residential and commercial interiors in Tamil Nadu.",
    images: [photos.hero.src],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F6F2",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "InteriorDesigner",
    name: company.name,
    url: siteUrl,
    email: company.email,
    image: photos.hero.src,
    description:
      "Residential and commercial interior design studio working across Tamil Nadu.",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: company.city,
      addressRegion: company.region,
      addressCountry: "IN",
    },
    areaServed: cities.map((name) => ({ "@type": "City", name })),
    sameAs: socials.map((item) => item.href),
    openingHours: company.hours,
    priceRange: "Custom quote",
  };
  const jsonLd = JSON.stringify(structuredData).replace(/</g, "\\u003c");

  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
