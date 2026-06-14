import Image from "next/image";
import {
  business,
  DEFAULT_SECTION_ORDER,
  DEFAULT_NATURE_BG,
  getNatureAccentColor,
  hexToRgba,
  type SectionId,
} from "@/config/business";
import { RichInline, stripMarkdown } from "@/components/RichText";
import { getButtonRadius } from "@/lib/design";

// Background color of each section, per design variant — used to fade the
// hero photo smoothly into whichever section comes right after it.
const SECTION_BG: Record<string, Partial<Record<SectionId, string>>> = {
  classic: {
    services: "#F9FAFB",
    gallery: "#FFFFFF",
    about: "#FFFFFF",
    reviews: "#F9FAFB",
    rooms: "#F9FAFB",
    faq: "#FFFFFF",
  },
  dark: {
    services: "#030712",
    gallery: "#030712",
    about: "#111827",
    reviews: "#030712",
    rooms: "#030712",
    faq: "#030712",
  },
  bold: {
    services: "#000000",
    gallery: "#000000",
    about: "#FFFFFF",
    reviews: "#000000",
    rooms: "#000000",
    faq: "#000000",
  },
};

function getNextSectionColor(variant: string): string {
  if (variant === "nature") return business.natureBackgroundColor || DEFAULT_NATURE_BG;
  const order = business.sectionOrder ?? DEFAULT_SECTION_ORDER;
  const show = business.showSections as
    | Partial<Record<SectionId, boolean>>
    | undefined;
  const firstId = order.find((id) => show?.[id] !== false) ?? order[0];
  return SECTION_BG[variant]?.[firstId] ?? "#FFFFFF";
}

// Full-width gradient fading the bottom of a full-bleed hero photo into the
// background color of the section that follows it.
function HeroFadeOut({ color }: { color: string }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-32 md:h-48 pointer-events-none"
      style={{
        background: `linear-gradient(to bottom, transparent, ${color})`,
      }}
    />
  );
}

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z"
    />
  </svg>
);

const BookingIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.267 14.83a3.46 3.46 0 01-3.458 3.458H9.17a3.46 3.46 0 01-3.458-3.457V9.17A3.46 3.46 0 019.17 5.713h4.64a3.46 3.46 0 013.457 3.457zm1.995 0V9.17C19.262 6.068 16.912 3.718 13.81 3.718H9.17C6.068 3.718 3.718 6.068 3.718 9.17v5.66c0 3.102 2.35 5.452 5.452 5.452h4.64c3.102 0 5.452-2.35 5.452-5.452zM12 8.285a3.715 3.715 0 100 7.43 3.715 3.715 0 000-7.43zm0 1.995a1.72 1.72 0 110 3.44 1.72 1.72 0 010-3.44zm3.833-2.905a.832.832 0 100 1.664.832.832 0 000-1.664z" />
  </svg>
);

const LeafIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 21c-5-1-8-5-8-10C8 8 12 4 21 3c0 9-4 13-9 14-1 2-1 3-1 4z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 20C9 15 14 11 20 4"
    />
  </svg>
);

// Overlay tint shown over the hero photo. For Nature this is derived from
// the user's chosen accent color (via inline style); other variants use a
// plain black tint at varying opacity (via Tailwind classes).
function getOverlay(
  variant: string,
  heroOverlay?: string,
  heroTint?: string,
): { className: string; style?: React.CSSProperties } {
  // "none" removes the tint entirely; "neutral" forces a black tint even on
  // nature; "default"/undefined keeps each variant's signature color.
  if (heroTint === "none") return { className: "" };
  const isNature = variant === "nature" && heroTint !== "neutral";
  if (isNature) {
    const opacityMap: Record<string, number> = {
      light: 0.35,
      medium: 0.55,
      dark: 0.7,
      heavy: 0.85,
    };
    const opacity = heroOverlay ? opacityMap[heroOverlay] ?? 0.55 : 0.6;
    return { className: "", style: { backgroundColor: hexToRgba(getNatureAccentColor(), opacity) } };
  }
  if (heroOverlay) {
    const map: Record<string, string> = {
      light: "bg-black/30",
      medium: "bg-black/50",
      dark: "bg-black/65",
      heavy: "bg-black/80",
    };
    return { className: map[heroOverlay] ?? "bg-black/50" };
  }
  const isBold = variant === "bold";
  return { className: isBold ? "bg-black/70" : "bg-black/60" };
}

