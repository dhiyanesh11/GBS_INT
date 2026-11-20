import type { Metadata } from "next";
import { photoCredits } from "@/lib/site";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Photo credits",
  description:
    "Photography credits for the representative imagery used on the GBS Interiors website.",
  alternates: { canonical: "/credits" },
};

export default function Credits() {
  return (
    <main>
      <PageHero
        kicker="Credits"
        breadcrumbs={[{ label: "Credits" }]}
        title={
          <>
            Photography
            <br />
            <em>and sources.</em>
          </>
        }
        intro="The images on this site are representative references sourced from Unsplash, not photographs of completed GBS projects. Photographer names will be added when the images are self-hosted."
      />

      <section className="section">
        <div className="container">
          <div className="note" style={{ marginBottom: 28, maxWidth: 760 }}>
            All photographs are used under the{" "}
            <a
              href="https://unsplash.com/license"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "underline" }}
            >
              Unsplash License
            </a>
            . They illustrate a design direction and are not presented as GBS
            Interiors project photography.
          </div>

          <div className="credit-list">
            {photoCredits.map((src) => {
              const id = src.split("/").pop() || src;
              return (
                <div className="credit-row" key={src}>
                  <span>
                    Unsplash · <code>{id}</code>
                  </span>
                  <a href={src} target="_blank" rel="noreferrer">
                    View source ↗
                  </a>
                </div>
              );
            })}
          </div>

          <p className="form-note" style={{ marginTop: 24 }}>
            To replace these with real project photography, update the image
            URLs in the project records and the content files, then update this
            page.
          </p>
        </div>
      </section>
    </main>
  );
}
