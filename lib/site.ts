const u = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "+91 98844 24286";
const whatsapp = process.env.NEXT_PUBLIC_COMPANY_WHATSAPP || phone;

export const company = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || "GBS Interiors",
  phone,
  phoneHref: `tel:${phone.replace(/[^\d+]/g, "")}`,
  whatsappHref: `https://wa.me/${whatsapp.replace(/\D/g, "")}`,
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "gbsess@gmail.com",
  address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "Dindugal, Tamil Nadu, India",
  hours: process.env.NEXT_PUBLIC_COMPANY_HOURS || "8am to 8pm, Mon-Sat",
  city: process.env.NEXT_PUBLIC_COMPANY_CITY || "Dindigul",
  region: process.env.NEXT_PUBLIC_COMPANY_REGION || "Tamil Nadu",
  availability:
    process.env.NEXT_PUBLIC_AVAILABILITY || "Currently accepting new projects",
  responseTime:
    process.env.NEXT_PUBLIC_RESPONSE_TIME || "We usually reply within two working days.",
  mapsUrl:
    process.env.NEXT_PUBLIC_MAPS_URL ||
    "https://maps.google.com/?q=Dindigul,Tamil%20Nadu,India",
  calendarUrl: process.env.NEXT_PUBLIC_CALENDAR_URL || "",
  googleReviewsUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL || "",
  googleRating: process.env.NEXT_PUBLIC_GOOGLE_RATING || "",
  instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "",
  pinterest: process.env.NEXT_PUBLIC_SOCIAL_PINTEREST || "",
  linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "",
};

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const nav = [
  { href: "/projects", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/packages", label: "Packages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "Studio" },
  { href: "/blog", label: "Journal" },
];

export const socials = [
  { label: "Instagram", href: company.instagram },
  { label: "Pinterest", href: company.pinterest },
  { label: "LinkedIn", href: company.linkedin },
].filter((item) => item.href);

export const photos = {
  hero: {
    src: u("photo-1600210492486-724fe5c67fb0", 2200),
    alt: "Warm contemporary living room with a gallery wall, natural light and layered textures",
  },
  heroDetail: {
    src: u("photo-1618219908412-a29a1bb7b86e", 1200),
    alt: "Console, mirror and material detail in a calm interior",
  },
  living: {
    src: u("photo-1618221195710-dd6b41faaea6", 1600),
    alt: "Living room with warm timber, leather chairs and soft daylight",
  },
  livingLight: {
    src: u("photo-1616486338812-3dadae4b4ace", 1600),
    alt: "Light neutral living room with soft furnishings",
  },
  dining: {
    src: u("photo-1617806118233-18e1de247200", 1600),
    alt: "Dining room with a green wall, timber table and plants",
  },
  kitchen: {
    src: u("photo-1556912173-3bb406ef7e77", 1600),
    alt: "Bright kitchen with white cabinetry and timber details",
  },
  kitchenDark: {
    src: u("photo-1600489000022-c2086d79f9d4", 1600),
    alt: "Kitchen with deep green cabinetry and brass hardware",
  },
  bedroom: {
    src: u("photo-1615874959474-d609969a20ed", 1600),
    alt: "Bedroom with plants, warm textiles and morning light",
  },
  bedroomDark: {
    src: u("photo-1617104678098-de229db51175", 1600),
    alt: "Moody bedroom with dark walls and a large window",
  },
  bathroom: {
    src: u("photo-1600607688066-890987f18a86", 1600),
    alt: "Bathroom with marble surfaces and a double vanity",
  },
  bathroomTub: {
    src: u("photo-1600566752355-35792bedcfea", 1600),
    alt: "Bathroom with a freestanding tub and soft natural light",
  },
  office: {
    src: u("photo-1497366811353-6870744d04b2", 1600),
    alt: "Meeting room with glass walls and a long timber table",
  },
  officeLounge: {
    src: u("photo-1524758631624-e2822e304c36", 1600),
    alt: "Workplace lounge with soft seating and plants",
  },
  officeHall: {
    src: u("photo-1497366216548-37526070297c", 1600),
    alt: "Calm office corridor with timber and glass",
  },
  detail: {
    src: u("photo-1618219908412-a29a1bb7b86e", 1200),
    alt: "Mirror, console and sculptural objects in a quiet corner",
  },
  exterior: {
    src: u("photo-1600585154340-be6161a56a0c", 2000),
    alt: "Modern house exterior at dusk with warm interior light",
  },
  studio: {
    src: u("photo-1600607687920-4e2a09cf159d", 1600),
    alt: "Open-plan dining and kitchen with timber and dark stone",
  },
};