// ─── Shared CTA group used by the "split" hero layout, themed per variant ─
function HeroCTAGroup({
  variant,
  ctaRadius,
}: {
  variant: "classic" | "nature" | "dark";
  ctaRadius: string;
}) {
  const styles: Record<
    typeof variant,
    { primary: string; secondary: string; primaryStyle?: React.CSSProperties }
  > = {
    classic: {
      primary: "text-on-primary",
      secondary:
        "border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white",
      primaryStyle: { backgroundColor: business.primaryColor },
    },
    nature: {
      primary: "text-on-primary",
      secondary: "border-2 border-nature-soft text-nature hover:bg-nature-soft",
      primaryStyle: { backgroundColor: business.primaryColor },
    },
    dark: {
      primary: "text-gray-900 bg-white hover:bg-white/90",
      secondary: "border border-white/30 text-white hover:bg-white/10",
    },
  };
  const s = styles[variant];

  return (
    <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
      <a
        href={`tel:${business.phone.replace(/\s/g, "")}`}
        className={`inline-flex items-center justify-center gap-2 font-semibold px-7 py-3 ${ctaRadius} hover:opacity-90 transition-opacity ${s.primary}`}
        style={s.primaryStyle}
      >
        <PhoneIcon className="w-5 h-5" />
        Sună acum
      </a>
      {business.bookingComUrl && (
        <a
          href={business.bookingComUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 font-semibold px-7 py-3 ${ctaRadius} transition-colors ${s.secondary}`}
        >
          <BookingIcon className="w-5 h-5" />
          Booking.com
        </a>
      )}
      {business.airbnbUrl && (
        <a
          href={business.airbnbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 font-semibold px-7 py-3 ${ctaRadius} transition-colors ${s.secondary}`}
        >
          Airbnb
        </a>
      )}
    </div>
  );
}

