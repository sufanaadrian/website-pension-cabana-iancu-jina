<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Website Template — How It Works

This is a multi-client website template. Each client gets their own git repo (exported from this one), deployed separately on Vercel.

## Source of truth

All business data lives in **`data/client.json`**. The TypeScript types and re-export live in `config/business.ts`. Components import from `config/business`, which in turn imports from the JSON. **Never hardcode data inside components.**

## Workflow for a new client

See `NEW-CLIENT.md` for the full step-by-step guide.

Short version:
1. `npm run dev`
2. Open `localhost:3000/admin` — fill in the form
3. Preview updates automatically (1.5 s debounce autosave)
4. Export → new git repo via the "Export" tab
5. Push to GitHub → deploy on Vercel

## Admin panel (`/admin`)

- Left panel: tabbed form for all content (General, Design, Hero, Services, Rooms, About, Gallery, Reviews, FAQ, Social, Export)
- Right panel: live iframe preview of `localhost:3000`
- Autosaves `data/client.json` on every change (1.5 s debounce)
- Form state persists in `localStorage` so it survives HMR reloads
- **Only works in development** — the save API returns 403 in production

## Design variants

Set `designVariant` in the JSON or via the Design tab:

| Variant  | Feel                    | Best for              |
| -------- | ----------------------- | --------------------- |
| classic  | Warm, traditional       | B&B, pension, generic |
| nature   | Earthy, mountain, green | Mountain / eco stays  |
| dark     | Upscale, elegant        | Luxury hotel          |
| bold     | Modern, high-contrast   | Salon, studio, urban  |

## Rules

- **Don't change component files** to add client-specific data — use `data/client.json`
- **Don't modify `app/layout.tsx`** to import `config/business` — metadata lives in `app/page.tsx` to avoid HMR polluting the admin form
- **One repo per client** — export via the admin panel, never commit different clients into the same repo
- Commit message format: `init: {repo-name}`
