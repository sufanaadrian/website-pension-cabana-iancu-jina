import type { Metadata } from "next";
import { Fragment } from "react";
import { business, DEFAULT_SECTION_ORDER, getBodyBackgroundColor, getNatureAccentColor, getPrimaryContrastColor, type SectionId } from "@/config/business";
import { FONT_MAP, VARIANT_DEFAULT_FONTS } from "@/lib/fonts";
import { stripMarkdown } from "@/components/RichText";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Rooms from "@/components/Rooms";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const plainName = stripMarkdown(business.name);
const plainTagline = stripMarkdown(business.tagline);

export const metadata: Metadata = {
  title: plainName,
  description: plainTagline,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: plainName,
    description: plainTagline,
    type: "website",
    locale: "ro_RO",
  },
  twitter: {
    card: "summary",
    title: plainName,
    description: plainTagline,
  },
};

export default function Home() {
  const show = business.showSections ?? {};

  const sectionComponents: Record<SectionId, React.ReactNode> = {
    services: <Services />,
    gallery: show.gallery !== false ? <Gallery /> : null,
    about: <About />,
    reviews: show.reviews !== false ? <Testimonials /> : null,
    rooms: <Rooms />,
    faq: show.faq !== false ? <FAQ /> : null,
  };

  // Merge configured order with any sections missing from it (forward-compat)
  const configuredOrder = business.sectionOrder ?? DEFAULT_SECTION_ORDER;
  const order = [...configuredOrder, ...DEFAULT_SECTION_ORDER.filter((id) => !configuredOrder.includes(id))];

  const variantDefaults = VARIANT_DEFAULT_FONTS[business.designVariant ?? "classic"];
  const headingFont = FONT_MAP[business.headingFont ?? variantDefaults.heading];
  const bodyFont = FONT_MAP[business.bodyFont ?? variantDefaults.body];
  const fontStyle = {
    ["--font-heading" as string]: `var(${headingFont.cssVar})`,
    ["--font-body" as string]: `var(${bodyFont.cssVar})`,
    ["--nature-accent" as string]: getNatureAccentColor(),
    ["--primary-contrast" as string]: getPrimaryContrastColor(),
  } as React.CSSProperties;

  return (
    <div className={`theme-${business.designVariant ?? "classic"}`} style={fontStyle}>
      <style>{`body { background: ${getBodyBackgroundColor()}; }`}</style>
      <Navbar />
      <main
        style={
          business.headerStyle === "transparent" || business.headerStyle === "hidden"
            ? undefined
            : business.designVariant === "nature"
            ? { paddingTop: "calc(5.5rem + env(safe-area-inset-top))" }
            : { paddingTop: "calc(4rem + env(safe-area-inset-top))" }
        }
      >
        <Hero />
        {order.map((id) => (
          <Fragment key={id}>{sectionComponents[id]}</Fragment>
        ))}
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
