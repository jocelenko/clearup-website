# Clear Up — Updated Website Source

This zip contains the updated React + Vite + Tailwind source for **clearup.pages.dev**, rebuilt per the brief in `Clear Up Website Information 28 05 26.docx`.

## What changed
- Converted from multi-page to a single-page scrolling site with anchor sections.
- New Hero — tagline + Sonia intro **video placeholder** (right side) + Request a Quote CTA + phone `1300 123 456`.
- New Services section — 3 cards (Window / Retail & Commercial / Periodical), each opens a modal with the full description, with a "Request a Quote for X" button that pre-selects that service in the quote form.
- New Industries auto-scrolling carousel (Education, Shopping Centre & Retail, Commercial, Medical Practice, Hospitality) + Request a Quote CTA.
- New Management Systems section (WHS, Quality, Risk, Environmental) — 4-card grid.
- New "Built to Serve Better — Our In-House App" tech section.
- New Values / Culture / Vision section (square + rectangle + square layout).
- Rebuilt Footer — 4-column (Company / Services / Locations / Stay in Touch), acknowledgement of Country, link to Privacy Policy.
- Rebuilt **Request a Quote popup modal** — first asks the user to select a service, then shows the matching detailed checklist (per the Word doc). Submits to `admin@clear-up.com.au` via FormSubmit.co.
- Replaced Privacy Policy content with the new text from the 28/05/26 doc.
- Removed legacy `/services`, `/training`, `/careers`, `/quote`, `/terms-of-service` routes.

## Things you still need to do

### 1. Add the Sonia introduction video
Drop the video file into `public/sonia.mp4`, then in `src/components/Hero.tsx` change the `<source src="" type="video/mp4" />` line to:
```html
<source src="/sonia.mp4" type="video/mp4" />
```
And remove `opacity-0` from the video tag so it shows.

### 2. Activate the quote form email
The form posts to `https://formsubmit.co/ajax/admin@clear-up.com.au`. The **first submission** triggers a confirmation email to `admin@clear-up.com.au` — click the confirmation link in that email once. After that, every submission delivers normally to that inbox. No account or API key needed.

If you'd rather use a different service (Resend, SendGrid, Cloudflare Pages Functions), change the `FORM_ENDPOINT` constant near the top of `src/components/QuoteModal.tsx`.

## How to deploy

You don't need to do this on your computer — pick whichever is easiest.

### Option A — Easiest: Connect a GitHub repo to Cloudflare Pages (recommended)
1. Upload this folder to a new GitHub repo (free).
2. In Cloudflare dashboard → Workers & Pages → clearup → Settings → Builds & deployments → connect the repo.
3. Build command: `npm run build`. Build output: `dist`.
4. Save — Cloudflare builds and deploys automatically. Every future edit you push will auto-deploy.

### Option B — Build in your browser (no install needed)
1. Go to https://stackblitz.com or https://codesandbox.io.
2. Create a new project → upload this zip.
3. In the terminal: `npm install && npm run build`.
4. Download the resulting `dist/` folder.
5. In Cloudflare dashboard → clearup → Create deployment → drag-and-drop the `dist/` folder.

### Option C — Build locally (if you have Node 20+)
```
npm install
npm run build
```
Then drag-and-drop the generated `dist/` folder into Cloudflare Pages → clearup → Create deployment.