// ─── "Split" hero layout — solid panel + full-height photo, themed per variant ─
function HeroSplit({ variant }: { variant: "classic" | "nature" | "dark" }) {
  const ctaRadius = getButtonRadius(false, business.buttonStyle);
  const overlay = getOverlay(
    variant,
    business.heroOverlay,
    business.heroTint,
  );

  const theme = {
    classic: {
      section: "bg-[#FBF6ED]",
      sectionStyle: undefined as React.CSSProperties | undefined,
      eyebrowLabel: "Bun venit",
      eyebrowCls: "text-gray-500",
      headingCls: "font-bold text-gray-900",
      taglineCls: "text-gray-600 italic",
      hoursCls: "text-gray-500",
      placeholderBg: business.primaryColor,
    },
    nature: {
      section: "",
      sectionStyle: { backgroundColor: getNatureAccentColor() },
      eyebrowLabel: "Bun venit",
      eyebrowCls: "text-white/70",
      headingCls: "font-bold text-white",
      taglineCls: "text-white/70",
      hoursCls: "text-white/50",
      placeholderBg: business.primaryColor,
    },
    dark: {
      section: "bg-gray-950",
      sectionStyle: undefined as React.CSSProperties | undefined,
      eyebrowLabel: "",
      eyebrowCls: "text-white/50 tracking-[0.4em]",
      headingCls: "font-light text-white",
      taglineCls: "text-white/60",
      hoursCls: "text-white/40 uppercase tracking-widest text-xs",
      placeholderBg: "#111827",
    },
  }[variant];

  return (
    <section
      className={`relative min-h-screen min-h-[100dvh] flex flex-col md:flex-row ${theme.section}`}
      style={theme.sectionStyle}
    >
      <div className="order-2 md:order-1 md:w-1/2 flex items-center px-6 py-16 md:px-12 lg:px-20">
        <div className="max-w-lg mx-auto md:mx-0">
          <div className="mb-4 flex items-center gap-3">
            <span
              className="h-px w-12"
              style={{ backgroundColor: business.primaryColor }}
            />
            <span
              className={`text-xs tracking-[0.4em] uppercase ${theme.eyebrowCls}`}
            >
              {theme.eyebrowLabel}
            </span>
          </div>
          <h1
            className={`text-4xl md:text-6xl mb-4 leading-tight ${theme.headingCls}`}
          >
            <RichInline text={business.name} />
          </h1>
          <p className={`text-lg md:text-xl mb-8 ${theme.taglineCls}`}>
            <RichInline text={business.tagline} />
          </p>
          <HeroCTAGroup variant={variant} ctaRadius={ctaRadius} />
          <p className={`mt-6 text-sm ${theme.hoursCls}`}>
            <RichInline text={business.hours} />
          </p>
        </div>
      </div>
      <div className="relative order-1 md:order-2 md:w-1/2 h-[40vh] md:h-auto">
        {business.heroImageUrl ? (
          <>
            <Image
              src={business.heroImageUrl}
              alt={business.heroImageAlt ?? stripMarkdown(business.name)}
              fill
              className="object-cover"
              priority
            />
            <div className={`absolute inset-0 ${overlay.className}`} style={overlay.style} />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: theme.placeholderBg }}
          />
        )}
      </div>
      <HeroFadeOut color={getNextSectionColor(variant)} />
    </section>
  );
}

