# Clear Up brand brief for Claude Design

Paste everything below into Claude Design, then add your specific request at the end.

---

## The system of record

The Clear Up website is the source of truth for this brand. Live at
https://jocelenko.github.io/clearup-website/ and everything below is taken
directly from its code, not from memory. When anything here conflicts with
an older asset, this wins.

## The business

Clear Up is a commercial cleaning company operating across Brisbane, the Gold
Coast and the Sunshine Coast in Queensland, Australia. Over 20 years of
operating history.

Buyers are facility managers, property managers, and operators of retail sites,
offices, medical practices, schools and hospitality venues, procuring recurring
commercial cleaning contracts. This is B2B. Decisions are made on reliability
and evidence, not on lifestyle appeal.

Services: Window Cleaning, Retail and Commercial Cleaning, Periodical Cleaning
(carpet care, pressure washing, wood treatment, bathroom steam cleaning).

Stated differentiators: transparency, daily reporting, proactive management,
and an in-house job tracking app.

Contact: Sonia Alano, Business Development. 0407 000 059.
sonia@clear-up.com.au. General inbox admin@clear-up.com.au. clear-up.com.au

## Colour

**Blues**

| Token | Hex | Use |
|---|---|---|
| primary-900 | `#1e3a8a` | Primary dark surface. Hero, alternating sections |
| primary-800 | `#1e40af` | Gradient midpoint only |
| primary-600 | `#2563eb` | Accent, links, icons, CTA on light backgrounds |
| primary-200 | `#bfdbfe` | Body text on navy surfaces |
| primary-50 | `#eff6ff` | Hover state on white buttons |
| slate-900 | `#0f172a` | Deepest surface. Footer, gradient ends |

**Greens** anchored on the green in the "Up" of the wordmark.

| Token | Hex | Use |
|---|---|---|
| leaf-500 | `#84bb4c` | The brand green. Sampled from the logo. Accents and small marks only |
| leaf-400 | `#9bc963` | Status dots, small accents on dark |
| leaf-200 | `#d3e9b3` | Body text on dark green surfaces |
| leaf-100 | `#e8f4d6` | Pale fills, card backgrounds on white |
| leaf-800 | `#405c26` | Dark green surface |
| leaf-900 | `#2c401b` | Primary dark green surface |
| leaf-950 | `#1a2810` | Gradient end for green surfaces |

**The one hard colour rule.** White text on the raw brand green `#84bb4c`
measures 2.3:1 and is unreadable. It fails WCAG by a wide margin. Never do it.
Where a green surface needs white text, use `leaf-800` or `leaf-900`. Where the
bright brand green is wanted, put dark navy text on it, or use it as a small
accent mark rather than a background.

**A known inconsistency to be aware of.** The website's navy `#1e3a8a` is not
the navy in the printed logo wordmark, which is closer to `#13294b`. The site
was built on the lighter blue and the client has approved it. For anything that
sits directly beside the printed logo, such as a business card or a signage
mock, prefer the logo's own `#13294b` so the two do not clash. For standalone
digital pieces, use `#1e3a8a` to match the site.

Other colours sampled from the logo mark, available if a piece needs them:
sphere blue `#1a84c4`, sky highlight `#2aabdc`, deep teal `#0a4a42`.

**Section rhythm.** The client specifically asked for alternating dark bands and
approved the result. The homepage runs navy, green, navy, green, navy, white,
then a `#0f172a` footer. Carry that alternation into multi-section pieces rather
than defaulting to white throughout.

## Typography

- **Display and headings:** Outfit, weight 600. Tight tracking on large sizes.
- **Body:** Inter, weight 400. Weight 600 for emphasis.
- Both are Google Fonts.

Scale in use:

| Role | Size |
|---|---|
| Hero headline | 32px mobile, 48px tablet, 60px desktop |
| Section heading | 30px mobile, 36px tablet, 48px desktop |
| Card heading | 20px |
| Lead paragraph | 18px |
| Body | 16px |
| Small print, footer, labels | 14px |

Section headings are centred with a single short supporting line under them.
Never stack an eyebrow, a heading and a subheading. The client cut the site's
subheadings down to one line each on purpose.

## Layout

- Content max width 1280px, gutters 16px mobile, 32px desktop.
- Section padding 56px mobile, 64px desktop. The client asked twice for tighter
  spacing, so err compact rather than airy.
- Card corner radius 16px. Buttons and pills are fully rounded.
- Grid gap 24px.
- Every interactive element is at least 44 by 44 pixels.

## Component vocabulary

- **Pill badge.** Fully rounded, translucent fill, 1px light border, small
  coloured dot on the left. Used for the lead message and section labels.
- **Card.** White, 16px radius, 24 to 32px padding, hairline border, soft
  shadow that deepens on hover. On dark sections the cards stay white.
- **Icon tile.** 56px square, 12px radius, gradient from `#2563eb` to `#84bb4c`,
  white icon inside.
- **Primary button.** On dark surfaces: white pill, navy text. On light
  surfaces: `#2563eb` pill, white text. Always with an arrow for forward
  actions.
- **Secondary button.** Translucent white fill, light border, white text.
- **Icons.** Lucide, 2px stroke on a 24px grid. Custom icons must match that
  weight. Window Cleaning uses a squeegee, Periodical Cleaning uses a cleaning
  brush, both chosen by the client.

## Voice and copy

- Australian English throughout. Specialised, sanitisation, centre, organised.
- Plain and direct. No marketing hype, no exclamation marks, no invented
  superlatives.
- **Never use em dashes.** Use a comma, a full stop or a colon.
- The words INTEGRITY, CARE and RESPECT are set in capitals wherever the
  brand line appears. That is a deliberate device the client asked for.
- The brand line: "Over 20 years of cleaning experience, built on INTEGRITY,
  CARE and RESPECT."
- The lead message: "100% service delivery with transparency."

## Things you must not invent

The business has no published proof material yet. Do not fabricate any of it,
even as placeholder, because these pieces go to a real client:

- Client names, logos, testimonials or case studies
- Certifications, ISO numbers or accreditations
- Insurance figures, staff numbers, site counts or years in any market
- Statistics, ratings or awards

The only credibility claim currently approved is "over 20 years of cleaning
experience" and the three service lines. If a layout needs proof to work, mark
it clearly as a placeholder and say what real information is required.

## Assets

- `logo.png` is the full colour wordmark on light backgrounds.
- `logo overlay.png` is the reversed white version for dark backgrounds. Note
  that the reversed version loses the green "Up", so on dark pieces the green
  has to come from elsewhere in the layout.
- Hero photography style: real people working in real commercial spaces,
  natural light, shallow depth of field, treated with a navy scrim so text sits
  on top. Not stock-looking studio shots of products.

## Accessibility floor

Every piece must clear these, and they are checked on the built result, not
assumed:

- Body text 4.5:1 against its actual background. Large text 3:1.
- On a photograph, measure against the brightest area behind the text, not the
  average.
- Do not carry meaning by colour alone.

---

## What I need this time

[Describe the piece here. Include format and dimensions, where it will be seen,
whether it is print or screen, and what it has to make the reader do.]
