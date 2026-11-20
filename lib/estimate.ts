export type PropertyType = "Home" | "Commercial";
export type FinishLevel = "Essential" | "Considered" | "Signature";

export type EstimateInput = {
  propertyType: PropertyType;
  scope: string;
  finish: FinishLevel;
  area: number;
  city: string;
};

export const propertyTypes: {
  value: PropertyType;
  label: string;
  note: string;
}[] = [
  { value: "Home", label: "A home", note: "Apartment, villa or house" },
  {
    value: "Commercial",
    label: "A workspace",
    note: "Office, clinic, studio or retail",
  },
];

export const scopeOptions: { value: string; label: string; note: string }[] = [
  { value: "Single room", label: "A single room", note: "Living, bedroom or dining" },
  { value: "Kitchen or storage", label: "Kitchen or storage", note: "Kitchen, wardrobes or joinery" },
  { value: "Full home", label: "A full home", note: "Several rooms, one direction" },
  { value: "Workplace", label: "A workplace", note: "Office or customer-facing space" },
];

export const finishOptions: {
  value: FinishLevel;
  label: string;
  note: string;
}[] = [
  { value: "Essential", label: "Essential", note: "Clear plan, honest materials" },
  { value: "Considered", label: "Considered", note: "Custom joinery and detailing" },
  { value: "Signature", label: "Signature", note: "Full material and lighting design" },
];

/* Rates are optional. Set them in .env.local when you are ready to publish
   indicative per-square-foot ranges. While they are blank the planner
   recommends a package and scope without quoting a number. */
const rates: Record<string, number> = {
  "Home|Essential": Number(process.env.NEXT_PUBLIC_RATE_HOME_ESSENTIAL || 0),
  "Home|Considered": Number(process.env.NEXT_PUBLIC_RATE_HOME_CONSIDERED || 0),
  "Home|Signature": Number(process.env.NEXT_PUBLIC_RATE_HOME_SIGNATURE || 0),
  "Commercial|Essential": Number(
    process.env.NEXT_PUBLIC_RATE_COMMERCIAL_ESSENTIAL || 0
  ),
  "Commercial|Considered": Number(
    process.env.NEXT_PUBLIC_RATE_COMMERCIAL_CONSIDERED || 0
  ),
  "Commercial|Signature": Number(
    process.env.NEXT_PUBLIC_RATE_COMMERCIAL_SIGNATURE || 0
  ),
};

export function recommendPackage(input: EstimateInput): {
  slug: string;
  name: string;
  reason: string;
} {
  const commercial =
    input.propertyType === "Commercial" || input.scope === "Workplace";

  if (input.finish === "Signature") {
    return {
      slug: "turnkey",
      name: "Turnkey",
      reason:
        "A signature-level brief touches materials, lighting and joinery throughout. A single team from drawing to handover keeps those details consistent.",
    };
  }

  if (input.scope === "Full home") {
    return {
      slug: "design-build",
      name: "Design + build",
      reason:
        "Several rooms need one coherent plan and a coordinated site. Design plus build keeps the drawings, procurement and installation aligned.",
    };
  }

  if (commercial || input.scope === "Kitchen or storage") {
    return {
      slug: "design-build",
      name: "Design + build",
      reason:
        "The work needs coordinated joinery, services and installation. Design plus build keeps the drawings and the site work aligned.",
    };
  }

  return {
    slug: "design-only",
    name: "Design only",
    reason:
      "A focused room can work well with a complete design package while your own contractor handles execution.",
  };
}

export function estimateRange(input: EstimateInput): {
  min: number;
  max: number;
} | null {
  const rate = rates[`${input.propertyType}|${input.finish}`] || 0;
  if (!rate || !input.area) return null;
  const base = rate * input.area;
  return {
    min: Math.round((base * 0.88) / 10000) * 10000,
    max: Math.round((base * 1.12) / 10000) * 10000,
  };
}

export function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatRange(range: { min: number; max: number }) {
  const compact = (value: number) =>
    value >= 10000000
      ? `₹${(value / 10000000).toFixed(value % 10000000 === 0 ? 0 : 1)} Cr`
      : value >= 100000
        ? `₹${(value / 100000).toFixed(value % 100000 === 0 ? 0 : 1)} L`
        : formatINR(value);
  return `${compact(range.min)} – ${compact(range.max)}`;
}