export const materialPalette = [
  { name: "Lime plaster", note: "Walls", color: "#E8E2D6" },
  { name: "Teak", note: "Joinery", color: "#8A5A38" },
  { name: "Laterite", note: "Thresholds", color: "#A34A32" },
  { name: "Brass", note: "Hardware", color: "#B08D57" },
  { name: "Granite", note: "Surfaces", color: "#6E6B66" },
];

export const claims = [
  {
    label: "First conversation",
    value:
      process.env.NEXT_PUBLIC_CLAIM_CONSULTATION ||
      "A 30-minute call to understand the brief",
  },
  {
    label: "Timeline",
    value:
      process.env.NEXT_PUBLIC_CLAIM_TIMELINE || "Confirmed in writing before work begins",
  },
  {
    label: "Site updates",
    value: process.env.NEXT_PUBLIC_CLAIM_DELIVERY || "Staged updates through the build",
  },
  {
    label: "Workmanship",
    value: process.env.NEXT_PUBLIC_CLAIM_WARRANTY || "Workmanship warranty as per contract",
  },
];

export const stats = [
  { value: process.env.NEXT_PUBLIC_STATS_PROJECTS || "", label: "Projects delivered" },
  { value: process.env.NEXT_PUBLIC_STATS_YEARS || "", label: "Years in practice" },
  { value: process.env.NEXT_PUBLIC_STATS_CITIES || "", label: "Cities served" },
  { value: process.env.NEXT_PUBLIC_STATS_CLIENTS || "", label: "Repeat clients" },
].filter((item) => item.value);