// ─── Classic — warm "postcard" split layout, no full-bleed photo ──────────
function HeroClassic() {
  const ctaRadius = getButtonRadius(false, business.buttonStyle);
  const overlay = getOverlay(
    "classic",
    business.heroOverlay,
    business.heroTint,
  );

  if (business.heroLayout === "split") return <HeroSplit variant="classic" />;

  return (
    <section className="relative min-h-screen min-h-[100dvh] flex items-center bg-[#FBF6ED] overflow-hidden">
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-[0.08] pointer-events-none"
        style={{ backgroundColor: business.primaryColor }}
      />
      <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center w-full">
        <div className="order-2 md:order-1">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="h-px w-10"
              style={{ backgroundColor: business.primaryColor }}
            />
            <span className="text-sm uppercase tracking-[0.3em] text-gray-500 italic">
              Bun venit
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-5 leading-tight">
            <RichInline text={business.name} />
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 italic leading-relaxed">
            <RichInline text={business.tagline} />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap mb-8">
            <a
              href={`tel:${business.phone.replace(/\s/g, "")}`}
              className={`inline-flex items-center justify-center gap-2 text-on-primary font-semibold px-8 py-3 ${ctaRadius} hover:opacity-90 transition-opacity text-lg`}
              style={{ backgroundColor: business.primaryColor }}
            >
              <PhoneIcon className="w-5 h-5" />
              Sună acum
            </a>
            {business.bookingComUrl && (
              <a
                href={business.bookingComUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 font-semibold px-8 py-3 ${ctaRadius} hover:bg-gray-900 hover:text-white transition-colors text-lg`}
              >
                <BookingIcon className="w-5 h-5" />
                Booking.com
              </a>
            )}
            {business.airbnbUrl && (
              <a
                href={business.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 font-semibold px-8 py-3 ${ctaRadius} hover:bg-gray-900 hover:text-white transition-colors text-lg`}
              >
                Airbnb
              </a>
            )}
          </div>
          <p className="text-sm text-gray-500">
            <RichInline text={business.hours} />
          </p>
        </div>
        <div className="order-1 md:order-2 relative">
          <div
            className="absolute -bottom-5 -left-5 w-24 h-24 -z-10 hidden md:block"
            style={{ backgroundColor: business.primaryColor, opacity: 0.15 }}
          />
          <div className="bg-white p-3 md:p-4 shadow-2xl rotate-2">
            <div className="relative aspect-[4/5] overflow-hidden">
              {business.heroImageUrl ? (
                <>
                  <Image
                    src={business.heroImageUrl}
                    alt={business.heroImageAlt ?? stripMarkdown(business.name)}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div
                    className={`absolute inset-0 ${overlay.className} opacity-40`}
                    style={overlay.style}
                  />
                </>
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: business.primaryColor }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <HeroFadeOut color={getNextSectionColor("classic")} />
    </section>
  );
}

// ─── Nature — full-bleed photo with an organic card floating over it ──────
function HeroNature() {
  const ctaRadius = getButtonRadius(false, business.buttonStyle);
  const overlay = getOverlay(
    "nature",
    business.heroOverlay,
    business.heroTint,
  );
  const isLeft = business.heroLayout === "left";

  if (business.heroLayout === "split") return <HeroSplit variant="nature" />;

  return (
    <section className="relative min-h-screen min-h-[100dvh] flex flex-col" style={{ backgroundColor: getNextSectionColor("nature") }}>
      <div className="relative flex-1 min-h-[55vh] md:min-h-[60vh]">
        {business.heroImageUrl ? (
          <>
            <Image
              src={business.heroImageUrl}
              alt={business.heroImageAlt ?? stripMarkdown(business.name)}
              fill
              className="object-cover"
              priority
            />
            <div className={`absolute inset-0 ${overlay.className}`} style={overlay.style} />
            <HeroFadeOut color={getNextSectionColor("nature")} />
          </>
        ) : (
          <div className="absolute inset-0" style={{ backgroundColor: getNatureAccentColor() }} />
        )}
        <div
          className={`absolute top-10 w-40 h-40 rounded-full opacity-20 blur-2xl pointer-events-none ${isLeft ? "left-10" : "left-1/2 -translate-x-1/2"}`}
          style={{ backgroundColor: business.primaryColor }}
        />
      </div>
      <div
        className={`relative z-10 -mt-16 md:-mt-20 mx-4 sm:mx-auto sm:max-w-2xl bg-white shadow-xl px-8 py-10 md:px-14 md:py-12 mb-10 md:mb-16 rounded-[2.5rem] md:rounded-[3rem] ${
          isLeft ? "text-left" : "text-center"
        }`}
      >
        <div
          className={`w-12 h-12 mb-4 flex items-center justify-center text-on-primary ${isLeft ? "" : "mx-auto"}`}
          style={{
            backgroundColor: business.primaryColor,
            borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%",
          }}
        >
          <LeafIcon className="w-6 h-6" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-nature mb-3 leading-tight">
          <RichInline text={business.name} />
        </h1>
        <p className="text-base md:text-lg text-nature-60 mb-7">
          <RichInline text={business.tagline} />
        </p>
        <div
          className={`flex flex-col sm:flex-row gap-3 flex-wrap mb-5 ${isLeft ? "justify-start" : "justify-center"}`}
        >
          <a
            href={`tel:${business.phone.replace(/\s/g, "")}`}
            className={`inline-flex items-center justify-center gap-2 text-on-primary font-semibold px-7 py-3 ${ctaRadius} hover:opacity-90 transition-opacity`}
            style={{ backgroundColor: business.primaryColor }}
          >
            <PhoneIcon className="w-5 h-5" />
            Sună acum
          </a>
          {business.bookingComUrl && (
            <a
              href={business.bookingComUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 border-2 border-nature-soft text-nature font-semibold px-7 py-3 ${ctaRadius} hover:bg-nature-soft transition-colors`}
            >
              <BookingIcon className="w-5 h-5" />
              Booking.com
            </a>
          )}
          {business.airbnbUrl && (
            <a
              href={business.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 border-2 border-nature-soft text-nature font-semibold px-7 py-3 ${ctaRadius} hover:bg-nature-soft transition-colors`}
            >
              Airbnb
            </a>
          )}
        </div>
        <p className="text-sm text-nature-40">
          <RichInline text={business.hours} />
        </p>
      </div>
    </section>
  );
}

// ─── Dark — inset frame, bottom-aligned display type, vertical tagline ────
function HeroDark() {
  const ctaRadius = getButtonRadius(false, business.buttonStyle);
  const overlay = getOverlay(
    "dark",
    business.heroOverlay,
    business.heroTint,
  );

  if (business.heroLayout === "split") return <HeroSplit variant="dark" />;

  return (
    <section className="relative min-h-screen min-h-[100dvh] p-3 md:p-6 text-white bg-gray-950">
      <div className="relative w-full h-[calc(100vh-1.5rem)] h-[calc(100dvh-1.5rem)] md:h-[calc(100vh-3rem)] md:h-[calc(100dvh-3rem)] overflow-hidden border border-white/15">
        {business.heroImageUrl ? (
          <>
            <Image
              src={business.heroImageUrl}
              alt={business.heroImageAlt ?? stripMarkdown(business.name)}
              fill
              className="object-cover"
              priority
            />
            <div className={`absolute inset-0 ${overlay.className}`} style={overlay.style} />
          </>
        ) : (
          <div className="absolute inset-0 bg-gray-950" />
        )}

        <div className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-3">
          <span
            className="h-px w-8"
            style={{ backgroundColor: business.primaryColor }}
          />
          <span className="text-xs tracking-[0.4em] uppercase text-white/50"></span>
        </div>

        <div className="hidden lg:flex absolute top-10 right-10 bottom-10 items-center">
          <p
            className="text-xs tracking-[0.5em] uppercase text-white/40"
            style={{ writingMode: "vertical-rl" }}
          >
            <RichInline text={business.tagline} />
          </p>
        </div>

        <div className="absolute bottom-8 left-6 right-6 md:bottom-14 md:left-10 md:right-auto md:max-w-2xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-5">
            <RichInline text={business.name} />
          </h1>
          <p className="lg:hidden text-base md:text-lg text-white/60 mb-7 max-w-md">
            <RichInline text={business.tagline} />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <a
              href={`tel:${business.phone.replace(/\s/g, "")}`}
              className={`inline-flex items-center justify-center gap-2 text-gray-900 bg-white font-semibold px-7 py-3 ${ctaRadius} hover:bg-white/90 transition-colors`}
            >
              <PhoneIcon className="w-5 h-5" />
              Sună acum
            </a>
            {business.bookingComUrl && (
              <a
                href={business.bookingComUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-7 py-3 ${ctaRadius} hover:bg-white/10 transition-colors`}
              >
                <BookingIcon className="w-5 h-5" />
                Booking.com
              </a>
            )}
            {business.airbnbUrl && (
              <a
                href={business.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-7 py-3 ${ctaRadius} hover:bg-white/10 transition-colors`}
              >
                Airbnb
              </a>
            )}
          </div>
          <p className="mt-6 text-xs text-white/40 tracking-widest uppercase">
            <RichInline text={business.hours} />
          </p>
        </div>
      </div>
      <HeroFadeOut color={getNextSectionColor("dark")} />
    </section>
  );
}

// ─── Bold — brutalist, full-bleed or split, left/center/eyebrow layout ────
function BoldHeroButtons({
  ctaRadius,
  justify,
}: {
  ctaRadius: string;
  justify?: boolean;
}) {
  return (
    <div
      className={`flex flex-col sm:flex-row gap-4 flex-wrap${justify ? " justify-center" : ""}`}
    >
      <a
        href={`tel:${business.phone.replace(/\s/g, "")}`}
        className={`inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold px-8 py-3 ${ctaRadius} hover:bg-gray-100 transition-colors uppercase tracking-wider text-base`}
      >
        <PhoneIcon className="w-5 h-5" />
        Sună acum
      </a>
      {business.bookingComUrl && (
        <a
          href={business.bookingComUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-8 py-3 ${ctaRadius} hover:bg-white/10 transition-colors text-lg`}
        >
          <BookingIcon className="w-5 h-5" />
          Booking.com
        </a>
      )}
      {business.airbnbUrl && (
        <a
          href={business.airbnbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-8 py-3 ${ctaRadius} hover:bg-white/10 transition-colors text-lg`}
        >
          Airbnb
        </a>
      )}
    </div>
  );
}

function HeroBold() {
  const overlay = getOverlay(
    "bold",
    business.heroOverlay,
    business.heroTint,
  );
  const ctaRadius = getButtonRadius(true, business.buttonStyle);

  const isLeft = business.heroLayout !== "center";

  if (business.heroLayout === "split") {
    return (
      <section className="relative min-h-screen min-h-[100dvh] flex flex-col md:flex-row text-white">
        <div className="order-2 md:order-1 md:w-1/2 flex items-center px-6 py-16 md:px-12 lg:px-20 bg-black">
          <div className="max-w-lg mx-auto md:mx-0">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-12 bg-white/40" />
              <span className="text-xs tracking-[0.4em] uppercase text-white/60">
                Est. 2024
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-none tracking-tight uppercase">
              <RichInline text={business.name} />
            </h1>
            <p className="text-base md:text-lg mb-10 text-white/80 uppercase tracking-[0.3em] font-light">
              <RichInline text={business.tagline} />
            </p>
            <BoldHeroButtons ctaRadius={ctaRadius} />
            <p className="mt-6 text-sm text-white/70">
              <RichInline text={business.hours} />
            </p>
          </div>
        </div>
        <div className="relative order-1 md:order-2 md:w-1/2 h-[40vh] md:h-auto">
          {business.heroImageUrl ? (
            <Image
              src={business.heroImageUrl}
              alt={business.heroImageAlt ?? stripMarkdown(business.name)}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gray-800" />
          )}
        </div>
        <HeroFadeOut color={getNextSectionColor("bold")} />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen min-h-[100dvh] flex items-end justify-center text-white overflow-hidden bg-black pb-20 md:pb-28 pt-28">
      {business.heroImageUrl ? (
        <>
          <Image
            src={business.heroImageUrl}
            alt={business.heroImageAlt ?? stripMarkdown(business.name)}
            fill
            className="object-cover"
            priority
          />
          <div className={`absolute inset-0 ${overlay.className}`} style={overlay.style} />
        </>
      ) : (
        <div className="absolute inset-0 bg-black/30" />
      )}

      <HeroFadeOut color={getNextSectionColor("bold")} />

      <div
        className={`relative z-10 px-6 max-w-4xl mx-auto${isLeft ? " text-left w-full" : " text-center"}`}
      >
        <div className="mb-4 flex items-center gap-3">
          <div
            className="h-px w-12"
            style={{ backgroundColor: business.primaryColor }}
          />
          <span className="text-xs tracking-[0.4em] uppercase text-white/60">
            Est. 2024
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-4 leading-none tracking-tight uppercase">
          <RichInline text={business.name} />
        </h1>
        <p className="text-base md:text-lg mb-10 text-white/80 uppercase tracking-[0.3em] font-light">
          <RichInline text={business.tagline} />
        </p>

        <div className="mt-6 md:mt-10">
          <BoldHeroButtons ctaRadius={ctaRadius} justify={!isLeft} />
          <p className="mt-6 text-sm text-white/50">
            <RichInline text={business.hours} />
          </p>
        </div>
      </div>

      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </a>
    </section>
  );
}

export default function Hero() {
  const v = business.designVariant ?? "classic";
  if (v === "nature") return <HeroNature />;
  if (v === "dark") return <HeroDark />;
  if (v === "bold") return <HeroBold />;
  return <HeroClassic />;
}
