/**
 * Single source of truth for the Black November campaign.
 * Change dates, prices, packages, social links and contact info here only.
 */

// Campaign window — interpreted in Europe/Bucharest time (UTC+2 in November).
export const CAMPAIGN = {
  start: new Date("2026-11-11T00:00:00+02:00"),
  end: new Date("2026-11-30T23:59:59+02:00"),
  currency: "EUR",
  headlineDiscount: 50, // "UP TO 50%" — must equal the highest discount below
};

export type CampaignPhase = "upcoming" | "active" | "ended";

export function getCampaignPhase(now: Date): CampaignPhase {
  if (now < CAMPAIGN.start) return "upcoming";
  if (now <= CAMPAIGN.end) return "active";
  return "ended";
}

export type ServiceId =
  | "landing"
  | "business"
  | "advanced"
  | "logo"
  | "miniBrand"
  | "completeBrand"
  | "social"
  | "banner"
  | "brandWebsite"
  | "custom";

export type PackageId = "brandStarter" | "digitalLaunch" | "businessPresence" | "completePresence";

export interface Offer {
  id: Exclude<ServiceId, "custom">;
  regular: number;
  campaign: number;
  /** true → "From €X" (starting price); false → fixed price */
  regularFrom: boolean;
  campaignFrom: boolean;
  unit?: "post" | "banner";
}

export const OFFERS: Offer[] = [
  { id: "landing", regular: 79, campaign: 59, regularFrom: true, campaignFrom: false },
  { id: "business", regular: 129, campaign: 99, regularFrom: true, campaignFrom: false },
  { id: "advanced", regular: 250, campaign: 199, regularFrom: true, campaignFrom: false },
  { id: "logo", regular: 25, campaign: 19, regularFrom: true, campaignFrom: false },
  { id: "miniBrand", regular: 59, campaign: 45, regularFrom: false, campaignFrom: false },
  { id: "completeBrand", regular: 99, campaign: 79, regularFrom: false, campaignFrom: false },
  { id: "social", regular: 5, campaign: 2.5, regularFrom: true, campaignFrom: false, unit: "post" },
  { id: "banner", regular: 5, campaign: 2.5, regularFrom: true, campaignFrom: false, unit: "banner" },
  { id: "brandWebsite", regular: 199, campaign: 159, regularFrom: true, campaignFrom: true },
];

export interface Package {
  id: PackageId;
  number: string;
  reference: number;
  campaign: number;
  featured?: boolean;
  /** Deliverables: service id + quantity (prices derive the reference value) */
  includes: { service: Exclude<ServiceId, "custom" | "brandWebsite">; qty: number }[];
}

export const PACKAGES: Package[] = [
  {
    id: "brandStarter",
    number: "01",
    reference: 99,
    campaign: 69,
    includes: [
      { service: "logo", qty: 1 },
      { service: "miniBrand", qty: 1 },
      { service: "social", qty: 3 },
    ],
  },
  {
    id: "digitalLaunch",
    number: "02",
    reference: 178,
    campaign: 119,
    featured: true,
    includes: [
      { service: "landing", qty: 1 },
      { service: "logo", qty: 1 },
      { service: "miniBrand", qty: 1 },
      { service: "social", qty: 3 },
    ],
  },
  {
    id: "businessPresence",
    number: "03",
    reference: 243,
    campaign: 179,
    includes: [
      { service: "business", qty: 1 },
      { service: "completeBrand", qty: 1 },
      { service: "social", qty: 3 },
    ],
  },
  {
    id: "completePresence",
    number: "04",
    reference: 384,
    campaign: 279,
    includes: [
      { service: "advanced", qty: 1 },
      { service: "completeBrand", qty: 1 },
      { service: "social", qty: 5 },
      { service: "banner", qty: 2 },
    ],
  },
];

export const SERVICE_IDS: ServiceId[] = [
  "landing",
  "business",
  "advanced",
  "logo",
  "miniBrand",
  "completeBrand",
  "social",
  "banner",
  "brandWebsite",
  "custom",
];

export function discountPercent(regular: number, campaign: number) {
  return Math.round(((regular - campaign) / regular) * 100);
}

export function formatEUR(value: number) {
  return `€${Number.isInteger(value) ? value : value.toFixed(2)}`;
}

/**
 * Verified social accounts. Leave a value empty ("") to hide that button —
 * never put a guessed URL here.
 */
export const SOCIAL_LINKS: { platform: "instagram" | "facebook" | "linkedin" | "behance" | "tiktok"; url: string }[] = [
  { platform: "instagram", url: "" },
  { platform: "facebook", url: "" },
  { platform: "linkedin", url: "" },
  { platform: "behance", url: "" },
  { platform: "tiktok", url: "" },
];

/** Verified public contact email. Empty = hidden. */
export const CONTACT_EMAIL = "";

export const SITE_URL = "https://deyok.site";