export const values = [
  {
    title: "Listen first",
    body: "We start with how you actually live and work, not a style board. The brief comes before the mood.",
  },
  {
    title: "Plan for real life",
    body: "Storage, light, movement and maintenance are part of the design, not an afterthought.",
  },
  {
    title: "Choose materials that age well",
    body: "We look for finishes that wear in, not out — and that can be cleaned, repaired and lived with.",
  },
  {
    title: "Stay close to site",
    body: "Drawings only matter if they are built properly. We stay involved through execution and handover.",
  },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  imageAlt: string;
  bestFor: string;
  includes: string[];
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: "residential-interiors",
    title: "Residential interiors",
    short: "Full homes, apartments and villas shaped around the way you live.",
    description:
      "From a single room to a complete home, we bring the plan, materials, joinery and lighting together into one considered design.",
    image: photos.living.src,
    imageAlt: photos.living.alt,
    bestFor: "New homes, renovations and full-home interiors",
    includes: [
      "Space planning and furniture layout",
      "Material, finish and colour direction",
      "Joinery, lighting and storage design",
      "Site coordination through handover",
    ],
    deliverables: [
      "Measured plans and furniture layouts",
      "Concept and material boards",
      "Working drawings and joinery details",
      "Site visit notes and handover checklist",
    ],
  },
  {
    slug: "commercial-interiors",
    title: "Commercial interiors",
    short: "Workplaces, studios and customer spaces built around how people use them.",
    description:
      "People-first offices, clinics, studios and hospitality spaces that balance brand, function and the daily experience of the people inside them.",
    image: photos.office.src,
    imageAlt: photos.office.alt,
    bestFor: "Offices, clinics, studios, retail and hospitality",
    includes: [
      "Workplace and customer-flow planning",
      "Brand-led material and lighting direction",
      "Built-in storage and joinery",
      "Execution coordination and quality checks",
    ],
    deliverables: [
      "Space plan and zoning study",
      "Material and finish schedule",
      "Joinery and services coordination drawings",
      "Handover and snag list",
    ],
  },
  {
    slug: "modular-kitchens",
    title: "Modular kitchens",
    short: "Kitchens planned around cooking, storage and the way your household moves.",
    description:
      "We plan the kitchen from the work triangle outward: storage, appliances, surfaces and light, with a finish palette that suits the rest of the home.",
    image: photos.kitchenDark.src,
    imageAlt: photos.kitchenDark.alt,
    bestFor: "New kitchens and kitchen renovations",
    includes: [
      "Layout and work-triangle planning",
      "Cabinet, drawer and tall-storage design",
      "Appliance and lighting coordination",
      "Countertop, backsplash and hardware selection",
    ],
    deliverables: [
      "Kitchen plan and elevation drawings",
      "Cabinet and hardware schedule",
      "Appliance and lighting plan",
      "Site coordination notes",
    ],
  },
  {
    slug: "wardrobes-storage",
    title: "Wardrobes & storage",
    short: "Storage that disappears into the architecture and works every day.",
    description:
      "Walk-in wardrobes, sliding wardrobes, entry storage and custom joinery designed around what you actually own and how you get ready.",
    image: photos.bedroomDark.src,
    imageAlt: photos.bedroomDark.alt,
    bestFor: "Bedrooms, entries, utility areas and home offices",
    includes: [
      "Storage audit and internal planning",
      "Sliding, hinged and walk-in configurations",
      "Lighting, mirrors and accessory planning",
      "Material and hardware selection",
    ],
    deliverables: [
      "Storage layout and internal elevations",
      "Hardware and finish schedule",
      "Lighting and mirror plan",
      "Installation coordination notes",
    ],
  },
  {
    slug: "turnkey-interiors",
    title: "Turnkey interiors",
    short: "One team from the first drawing to the final handover.",
    description:
      "For clients who want a single point of contact, we coordinate design, procurement, joinery, finishes and installation through to handover.",
    image: photos.studio.src,
    imageAlt: photos.studio.alt,
    bestFor: "Clients who want design and execution handled together",
    includes: [
      "Design, drawings and material selection",
      "Procurement and vendor coordination",
      "Site supervision and quality checks",
      "Styling, snag list and handover",
    ],
    deliverables: [
      "Full drawing set and specification",
      "Procurement and delivery schedule",
      "Stage-wise site reports",
      "Handover file and care guide",
    ],
  },
  {
    slug: "design-consultation",
    title: "Design consultation",
    short: "A focused second opinion on plan, materials or a room that is not working.",
    description:
      "A practical consultation for clients who need clarity before they build, buy furniture or commit to a larger renovation.",
    image: photos.detail.src,
    imageAlt: photos.detail.alt,
    bestFor: "Homeowners, renovators and self-managed projects",
    includes: [
      "Review of plans, photos or site",
      "Space planning and flow advice",
      "Material and finish direction",
      "A written list of next steps",
    ],
    deliverables: [
      "Consultation notes",
      "Quick-win recommendations",
      "Material and furniture direction",
      "Referral list where needed",
    ],
  },
];

export type Package = {
  slug: string;
  name: string;
  tagline: string;
  bestFor: string;
  includes: string[];
  note: string;
};

