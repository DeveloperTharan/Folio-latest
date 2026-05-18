# FinTech Portfolio

A premium, data-driven developer portfolio with a sidebar navigation, modular sections, and a settled green fintech aesthetic.

## Quickstart

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Architecture

```
src/
├── App.jsx                  # Section router + layout shell
├── main.jsx                 # React entry
├── index.css                # Tailwind base + custom utilities
├── components/              # Reusable UI primitives
│   ├── Sidebar.jsx          # Desktop sidebar + mobile drawer
│   ├── MobileTopBar.jsx     # Mobile-only menu trigger
│   ├── Section.jsx          # Section header wrapper
│   ├── StatusBadge.jsx      # Production/internal/beta pill
│   └── Icon.jsx             # JSON-string → lucide icon resolver
├── sections/                # Page sections (1 file each)
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Experience.jsx
│   ├── Projects.jsx
│   ├── Systems.jsx
│   ├── Skills.jsx
│   ├── Education.jsx
│   └── Contact.jsx
├── hooks/
│   └── useMediaQuery.js
└── data/                    # ← All content lives here
    ├── personal.json
    ├── navigation.json
    ├── experience.json
    ├── projects.json
    ├── systems.json
    ├── skills.json
    ├── education.json
    └── certifications.json
```

## How to add content

Everything is data-driven. To add a project, system, role, skill, etc — edit the corresponding JSON file. No UI code changes needed.

### Add a project
Edit `src/data/projects.json` and append an object:

```json
{
  "id": "unique-id",
  "name": "Project Name",
  "category": "Payment Infrastructure",
  "status": "production",
  "year": "2025",
  "summary": "One-line summary.",
  "description": "Longer description shown when expanded.",
  "features": ["Feature 1", "Feature 2"],
  "architecture": "Tech overview.",
  "impact": [
    { "metric": "1000", "label": "TPS" }
  ],
  "stack": ["Go", "Redis"],
  "links": { "github": "https://...", "live": null, "case_study": null }
}
```

Categories filter automatically. Status values: `production`, `internal`, `beta`, `archived`.

### Add a system design
Edit `src/data/systems.json`. Set `"diagram"` to one of: `payout`, `wallet`, `retry`, `ratelimit`, `liquidity` — or extend `sections/Systems.jsx` `DiagramRenderer` with a new SVG component.

### Add a navigation item
Edit `src/data/navigation.json` and create a matching section file. Register it in `App.jsx`'s `sectionMap`.

### Icons
The `Icon` component resolves string names from `lucide-react`. To add a new icon, import it in `components/Icon.jsx` and add it to the `map`.

## Design system

- **Palette**: Moss/sage green for fintech-adjacent calm + ink neutrals. Defined in `tailwind.config.js` (`moss-*` and `ink-*`).
- **Typography**: Inter (body/UI), Instrument Serif (display), JetBrains Mono (code/metadata).
- **Animations**: Framer Motion. Page transitions, staggered reveals, micro-interactions on hover/tap.
- **Responsive**: Sidebar collapses to a drawer below `lg` (1024px). All grids reflow from 1 column → 2 → 3 progressively.

## Performance

- No image dependencies (avatar from pravatar.cc placeholder; swap for your own).
- Single-page, hash-based routing — no router library.
- Tailwind purges unused CSS in production builds.
- Framer Motion uses GPU-accelerated transforms.
