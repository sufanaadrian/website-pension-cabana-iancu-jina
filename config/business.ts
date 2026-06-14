import clientData from "@/data/client.json";
import type { FontKey } from "@/lib/fonts";

export type BusinessType =
  | "generic"
  | "hotel"
  | "pension"
  | "cottage"
  | "restaurant"
  | "mechanic"
  | "salon";

export type DesignVariant = "classic" | "dark" | "bold" | "nature";

export type Service = {
  title: string;
  description: string;
  price?: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Testimonial = {
  name: string;
  role?: string;
  text: string;
  stars?: number;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type Room = {
  title: string;
  description: string;
  price: string;
  imageUrl?: string;    // legacy single image — kept for backward compat
  images?: string[];    // multiple images (carousel in the room card)
  features?: string[];
  bookingUrl?: string;
};

export type BookingOption = {
  title: string;
  description: string;
  season?: string;
};

export type ShowSections = {
  gallery?: boolean;
  reviews?: boolean;
  faq?: boolean;
  stats?: boolean;
  contactForm?: boolean;
};

export type SectionId = "services" | "gallery" | "about" | "reviews" | "rooms" | "faq";

export const DEFAULT_SECTION_ORDER: SectionId[] = ["services", "gallery", "about", "reviews", "rooms", "faq"];

// Default tinted-section background for the Nature design variant.
export const DEFAULT_NATURE_BG = "#F5F1E6";

export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
};

export type SectionHeading = {
  title?: string;
  subtitle?: string;
};

export type SectionHeadings = {
  services?: SectionHeading;
  gallery?: SectionHeading;
  about?: SectionHeading;
  rooms?: SectionHeading;
  reviews?: SectionHeading;
  faq?: SectionHeading;
  contact?: SectionHeading;
};

export type BusinessConfig = {
  // Admin-only metadata, not used by site components.
  repoName?: string;
  name: string;
  tagline: string;
  description: string;
  phone: string;
  extraPhones?: string[];
  email: string;
  address: string;
  city: string;
  hours: string;
  primaryColor: string;
  secondaryColor?: string;
  natureBackgroundColor?: string;
  natureAccentColor?: string;
  logoUrl?: string;
  logoSize?: "sm" | "md" | "lg";
  logoShape?: "square" | "rounded" | "circle";
  businessType?: BusinessType;
  designVariant?: DesignVariant;
  headingFont?: FontKey;
  bodyFont?: FontKey;
  heroLayout?: "center" | "left" | "split";
  heroOverlay?: "light" | "medium" | "dark" | "heavy";
  heroTint?: "default" | "neutral" | "none";
  headerStyle?: "solid" | "transparent" | "hidden";
  headerTextSize?: "sm" | "md" | "lg";
  headerHiddenShowMenu?: boolean;
  headerScrollSolid?: boolean;
  headerShowCallButton?: boolean;
  buttonStyle?: "pill" | "rounded" | "sharp";
  showSections?: ShowSections;
  showFacebookButton?: boolean;
  sectionOrder?: SectionId[];
  services: Service[];
  socialLinks: SocialLinks;
  googleMapsEmbedUrl?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  bookingComUrl?: string;
  airbnbUrl?: string;
  bookingNotes?: string;
  bookingOptions?: BookingOption[];
  bookingOptionsTitle?: string;
  web3formsKey?: string;
  whatsapp?: string;
  gallery?: string[];
  galleryPreviewLimit?: number;
  testimonials?: Testimonial[];
  showGoogleReviewsButton?: boolean;
  googleReviewsUrl?: string;
  faq?: FAQItem[];
  rooms?: Room[];
  bulletPoints?: string[];
  stats?: Stat[];
  sectionHeadings?: SectionHeadings;
};

export const business: BusinessConfig = clientData as BusinessConfig;

// Multiplies each RGB channel of `hex` by (1 - amount), producing a darker shade.
export function darkenHex(hex: string, amount: number): string {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return hex;
  const r = Math.round(((num >> 16) & 0xff) * (1 - amount));
  const g = Math.round(((num >> 8) & 0xff) * (1 - amount));
  const b = Math.round((num & 0xff) * (1 - amount));
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

// Perceived brightness of `hex`, from 0 (black) to 1 (white).
export function getLuminance(hex: string): number {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return 1;
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

// Lightens each RGB channel of `hex` towards white by `amount` (0-1).
export function lightenHex(hex: string, amount: number): string {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return hex;
  const r = Math.round(((num >> 16) & 0xff) + (255 - ((num >> 16) & 0xff)) * amount);
  const g = Math.round(((num >> 8) & 0xff) + (255 - ((num >> 8) & 0xff)) * amount);
  const b = Math.round((num & 0xff) + (255 - (num & 0xff)) * amount);
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

// Returns near-black or near-white, whichever gives better contrast against `hex`.
export function getContrastColor(hex: string): string {
  return getLuminance(hex) > 0.6 ? "#1a1a1a" : "#ffffff";
}

// Text/icon color to use on top of a `primaryColor` background.
export function getPrimaryContrastColor(): string {
  return getContrastColor(business.primaryColor);
}

// `primaryColor`, adjusted for readability when used as accent-colored text
// directly on a page background (e.g. a price next to white/dark section
// backgrounds) rather than as a filled badge. Darkens it if it's too light
// for a light background, or lightens it if it's too dark for a dark one.
export function getReadablePrimaryColor(onLight: boolean): string {
  const luminance = getLuminance(business.primaryColor);
  if (onLight && luminance > 0.7) return darkenHex(business.primaryColor, 0.45);
  if (!onLight && luminance < 0.25) return lightenHex(business.primaryColor, 0.5);
  return business.primaryColor;
}

// Dark tone used behind the Nature hero photo — defaults to a darker shade
// of the section background tint, but can be overridden independently.
export function getNatureAccentColor(): string {
  return business.natureAccentColor || darkenHex(business.natureBackgroundColor || DEFAULT_NATURE_BG, 0.82);
}

// Converts a `#rgb`/`#rrggbb` hex color to an `rgba(...)` string at the given alpha (0-1).
export function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return hex;
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Page background shown around/behind the hero on each design variant —
// used for the body background so safe-area insets don't show a mismatched color.
const VARIANT_BODY_BG: Record<DesignVariant, string> = {
  classic: "#FBF6ED",
  nature: "",
  dark: "#030712",
  bold: "#000000",
};

export function getBodyBackgroundColor(): string {
  const variant = business.designVariant ?? "classic";
  if (variant === "nature") return getNatureAccentColor();
  return VARIANT_BODY_BG[variant] || VARIANT_BODY_BG.classic;
}
