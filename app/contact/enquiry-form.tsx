"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { services } from "@/lib/site";

export function EnquiryForm({
  source = "contact",
  defaultService = "",
  defaultPropertyType = "",
  heading = "Tell us about your project",
  intro = "A few details help us reply with something useful. No obligation.",
}: {
  source?: string;
  defaultService?: string;
  defaultPropertyType?: "" | "Home" | "Commercial";
  heading?: string;
  intro?: string;
}) {
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<"success" | "error" | "">("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setBusy(true);
    setMessage("");
    setTone("");
    const form = new FormData(formElement);
    const body: Record<string, unknown> = Object.fromEntries(form.entries());
    body.consent = form.has("consent");
    body.source = source;

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) {
        const details =
          result.fields && Object.values(result.fields).join(" ");
        throw new Error(
          details
            ? `${result.error} ${details}`
            : result.error || "Unable to send enquiry."
        );
      }
      formElement.reset();
      setTone("success");
      setMessage(
        "Thank you. Your enquiry is with us — we usually reply within two working days."
      );
    } catch (error) {
      setTone("error");
      setMessage(
        error instanceof Error ? error.message : "Unable to send enquiry."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <form className="contact-form" onSubmit={submit}>
        <h2>{heading}</h2>
        <p className="form-intro">{intro}</p>

        <label>
          Your name
          <input
            name="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Name"
            autoComplete="name"
          />
        </label>
        <label>
          Phone number
          <input
            name="phone"
            required
            inputMode="tel"
            placeholder="+91"
            autoComplete="tel"
          />
        </label>
        <label>
          Email address <span className="form-note">(optional)</span>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>
        <label>
          City or project location
          <input
            name="city"
            required
            placeholder="Where is the space?"
            autoComplete="address-level2"
          />
        </label>
        <label>
          Type of space
          <select
            name="propertyType"
            defaultValue={defaultPropertyType}
            required
          >
            <option value="" disabled>
              Select a space
            </option>
            <option value="Home">Home</option>
            <option value="Commercial">Commercial</option>
          </select>
        </label>
        <label>
          What do you need?
          <select name="service" defaultValue={defaultService} required>
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </label>
        <label>
          Budget range <span className="form-note">(optional)</span>
          <select name="budget" defaultValue="">
            <option value="">Prefer not to say</option>
            <option>Under ₹5 lakh</option>
            <option>₹5–10 lakh</option>
            <option>₹10–25 lakh</option>
            <option>₹25 lakh+</option>
            <option>To be discussed</option>
          </select>
        </label>
        <label className="field-wide">
          Tell us a little more
          <textarea
            name="message"
            rows={4}
            maxLength={2000}
            placeholder="The rooms involved, your timeline, or the decision you are trying to make"
          />
        </label>

        <label className="honeypot" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <label className="consent">
          <input name="consent" type="checkbox" required />
          <span>
            I agree to be contacted about this enquiry. See our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </span>
        </label>

        <div className="form-submit">
          <button className="btn" type="submit" disabled={busy}>
            {busy ? "Sending…" : "Send enquiry"}{" "}
            <span aria-hidden="true">↗</span>
          </button>
          <span className="form-note">
            Prefer email?{" "}
            <Link href="/contact" style={{ textDecoration: "underline" }}>
              Contact the studio
            </Link>
            .
          </span>
        </div>

        {message && (
          <p
            className={`form-status ${
              tone === "error" ? "is-error" : "is-success"
            }`}
            role={tone === "error" ? "alert" : "status"}
          >
            {message}
          </p>
        )}
      </form>
    </>
  );
}
