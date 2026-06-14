import { business, DEFAULT_NATURE_BG, getReadablePrimaryColor, type Service } from "@/config/business";
import { RichInline, RichText } from "@/components/RichText";

const gridColsClass: Record<number, string> = {
  1: "grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

type SectionProps = {
  services: Service[];
  headingTitle: string;
  headingSubtitle: string;
  primaryColor: string;
};

export default function Services() {
  const heading = business.sectionHeadings?.services ?? {};
  const v = business.designVariant ?? "classic";

  const props: SectionProps = {
    services: business.services,
    headingTitle: heading.title || (v === "bold" ? "Ce oferim" : "Serviciile noastre"),
    headingSubtitle:
      heading.subtitle || "Oferim o gamă completă de servicii profesionale, adaptate nevoilor dumneavoastră.",
    primaryColor: business.primaryColor,
  };

  if (v === "nature") return <ServicesNature {...props} />;
  if (v === "dark") return <ServicesDark {...props} />;
  if (v === "bold") return <ServicesBold {...props} />;
  return <ServicesClassic {...props} />;
}

// ─── Classic — friendly grid of cards ──────────────────────────────────────
function ServicesClassic({ services, headingTitle, headingSubtitle, primaryColor }: SectionProps) {
  const cols = gridColsClass[Math.min(services.length, 4)] ?? "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"><RichInline text={headingTitle} /></h2>
          <p className="text-gray-500 max-w-xl mx-auto"><RichInline text={headingSubtitle} /></p>
        </div>
        <div className={`grid grid-cols-1 ${cols} gap-6`}>
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-on-primary text-xl font-bold shrink-0"
                style={{ backgroundColor: primaryColor }}
              >
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2"><RichInline text={service.title} /></h3>
              <RichText text={service.description} className="text-gray-500 text-sm flex-1" />
              {service.price && (
                <p className="mt-4 text-sm font-semibold" style={{ color: getReadablePrimaryColor(true) }}>
                  {service.price}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Nature — organic, staggered, blob badges ──────────────────────────────
function ServicesNature({ services, headingTitle, headingSubtitle, primaryColor }: SectionProps) {
  return (
    <section
      id="services"
      className="py-24"
      style={{ backgroundColor: business.natureBackgroundColor || DEFAULT_NATURE_BG }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-xs tracking-[0.4em] uppercase text-nature-60 mb-3">Servicii</span>
          <h2 className="text-3xl md:text-5xl font-bold text-nature mb-4"><RichInline text={headingTitle} /></h2>
          <p className="text-nature-60 max-w-xl mx-auto"><RichInline text={headingSubtitle} /></p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center ${index % 3 === 1 ? "sm:translate-y-10" : ""}`}
            >
              <div
                className="w-20 h-20 mb-5 flex items-center justify-center text-2xl font-bold text-on-primary shadow-lg shadow-nature-10 shrink-0"
                style={{ backgroundColor: primaryColor, borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%" }}
              >
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-nature mb-2"><RichInline text={service.title} /></h3>
              <RichText text={service.description} className="text-nature-60 text-sm leading-relaxed" />
              {service.price && (
                <p className="mt-3 text-sm font-semibold" style={{ color: getReadablePrimaryColor(true) }}>
                  {service.price}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Dark — elegant editorial menu list ────────────────────────────────────
function ServicesDark({ services, headingTitle, headingSubtitle, primaryColor }: SectionProps) {
  return (
    <section id="services" className="py-24 bg-gray-950" style={{ ["--accent" as string]: primaryColor }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4"><RichInline text={headingTitle} /></h2>
          <p className="text-gray-500 max-w-xl mx-auto"><RichInline text={headingSubtitle} /></p>
        </div>
        <div className="divide-y divide-white/10">
          {services.map((service, index) => (
            <div key={index} className="group py-7 flex items-start gap-6">
              <span className="text-3xl md:text-4xl font-light text-white/15 tabular-nums shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1 transition-colors group-hover:text-[var(--accent)]">
                    <RichInline text={service.title} />
                  </h3>
                  <RichText text={service.description} className="text-gray-400 text-sm max-w-md" />
                </div>
                {service.price && (
                  <span className="text-sm font-semibold shrink-0" style={{ color: getReadablePrimaryColor(false) }}>
                    {service.price}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Bold — brutalist bento grid with ghost numbers ────────────────────────
function ServicesBold({ services, headingTitle, headingSubtitle, primaryColor }: SectionProps) {
  return (
    <section id="services" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ backgroundColor: primaryColor }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: primaryColor }}>
                Servicii
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight"><RichInline text={headingTitle} /></h2>
          </div>
          <p className="text-gray-400 max-w-sm"><RichInline text={headingSubtitle} /></p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-black p-8 overflow-hidden min-h-[220px] flex flex-col justify-end hover:bg-zinc-900 transition-colors"
            >
              <span className="absolute -top-4 -right-2 text-8xl font-black text-white/15 select-none leading-none">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="relative text-xl font-bold text-white uppercase tracking-wide mb-2"><RichInline text={service.title} /></h3>
              <RichText text={service.description} className="relative text-gray-400 text-sm" />
              {service.price && (
                <p className="relative mt-4 text-sm font-bold" style={{ color: getReadablePrimaryColor(false) }}>
                  {service.price}
                </p>
              )}
              <div
                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300"
                style={{ backgroundColor: primaryColor }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
