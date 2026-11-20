import type { Metadata } from "next";
import { gallery, photos } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { GalleryGrid } from "@/components/gallery-grid";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse interior references by room and direction: living rooms, kitchens, bedrooms, bathrooms, workspaces and details.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <main>
      <PageHero
        kicker="Gallery"
        breadcrumbs={[{ label: "Gallery" }]}
        title={
          <>
            Rooms, details
            <br />
            <em>and directions.</em>
          </>
        }
        intro="A working reference library of rooms, materials and details. These are representative images, not photographs of completed GBS projects."
        image={photos.living.src}
        imageAlt={photos.living.alt}
      />

      <section className="section">
        <div className="container">
          <GalleryGrid items={gallery} />
        </div>
      </section>

      <CtaBand
        kicker="Found a direction?"
        title={
          <>
            Bring the references.
            <br />
            <em>We&apos;ll make them fit.</em>
          </>
        }
        intro="Save the images that feel right and send them with your enquiry. We will tell you what is realistic for your space and budget."
        secondary={{ href: "/services", label: "Explore services" }}
      />
    </main>
  );
}