export const packages: Package[] = [
  {
    slug: "design-only",
    name: "Design only",
    tagline: "A complete design package for clients managing their own execution.",
    bestFor: "Homeowners with a trusted contractor or site team",
    includes: [
      "Brief, site study and measured drawings",
      "Space plan and furniture layout",
      "Material, finish and lighting direction",
      "Working drawings and joinery details",
      "Scheduled site visits through handover",
    ],
    note: "You manage procurement and execution. We stay available for design clarification and site checks.",
  },
  {
    slug: "design-build",
    name: "Design + build",
    tagline: "Design plus coordination of the people who build it.",
    bestFor: "Clients who want one design team through execution",
    includes: [
      "Everything in Design only",
      "Vendor and contractor coordination",
      "Procurement support and sample approvals",
      "Stage-wise site supervision",
      "Quality checks and snag list",
    ],
    note: "Execution is delivered with our trusted partners. Scope and responsibilities are confirmed in writing.",
  },
  {
    slug: "turnkey",
    name: "Turnkey",
    tagline: "One team, one schedule, from first drawing to final handover.",
    bestFor: "Clients who want the whole project handled",
    includes: [
      "Everything in Design + build",
      "Procurement and delivery management",
      "Joinery, finishes and installation",
      "Styling and final handover",
      "Care guide and aftercare",
    ],
    note: "The most complete route. We confirm scope, timeline and payment stages before work begins.",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Brief",
    summary: "We listen, measure and define what the space needs to do.",
    deliverables: ["Project brief", "Site measurements", "Budget direction"],
  },
  {
    number: "02",
    title: "Concept",
    summary: "We test layouts and set the material and lighting direction.",
    deliverables: ["Space plan", "Concept boards", "Material direction"],
  },
  {
    number: "03",
    title: "Detail",
    summary: "We resolve joinery, services, finishes and the details that make it buildable.",
    deliverables: ["Working drawings", "Joinery details", "Finish schedule"],
  },
  {
    number: "04",
    title: "Estimate & schedule",
    summary: "We confirm scope, costs, responsibilities and the sequence of work.",
    deliverables: ["Scope of work", "Written estimate", "Project schedule"],
  },
  {
    number: "05",
    title: "Execution",
    summary: "We coordinate site, check quality and keep you updated as work progresses.",
    deliverables: ["Site coordination", "Stage updates", "Quality checks"],
  },
  {
    number: "06",
    title: "Handover",
    summary: "We close the snag list, style the space and leave you with a care guide.",
    deliverables: ["Snag list", "Styling", "Care guide"],
  },
];

export type FAQ = { category: string; question: string; answer: string };

export const faqs: FAQ[] = [
  {
    category: "Working together",
    question: "How do I start a project with GBS Interiors?",
    answer:
      "Send an enquiry or book a 30-minute intro call. We will ask about the space, your timeline and what you want to change. If it feels like a fit, we will propose the next step and a site visit.",
  },
  {
    category: "Working together",
    question: "Do you take on a single room?",
    answer:
      "Yes. A single room, a kitchen, a wardrobe or a focused consultation is a valid starting point. The scope and fee are matched to the work involved.",
  },
  {
    category: "Working together",
    question: "Do you work outside Dindigul?",
    answer:
      "We work across Tamil Nadu, including Madurai, Coimbatore and Theni. For projects further away, we can discuss remote design with local site coordination.",
  },
  {
    category: "Working together",
    question: "Can you work with my contractor?",
    answer:
      "Yes. Many clients already have a contractor or site team. We can provide the drawings and specifications, review site work and stay available for clarifications.",
  },
  {
    category: "Cost & timeline",
    question: "How much does an interior project cost?",
    answer:
      "It depends on the area, scope, finishes and site condition. We do not publish fixed prices because two homes of the same size can need very different work. Request an estimate and we will give you a written range after the brief and site visit.",
  },
  {
    category: "Cost & timeline",
    question: "How long does a project take?",
    answer:
      "A focused room can move quickly; a full home takes longer. We confirm the schedule in writing after the brief, drawings and scope are agreed. Site conditions and material lead times can affect the sequence.",
  },
  {
    category: "Cost & timeline",
    question: "How do payments work?",
    answer:
      "Payments are staged against agreed milestones. The schedule is part of the written proposal, so you know what is due and what it covers before work begins.",
  },
  {
    category: "Scope & execution",
    question: "What is included in the first consultation?",
    answer:
      "A conversation about the space, your routines, your timeline and the decisions you need to make. You leave with a clearer brief and a recommended next step, whether or not you continue with us.",
  },
  {
    category: "Scope & execution",
    question: "Do you provide 3D visuals?",
    answer:
      "Yes, where they help you understand the design. We use drawings, material samples and 3D views together, not as a substitute for a resolved plan.",
  },
  {
    category: "Scope & execution",
    question: "Can I use my own furniture and materials?",
    answer:
      "Yes. We can design around pieces you already own or want to keep. We will tell you when a piece is likely to fight the plan, and suggest alternatives if needed.",
  },
  {
    category: "Scope & execution",
    question: "Do you offer Vastu-sensitive planning?",
    answer:
      "Yes, on request. We can work with your Vastu consultant or incorporate common principles into the layout without compromising how the space works.",
  },
  {
    category: "Scope & execution",
    question: "What about warranties?",
    answer:
      "Workmanship is covered as set out in the contract. Product warranties come from the manufacturer. We hand over the relevant documents and a care guide at the end of the project.",
  },
];

