"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { business } from "@/config/business";
import { RichInline } from "@/components/RichText";
import { getButtonRadius } from "@/lib/design";

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
  </svg>
);

const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

function useScrollSolid() {
  const isTransparent = business.headerStyle === "transparent";
  const scrollSolid = business.headerScrollSolid !== false;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isTransparent || !scrollSolid) return;
    const getScrollY = () => window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const onScroll = () => setScrolled(getScrollY() > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
    };
  }, [isTransparent, scrollSolid]);

  return { overlay: isTransparent && (!scrollSolid || !scrolled) };
}

function NavLogo({ textCls }: { textCls: string }) {
  const logoSizeCls = { sm: "h-7 w-7", md: "h-9 w-9", lg: "h-12 w-12" }[business.logoSize ?? "md"];
  const logoShapeCls = { square: "", rounded: "rounded-lg", circle: "rounded-full" }[business.logoShape ?? "square"];
  const logoFitCls = business.logoShape === "circle" ? "object-cover" : "object-contain";

  return (
    <a href="/" className={`flex items-center gap-2.5 ${textCls}`}>
      {business.logoUrl && (
        <Image src={business.logoUrl} alt="" width={48} height={48} className={`${logoSizeCls} ${logoFitCls} ${logoShapeCls} shrink-0`} />
      )}
      <RichInline text={business.name} />
    </a>
  );
}

// ─── Shared "hidden" header style — floating hamburger only ───────────────
function HiddenNav() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => { if (detailsRef.current) detailsRef.current.open = false; };

  if (business.headerHiddenShowMenu === false) return null;

  const isAccommodation = ["hotel", "pension", "cottage"].includes(business.businessType ?? "");
  const bookingUrl = business.bookingComUrl ?? business.airbnbUrl;
  const dropdownLinkCls = "hover:text-gray-900 transition-colors py-1";

  return (
    <div className="fixed right-4 z-50" style={{ top: "calc(0.75rem + env(safe-area-inset-top))" }}>
      <details ref={detailsRef} className="relative">
        <summary className="list-none flex items-center justify-center w-11 h-11 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors cursor-pointer touch-manipulation select-none">
          <MenuIcon className="w-5 h-5" />
        </summary>
        <nav className="absolute top-full right-0 mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3 flex flex-col gap-3 text-sm font-medium text-gray-600">
          <a href="#services" onClick={closeMenu} className={dropdownLinkCls}>Servicii</a>
          {isAccommodation && <a href="#rooms" onClick={closeMenu} className={dropdownLinkCls}>Camere</a>}
          <a href="#about" onClick={closeMenu} className={dropdownLinkCls}>Despre noi</a>
          <a href="#contact" onClick={closeMenu} className={dropdownLinkCls}>Contact</a>
          {isAccommodation && bookingUrl && (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold py-1"
              style={{ color: business.primaryColor }}
              onClick={closeMenu}
            >
              Rezervă acum →
            </a>
          )}
        </nav>
      </details>
    </div>
  );
}

