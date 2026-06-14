# GitHub Copilot Instructions — Business Website Template

## Project Overview

This is a **generic business website template** built with Next.js + TypeScript + Tailwind CSS,
deployed on Vercel. It is used to quickly generate professional websites for local businesses
(restaurants, salons, mechanics, dentists, florists, etc.) and send them as live demos to
prospective clients.

---

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | Next.js 15 (App Router)             |
| Language    | TypeScript                          |
| Styling     | Tailwind CSS v4 (utility classes only) |
| Deployment  | Vercel (free tier)                  |
| Font        | Geist (Google Fonts via next/font)  |

---

## Project Structure

```
config/
  business.ts          ← ALL client-specific data lives here — edit this per client
components/
  Navbar.tsx           ← Fixed top navbar with logo + nav links + phone CTA
  Hero.tsx             ← Full-screen hero with name, tagline, and two CTAs
  Services.tsx         ← Card grid of services from business.services[]
  About.tsx            ← Description, bullet points, stats grid
  Contact.tsx          ← Contact info + Google Maps embed + mailto contact form
  Footer.tsx           ← Links, hours, socials, copyright
app/
  layout.tsx           ← Root layout — pulls title/description from business.ts
  page.tsx             ← Composes all sections in order
  globals.css          ← Tailwind import + smooth scroll only
```

---

## The One File to Edit Per Client: `config/business.ts`

**This is the only file that changes between clients.** Never hardcode client info in components.

```ts
export const business: BusinessConfig = {
  name: "Numele Afacerii",
  tagline: "Slogan scurt și memorabil",
  description: "Paragraf despre afacere (2-3 propoziții).",
  phone: "0722 000 000",
  email: "contact@domeniu.ro",
  address: "Strada și numărul",
  city: "Orașul",
  hours: "Luni–Vineri: 09:00–18:00 | Sâmbătă: 09:00–14:00",
  primaryColor: "#2563eb",   // ← main brand color (hex)
  services: [
    { title: "Serviciu 1", description: "...", price: "de la X RON" },
    // add as many as needed
  ],
  socialLinks: {
    facebook: "https://facebook.com/...",
    instagram: "https://instagram.com/...",
  },
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=...",
};
```

### How to get a Google Maps embed URL
1. Go to maps.google.com and search for the business address
2. Click Share → Embed a map → Copy the `src="..."` URL from the iframe

---

## Per-Client Workflow

### Step 1 — Research the business (15–30 min)
Sources to gather data from:
- Their **Facebook page** — name, phone, photos, hours, reviews
- **Google Maps** — address, reviews to use as testimonials, embed URL
- Any **existing website** — description, services, prices
- Their **logo** — use imagecolorpicker.com to get the hex `primaryColor`

### Step 2 — Fill in `BRIEF.md`
`BRIEF.md` at the root is the plain-text input file. No TypeScript knowledge needed.
Fill in the sections for the client. Optional sections can be left blank.

### Step 3 — Tell Copilot: "apply the brief"
Copilot reads `BRIEF.md` and populates `config/business.ts` automatically.

### Step 4 — Push and send
```bash
git add . && git commit -m "client: hotel-carpathia" && git push
```
Vercel auto-deploys. Copy the `.vercel.app` URL.

### Step 5 — Send demo message to client
After Vercel deploys, ask Copilot: **"generate the client message for [Business Name] — [vercel URL]"**
Copilot will produce a ready-to-send Romanian message using the template below.

#### Message template
```
Bună ziua!

Mă numesc Adrian, sunt dezvoltator web și am creat din proprie inițiativă un site demo pentru [Numele Afacerii].

M-am gândit că ar putea fi util — e modern, arată bine pe telefon și are tot ce trebuie: galerie foto, hartă, [camerele / serviciile] dumneavoastră și un buton direct către [Booking.com / WhatsApp].

Îl puteți vedea aici:
👉 [URL Vercel]

Dacă nu prezintă interes, îl puteți ignora fără nicio problemă — nu vă cer nimic, am vrut doar să vă arăt cum ar putea arăta.

Dacă totuși vă place și doriți să discutăm, mă puteți contacta oricând.

O zi bună!
Adrian — 0737 061 086
```

**Rules for the generated message:**
- Fill in the real business name and Vercel URL
- Replace `[serviciilor / camerelor]` with the appropriate word for the business type
- Keep the bullet list relevant — remove Booking.com line if no bookingComUrl, remove WhatsApp if not set
- Never mention price in the demo message
- Language is always Romanian

### Step 6 — After payment
- Vercel dashboard → Settings → Domains → add their custom domain
- Client points DNS to Vercel at their registrar

---

**One GitHub repo per client.** Do NOT use a monorepo with subfolders.

### Why
- Each client = one Vercel project = one `.vercel.app` URL (free tier, unlimited projects)
- Subfolders cannot be deployed independently without Turborepo/monorepo config (unnecessary complexity)
- Clients can be handed over cleanly — just transfer the repo

