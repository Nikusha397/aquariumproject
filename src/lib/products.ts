// ─────────────────────────────────────────────────────────────
// Product catalog modeled on a Red Sea–style reef brand
// (aquarium systems, smart hardware, reef-care consumables).
// Photos live in /public/products (brand share images, logo removed).
// Add a real product by appending to `products`; swap a photo via `image`.
// Prices are indicative demo values in USD.
// ─────────────────────────────────────────────────────────────

export type Motif = "fish" | "coral" | "shell" | "light" | "pump" | "wave";

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  hue: number;
  motif: Motif;
  image?: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string; // Category slug
  price: number; // USD
  hue: number; // placeholder color (only used if `image` is missing)
  motif: Motif;
  badge?: string;
  short: string;
  description: string;
  specs: { label: string; value: string }[];
  inStock: boolean;
  image?: string;
};

export const categories: Category[] = [
  {
    slug: "aquariums",
    name: "Aquariums",
    tagline: "Reef-ready aquarium systems",
    description:
      "Complete rimless reef systems with integrated filtration, plumbing and cabinet — from nano to flagship.",
    hue: 200,
    motif: "wave",
    image: "/categories/aquariums.jpg",
  },
  {
    slug: "hardware",
    name: "Hardware",
    tagline: "Smart pumps, skimmers & dosing",
    description:
      "App-controlled circulation, return pumps, protein skimmers, dosers and roller filters for a stable reef.",
    hue: 210,
    motif: "pump",
    image: "/categories/hardware.jpg",
  },
  {
    slug: "reef-care",
    name: "Reef Care",
    tagline: "Salt, supplements & water care",
    description:
      "Reef salt and balanced supplement programs that keep water chemistry on target for coral growth.",
    hue: 320,
    motif: "shell",
    image: "/categories/reef-care.jpg",
  },
];

