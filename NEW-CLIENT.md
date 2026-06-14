# New Client Website — Step by Step

Use this guide every time you build a website for a new client.

---

## Before you start

Collect from the client:
- [ ] Business name, type (pension / hotel / restaurant / salon / etc.)
- [ ] Phone, email, address, city
- [ ] Hours / schedule
- [ ] Photos (save to `public/images/{client-slug}/`)
- [ ] Social links (Facebook, Instagram, TikTok)
- [ ] Booking.com / Airbnb URLs (if accommodation)
- [ ] WhatsApp number
- [ ] Google Maps embed URL
- [ ] Services / amenities list
- [ ] Room details and prices (if accommodation)
- [ ] Reviews / testimonials (copy from Booking.com, Google, etc.)
- [ ] FAQ answers
- [ ] Logo color or preferred primary color (use imagecolorpicker.com on their logo)
- [ ] Design preference: classic / nature / dark / bold

---

## Step 1 — Start the dev server

```bash
cd ~/Documents/Github/website-template
npm run dev
```

---

## Step 2 — Open the admin panel

Go to `http://localhost:3000/admin`

You'll see a split view:
- **Left**: tabbed form for all client data
- **Right**: live preview that updates ~1.5 seconds after you type

---

## Step 3 — Fill in the form

Work through each tab:

1. **General** — name, tagline, description, contact, business type
2. **Design** — pick primary color (from logo), pick design variant
3. **Hero & Booking** — add the best exterior/landscape photo, booking URLs
4. **Services** — list all amenities or services
5. **Rooms** — add each room with price, features, photo
6. **About** — bullet points (selling points) + stats (rating, pool, etc.)
7. **Gallery** — paste image URLs or `/images/client-slug/photo.jpg` paths
8. **Reviews** — copy 3–5 reviews from Booking.com or Google
9. **FAQ** — add check-in time, breakfast policy, pet policy, parking, etc.
10. **Social & Contact** — Facebook, Instagram, WhatsApp, Maps, Web3Forms key

The preview refreshes on the right after every save. Watch for the **Saved ✓** indicator.

---

## Step 4 — Customize the design

If the client wants a different look:

- **Color**: change Primary Color in the Design tab (use their logo color)
- **Variant**:
  - `classic` — warm, traditional (good for most)
  - `nature` — earthy, green overlay (mountain/eco properties)
  - `dark` — elegant, dark background (luxury hotels)
  - `bold` — high-contrast, modern (salons, urban spots)

If they want something totally custom, ask Claude Code to modify the components — all visual logic is in `/components/*.tsx`.

---

## Step 5 — Add local photos

If the client gave you photos directly (not hosted online):

1. Create a folder: `public/images/{client-slug}/`
2. Copy the photos there
3. In the admin, use `/images/{client-slug}/photo.jpg` as the URL

---

## Step 6 — Export to a new repo

When you're happy with the preview:

1. Go to the **Export** tab in the admin panel
2. The repo name is pre-filled (e.g. `website-pension-panoramic-hill-jina`) — adjust if needed
3. Click **Export & Init Git Repo**
4. A copy of the template (with current config) is created at `~/Documents/Github/{repo-name}`

---

## Step 7 — Push to GitHub & deploy

```bash
# The export step already ran git init + git commit
cd ~/Documents/Github/{repo-name}

# Create the repo on github.com first (same name, no README), then:
git remote add origin git@github.com:sufanaadrian/{repo-name}.git
git push -u origin main
```

Then:
1. Go to vercel.com/new
2. Import the GitHub repo
3. Click Deploy (no config needed — Next.js is auto-detected)
4. Get the `.vercel.app` URL and share with the client

---

## Step 8 — Custom domain (optional)

If the client has a domain:
1. In Vercel project → Settings → Domains → Add domain
2. At the domain registrar, point the DNS to Vercel's nameservers or add a CNAME

---

## After delivery

- The client's website is independent — changes to this template don't affect it
- If the client wants updates, open their repo, edit `data/client.json`, commit, push (Vercel auto-deploys)
- To update the design: edit the components in their repo directly

---

## Claude Code prompt for quick generation

If you prefer to have Claude Code fill in the config instead of using the admin UI, say:

> "Fill in data/client.json with the following client data: [paste client info]"

Claude will update the JSON, and you can watch the preview update live in `npm run dev`.