### Workflow for each new client
```bash
# 1. Clone the template into a new repo named after the client
git clone https://github.com/YOUR_USER/website-template nume-client
cd nume-client

# 2. Remove the template's git history
rm -rf .git
git init
git add .
git commit -m "init: nume-client"

# 3. Create a new GitHub repo (e.g. "website-nume-client") and push
git remote add origin https://github.com/YOUR_USER/website-nume-client
git push -u origin main

# 4. Import the new repo in vercel.com → auto-deploys on every push
# 5. Fill in config/business.ts with the client's real data
# 6. Push → Vercel deploys → send .vercel.app URL to client
```

### After payment
- In Vercel dashboard → project → Settings → Domains → add their custom domain
- Point their DNS to Vercel (they manage DNS at their registrar)

---

## Professional Template Checklist

The following sections/features make the template production-ready for any business type.
Add them incrementally as clients request them:

### Must-have (add before first paid client)
- [x] Mobile hamburger menu
- [x] Open Graph metadata (WhatsApp/Facebook preview)
- [x] Dynamic services grid (any number of services)
- [x] Configurable stats and bullet points in About
- [x] TikTok social link support
- [x] **WhatsApp floating button** — `components/WhatsAppButton.tsx`; `whatsapp?: string` in config
- [x] **Favicon per client** — `icons` in `app/layout.tsx` metadata
- [x] **Better contact form** — Web3Forms in `components/Contact.tsx`; falls back to `mailto:` if no key

### High-value add-ons (build when first client asks)
- [x] **Gallery section** — `components/Gallery.tsx`; masonry CSS columns; `gallery: string[]` in config
- [x] **Testimonials section** — `components/Testimonials.tsx`; star ratings; `testimonials[]` in config
- [x] **FAQ section** — `components/FAQ.tsx`; native `<details>` accordion; `faq[]` in config
- [x] **Hero with photo** — `heroImageUrl` + `heroImageAlt` in config; `next/image` with dark overlay

### Business-type specific (build per client)
- [ ] **Menu section** (restaurants) — `menuCategories[]` with dishes + prices
- [x] **Rooms section** (hotels, pensions, cottages) — `components/Rooms.tsx`; `rooms[]` in config; booking URL priority chain
- [ ] **Brands serviced** (mechanics) — logo grid of car brands they work on

---

## Component Rules

- **Never add inline styles** — use Tailwind utility classes + `style={{ backgroundColor: business.primaryColor }}` for the brand color only
- **Never hardcode Romanian/English text** in components — it must come from `business.ts` or be generic UI copy that works for all businesses
- **Phone numbers** must always be `<a href="tel:...">` — never plain text
- **Email links** must always be `<a href="mailto:...">` — never plain text
- **External links** (social media) must have `target="_blank" rel="noopener noreferrer"`
- **Images**: use `next/image` with proper `alt` text; keep hero backgrounds as CSS/color until client provides a photo

---

## Pages & Sections

Every website has exactly **one page** (`app/page.tsx`) with these sections in order:

1. `<Navbar />` — fixed, always visible
2. `<Hero />` — first thing the visitor sees; full-screen, brand color background
3. `<Services />` — what the business offers
4. `<About />` — who they are, trust signals
5. `<Contact />` — how to reach them; includes map + mailto form
6. `<Footer />` — closing info

---

## Adding a New Section

When a client needs an extra section (e.g., Gallery, Testimonials, FAQ, Pricing Table):
1. Create a new component in `components/`
2. Add it to `app/page.tsx` in the appropriate position
3. If it needs client-specific data, add the new fields to `BusinessConfig` in `config/business.ts`

---

## Colors

- Use `business.primaryColor` (hex) for all brand-colored elements via `style={{ ... }}`
- Background and text: stick to Tailwind's `gray-*` palette for neutrals
- Never hardcode a specific color like `#2563eb` inside a component — always reference `business.primaryColor`

---

## SEO

- `app/layout.tsx` automatically sets `<title>` and `<meta description>` from `business.name` and `business.tagline`
- Add `<meta name="viewport">` is handled by Next.js automatically
- For better local SEO, add the city name to the tagline or description in `business.ts`

---

## Deployment Checklist (before sending demo to client)

- [ ] All fields in `config/business.ts` filled with real data (no placeholder text)
- [ ] `primaryColor` matches the business brand
- [ ] Phone number is correct and `tel:` link works on mobile
- [ ] Google Maps embed shows the right location
- [ ] Site loads correctly on mobile (check with Chrome DevTools)
- [ ] Push to GitHub — Vercel deploys automatically
- [ ] Copy the `.vercel.app` URL and send to client

---

## What NOT to Do

- **Do not** create multiple pages — this is a single-page website
- **Do not** add a database, authentication, or server actions — static/client only
- **Do not** install unnecessary npm packages — keep the bundle small
- **Do not** use `<img>` tags — use `next/image`
- **Do not** add dark mode — these are business sites, light mode only
- **Do not** hardcode the business name, phone, or address anywhere in components
