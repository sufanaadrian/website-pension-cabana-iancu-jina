import { business, DEFAULT_NATURE_BG, getReadablePrimaryColor } from "@/config/business";
import RoomImages from "@/components/RoomImages";
import { RichText, RichInline, stripMarkdown } from "@/components/RichText";
import { getButtonRadius } from "@/lib/design";

export default function Rooms() {
  if (!business.rooms || business.rooms.length === 0) return null;

  const v = business.designVariant ?? "classic";
  const isBold = v === "bold";
  const isNature = v === "nature";
  const isDark = v === "dark" || isBold;

  const sectionCls = isBold ? "py-20 bg-black" : isDark ? "py-20 bg-gray-950" : isNature ? "py-20" : "py-20 bg-gray-50";
  const sectionStyle = isNature ? { backgroundColor: business.natureBackgroundColor || DEFAULT_NATURE_BG } : undefined;
  const headingCls = isBold
    ? "text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-widest"
    : isDark
    ? "text-3xl md:text-4xl font-bold text-white mb-4"
    : "text-3xl md:text-4xl font-bold text-gray-900 mb-4";

  const noteBoxCls = isDark
    ? "mb-8 flex items-start gap-3 bg-gray-800/60 border border-gray-700/50 rounded-2xl px-5 py-4"
    : "mb-8 flex items-start gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-4";
  const noteIconCls = isDark ? "w-5 h-5 mt-0.5 shrink-0 text-gray-500" : "w-5 h-5 mt-0.5 shrink-0 text-gray-400";
  const noteTextCls = isDark ? "text-sm text-gray-300 leading-relaxed" : "text-sm text-gray-600 leading-relaxed";

  const optionCls = isBold
    ? "bg-zinc-900 rounded-none border-l-4 p-5"
    : isDark
    ? "bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5"
    : "bg-white border border-gray-200 rounded-2xl p-5";
  const optionTitleCls = isDark ? "font-semibold text-white" : "font-semibold text-gray-900";
  const optionDescCls = isDark ? "text-sm text-gray-400 leading-relaxed" : "text-sm text-gray-500 leading-relaxed";

  const cardCls = isBold
    ? "bg-zinc-900 rounded-none overflow-hidden border-l-4 flex flex-col hover:bg-zinc-800 transition-colors"
    : isDark
    ? "bg-gray-800/60 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-colors flex flex-col"
    : isNature
    ? "bg-white rounded-3xl overflow-hidden shadow-sm border border-nature-soft hover:shadow-md transition-shadow flex flex-col"
    : "bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col";
  const titleCls = isDark ? "text-lg font-semibold text-white mb-2" : "text-lg font-semibold text-gray-900 mb-2";
  const descCls = isDark ? "text-gray-400 text-sm flex-1" : "text-gray-500 text-sm flex-1";
  const featureCls = isBold
    ? "text-xs bg-zinc-800 text-gray-300 rounded-none px-3 py-1"
    : isDark
    ? "text-xs bg-gray-700 text-gray-300 rounded-full px-3 py-1"
    : isNature
    ? "text-xs bg-nature-chip text-nature-80 rounded-full px-3 py-1"
    : "text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1";

  const ctaRadius = getButtonRadius(isBold, business.buttonStyle);

  const heading = business.sectionHeadings?.rooms ?? {};
  const headingTitle = heading.title || "Camere și tarife";
  const headingSubtitle = heading.subtitle || "Alegeți camera potrivită pentru un sejur de neuitat.";

  return (
    <section id="rooms" className={sectionCls} style={sectionStyle}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className={headingCls}>
            <RichInline text={headingTitle} />
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            <RichInline text={headingSubtitle} />
          </p>
        </div>

        {business.bookingNotes && (
          <div className={noteBoxCls}>
            <svg className={noteIconCls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <RichText text={business.bookingNotes} className={noteTextCls} />
          </div>
        )}

        {business.bookingOptions && business.bookingOptions.length > 0 && (
          <div className="mb-10">
            <h3 className={isDark ? "text-lg font-semibold text-white mb-4" : "text-lg font-semibold text-gray-900 mb-4"}>
              <RichInline text={business.bookingOptionsTitle || "Opțiuni de rezervare"} />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {business.bookingOptions.map((opt, i) => (
              <div key={i} className={optionCls} style={isBold ? { borderLeftColor: business.primaryColor } : undefined}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className={optionTitleCls}><RichInline text={opt.title} /></h3>
                  {opt.season && (
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 text-on-primary"
                      style={{ backgroundColor: business.primaryColor }}
                    >
                      {opt.season}
                    </span>
                  )}
                </div>
                <RichText text={opt.description} className={optionDescCls} />
              </div>
            ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {business.rooms.map((room, i) => {
            const roomImages = room.images && room.images.length > 0
              ? room.images
              : room.imageUrl
              ? [room.imageUrl]
              : [];

            return (
              <div key={i} className={cardCls} style={isBold ? { borderLeftColor: business.primaryColor } : undefined}>
                {roomImages.length > 0 && (
                  <RoomImages images={roomImages} alt={stripMarkdown(room.title)} />
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className={titleCls}><RichInline text={room.title} /></h3>
                  <RichText text={room.description} className={descCls} />
                  {room.features && room.features.some((f) => f.trim()) && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {room.features.filter((f) => f.trim()).map((f) => (
                        <li key={f} className={featureCls}>
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="font-bold text-lg" style={{ color: getReadablePrimaryColor(!isDark) }}>
                      {room.price}
                    </span>
                    <RoomBookingButton room={room} ctaRadius={ctaRadius} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RoomBookingButton({ room, ctaRadius }: { room: import("@/config/business").Room; ctaRadius: string }) {
  const href = room.bookingUrl ?? business.bookingComUrl ?? business.airbnbUrl;
  if (!href) return null;
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`text-sm font-semibold text-on-primary px-4 py-2 ${ctaRadius} transition-opacity hover:opacity-90`}
      style={{ backgroundColor: business.primaryColor }}
    >
      Rezervă
    </a>
  );
}
