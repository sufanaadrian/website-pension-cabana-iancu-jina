import type { Viewport } from "next";
import {
  Geist,
  Inter,
  Poppins,
  Work_Sans,
  Nunito_Sans,
  Quicksand,
  Space_Grotesk,
  Lora,
  Playfair_Display,
  Fraunces,
  Cormorant_Garamond,
  DM_Serif_Display,
  Oswald,
  Bebas_Neue,
} from "next/font/google";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Curated font library — every font below is loaded once as a CSS variable.
// Which variable `--font-heading` / `--font-body` actually use is decided
// per-client in app/page.tsx (business.headingFont / business.bodyFont),
// completely independent of the design variant.
const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const worksans = Work_Sans({ variable: "--font-worksans", subsets: ["latin"] });
const nunito = Nunito_Sans({ variable: "--font-nunito", subsets: ["latin"] });
const quicksand = Quicksand({ variable: "--font-quicksand", subsets: ["latin"] });
const spacegrotesk = Space_Grotesk({ variable: "--font-spacegrotesk", subsets: ["latin"] });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const dmserif = DM_Serif_Display({ variable: "--font-dmserif", subsets: ["latin"], weight: ["400"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"] });
const bebas = Bebas_Neue({ variable: "--font-bebas", subsets: ["latin"], weight: ["400"] });

const fontVariables = [
  geist,
  inter,
  poppins,
  worksans,
  nunito,
  quicksand,
  spacegrotesk,
  lora,
  playfair,
  fraunces,
  cormorant,
  dmserif,
  oswald,
  bebas,
]
  .map((f) => f.variable)
  .join(" ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${fontVariables} antialiased`}>
      <body className="min-h-dvh flex flex-col">
        {children}
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {`history.scrollRestoration='manual';if(window.location.hash){history.replaceState(null,'',window.location.pathname);}window.scrollTo(0,0);`}
        </Script>
      </body>
    </html>
  );
}
