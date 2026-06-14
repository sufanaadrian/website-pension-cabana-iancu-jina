export type FontKey =
  | "geist"
  | "inter"
  | "poppins"
  | "worksans"
  | "nunito"
  | "quicksand"
  | "spacegrotesk"
  | "lora"
  | "playfair"
  | "fraunces"
  | "cormorant"
  | "dmserif"
  | "oswald"
  | "bebas";

export type FontOption = {
  key: FontKey;
  label: string;
  cssVar: string;
  category: "Sans" | "Serif" | "Display";
};

// Curated set of Google Fonts, loaded statically in app/layout.tsx (one
// `--font-*` CSS variable each). Heading/body selection just picks which
// variable `--font-heading` / `--font-body` resolve to — see app/page.tsx.
export const FONT_OPTIONS: FontOption[] = [
  { key: "geist", label: "Geist", cssVar: "--font-geist-sans", category: "Sans" },
  { key: "inter", label: "Inter", cssVar: "--font-inter", category: "Sans" },
  { key: "poppins", label: "Poppins", cssVar: "--font-poppins", category: "Sans" },
  { key: "worksans", label: "Work Sans", cssVar: "--font-worksans", category: "Sans" },
  { key: "nunito", label: "Nunito Sans", cssVar: "--font-nunito", category: "Sans" },
  { key: "quicksand", label: "Quicksand", cssVar: "--font-quicksand", category: "Sans" },
  { key: "spacegrotesk", label: "Space Grotesk", cssVar: "--font-spacegrotesk", category: "Sans" },
  { key: "lora", label: "Lora", cssVar: "--font-lora", category: "Serif" },
  { key: "playfair", label: "Playfair Display", cssVar: "--font-playfair", category: "Serif" },
  { key: "fraunces", label: "Fraunces", cssVar: "--font-fraunces", category: "Serif" },
  { key: "cormorant", label: "Cormorant Garamond", cssVar: "--font-cormorant", category: "Serif" },
  { key: "dmserif", label: "DM Serif Display", cssVar: "--font-dmserif", category: "Serif" },
  { key: "oswald", label: "Oswald", cssVar: "--font-oswald", category: "Display" },
  { key: "bebas", label: "Bebas Neue", cssVar: "--font-bebas", category: "Display" },
];

export const FONT_MAP: Record<FontKey, FontOption> = Object.fromEntries(
  FONT_OPTIONS.map((f) => [f.key, f])
) as Record<FontKey, FontOption>;

// Fallback heading/body pairing per design variant, used when the client
// hasn't explicitly picked a font yet.
export const VARIANT_DEFAULT_FONTS: Record<string, { heading: FontKey; body: FontKey }> = {
  classic: { heading: "playfair", body: "lora" },
  nature: { heading: "fraunces", body: "quicksand" },
  dark: { heading: "cormorant", body: "geist" },
  bold: { heading: "oswald", body: "geist" },
};
