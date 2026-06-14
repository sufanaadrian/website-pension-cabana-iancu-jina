import { business, DEFAULT_NATURE_BG, type Stat } from "@/config/business";
import { RichText, RichInline } from "@/components/RichText";
import { getButtonRadius } from "@/lib/design";

const defaultBulletPoints = [
  "Experiență dovedită în domeniu",
  "Prețuri transparente și corecte",
  "Satisfacția clientului pe primul loc",
];

const defaultStats = [
  { value: "10+", label: "Ani experiență" },
  { value: "500+", label: "Clienți mulțumiți" },
  { value: "100%", label: "Garanție calitate" },
  { value: "24h", label: "Timp de răspuns" },
];

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
  </svg>
);

type SectionProps = {
  bulletPoints: string[];
  stats: Stat[];
  showStats: boolean;
  headingTitle: string;
  primaryColor: string;
  ctaRadius: string;
};

export default function About() {
  const bulletPoints = (business.bulletPoints ?? defaultBulletPoints).filter((p) => p.trim());
  const stats = business.stats ?? defaultStats;
  const showStats = business.showSections?.stats !== false;

  const v = business.designVariant ?? "classic";
  const isBold = v === "bold";
  const ctaRadius = getButtonRadius(isBold, business.buttonStyle);

  const headingTitle = business.sectionHeadings?.about?.title || (isBold ? "Cine suntem" : "Despre noi");

  const props: SectionProps = {
    bulletPoints,
    stats,
    showStats,
    headingTitle,
    primaryColor: business.primaryColor,
    ctaRadius,
  };

  if (v === "nature") return <AboutNature {...props} />;
  if (v === "dark") return <AboutDark {...props} />;
  if (v === "bold") return <AboutBold {...props} />;
  return <AboutClassic {...props} />;
}

// ─── Classic — text + bullet list beside stat cards ────────────────────────
function AboutClassic({ bulletPoints, stats, showStats, headingTitle, primaryColor, ctaRadius }: SectionProps) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className={`grid gap-12 items-center ${showStats ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 max-w-2xl"}`}>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"><RichInline text={headingTitle} /></h2>
            <RichText text={business.description} className="text-gray-600 text-lg leading-relaxed mb-6" />
            <div className="flex flex-col gap-4">
              {bulletPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-on-primary shrink-0 mt-0.5"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
            <a
              href={`tel:${business.phone.replace(/\s/g, "")}`}
              className={`inline-flex items-center gap-2 mt-8 font-semibold text-on-primary px-6 py-3 ${ctaRadius} transition-opacity hover:opacity-90`}
              style={{ backgroundColor: primaryColor }}
            >
              <PhoneIcon />
              {business.phone}
            </a>
          </div>
          {showStats && (
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl p-6 text-center text-on-primary" style={{ backgroundColor: primaryColor }}>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-on-primary-80 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Nature — centered, organic blob stats ─────────────────────────────────
function AboutNature({ bulletPoints, stats, showStats, headingTitle, primaryColor, ctaRadius }: SectionProps) {
  return (
    <section id="about" className="py-24" style={{ backgroundColor: business.natureBackgroundColor || DEFAULT_NATURE_BG }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="inline-block text-xs tracking-[0.4em] uppercase text-nature-60 mb-3">Despre noi</span>
        <h2 className="text-3xl md:text-5xl font-bold text-nature mb-6"><RichInline text={headingTitle} /></h2>
        <RichText text={business.description} className="text-nature-70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto" />
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-14">
          {bulletPoints.map((point) => (
            <div key={point} className="flex items-center gap-2 text-nature font-medium">
              <svg className="w-5 h-5 shrink-0" fill="none" stroke={primaryColor} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21C7 17 4 13.5 4 9.5A4.5 4.5 0 0112 6a4.5 4.5 0 018 3.5C20 13.5 17 17 12 21z" />
              </svg>
              {point}
            </div>
          ))}
        </div>
        {showStats && (
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center justify-center text-on-primary shadow-lg shadow-nature-10 px-2"
                style={{ backgroundColor: primaryColor, borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%" }}
              >
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-[11px] mt-1 text-on-primary-80 text-center">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
        <a
          href={`tel:${business.phone.replace(/\s/g, "")}`}
          className={`inline-flex items-center gap-2 font-semibold text-on-primary px-6 py-3 ${ctaRadius} transition-opacity hover:opacity-90`}
          style={{ backgroundColor: primaryColor }}
        >
          <PhoneIcon />
          {business.phone}
        </a>
      </div>
    </section>
  );
}

// ─── Dark — elegant editorial, italic pull-quote ───────────────────────────
function AboutDark({ bulletPoints, stats, showStats, headingTitle, primaryColor, ctaRadius }: SectionProps) {
  return (
    <section id="about" className="py-24 bg-gray-900">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8"><RichInline text={headingTitle} /></h2>
        <div className="h-px w-16 mx-auto mb-8" style={{ backgroundColor: primaryColor }} />
        <RichText
          text={business.description}
          className="text-gray-300 text-xl md:text-2xl leading-relaxed italic font-light mb-12"
        />
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 mb-14 text-sm text-gray-400">
          {bulletPoints.map((point, i) => (
            <span key={point} className="flex items-center gap-3">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-gray-600" />}
              {point}
            </span>
          ))}
        </div>
        {showStats && (
          <div className="flex flex-wrap justify-center divide-x divide-white/10 mb-14">
            {stats.map((stat) => (
              <div key={stat.label} className="px-8 py-2 text-center">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
        <a
          href={`tel:${business.phone.replace(/\s/g, "")}`}
          className={`inline-flex items-center gap-2 font-semibold text-on-primary px-6 py-3 ${ctaRadius} transition-opacity hover:opacity-90`}
          style={{ backgroundColor: primaryColor }}
        >
          <PhoneIcon />
          {business.phone}
        </a>
      </div>
    </section>
  );
}

// ─── Bold — brutalist split with hairline stat grid ────────────────────────
function AboutBold({ bulletPoints, stats, showStats, headingTitle, primaryColor, ctaRadius }: SectionProps) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8" style={{ backgroundColor: primaryColor }} />
          <span className="text-xs tracking-[0.4em] uppercase text-gray-500">Despre noi</span>
        </div>
        <div className={`grid gap-12 items-start ${showStats ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 max-w-2xl"}`}>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase tracking-wide"><RichInline text={headingTitle} /></h2>
            <RichText text={business.description} className="text-gray-600 text-lg leading-relaxed mb-6" />
            <ul className="space-y-3 mb-8">
              {bulletPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 flex items-center justify-center text-on-primary text-xs font-black shrink-0 mt-1"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
            <a
              href={`tel:${business.phone.replace(/\s/g, "")}`}
              className={`inline-flex items-center gap-2 font-semibold text-on-primary px-6 py-3 ${ctaRadius} transition-opacity hover:opacity-90 uppercase tracking-wider`}
              style={{ backgroundColor: primaryColor }}
            >
              <PhoneIcon />
              {business.phone}
            </a>
          </div>
          {showStats && (
            <div className="grid grid-cols-2 gap-px bg-zinc-200">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-6 text-center">
                  <p className="text-4xl font-black" style={{ color: primaryColor }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
