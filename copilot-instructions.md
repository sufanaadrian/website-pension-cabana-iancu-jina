# Copilot Instructions — Business Website Template

This is a **config-driven website template**. All site data lives in one file: `config/business.ts`.

---

## Quick Start Workflow

1. **Clone the template** (or use as-is for a new client)
2. **Edit `config/business.ts`** directly with client data (name, services, rooms, etc.)
3. **Run `npm run dev`** to see live preview
4. **Make changes, see them instantly** — no build step needed
5. **Commit and push** when done
6. **Deploy on Vercel** — auto-deploys on push

---

## Editing config/business.ts

All site content is defined in this single object:

```ts
export const business: BusinessConfig = {
  // Basic info
  name: "Business Name",
  tagline: "Short tagline",
  description: "2-3 sentences about the business",
  phone: "0722000000",
  email: "contact@example.com",
  address: "Street name and number",
  city: "City name",
  hours: "Mon-Fri: 09:00-18:00 | Sat: 09:00-14:00",
  primaryColor: "#2563eb", // Brand color (hex)
  businessType: "pension", // pension | hotel | restaurant | salon | generic
  designVariant: "classic", // classic | dark | bold

  // Hero section
  heroImageUrl: "/images/hero.jpg", // or Unsplash URL
  heroImageAlt: "Description of image",

  // Services
  services: [
    {
      title: "Service Name",
      description: "What it includes",
      price: "from X RON", // optional
    },
  ],

  // Rooms (for pension/hotel/cottage)
  rooms: [
    {
      title: "Room Type",
      description: "Room details",
      price: "from X RON/night",
      features: ["WiFi", "TV", "Private bathroom"],
      imageUrl: "/images/room-1.jpg",
    },
  ],

  // Optional sections (omit if not needed)
  gallery: ["/images/gallery-1.jpg", "/images/gallery-2.jpg"],
  testimonials: [
    {
      name: "Guest Name",
      role: "Review source",
      stars: 5,
      text: "Their review text",
    },
  ],
  faq: [
    {
      question: "Question?",
      answer: "Answer.",
    },
  ],
  bulletPoints: ["Point 1", "Point 2", "Point 3"],
  stats: [
    { value: "9.2★", label: "Rating" },
    { value: "100+", label: "Guests" },
  ],

  // Booking & Contact
  bookingComUrl: "https://booking.com/...",
  googleMapsEmbedUrl: "https://maps.google.com/maps/embed?pb=...",
  whatsapp: "40722000000", // Romanian format, no spaces/+

  // Social
  socialLinks: {
    facebook: "https://facebook.com/...",
    instagram: "https://instagram.com/...",
    tiktok: "https://tiktok.com/...",
  },
};
```

**That's it.** Edit this file → changes appear live in browser.

---

## Live Preview

```bash
npm run dev
```

Opens `http://localhost:3000` — changes to `config/business.ts` show instantly (hot reload).

---

## Images

**Option 1: External URLs** (quick, no setup)

```ts
heroImageUrl: "https://images.unsplash.com/photo-xxx?w=1400&q=80";
gallery: [
  "https://images.unsplash.com/photo-yyy?w=800&q=80",
  "https://images.unsplash.com/photo-zzz?w=800&q=80",
];
```

**Option 2: Local images** (recommended for production)

1. Add images to `/public/images/{client-name}/`
2. Use relative paths:

```ts
heroImageUrl: "/images/panoramic-hill/hero.jpg";
gallery: [
  "/images/panoramic-hill/gallery-1.jpg",
  "/images/panoramic-hill/gallery-2.jpg",
];
```

Local images load faster via Vercel CDN.

---

## Deploy

1. **Commit locally:**

   ```bash
   git add .
   git commit -m "client: panoramic-hill-jina"
   ```

2. **Push to GitHub:**

   ```bash
   git remote add origin git@github.com:sufanaadrian/website-panoramic-hill.git
   git push -u origin main
   ```

3. **Deploy on Vercel:**
   - Go to `vercel.com/new`
   - Select your GitHub repo
   - Click "Deploy"
   - Get your `.vercel.app` URL

**That's it.** Site is live.

---

## Workflow Summary

| Step | What You Do                                |
| ---- | ------------------------------------------ |
| 1    | Clone/create new repo from template        |
| 2    | Edit `config/business.ts` with client data |
| 3    | Run `npm run dev` to preview               |
| 4    | Make changes, see them live                |
| 5    | Commit and push to GitHub                  |
| 6    | Import in Vercel, get live URL             |

---

## Key Files

| File                 | Purpose                                |
| -------------------- | -------------------------------------- |
| `config/business.ts` | **All site content — edit this**       |
| `app/page.tsx`       | Layout (don't edit)                    |
| `components/`        | UI components (don't edit)             |
| `public/images/`     | Image storage (add client photos here) |

---

## Business Types & What They Include

| Type         | Includes                       |
| ------------ | ------------------------------ |
| `pension`    | Rooms section, booking buttons |
| `hotel`      | Rooms section, booking buttons |
| `cottage`    | Rooms section, booking buttons |
| `restaurant` | Services, contact              |
| `salon`      | Services, WhatsApp CTA         |
| `generic`    | Services, about, contact       |

---

## Design Variants

Choose one: `"classic"` | `"dark"` | `"bold"`

- **classic** — Minimal, clean (default)
- **dark** — Upscale, elegant (hotels, restaurants)
- **bold** — Modern, high-contrast (salons, barbershops)

---

## Colors

`primaryColor` controls all brand colors across the site:

```ts
primaryColor: "#2563eb"; // blue
primaryColor: "#1a5276"; // dark blue (pension)
primaryColor: "#b91c1c"; // red (restaurant)
primaryColor: "#c9a84c"; // gold (salon)
```

Use `imagecolorpicker.com` to pick hex from client's logo.

---

## Troubleshooting

| Issue               | Fix                                                          |
| ------------------- | ------------------------------------------------------------ |
| Changes not showing | Save file, refresh browser (npm run dev auto-reloads)        |
| Images broken       | Check URL is valid or path is correct `/images/...`          |
| Build fails         | Check `config/business.ts` syntax (missing quotes, brackets) |
| Can't push          | Ensure SSH key set up: `ssh -T git@github.com`               |

---

## That's It

**The entire system is:** Fill config → preview live → commit → deploy.

No BRIEF.md, no parsing, no generation. Just direct editing.
