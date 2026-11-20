"use client";

import Script from "next/script";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  estimateRange,
  finishOptions,
  formatRange,
  propertyTypes,
  recommendPackage,
  scopeOptions,
  type EstimateInput,
  type FinishLevel,
  type PropertyType,
} from "@/lib/estimate";

declare global {
  interface Window {
    gbsTurnstileValue?: string;
    gbsTurnstileToken?: (token: string) => void;
  }
}

const steps = ["Space", "Scope", "Finish", "Size"];

export function EstimateWizard() {
  const [step, setStep] = useState(0);
  const [propertyType, setPropertyType] = useState<PropertyType>("Home");
  const [scope, setScope] = useState(scopeOptions[2].value);
  const [finish, setFinish] = useState<FinishLevel>("Considered");
  const [area, setArea] = useState(1400);
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [tone, setTone] = useState<"success" | "error" | "">("");
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const input: EstimateInput = { propertyType, scope, finish, area, city };
  const recommendation = useMemo(() => recommendPackage(input), [input]);
  const range = useMemo(() => estimateRange(input), [input]);

  useEffect(() => {
    window.gbsTurnstileToken = (token) => {
      window.gbsTurnstileValue = token;
    };
    return () => {
      delete window.gbsTurnstileToken;
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    setTone("");
    const summary = [
      "Estimate planner",
      `Property: ${propertyType}`,
      `Scope: ${scope}`,
      `Finish: ${finish}`,
      `Area: ${area} sq ft`,
      `City: ${city}`,
      `Recommended package: ${recommendation.name}`,
      range ? `Indicative range: ${formatRange(range)}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          city,
          propertyType,
          service: "Estimate planner",
          message: summary,
          consent,
          website: "",
          source: "estimate",
          turnstileToken: window.gbsTurnstileValue || "",
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        const details =
          result.fields && Object.values(result.fields).join(" ");
        throw new Error(
          details
            ? `${result.error} ${details}`
            : result.error || "Unable to send your brief."
        );
      }
      setTone("success");
      setStatus(
        "Thank you. Your brief is with us — we will reply with the next step."
      );
    } catch (error) {
      setTone("error");
      setStatus(
        error instanceof Error ? error.message : "Unable to send your brief."
      );
    } finally {
      setBusy(false);
    }
  }

  if (step === steps.length) {
    return (
      <div className="estimate-wizard">
        <div className="wizard-step-label">
          <span>Your starting point</span>
          <button
            type="button"
            className="text-link"
            onClick={() => setStep(0)}
          >
            Start again
          </button>
        </div>
        <h2>{recommendation.name} looks like the right fit.</h2>

        <div className="wizard-result">
          <span className="result-label">Recommended route</span>
          <p style={{ marginTop: 10, color: "var(--graphite)", fontSize: 16 }}>
            {recommendation.reason}
          </p>
          {range ? (
            <>
              <span className="result-label" style={{ marginTop: 18, display: "block" }}>
                Indicative range
              </span>
              <div className="result-range">{formatRange(range)}</div>
              <p>
                A broad range based on {area} sq ft at the {finish.toLowerCase()}{" "}
                finish level. It is not a quotation.
              </p>
            </>
          ) : (
            <p style={{ marginTop: 12 }}>
              We do not publish fixed prices. Costs depend on the plan, finishes
              and site conditions, so we confirm them in a written proposal
              after the brief and site visit.
            </p>
          )}
          <div className="pill-row" style={{ marginTop: 14 }}>
            <span className="pill">{propertyType}</span>
            <span className="pill">{scope}</span>
            <span className="pill">{finish}</span>
            <span className="pill">{area} sq ft</span>
          </div>
        </div>

        <form onSubmit={submit} style={{ marginTop: 24 }}>
          <div className="wizard-step-label">
            <span>Send this brief to the studio</span>
            <span>Optional</span>
          </div>
          <div className="option-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <label className="field">
              <span className="form-note">Your name</span>
              <input
                required
                minLength={2}
                maxLength={100}
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
              />
            </label>
            <label className="field">
              <span className="form-note">Phone</span>
              <input
                required
                inputMode="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                autoComplete="tel"
              />
            </label>
            <label className="field">
              <span className="form-note">Email (optional)</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
              />
            </label>
            <label className="field">
              <span className="form-note">City</span>
              <input
                required
                minLength={2}
                value={city}
                onChange={(event) => setCity(event.target.value)}
                autoComplete="address-level2"
              />
            </label>
          </div>

          <label
            className="consent"
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              marginTop: 16,
              fontSize: 14,
              color: "var(--granite)",
            }}
          >
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              required
              style={{ marginTop: 4, accentColor: "var(--red)" }}
            />
            <span>
              I agree to be contacted about this brief and have read the privacy
              policy.
            </span>
          </label>

          {siteKey && (
            <div
              className="cf-turnstile"
              data-sitekey={siteKey}
              data-callback="gbsTurnstileToken"
              style={{ marginTop: 16 }}
            />
          )}

          <div className="wizard-actions">
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => setStep(3)}
            >
              Back
            </button>
            <button className="btn" type="submit" disabled={busy}>
              {busy ? "Sending…" : "Send my brief"}{" "}
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          {status && (
            <p
              className={`form-status ${
                tone === "error" ? "is-error" : "is-success"
              }`}
              role={tone === "error" ? "alert" : "status"}
              style={{ marginTop: 16 }}
            >
              {status}
            </p>
          )}
        </form>

        {siteKey && (
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            async
            defer
          />
        )}
      </div>
    );
  }

  return (
    <div className="estimate-wizard">
      <div className="wizard-progress" aria-hidden="true">
        {steps.map((label, index) => (
          <span
            key={label}
            className={index <= step ? "is-active" : ""}
          />
        ))}
      </div>
      <div className="wizard-step-label">
        <span>
          Step {step + 1} of {steps.length}
        </span>
        <span>{steps[step]}</span>
      </div>

      {step === 0 && (
        <>
          <h2>What kind of space is it?</h2>
          <div className="option-grid">
            {propertyTypes.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`option${
                  propertyType === option.value ? " is-selected" : ""
                }`}
                aria-pressed={propertyType === option.value}
                onClick={() => setPropertyType(option.value)}
              >
                <strong>{option.label}</strong>
                <span>{option.note}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <h2>How much of it are we looking at?</h2>
          <div className="option-grid">
            {scopeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`option${scope === option.value ? " is-selected" : ""}`}
                aria-pressed={scope === option.value}
                onClick={() => setScope(option.value)}
              >
                <strong>{option.label}</strong>
                <span>{option.note}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2>How considered should it feel?</h2>
          <div className="option-grid">
            {finishOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`option${
                  finish === option.value ? " is-selected" : ""
                }`}
                aria-pressed={finish === option.value}
                onClick={() => setFinish(option.value)}
              >
                <strong>{option.label}</strong>
                <span>{option.note}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Roughly how many square feet?</h2>
          <div className="range-field">
            <label htmlFor="estimate-area">
              <span>Approximate area</span>
              <output htmlFor="estimate-area">{area} sq ft</output>
            </label>
            <input
              id="estimate-area"
              type="range"
              min={200}
              max={6000}
              step={50}
              value={area}
              onChange={(event) => setArea(Number(event.target.value))}
            />
          </div>
          <p className="form-note">
            An approximation is fine. We confirm the measured area at the site
            visit.
          </p>
        </>
      )}

      <div className="wizard-actions">
        <button
          className="btn btn-ghost"
          type="button"
          onClick={() => setStep((value) => Math.max(0, value - 1))}
          disabled={step === 0}
        >
          Back
        </button>
        <button
          className="btn"
          type="button"
          onClick={() => setStep((value) => value + 1)}
        >
          {step === steps.length - 1 ? "See my starting point" : "Continue"}{" "}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
