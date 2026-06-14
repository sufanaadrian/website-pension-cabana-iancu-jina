import { business, DEFAULT_NATURE_BG, getReadablePrimaryColor } from "@/config/business";
import { RichInline, stripMarkdown } from "@/components/RichText";
import GalleryLightbox from "./GalleryLightbox";

export default function Gallery() {
  if (!business.gallery || business.gallery.length === 0) return null;

  const v = business.designVariant ?? "classic";
  const isBold = v === "bold";
  const isNature = v === "nature";
  const isDark = v === "dark" || isBold;

  const sectionCls = isBold ? "py-20 bg-black" : isDark ? "py-20 bg-gray-950" : isNature ? "py-20" : "py-20 bg-white";
  const sectionStyle = isNature ? { backgroundColor: business.natureBackgroundColor || DEFAULT_NATURE_BG } : undefined;
  const headingCls = isBold
    ? "text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-widest"
    : isDark
    ? "text-3xl md:text-4xl font-bold text-white mb-4"
    : "text-3xl md:text-4xl font-bold text-gray-900 mb-4";

  const heading = business.sectionHeadings?.gallery ?? {};
  const headingTitle = heading.title || "Galerie foto";
  const headingSubtitle = heading.subtitle || "O privire asupra muncii și spațiului nostru.";

  return (
    <section id="gallery" className={sectionCls} style={sectionStyle}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className={headingCls}>
            <RichInline text={headingTitle} />
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            <RichInline text={headingSubtitle} />
          </p>
        </div>
        <GalleryLightbox
          images={business.gallery}
          name={stripMarkdown(business.name)}
          previewLimit={business.galleryPreviewLimit ?? 9}
          accentColor={getReadablePrimaryColor(!isDark)}
        />
      </div>
    </section>
  );
}