export const testimonial = {
  quote:
    process.env.NEXT_PUBLIC_TESTIMONIAL_QUOTE ||
    "A room should work for the life that happens in it — not just for the photograph.",
  name: process.env.NEXT_PUBLIC_TESTIMONIAL_NAME || "GBS Interiors",
  project: process.env.NEXT_PUBLIC_TESTIMONIAL_PROJECT || "Studio principle",
};

export const clientStories = [
  {
    quote: process.env.NEXT_PUBLIC_TESTIMONIAL_1_QUOTE || "",
    name: process.env.NEXT_PUBLIC_TESTIMONIAL_1_NAME || "",
    project: process.env.NEXT_PUBLIC_TESTIMONIAL_1_PROJECT || "",
  },
  {
    quote: process.env.NEXT_PUBLIC_TESTIMONIAL_2_QUOTE || "",
    name: process.env.NEXT_PUBLIC_TESTIMONIAL_2_NAME || "",
    project: process.env.NEXT_PUBLIC_TESTIMONIAL_2_PROJECT || "",
  },
  {
    quote: process.env.NEXT_PUBLIC_TESTIMONIAL_3_QUOTE || "",
    name: process.env.NEXT_PUBLIC_TESTIMONIAL_3_NAME || "",
    project: process.env.NEXT_PUBLIC_TESTIMONIAL_3_PROJECT || "",
  },
].filter((story) => story.quote);

export type GalleryItem = {
  src: string;
  alt: string;
  room: string;
  style: string;
};

export const gallery: GalleryItem[] = [
  {
    src: u("photo-1600210492486-724fe5c67fb0", 1400),
    alt: "Living room with a gallery wall and layered natural textures",
    room: "Living",
    style: "Warm modern",
  },
  {
    src: u("photo-1600607687939-ce8a6c25118c", 1400),
    alt: "Contemporary living room with timber panelling and a grey sofa",
    room: "Living",
    style: "Contemporary",
  },
  {
    src: u("photo-1618221195710-dd6b41faaea6", 1400),
    alt: "Living room with warm timber, leather chairs and soft daylight",
    room: "Living",
    style: "Warm modern",
  },
  {
    src: u("photo-1616486338812-3dadae4b4ace", 1400),
    alt: "Light neutral living room with soft furnishings",
    room: "Living",
    style: "Minimal",
  },
  {
    src: u("photo-1615529182904-14819c35db37", 1400),
    alt: "Living room with a green wall and woven pendant lights",
    room: "Living",
    style: "Classic",
  },
  {
    src: u("photo-1618220179428-22790b461013", 1400),
    alt: "Living room with plants, a warm rug and an orange chair",
    room: "Living",
    style: "Warm modern",
  },
  {
    src: u("photo-1616137466211-f939a420be84", 1400),
    alt: "Bright living room with a large window and soft seating",
    room: "Living",
    style: "Minimal",
  },
  {
    src: u("photo-1615873968403-89e068629265", 1400),
    alt: "Living room with a deep green wall and leather sofa",
    room: "Living",
    style: "Classic",
  },
  {
    src: u("photo-1615874959474-d609969a20ed", 1400),
    alt: "Bedroom with plants, warm textiles and morning light",
    room: "Bedroom",
    style: "Warm modern",
  },
  {
    src: u("photo-1616594039964-ae9021a400a0", 1400),
    alt: "Moody bedroom with a chandelier and layered textiles",
    room: "Bedroom",
    style: "Classic",
  },
  {
    src: u("photo-1617104678098-de229db51175", 1400),
    alt: "Bedroom with dark walls and a large window",
    room: "Bedroom",
    style: "Contemporary",
  },
  {
    src: u("photo-1556912173-3bb406ef7e77", 1400),
    alt: "Bright kitchen with white cabinetry and timber details",
    room: "Kitchen",
    style: "Classic",
  },
  {
    src: u("photo-1600489000022-c2086d79f9d4", 1400),
    alt: "Kitchen with deep green cabinetry and brass hardware",
    room: "Kitchen",
    style: "Contemporary",
  },
  {
    src: u("photo-1600607688066-890987f18a86", 1400),
    alt: "Bathroom with marble surfaces and a double vanity",
    room: "Bathroom",
    style: "Contemporary",
  },
  {
    src: u("photo-1600566752355-35792bedcfea", 1400),
    alt: "Bathroom with a freestanding tub and soft natural light",
    room: "Bathroom",
    style: "Minimal",
  },
  {
    src: u("photo-1600607687920-4e2a09cf159d", 1400),
    alt: "Open-plan dining and kitchen with timber and dark stone",
    room: "Dining",
    style: "Contemporary",
  },
  {
    src: u("photo-1519710164239-da123dc03ef4", 1400),
    alt: "Minimal white dining nook with a round table",
    room: "Dining",
    style: "Minimal",
  },
  {
    src: u("photo-1617806118233-18e1de247200", 1400),
    alt: "Dining room with a green wall, timber table and plants",
    room: "Dining",
    style: "Classic",
  },
  {
    src: u("photo-1497366811353-6870744d04b2", 1400),
    alt: "Meeting room with glass walls and a long timber table",
    room: "Workspace",
    style: "Contemporary",
  },
  {
    src: u("photo-1497366216548-37526070297c", 1400),
    alt: "Calm office corridor with timber and glass",
    room: "Workspace",
    style: "Minimal",
  },
  {
    src: u("photo-1524758631624-e2822e304c36", 1400),
    alt: "Workplace lounge with soft seating and plants",
    room: "Workspace",
    style: "Contemporary",
  },
  {
    src: u("photo-1618219908412-a29a1bb7b86e", 1400),
    alt: "Mirror, console and sculptural objects in a quiet corner",
    room: "Detail",
    style: "Warm modern",
  },
];

