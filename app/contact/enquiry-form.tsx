"use client";
import Script from "next/script";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

declare global { interface Window { gbsTurnstileValue?: string; gbsTurnstileToken?: (token: string) => void } }

export function EnquiryForm() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  useEffect(() => { window.gbsTurnstileToken = token => { window.gbsTurnstileValue = token; }; return () => { delete window.gbsTurnstileToken; }; }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const formElement = event.currentTarget; setBusy(true); setMessage("");
    const form = new FormData(formElement); const body: Record<string, unknown> = Object.fromEntries(form.entries());
    body.consent = form.has("consent"); body.turnstileToken = window.gbsTurnstileValue || "";
    try {
      const response = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const result = await response.json(); if (!response.ok) { const details = result.fields && Object.values(result.fields).join(" "); throw new Error(details ? `${result.error} ${details}` : result.error || "Unable to send enquiry."); }
      formElement.reset(); window.gbsTurnstileValue = ""; setMessage("Thank you. Your enquiry has been received.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to send enquiry."); }
    finally { setBusy(false); }
  }

  return <>
    <form className="contact-form" onSubmit={submit}>
      <label>Your name<input name="name" required minLength={2} maxLength={100} placeholder="Name" /></label>
      <label>Phone number<input name="phone" required inputMode="tel" placeholder="+91" /></label>
      <label>Email address <span>(optional)</span><input name="email" type="email" placeholder="you@example.com" /></label>
      <label>City / location<input name="city" required placeholder="Where is your project?" /></label>
      <label>What are you looking to design?<select name="propertyType" defaultValue="" required><option value="" disabled>Select a space</option><option>Home</option><option>Commercial</option></select></label>
      <label>Service needed<select name="service" defaultValue="" required><option value="" disabled>Select a service</option><option>Interior design</option><option>Space planning</option><option>Renovation</option><option>Consultation</option></select></label>
      <label>Budget range <span>(optional)</span><select name="budget" defaultValue=""><option value="">Choose a range</option><option>Under ₹5 lakh</option><option>₹5–10 lakh</option><option>₹10–25 lakh</option><option>₹25 lakh+</option><option>To be discussed</option></select></label>
      <label className="field-wide">Tell us a little more<textarea name="message" rows={4} maxLength={2000} placeholder="Your ideas, timeline, or questions" /></label>
      <label className="honeypot">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="consent"><input name="consent" type="checkbox" required /> <span>I agree to be contacted about my enquiry. See our <Link href="/privacy">Privacy Policy</Link>.</span></label>
      {siteKey && <div className="cf-turnstile" data-sitekey={siteKey} data-callback="gbsTurnstileToken" />}
      <button className="button" disabled={busy}>{busy ? "Sending..." : "Send enquiry"}<span>↗</span></button>
      {message && <p className="form-note" role="status">{message}</p>}
    </form>
    {siteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />}
  </>;
}
