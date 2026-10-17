# Khushi — Sakura Full-Stack Portfolio

A five-route Next.js App Router portfolio for **Khushi**. Full-stack and backend development take priority; AI/ML is presented as a developing foundation. The visual direction is Japanese editorial / Sakura: warm ivory, restrained rose, lavender and sage, plus an optional midnight-blue / sky-blue dark theme.

## Pages

- `/` — Home, anime portrait, featured builds, skill preview, and an optional GPU shader visual.
- `/about/` — Learning approach, education, experience, skills, and development principles.
- `/projects/` — Story-led project flip cards, filters, build status, repository links, approach, challenge, and next iteration.
- `/certifications/` — Five supplied certificate previews with direct links to the original PDFs.
- `/contact/` — Email, LinkedIn, and GitHub.

## Performance decisions

- **Three.js / GLSL is opt-in** via the “Enable 3D” control. The decorative shader bundle is not downloaded or parsed during the initial page load; simple CSS orbit animations remain active. This is intentional to reduce initial JavaScript execution and Total Blocking Time.
- Reveal animations use one shared `IntersectionObserver` rather than one observer/effect per element. The `Reveal` wrappers themselves are server-rendered, so the content does not need an individual client hydration boundary.
- The Sakura assistant launcher is small. Its chat panel downloads only when a visitor opens it, and the avatar uses a compact WebP.
- Certificate previews are local, compressed WebP images and are only mounted when their cards are flipped. Original PDF files open separately.
- The layout uses reserved image dimensions, responsive breakpoints, scroll-contained chat content, and reduced-motion fallbacks to limit layout movement and mobile overflow.
- `app/robots.js` serves a valid crawl policy. `app/sitemap.js` emits the five route URLs when `NEXT_PUBLIC_SITE_URL` is set to the real deployed origin.

## Sakura portfolio assistant

The chat assistant provides useful answers for project exploration, skills, certificates, current builds, education, and contact. Without an API key, it runs as a fast portfolio-aware guide using verified local portfolio facts. To enable free-form AI answers, configure `OPENAI_API_KEY` as a **server-side** environment variable and optionally set `OPENAI_MODEL`.

Copy `.env.example` to `.env.local` for local development and set only the values you need. **Do not commit `.env.local`, paste the API key into client-side code, or include the key in a public repository.** The chat route applies input length and basic per-IP request limits; before a high-traffic public launch, use a durable rate limiter at the hosting layer as well. AI API usage may incur provider charges.

## Technology

- Next.js App Router / React
- SCSS design tokens and responsive styles
- Three.js + custom GLSL `ShaderMaterial` (loaded only on demand)
- Next/Image with a pre-compressed anime portrait and local certificate thumbnails
- Server route handler for the assistant; optional OpenAI Responses API call from the server only
- Reduced-motion support, keyboard-visible focus, semantic navigation, and theme persistence

## Run locally

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

For production testing, do **not** use the dev server for Lighthouse. Development mode includes extra tooling and can inflate JavaScript / main-thread metrics. Build and test the production server instead:

```bash
npm run build
npm run start
```

Then open `http://localhost:3000` and run Lighthouse against that production server. Retest both mobile and desktop. TBT, Speed Index, CLS, and BFCache eligibility also depend on the browser, device, extensions, deployment headers, network, and the page version being audited, so remeasure after deployment.

## SEO configuration

Set `NEXT_PUBLIC_SITE_URL` to the actual public HTTPS origin in the hosting environment (for example the real Vercel production URL). This enables absolute `metadataBase` URLs and a sitemap containing the five real routes. Until a real domain is assigned, the robots endpoint remains valid and allows public pages while disallowing `/api/`.

## Deploy

Use a server-capable Next.js host such as Vercel, not a static-only GitHub Pages export, if you want the `/api/assistant` route and server-side AI mode to work. Deploy from the project root containing `package.json`. After setting environment variables, redeploy and check `/robots.txt`, `/sitemap.xml`, all five pages, mobile navigation, certificate links, the assistant, and the optional shader.

## Certificates and accuracy

Certificate files are served from `public/certificates/`. Anyone visiting the deployed website can access those PDFs, so review them before making the site public. The GPA AI Analyzer and Collaborative Code Editor are intentionally labelled **In progress**. AWS and Docker are presented as fundamentals; authorization is described as a current learning focus.
