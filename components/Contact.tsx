"use client";

import { useState } from "react";
import { business, DEFAULT_NATURE_BG } from "@/config/business";
import { RichInline } from "@/components/RichText";
import { getButtonRadius, getInputRadius } from "@/lib/design";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    if (business.web3formsKey) {
      setLoading(true);
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: business.web3formsKey,
            subject: `Cerere de ofertă de la ${name}`,
            from_name: name,
            phone,
            message,
          }),
        });
        setSubmitted(true);
      } finally {
        setLoading(false);
      }
    } else {
      // Fallback: open email client
      const subject = encodeURIComponent(`Cerere de ofertă de la ${name}`);
      const body = encodeURIComponent(`Nume: ${name}\nTelefon: ${phone}\n\nMesaj:\n${message}`);
      window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
      setSubmitted(true);
    }
  }

  const v = business.designVariant ?? "classic";
  const isBold = v === "bold";
  const isNature = v === "nature";
  const isDark = v === "dark" || isBold;
  const showForm = business.showSections?.contactForm !== false;

  const sectionCls = isBold ? "py-20 bg-black" : isDark ? "py-20 bg-gray-950" : isNature ? "py-20" : "py-20 bg-gray-50";
  const sectionStyle = isNature ? { backgroundColor: business.natureBackgroundColor || DEFAULT_NATURE_BG } : undefined;
  const headingCls = isBold
    ? "text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-widest"
    : isDark
    ? "text-3xl md:text-4xl font-bold text-white mb-4"
    : "text-3xl md:text-4xl font-bold text-gray-900 mb-4";
  const valueCls = isDark ? "text-white font-medium" : "text-gray-800 font-medium";

  const cardCls = isBold
    ? "bg-zinc-900 rounded-none border-l-4 p-8"
    : isDark
    ? "bg-gray-800/60 border border-gray-700/50 rounded-2xl p-8"
    : isNature
    ? "bg-white border border-nature-soft shadow-sm rounded-3xl p-8"
    : "bg-white rounded-2xl p-8 shadow-sm";
  const labelCls = isDark ? "block text-sm font-medium text-gray-300 mb-1" : "block text-sm font-medium text-gray-700 mb-1";
  const inputRadius = getInputRadius(isBold, business.buttonStyle);
  const btnRadius = getButtonRadius(isBold, business.buttonStyle);
  const inputCls = isDark
    ? `w-full border border-gray-700 bg-gray-900 ${inputRadius} px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-shadow`
    : `w-full border border-gray-200 ${inputRadius} px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 transition-shadow`;
  const successTitleCls = isDark ? "text-xl font-semibold text-white mb-2" : "text-xl font-semibold text-gray-900 mb-2";

  const heading = business.sectionHeadings?.contact ?? {};
  const headingTitle = heading.title || "Contact";
  const headingSubtitle = heading.subtitle || "Suntem disponibili pentru orice întrebare. Contactați-ne și vă răspundem în cel mai scurt timp.";

  return (
    <section id="contact" className={sectionCls} style={sectionStyle}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className={headingCls}>
            <RichInline text={headingTitle} />
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            <RichInline text={headingSubtitle} />
          </p>
        </div>

        <div className={showForm ? "grid grid-cols-1 lg:grid-cols-2 gap-12" : "max-w-2xl mx-auto"}>
          {/* Info */}
          <div className="flex flex-col gap-6">
            {(business.phone || (business.extraPhones ?? []).some((p) => p.trim())) && (
              <InfoRow
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
                  </svg>
                }
                label="Telefon"
                value={
                  <span className="flex flex-col gap-1">
                    {[business.phone, ...(business.extraPhones ?? [])].filter((p) => p.trim()).map((p) => (
                      <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="hover:underline">
                        {p}
                      </a>
                    ))}
                  </span>
                }
                color={business.primaryColor}
                valueCls={valueCls}
              />
            )}
            {business.email && (
              <InfoRow
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                label="Email"
                value={
                  <a href={`mailto:${business.email}`} className="hover:underline">
                    {business.email}
                  </a>
                }
                color={business.primaryColor}
                valueCls={valueCls}
              />
            )}
            {(business.address || business.city) && (
              <InfoRow
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
                label="Adresă"
                value={[business.address, business.city].filter((p) => p.trim()).join(", ")}
                color={business.primaryColor}
                valueCls={valueCls}
              />
            )}
            {business.hours && (
              <InfoRow
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                label="Program"
                value={<RichInline text={business.hours} />}
                color={business.primaryColor}
                valueCls={valueCls}
              />
            )}

            {business.googleMapsEmbedUrl && (
              <div className="rounded-2xl overflow-hidden h-48 mt-2">
                <iframe
                  src={business.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Locație pe hartă"
                />
              </div>
            )}
          </div>

          {/* Form */}
          {showForm && (
          <div className={cardCls} style={isBold ? { borderLeftColor: business.primaryColor } : undefined}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-on-primary mb-4"
                  style={{ backgroundColor: business.primaryColor }}
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className={successTitleCls}>Mesaj trimis!</h3>
                <p className="text-gray-500">Vă vom contacta în cel mai scurt timp.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className={labelCls}>
                    Numele dumneavoastră *
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    className={inputCls}
                    style={{ ["--tw-ring-color" as string]: business.primaryColor }}
                    placeholder="Ion Popescu"
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    Număr de telefon *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className={inputCls}
                    placeholder="0722 000 000"
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    Mesaj *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className={`${inputCls} resize-none`}
                    placeholder="Descrieți ce servicii vă interesează..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-on-primary font-semibold py-3 ${btnRadius} transition-opacity hover:opacity-90 mt-2 disabled:opacity-60`}
                  style={{ backgroundColor: business.primaryColor }}
                >
                  {loading ? "Se trimite..." : "Trimite mesajul"}
                </button>
              </form>
            )}
          </div>
          )}
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
  color,
  valueCls,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  color: string;
  valueCls: string;
}) {
  const isNature = (business.designVariant ?? "classic") === "nature";
  const isBold = business.designVariant === "bold";
  const badgeRadius = isNature
    ? "63% 37% 54% 46% / 55% 48% 52% 45%"
    : undefined;

  return (
    <div className="flex items-start gap-4">
      <div
        className={`w-10 h-10 flex items-center justify-center text-on-primary shrink-0 mt-0.5 ${
          badgeRadius ? "" : isBold ? "rounded-none" : "rounded-xl"
        }`}
        style={{ backgroundColor: color, borderRadius: badgeRadius }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className={valueCls}>{value}</p>
      </div>
    </div>
  );
}
