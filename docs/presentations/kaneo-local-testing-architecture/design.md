## Design Concept
This deck serves as technical onboarding for software engineers, demanding a highly functional, high-density professional posture. The visual anchor borrows directly from modern developer documentation platforms (like Linear or Vercel's dark modes) — specifically adopting their modular card layouts, thin structural borders, and strict typographical hierarchy to organize complex system information. The color story overrides standard educational light themes in favor of the requested "Kaneo aesthetic": a warm graphite background (`#161618`) paired with warm off-white text to reduce eye strain, accented sparingly by a discrete engineering orange for active states and critical paths. We deliberately avoid the cliche "hacker neon green/blue on pitch black" in favor of this sophisticated, low-contrast dark mode. The typographic voice is strictly utilitarian, contrasting a clean sans-serif for prose with a geometric monospace for commands, paths, and technical entities.

## Visual Language
- **Imagery**: Zero decorative stock photography. Visuals are strictly limited to inline architectural diagrams, data flows, and typographic hierarchy. 
- **Containers**: Modular card-based architecture. Content blocks, code snippets, and diagrams are housed in subtly rounded (4px) dark surface cards (`#222225`) defined by crisp, thin 1px borders (`#3A3A3F`). Lots of structural whitespace between cards.
- **Icons**: Font Awesome (solid), used exclusively as micro-indicators inside card headers (e.g., database, server, browser icons) and sized identically to the adjacent text. 
- **Dataviz**: Architecture is represented through inline block diagrams (using the card-bg color for nodes and accent-orange for flow lines). Tables use thin horizontal borders only, with Fira Code for technical columns (endpoints, env vars).
- **Motif**: A discrete monospaced system signature (e.g., `> kaneo_env :: active`) in the top right corner of every slide, styled in the secondary text color.

## Layout Directives
- **Global**: 64px margins all around. Left-aligned typography for all reading blocks. Top-left for headings, top-right for the motif. Page numbers in the bottom right corner (monospace).
- **Cover**: Left-aligned title and summary, framed by a single accent-orange top border. Large monospace Kaneo version/build number at the bottom.
- **Table of Contents**: Not applicable/not in outline. 
- **Section Dividers**: Large monospace heading vertically centered, with a brief prose description below it.
- **Closing**: Echoes the cover layout, featuring a quick-start terminal command prominently in a code block.
- **Slide map**:

| id | pattern | image | density |
| :--- | :--- | :--- | :--- |
| naslov | Cover layout with monospace accents | none | low |
| brzi_pocetak | Code block left, step cards right | none | medium |
| host_native | Two-column comparison (Native vs Compose) | none | high |
| arhitektura | Full-width architectural block diagram | none | medium |
| tok_podataka | Sequential flow cards (Browser to DB) | none | high |
| unit_testovi | Grid of code snippets and descriptions | none | high |
| e2e_testovi | Split layout: stack overview and cleanup flow | none | medium |
| env_checklista | Three-column table (Var, Value, Notes) | none | high |

## Design Tokens

### Colors
| token | hex | usage |
| :--- | :--- | :--- |
| background | `#161618` | Global page background (graphite) |
| surface | `#222225` | Background for modular cards and code blocks |
| border | `#3A3A3F` | Thin 1px outlines for cards and dividers |
| text-main | `#EAE9E4` | Primary warm white for headings and body |
| text-muted | `#9C9CA5` | Secondary text, motif, and captions |
| accent | `#D65D2E` | Discrete orange for active paths, highlights, and key icons |
| code-bg | `#0A0A0B` | Deep contrast background specifically for terminal commands |

### Text roles
| role | family | size (px) | applies_to |
| :--- | :--- | :--- | :--- |
| display | Inter | 48 | Cover title and large structural numbers |
| heading | Inter | 32 | Slide titles and section headers |
| body | Inter | 18 | Standard prose and explanations |
| mono | Fira Code | 16 | Terminal commands, variables, file paths, motif |
| caption | Inter | 14 | Diagram labels, footnotes, icon labels |

## Guardrails
- **Forbidden**: Do not use neon colors (cyan, magenta, lime) for "tech" flavor; stick strictly to the discrete orange accent.
- **Forbidden**: No center-aligned body text or bullet lists; strict left-alignment maintains the technical documentation aesthetic.
- **Forbidden**: No decorative images, illustrations, or gradient backgrounds.
- **Forbidden**: Do not use pure white (`#FFFFFF`) or pure black (`#000000`) for text/backgrounds (except `code-bg`).