// ─── Classic — two-tier header: contact utility bar + centered logo nav ──
function NavbarClassic() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => { if (detailsRef.current) detailsRef.current.open = false; };

  const isAccommodation = ["hotel", "pension", "cottage"].includes(business.businessType ?? "");
  const bookingUrl = business.bookingComUrl ?? business.airbnbUrl;
  const showCallButton = business.headerShowCallButton !== false;
  const { overlay } = useScrollSolid();
  const ctaRadius = getButtonRadius(false, business.buttonStyle);
  const textSizeCls = { sm: "text-base", md: "text-xl", lg: "text-2xl" }[business.headerTextSize ?? "md"];

  const headerCls = overlay
    ? "fixed top-0 left-0 right-0 z-50 bg-transparent transition-colors duration-300"
    : "fixed top-0 left-0 right-0 z-50 bg-white transition-colors duration-300 shadow-sm";
  const linkCls = overlay ? "transition-colors text-white/80 hover:text-white" : "transition-colors text-gray-600 hover:text-gray-900";
  const logoCls = `font-bold ${textSizeCls} ${overlay ? "text-white" : "text-gray-900"}`;
  const hamburgerCls = overlay
    ? "list-none flex items-center justify-center w-11 h-11 text-white/80 hover:bg-white/10 transition-colors cursor-pointer touch-manipulation select-none"
    : "list-none flex items-center justify-center w-11 h-11 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer touch-manipulation select-none";

  return (
    <header className={headerCls} style={{ paddingTop: "env(safe-area-inset-top)" }}>
      {!overlay && (
        <div className="hidden md:block text-on-primary text-xs" style={{ backgroundColor: business.primaryColor }}>
          <div className="max-w-6xl mx-auto px-6 h-8 flex items-center justify-end gap-6">
            <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <PhoneIcon className="w-3.5 h-3.5" />
              {business.phone}
            </a>
            <span className="opacity-70"><RichInline text={business.hours} /></span>
          </div>
        </div>
      )}
      <div className={`max-w-6xl mx-auto px-6 h-16 flex items-center justify-between border-b ${overlay ? "border-white/15" : "border-gray-100"}`}>
        <NavLogo textCls={logoCls} />
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#services" className={linkCls}>Servicii</a>
          {isAccommodation && <a href="#rooms" className={linkCls}>Camere</a>}
          <a href="#about" className={linkCls}>Despre noi</a>
          <a href="#contact" className={linkCls}>Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          {showCallButton && (isAccommodation && bookingUrl ? (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex items-center gap-2 text-sm font-semibold text-on-primary px-4 py-2 ${ctaRadius} transition-opacity hover:opacity-90`}
              style={{ backgroundColor: business.primaryColor }}
            >
              Rezervă acum
            </a>
          ) : (
            <a
              href={`tel:${business.phone.replace(/\s/g, "")}`}
              className={`flex items-center gap-2 text-sm font-semibold text-on-primary px-4 py-2 ${ctaRadius} transition-opacity hover:opacity-90`}
              style={{ backgroundColor: business.primaryColor }}
            >
              <PhoneIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{business.phone}</span>
              <span className="sm:hidden">Sună</span>
            </a>
          ))}
          <details ref={detailsRef} className="md:hidden relative">
            <summary className={hamburgerCls}>
              <MenuIcon className="w-5 h-5" />
            </summary>
            <nav className="absolute top-full right-0 mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3 flex flex-col gap-3 text-sm font-medium text-gray-600">
              <a href="#services" onClick={closeMenu} className="hover:text-gray-900 transition-colors py-1">Servicii</a>
              {isAccommodation && <a href="#rooms" onClick={closeMenu} className="hover:text-gray-900 transition-colors py-1">Camere</a>}
              <a href="#about" onClick={closeMenu} className="hover:text-gray-900 transition-colors py-1">Despre noi</a>
              <a href="#contact" onClick={closeMenu} className="hover:text-gray-900 transition-colors py-1">Contact</a>
              {isAccommodation && bookingUrl && (
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
                  className="font-semibold py-1" style={{ color: business.primaryColor }} onClick={closeMenu}>
                  Rezervă acum →
                </a>
              )}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

// ─── Nature — floating rounded pill navbar ────────────────────────────────
function NavbarNature() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => { if (detailsRef.current) detailsRef.current.open = false; };

  const isAccommodation = ["hotel", "pension", "cottage"].includes(business.businessType ?? "");
  const bookingUrl = business.bookingComUrl ?? business.airbnbUrl;
  const showCallButton = business.headerShowCallButton !== false;
  const { overlay } = useScrollSolid();
  const ctaRadius = getButtonRadius(false, business.buttonStyle);
  const textSizeCls = { sm: "text-base", md: "text-lg", lg: "text-xl" }[business.headerTextSize ?? "md"];

  const pillCls = overlay
    ? "bg-white/15 backdrop-blur-md border border-white/25"
    : "bg-white shadow-lg shadow-nature-5";
  const textCls = overlay ? "text-white" : "text-nature";
  const linkCls = overlay ? "text-white/80 hover:text-white transition-colors" : "text-nature-60 hover:text-nature transition-colors";
  const hamburgerCls = overlay
    ? "list-none flex items-center justify-center w-10 h-10 rounded-full text-white/90 hover:bg-white/15 transition-colors cursor-pointer touch-manipulation select-none"
    : "list-none flex items-center justify-center w-10 h-10 rounded-full text-nature hover:bg-nature-soft transition-colors cursor-pointer touch-manipulation select-none";

  return (
    <header
      className="fixed left-3 right-3 md:left-6 md:right-6 z-50 transition-colors duration-300"
      style={{ top: "max(0.75rem, env(safe-area-inset-top))" }}
    >
      <div className={`max-w-6xl mx-auto rounded-full px-5 md:px-6 h-14 md:h-16 flex items-center justify-between transition-colors duration-300 ${pillCls}`}>
        <NavLogo textCls={`font-bold ${textSizeCls} ${textCls}`} />
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <a href="#services" className={linkCls}>Servicii</a>
          {isAccommodation && <a href="#rooms" className={linkCls}>Camere</a>}
          <a href="#about" className={linkCls}>Despre noi</a>
          <a href="#contact" className={linkCls}>Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          {showCallButton && (isAccommodation && bookingUrl ? (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex items-center gap-2 text-sm font-semibold text-on-primary px-5 py-2.5 ${ctaRadius} transition-opacity hover:opacity-90`}
              style={{ backgroundColor: business.primaryColor }}
            >
              Rezervă acum
            </a>
          ) : (
            <a
              href={`tel:${business.phone.replace(/\s/g, "")}`}
              className={`flex items-center gap-2 text-sm font-semibold text-on-primary px-5 py-2.5 ${ctaRadius} transition-opacity hover:opacity-90`}
              style={{ backgroundColor: business.primaryColor }}
            >
              <PhoneIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{business.phone}</span>
              <span className="sm:hidden">Sună</span>
            </a>
          ))}
          <details ref={detailsRef} className="md:hidden relative">
            <summary className={hamburgerCls}>
              <MenuIcon className="w-5 h-5" />
            </summary>
            <nav className="absolute top-full right-0 mt-2 w-44 bg-white border border-nature-soft rounded-3xl shadow-xl px-5 py-4 flex flex-col gap-3 text-sm font-medium text-nature-70">
              <a href="#services" onClick={closeMenu} className="hover:text-nature transition-colors py-1">Servicii</a>
              {isAccommodation && <a href="#rooms" onClick={closeMenu} className="hover:text-nature transition-colors py-1">Camere</a>}
              <a href="#about" onClick={closeMenu} className="hover:text-nature transition-colors py-1">Despre noi</a>
              <a href="#contact" onClick={closeMenu} className="hover:text-nature transition-colors py-1">Contact</a>
              {isAccommodation && bookingUrl && (
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
                  className="font-semibold py-1" style={{ color: business.primaryColor }} onClick={closeMenu}>
                  Rezervă acum →
                </a>
              )}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