export const products: Product[] = [
  // ── Aquariums ──
  {
    slug: "reefer-g3",
    name: "REEFER G3",
    category: "aquariums",
    price: 1899,
    hue: 200,
    motif: "wave",
    badge: "Bestseller",
    short: "Reef-ready rimless system with a redesigned flow.",
    description:
      "The REEFER G3 is a premium rimless reef system with an upgraded sump, refined plumbing and up to 50% more circulation — a proven platform for a thriving reef.",
    specs: [
      { label: "Volume", value: "350 L total" },
      { label: "Glass", value: "Low-iron, rimless" },
      { label: "Sump", value: "Integrated + plumbing" },
      { label: "Cabinet", value: "Included" },
    ],
    inStock: true,
    image: "/products/reefer-g3.png",
  },
  {
    slug: "reefer-max-g3",
    name: "REEFER MAX G3",
    category: "aquariums",
    price: 3199,
    hue: 205,
    motif: "wave",
    badge: "Plug & Play",
    short: "Fully equipped, app-controlled reef system.",
    description:
      "The REEFER MAX G3 ships fully equipped — integrated ReefLED lighting, ReefWave circulation and ReefRun pumps, all managed from the ReefBeat app.",
    specs: [
      { label: "Volume", value: "350 L total" },
      { label: "Lighting", value: "ReefLED included" },
      { label: "Flow", value: "ReefWave included" },
      { label: "Control", value: "ReefBeat app" },
    ],
    inStock: true,
    image: "/products/reefer-max.png",
  },
  {
    slug: "max-nano-g2",
    name: "MAX NANO G2",
    category: "aquariums",
    price: 799,
    hue: 195,
    motif: "wave",
    short: "Compact all-in-one nano reef.",
    description:
      "The MAX NANO G2 packs a complete reef system into a compact footprint — integrated filtration, lighting and circulation, ready out of the box.",
    specs: [
      { label: "Volume", value: "75 L total" },
      { label: "Footprint", value: "45 × 50 cm" },
      { label: "Lighting", value: "ReefLED 50" },
      { label: "Cabinet", value: "Optional" },
    ],
    inStock: true,
    image: "/products/max-nano.jpg",
  },

  // ── Hardware ──
  {
    slug: "reefwave-45",
    name: "ReefWave 45",
    category: "hardware",
    price: 320,
    hue: 210,
    motif: "wave",
    short: "Smart cross-flow circulation pump.",
    description:
      "The ReefWave 45 delivers a natural cross-flow wave pattern with quiet operation and full ReefBeat app control of speed and modes.",
    specs: [
      { label: "Flow", value: "up to 13,000 L/h" },
      { label: "Tank size", value: "200–450 L" },
      { label: "Control", value: "ReefBeat app" },
      { label: "Modes", value: "Wave / pulse / random" },
    ],
    inStock: true,
    image: "/products/reefwave.png",
  },
  {
    slug: "reefdose-4",
    name: "ReefDose 4",
    category: "hardware",
    price: 420,
    hue: 215,
    motif: "pump",
    short: "4-channel precision dosing pump.",
    description:
      "ReefDose 4 automates supplement dosing with 0.1 ml accuracy across four channels, scheduled and tracked in the ReefBeat app.",
    specs: [
      { label: "Channels", value: "4" },
      { label: "Accuracy", value: "0.1 ml" },
      { label: "Control", value: "ReefBeat app" },
      { label: "Calibration", value: "Auto" },
    ],
    inStock: true,
    image: "/products/reefdose.png",
  },
  {
    slug: "rsk-dc-skimmer",
    name: "RSK-300 DC Skimmer",
    category: "hardware",
    price: 480,
    hue: 208,
    motif: "pump",
    badge: "Recommended",
    short: "Quiet DC-driven protein skimmer.",
    description:
      "A high-efficiency in-sump protein skimmer with a controllable DC pump — strong, quiet skimming and easy fine-tuning.",
    specs: [
      { label: "Tank size", value: "up to 300 L" },
      { label: "Pump", value: "DC, adjustable" },
      { label: "Mount", value: "In-sump" },
      { label: "Noise", value: "Very low" },
    ],
    inStock: true,
    image: "/products/dc-skimmer.jpg",
  },
  {
    slug: "reefrun-7000",
    name: "ReefRun 7000 DC Pump",
    category: "hardware",
    price: 230,
    hue: 212,
    motif: "pump",
    short: "Energy-efficient DC return pump.",
    description:
      "The ReefRun 7000 return pump pairs quiet, energy-efficient DC operation with full speed control through the ReefBeat app.",
    specs: [
      { label: "Output", value: "7000 L/h" },
      { label: "Type", value: "DC, controllable" },
      { label: "Control", value: "ReefBeat app" },
      { label: "Noise", value: "Low" },
    ],
    inStock: true,
    image: "/products/reefrun.png",
  },
  {
    slug: "reefmat-500",
    name: "ReefMat 500",
    category: "hardware",
    price: 550,
    hue: 206,
    motif: "pump",
    badge: "New",
    short: "Automatic fleece roller filter.",
    description:
      "ReefMat 500 automatically advances a fine fleece roll to keep mechanical filtration fresh — no filter socks, weeks of hands-off operation.",
    specs: [
      { label: "Tank size", value: "up to 500 L" },
      { label: "Roll length", value: "28 m" },
      { label: "Control", value: "ReefBeat app" },
      { label: "Mount", value: "In-sump" },
    ],
    inStock: true,
    image: "/products/reefmat.png",
  },

  // ── Reef Care ──
  {
    slug: "coral-pro-salt",
    name: "Coral Pro Salt",
    category: "reef-care",
    price: 69,
    hue: 320,
    motif: "shell",
    badge: "Bestseller",
    short: "Reef salt for accelerated coral growth.",
    description:
      "Coral Pro Salt provides elevated, balanced levels of the foundation elements (calcium, magnesium, alkalinity) for fast, healthy coral growth.",
    specs: [
      { label: "Makes", value: "600 L" },
      { label: "Type", value: "Synthetic reef salt" },
      { label: "Foundation", value: "Elevated levels" },
      { label: "Use", value: "Mixing & water changes" },
    ],
    inStock: true,
    image: "/products/salt.png",
  },
  {
    slug: "complete-4-part",
    name: "Complete Reef Care — 4 Part",
    category: "reef-care",
    price: 99,
    hue: 315,
    motif: "shell",
    short: "Simplified foundation supplement program.",
    description:
      "The 4-Part program maintains the core foundation elements with a simple, balanced daily dosing routine — ideal for most reef tanks.",
    specs: [
      { label: "Parts", value: "4" },
      { label: "Targets", value: "Ca / Mg / KH / trace" },
      { label: "Dosing", value: "Daily" },
      { label: "Pairs with", value: "ReefDose" },
    ],
    inStock: true,
    image: "/products/supplement-4.png",
  },
  {
    slug: "complete-7-part",
    name: "Complete Reef Care — 7 Part",
    category: "reef-care",
    price: 159,
    hue: 330,
    motif: "shell",
    short: "Advanced full-spectrum supplement program.",
    description:
      "The 7-Part program extends foundation dosing with supplemental trace elements and coloration components for demanding SPS-focused reefs.",
    specs: [
      { label: "Parts", value: "7" },
      { label: "Targets", value: "Foundation + trace" },
      { label: "Dosing", value: "Daily" },
      { label: "Pairs with", value: "ReefDose" },
    ],
    inStock: true,
    image: "/products/supplement-7.png",
  },
];

// ── Helpers ──
export function formatPrice(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getFeaturedProducts(count = 6): Product[] {
  return [...products].filter((p) => p.inStock).slice(0, count);
}