export const galleryRooms = ["All", ...Array.from(new Set(gallery.map((item) => item.room)))];
export const galleryStyles = ["All", ...Array.from(new Set(gallery.map((item) => item.style)))];

export const projectNotes: Record<
  string,
  { scope: string; brief: string; approach: string; result: string }
> = {
  "the-quiet-house": {
    scope: "Full home interiors",
    brief:
      "A home that needed to feel calmer, hold the routines of a family, and make the most of natural light.",
    approach:
      "We reworked the plan around light, storage and movement, then simplified the material palette to timber, stone, lime plaster and a small amount of brass.",
    result:
      "A quieter, more useful home with fewer visual interruptions and materials that will age well.",
  },
  "a-softer-workspace": {
    scope: "Workplace interiors",
    brief:
      "A workspace that needed to feel welcoming, support focused work and make collaboration easy.",
    approach:
      "We softened the shell with timber, glass and planted pockets, then zoned the plan into focused, shared and informal settings.",
    result:
      "A workplace that feels calm and human, with clear settings for different kinds of work.",
  },
  "everyday-elevated": {
    scope: "Living, dining and bedrooms",
    brief:
      "A home where everyday details needed to feel more considered without becoming precious.",
    approach:
      "We focused on the pieces used every day: storage, lighting, seating and the transitions between rooms.",
    result:
      "A home that feels elevated but still easy to live in, with better storage and softer light.",
  },
};

export function getProjectNotes(slug: string, description: string) {
  return (
    projectNotes[slug] || {
      scope: "Interior design",
      brief: description,
      approach:
        "We started with the plan, the light and the way the space is used, then built the material and detail direction around it.",
      result:
        "A more considered space with a clear plan, a coherent palette and details that support daily life.",
    }
  );
}

export const cities = (
  process.env.NEXT_PUBLIC_COMPANY_CITIES ||
  "Dindigul, Madurai, Coimbatore, Theni"
)
  .split(",")
  .map((city) => city.trim())
  .filter(Boolean);

export const photoCredits = Array.from(
  new Set(
    [
      ...Object.values(photos).map((photo) => photo.src),
      ...gallery.map((item) => item.src),
    ].map((src) => src.split("?")[0])
  )
);
