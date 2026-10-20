## Design Concept
This deck serves as a technical engineering status report and project retrospective, designed specifically for a developer and product leadership audience. The visual anchor draws from Vercel-style technical documentation and Swiss typography—borrowing the strict grid discipline, mono-spaced data formatting, and high-contrast dark mode aesthetics from modern developer tooling. The color story is cool, mineral, and highly striking: the background is a deep graphite, providing a void-like canvas for high-legibility off-white body text. We avoid the cliché of using generic "localization globes" or multi-colored flags; instead, the theme relies entirely on an electric cyan-blue accent for data highlights, progress bars, and status badges. Pure white (`#FFFFFF`) is permitted solely for top-level headings to guarantee absolute crispness against the dark graphite. The typographic voice is fiercely utilitarian, pairing a clean sans-serif for narrative with a monospace font for technical keys, variables, and system statuses.

## Visual Language
- **Imagery:** None. Decorative photography is strictly forbidden; all visual weight is carried by typography, structural layout, and CSS-based data visualizations.
- **Containers:** Card-based architecture using sharp-cornered (0px border-radius) tinted blocks. Whitespace is heavily prioritized, with minimum 32px padding inside all surface containers and 60px margins globally.
- **Icons:** Minimal, solid, monochrome (rendered in the primary electric blue or muted gray). Used exclusively to indicate file statuses (sync/unsync) or architectural node types, never for decoration.
- **Dataviz:** Purely structural CSS diagrams (flowcharts, architecture nodes) and metric grids. Tables feature minimalist borders with monospace font for i18n keys (`en-US`, `hr-HR`). Chart series rely on electric blue (`#00E5FF`) for actual/completed values and muted slate (`#475569`) for baselines or missing keys.
- **Motif:** A terminal-style breadcrumb `>_ KANEO/i18n` fixed in the top-left corner of every slide, rendered in monospace muted text, anchoring the technical context.

## Layout Directives
- **Global:** 60px margins on all sides. Content is strictly left-aligned. The top-left motif sits at 30px/30px. Page numbers in monospace sit in the bottom-right corner.
- **Cover:** Center-aligned, massive title text with the electric blue accent applied to key terms, followed by a monospace subtitle.
- **Table of Contents:** Grid of cards, each numbered with a large monospace numeral and a concise section title. 
- **Section Dividers:** Minimalist. A giant monospace number (`01`, `02`) in electric blue with the section title alongside it.
- **Closing:** Echoes the cover layout, featuring a final "SYNCHRONIZED" system status badge and the total count of localized strings.
- **Slide Map:**

| id | pattern | image | density |
| :--- | :--- | :--- | :--- |
| naslov | cover | none | low |
| sto_je_promijenjeno | comparison table | none | medium |
| arhitektura_kljuceva | architecture flow | none | medium |
| sinkronizacija | metric grid | none | high |
| report_cleanup | status list | none | medium |
| validacija | validation matrix | none | high |
| sljedece | roadmap diagram | none | medium |

## Design Tokens
| token | hex | usage |
| :--- | :--- | :--- |
| primary | `#00E5FF` | Electric blue accent for KPIs, status badges, active chart bars, and key data points. |
| bg-page | `#1A1C23` | Dark graphite page background. |
| bg-surface | `#252830` | Tinted block background for cards, tables, and code snippets. |
| text-main | `#F1F5F9` | Default body text color, providing high legibility without harsh glare. |
| text-heading | `#FFFFFF` | Pure white, reserved strictly for top-level headings to maximize contrast against graphite. |
| text-muted | `#94A3B8` | Secondary text, captions, table headers, and the top-left motif. |
| border | `#334155` | Subtle dividers, table borders, and container outlines. |
| chart-base | `#475569` | Baseline or "empty" state color for progress bars and comparative charts. |

| role | family | size (px) | applies_to |
| :--- | :--- | :--- | :--- |
| display | Inter | 48 | Cover title, major section numbers |
| heading | Inter | 32 | Slide titles, key takeaways |
| body | Inter | 18 | Paragraphs, standard list items |
| mono-large | JetBrains Mono | 24 | KPI numbers, hardcoded string examples |
| caption | JetBrains Mono | 14 | i18n keys, file paths, status tags, motif, page numbers |

## Guardrails
- **Forbidden:** Do not use traditional red/green/yellow traffic light colors for validation statuses; rely on shapes (check/cross) and electric blue vs. muted gray to indicate state.
- **Forbidden:** No decorative backgrounds, gradients, or tech-themed stock photos (e.g., keyboards, screens, glowing globes).
- **Forbidden:** Never center-align body text or lists; all technical data and narrative must align to the strict left grid.
- **Forbidden:** Do not use rounded corners (border-radius) on any primary containers; keep geometry sharp and pragmatic.
