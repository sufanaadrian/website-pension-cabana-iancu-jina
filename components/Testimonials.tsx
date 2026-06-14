import { business, DEFAULT_NATURE_BG, type Testimonial } from "@/config/business";
import { RichInline } from "@/components/RichText";

function Stars({ stars }: { stars: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, s) => (
        <svg
          key={s}
          className="w-4 h-4"
          fill={s < stars ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: s < stars ? "#FBBF24" : "#D1D5DB" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ))}
    </div>
  );
}

const QuoteIcon = ({
  className,
  color,
}: {
  className?: string;
  color?: string;
}) => (
  <svg className={className} fill={color ?? "currentColor"} viewBox="0 0 32 32">
    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
  </svg>
);

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

function GoogleReviewsButton({
  wrapperClassName,
  linkClassName,
}: {
  wrapperClassName: string;
  linkClassName: string;
}) {
  if (!business.showGoogleReviewsButton || !business.googleReviewsUrl)
    return null;
  return (
    <div className={wrapperClassName}>
      <a
        href={business.googleReviewsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        <GoogleIcon className="w-5 h-5" />
        Vezi toate recenziile pe Google
      </a>
    </div>
  );
}

type SectionProps = {
  testimonials: Testimonial[];
  headingTitle: string;
  headingSubtitle: string;
  primaryColor: string;
};

export default function Testimonials() {
  if (!business.testimonials || business.testimonials.length === 0) return null;

  const heading = business.sectionHeadings?.reviews ?? {};
  const v = business.designVariant ?? "classic";

  const props: SectionProps = {
    testimonials: business.testimonials,
    headingTitle: heading.title || "Ce spun clienții noștri",
    headingSubtitle:
      heading.subtitle ||
      "Satisfacția clienților este cea mai bună recomandare a noastră.",
    primaryColor: business.primaryColor,
  };

  if (v === "nature") return <TestimonialsNature {...props} />;
  if (v === "dark") return <TestimonialsDark {...props} />;
  if (v === "bold") return <TestimonialsBold {...props} />;
  return <TestimonialsClassic {...props} />;
}

// ─── Classic — grid of cards with star ratings ─────────────────────────────
function TestimonialsClassic({
  testimonials,
  headingTitle,
  headingSubtitle,
}: SectionProps) {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <RichInline text={headingTitle} />
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto"><RichInline text={headingSubtitle} /></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4"
            >
              <Stars stars={t.stars ?? 5} />
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                &quot;<RichInline text={t.text} />&quot;
              </p>
              <div>
                <p className="font-semibold text-gray-900">{t.name}</p>
                {t.role && (
                  <p className="text-xs text-gray-400 mt-0.5">{t.role}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <GoogleReviewsButton
          wrapperClassName="mt-10 text-center"
          linkClassName="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-white transition-colors"
        />
      </div>
    </section>
  );
}

// ─── Nature — horizontal scroll-snap carousel of organic cards ────────────
function TestimonialsNature({
  testimonials,
  headingTitle,
  headingSubtitle,
  primaryColor,
}: SectionProps) {
  return (
    <section id="testimonials" className="py-24" style={{ backgroundColor: business.natureBackgroundColor || DEFAULT_NATURE_BG }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs tracking-[0.4em] uppercase text-nature-60 mb-3">
            Recenzii
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-nature mb-4">
            <RichInline text={headingTitle} />
          </h2>
          <p className="text-nature-60 max-w-xl mx-auto">
            <RichInline text={headingSubtitle} />
          </p>
        </div>
        <div className="flex items-start gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-6 px-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[85%] sm:w-[60%] lg:w-[38%] bg-white rounded-[2.5rem] p-8 shadow-sm border border-nature-soft flex flex-col gap-4"
            >
              <QuoteIcon className="w-9 h-9 opacity-25" color={primaryColor} />
              <p className="text-nature-80 text-lg leading-relaxed flex-1">
                &quot;<RichInline text={t.text} />&quot;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-on-primary font-semibold shrink-0"
                  style={{ backgroundColor: primaryColor }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-nature">{t.name}</p>
                  {t.role && (
                    <p className="text-xs text-nature-50">{t.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <GoogleReviewsButton
          wrapperClassName="mt-10 text-center"
          linkClassName="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full border-2 border-nature-soft text-nature hover:bg-white transition-colors bg-white/60"
        />
      </div>
    </section>
  );
}

// ─── Dark — stacked editorial pull-quotes, alternating alignment ──────────
function TestimonialsDark({
  testimonials,
  headingTitle,
  headingSubtitle,
  primaryColor,
}: SectionProps) {
  return (
    <section id="testimonials" className="py-24 bg-gray-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <RichInline text={headingTitle} />
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto"><RichInline text={headingSubtitle} /></p>
        </div>
        <div className="flex flex-col gap-14">
          {testimonials.map((t, i) => {
            const right = i % 2 === 1;
            return (
              <div
                key={i}
                className={`flex flex-col ${right ? "items-end text-right" : "items-start text-left"}`}
              >
                <QuoteIcon className="w-8 h-8 mb-4" color={primaryColor} />
                <p className="text-xl md:text-2xl text-gray-200 italic font-light leading-relaxed max-w-2xl mb-4">
                  &quot;<RichInline text={t.text} />&quot;
                </p>
                <div
                  className={`flex items-center gap-3 ${right ? "flex-row-reverse" : ""}`}
                >
                  <div className="h-px w-8 bg-white/20" />
                  <p className="text-sm font-semibold text-white">
                    {t.name}
                    {t.role && (
                      <span className="text-gray-500 font-normal">
                        {" "}
                        — {t.role}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <GoogleReviewsButton
          wrapperClassName="mt-12 text-center"
          linkClassName="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
        />
      </div>
    </section>
  );
}

// ─── Bold — brutalist bento grid with ghost quote marks ────────────────────
function TestimonialsBold({
  testimonials,
  headingTitle,
  headingSubtitle,
  primaryColor,
}: SectionProps) {
  return (
    <section id="testimonials" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-px w-8"
                style={{ backgroundColor: primaryColor }}
              />
              <span
                className="text-xs tracking-[0.4em] uppercase"
                style={{ color: primaryColor }}
              >
                Recenzii
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
              <RichInline text={headingTitle} />
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm"><RichInline text={headingSubtitle} /></p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-black p-8 flex flex-col gap-4 min-h-[220px] overflow-hidden"
            >
              <QuoteIcon className="absolute top-4 right-5 w-12 h-12 text-white/5" />
              <Stars stars={t.stars ?? 5} />
              <p className="relative text-gray-300 text-sm leading-relaxed flex-1">
                &quot;<RichInline text={t.text} />&quot;
              </p>
              <div>
                <p className="font-bold text-white uppercase tracking-wide text-sm">
                  {t.name}
                </p>
                {t.role && (
                  <p className="text-xs text-gray-500 mt-0.5">{t.role}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <GoogleReviewsButton
          wrapperClassName="mt-12 text-center"
          linkClassName="inline-flex items-center gap-2 font-semibold px-6 py-3 border border-white/20 text-white hover:bg-white/10 transition-colors uppercase tracking-wider text-sm"
        />
      </div>
    </section>
  );
}