// ─── Dark — ultra-thin, wide-tracking minimal header ──────────────────────
function NavbarDark() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => { if (detailsRef.current) detailsRef.current.open = false; };

  const isAccommodation = ["hotel", "pension", "cottage"].includes(business.businessType ?? "");
  const bookingUrl = business.bookingComUrl ?? business.airbnbUrl;
  const showCallButton = business.headerShowCallButton !== false;
  const { overlay } = useScrollSolid();
  const ctaRadius = getButtonRadius(false, business.buttonStyle);
  const textSizeCls = { sm: "text-base", md: "text-lg", lg: "text-xl" }[business.headerTextSize ?? "md"];

  const headerCls = overlay
    ? "fixed top-0 left-0 right-0 z-50 bg-transparent transition-colors duration-300"
    : "fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10 transition-colors duration-300";
  const navLinkCls = "text-white/50 hover:text-white border-b border-transparent hover:border-white/40 pb-1 transition-colors";

  return (
    <header className={headerCls} style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <NavLogo textCls={`font-light ${textSizeCls} tracking-[0.2em] uppercase text-white`} />
        <nav className="hidden md:flex items-center gap-10 text-xs font-medium tracking-[0.25em] uppercase">
          <a href="#services" className={navLinkCls}>Servicii</a>
          {isAccommodation && <a href="#rooms" className={navLinkCls}>Camere</a>}
          <a href="#about" className={navLinkCls}>Despre noi</a>
          <a href="#contact" className={navLinkCls}>Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          {showCallButton && (isAccommodation && bookingUrl ? (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-white border border-white/25 px-5 py-2.5 ${ctaRadius} hover:bg-white/10 transition-colors`}
            >
              Rezervă
            </a>
          ) : (
            <a
              href={`tel:${business.phone.replace(/\s/g, "")}`}
              className={`flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-white border border-white/25 px-5 py-2.5 ${ctaRadius} hover:bg-white/10 transition-colors`}
            >
              <PhoneIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{business.phone}</span>
              <span className="sm:hidden">Sună</span>
            </a>
          ))}
          <details ref={detailsRef} className="md:hidden relative">
            <summary className="list-none flex items-center justify-center w-11 h-11 text-white/80 hover:bg-white/10 transition-colors cursor-pointer touch-manipulation select-none">
              <MenuIcon className="w-5 h-5" />
            </summary>
            <nav className="absolute top-full right-0 mt-1 w-48 bg-black border border-white/10 shadow-xl px-4 py-3 flex flex-col gap-3 text-sm font-medium text-white/70">
              <a href="#services" onClick={closeMenu} className="hover:text-white transition-colors py-1">Servicii</a>
              {isAccommodation && <a href="#rooms" onClick={closeMenu} className="hover:text-white transition-colors py-1">Camere</a>}
              <a href="#about" onClick={closeMenu} className="hover:text-white transition-colors py-1">Despre noi</a>
              <a href="#contact" onClick={closeMenu} className="hover:text-white transition-colors py-1">Contact</a>
              {isAccommodation && bookingUrl && (
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
                  className="font-semibold py-1" style={{ color: business.primaryColor }} onClick={closeMenu}>
                  Rezervă acum →
                </a>
              )}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

// ─── Bold — brutalist, uppercase, wide tracking ───────────────────────────
function NavbarBold() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => { if (detailsRef.current) detailsRef.current.open = false; };

  const isAccommodation = ["hotel", "pension", "cottage"].includes(business.businessType ?? "");
  const bookingUrl = business.bookingComUrl ?? business.airbnbUrl;
  const showCallButton = business.headerShowCallButton !== false;
  const { overlay } = useScrollSolid();
  const ctaRadius = getButtonRadius(true, business.buttonStyle);
  const textSizeCls = { sm: "text-sm", md: "text-base", lg: "text-lg" }[business.headerTextSize ?? "md"];

  const headerCls = overlay
    ? "fixed top-0 left-0 right-0 z-50 bg-transparent transition-colors duration-300"
    : "fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10 transition-colors duration-300";

  return (
    <header className={headerCls} style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLogo textCls={`font-bold ${textSizeCls} text-white tracking-widest uppercase`} />
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-widest">
          <a href="#services" className="text-white/70 hover:text-white transition-colors">Servicii</a>
          {isAccommodation && <a href="#rooms" className="text-white/70 hover:text-white transition-colors">Camere</a>}
          <a href="#about" className="text-white/70 hover:text-white transition-colors">Despre noi</a>
          <a href="#contact" className="text-white/70 hover:text-white transition-colors">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          {showCallButton && (isAccommodation && bookingUrl ? (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex items-center gap-2 text-sm font-semibold text-on-primary px-4 py-2 ${ctaRadius} transition-opacity hover:opacity-90 uppercase tracking-wider`}
              style={{ backgroundColor: business.primaryColor }}
            >
              Rezervă acum
            </a>
          ) : (
            <a
              href={`tel:${business.phone.replace(/\s/g, "")}`}
              className={`flex items-center gap-2 text-sm font-semibold text-on-primary px-4 py-2 ${ctaRadius} transition-opacity hover:opacity-90 uppercase tracking-wider`}
              style={{ backgroundColor: business.primaryColor }}
            >
              <PhoneIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{business.phone}</span>
              <span className="sm:hidden">Sună</span>
            </a>
          ))}
          <details ref={detailsRef} className="md:hidden relative">
            <summary className="list-none flex items-center justify-center w-11 h-11 text-white/80 hover:bg-white/10 transition-colors cursor-pointer touch-manipulation select-none">
              <MenuIcon className="w-5 h-5" />
            </summary>
            <nav className="absolute top-full right-0 mt-1 w-48 bg-black border border-white/10 shadow-xl px-4 py-3 flex flex-col gap-3 text-sm font-medium text-white/70 uppercase tracking-widest">
              <a href="#services" onClick={closeMenu} className="hover:text-white transition-colors py-1">Servicii</a>
              {isAccommodation && <a href="#rooms" onClick={closeMenu} className="hover:text-white transition-colors py-1">Camere</a>}
              <a href="#about" onClick={closeMenu} className="hover:text-white transition-colors py-1">Despre noi</a>
              <a href="#contact" onClick={closeMenu} className="hover:text-white transition-colors py-1">Contact</a>
              {isAccommodation && bookingUrl && (
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
                  className="font-semibold py-1 normal-case tracking-normal" style={{ color: business.primaryColor }} onClick={closeMenu}>
                  Rezervă acum →
                </a>
              )}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

export default function Navbar() {
  if (business.headerStyle === "hidden") return <HiddenNav />;

  const v = business.designVariant ?? "classic";
  if (v === "nature") return <NavbarNature />;
  if (v === "dark") return <NavbarDark />;
  if (v === "bold") return <NavbarBold />;
  return <NavbarClassic />;
}
