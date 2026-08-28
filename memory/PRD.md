# HarvestGate Overseas — PRD

## Original problem statement
Premium B2B agricultural export SPA for HarvestGate Overseas Private Limited — dark-luxury editorial site
for international buyers of Indian foxnuts, millets, walnuts and jaggery. Frontend-only (Phase 1):
hardcoded product data, mock enquiry form, React Router SPA routing, dark/light theme with localStorage,
product accent colour system, full responsive + motion polish. Awwwards-level art direction requested.

## Architecture
- React (CRA + craco) + Tailwind CSS, React Router v7, framer-motion, lenis smooth scroll, sonner toasts.
- No backend / database used. Template FastAPI + Mongo left untouched.
- Product catalogue: `/app/frontend/src/data/products.js` (swap for an API later).
- Theme: `/app/frontend/src/theme/ThemeProvider.jsx` → `dark` class on `<html>`, key `hg-theme`,
  pre-paint script in `public/index.html` prevents flash. All colours via CSS vars (`--hg-*`) → Tailwind `hg-*`.
- Imagery: AI-generated dark editorial product/lifestyle photography hosted on Emergent CDN.

## User personas
- International importer / distributor sourcing container-scale Indian agri commodities.
- Procurement manager comparing grades, specs, incoterms before requesting a quotation.

## Core requirements (static)
Full client-side routing on 9 routes; dark/light theme persistence; four product accents
(foxnuts cream, millets sage, walnuts amber, jaggery ochre); validated frontend-only enquiry form;
mobile-first responsive with mobile nav; premium motion.

## Implemented — June 2026
- Layout shell: sticky blur navbar, mobile fullscreen overlay menu, editorial footer, grain overlay.
- Homepage: kinetic parallax hero with masked line-by-line reveal, editorial marquee, statement +
  export stats, asymmetric 4-card product bento, numbered manifesto chapters with parallax image, CTA band.
- Products listing: asymmetric grid, per-product accent, spec strip, CTA.
- 4 product detail pages: parallax hero, overview, grades table, spec sheet, MOQ/incoterms/markets, related tiles.
- About: story, stats, mission values, timeline, credentials band.
- Contact: 9-field enquiry form, full client-side validation, animated success panel + reference number, toasts.
- Terms: 10 clauses with sticky table of contents.
- 404 page for unmatched routes.
- Theme toggle, lenis momentum scroll, scroll-reveals, hover micro-interactions.

## Backlog
- P0: swap in the official HarvestGate logo file and client-supplied product photography when provided.
- P1: FastAPI + MongoDB enquiry storage; admin panel; Resend email notification on new enquiry.
- P1: SEO meta/OG tags per route, sitemap.
- P2: WhatsApp enquiry, downloadable PDF spec sheets, analytics, multi-language.

## Next tasks
1. Replace generated imagery/logo with official brand assets.
2. Backend enquiry persistence + email alerts.
3. Per-route SEO metadata.
