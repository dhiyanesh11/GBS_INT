import type { Metadata } from "next";
import { company } from "@/lib/site";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Website terms for GBS Interiors. Draft copy to be reviewed before publication.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <main>
      <PageHero
        kicker="Terms"
        breadcrumbs={[{ label: "Terms" }]}
        title={
          <>
            Website
            <br />
            <em>terms.</em>
          </>
        }
        intro="This is a working draft for review by the business. It is not legal advice."
      />

      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>Using this website</h2>
            <p>
              The content on this site is provided for general information about{" "}
              {company.name} and its services. You may browse, print and share
              pages for personal, non-commercial use.
            </p>

            <h2>Project imagery</h2>
            <p>
              Images on this site are representative references unless a page
              explicitly states that a project is a completed GBS Interiors
              project. They must not be treated as a record of work delivered.
            </p>

            <h2>Enquiries and estimates</h2>
            <p>
              Submitting an enquiry does not create a contract. Any scope,
              timeline, cost or warranty commitment is valid only when confirmed
              in a written proposal signed by both parties.
            </p>

            <h2>Accuracy</h2>
            <p>
              We aim to keep information accurate, but details such as
              availability, service areas and materials may change. Please
              confirm current details with the studio before relying on them.
            </p>

            <h2>Intellectual property</h2>
            <p>
              Drawings, images, text and other materials created by the studio
              remain the property of {company.name} unless assigned in writing.
              Stock photography remains the property of its licensors.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${company.email}`}>{company.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
