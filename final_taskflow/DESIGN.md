---
name: Kinetic Clarity
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c7c4d6'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#918f9f'
  outline-variant: '#464553'
  surface-tint: '#c1c1ff'
  primary: '#c1c1ff'
  on-primary: '#1b119b'
  primary-container: '#5b5bd6'
  on-primary-container: '#edeaff'
  inverse-primary: '#4e4ec9'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#965e00'
  on-tertiary-container: '#ffe8d1'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c1c1ff'
  on-primary-fixed: '#0a006b'
  on-primary-fixed-variant: '#3533b0'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: -0.01em
  metric-stat:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system embodies high-velocity productivity, precision engineering, and understated digital luxury. Drawing structural inspiration from modern developer and creator platforms, the experience prioritizes dense utility without inducing cognitive fatigue. 

The aesthetic is a hybrid of Modern Minimalism and Tactile Depth:
- **Calibrated Restraint:** Canvases remain calm, relying on generous negative space paired with razor-sharp structural alignments.
- **Atmospheric Focus:** Key interactions introduce subtle luminous glows and soft, multi-tier elevation rather than loud graphic ornaments.
- **Quiet Confident Authority:** The interface recedes to let user output take primacy, stepping forward with deliberate micro-interactions, silky hover states, and buttery state transitions.

## Colors

The color palette leverages a deep slate-to-violet continuum engineered for prolonged focus in deep-work environments:

- **Primary Violet (`#5B5BD6` / `#4F46E5`):** Reserved for focal primary calls-to-action, key keyboard shortcuts, current sprint milestones, and active navigational indicators. Utilizes an optical luminance glow (`rgba(91, 91, 214, 0.18)`) on elevation.
- **Status Accents:**
  - **Success / Completed (`#10B981`):** Calibrated emerald signaling task resolution, positive velocity, and system sync.
  - **Warning / Medium Priority (`#F59E0B`):** Warm amber for items approaching SLA or requiring review.
  - **High Priority / Danger (`#EF4444`):** Controlled crimson reserved strictly for blockers, critical triage, and destructive triggers.
  - **Low Priority / Passive (`#64748B`):** Muted cool slate for backlog items and informational metadata.
- **Neutral Canvas & Tonal Hierarchy:**
  - **Canvas Background:** Deep slate `#0B0F19` with container layers rising through `#0F172A` and `#1E293B`.
  - **Borders & Dividers:** Semi-transparent crisp strokes (`rgba(255, 255, 255, 0.08)` in dark mode; `#E2E8F0` in light contexts).
  - **Text Layers:** Crisp slate-white (`#F8FAFC`) for headings, softened body slate (`#94A3B8`), and deactivated metadata slate (`#64748B`).

## Typography

The typography couples the geometry of **Plus Jakarta Sans** with the programmatic precision of **JetBrains Mono**:

- **Display & Structural Hierarchy:** Headlines utilize tight negative tracking to maintain punch and executive readability across high-density boards.
- **Editorial Legibility:** Body copy maintains optimized proportional line heights, avoiding clipped vertical rhythms during multi-line task descriptions.
- **Data & Tabular Precision:** All metrics, timestamps, priority identifiers, keyboard shortcut tooltips, and ticket IDs (`TASK-1049`) use **JetBrains Mono** with tabular figure lining (`tnum`) enabled to prevent layout shifting during real-time collaborative updates.
- **Section Headers & Overlines:** Overline labels must be styled with `label-caps` in uppercase with deliberate tracking expansion (`0.06em`) for effortless categorization.

## Layout & Spacing

The layout is built upon an 8-point structural system, nested in a fluid application shell optimized for deep work:

- **Application Grid & Shell:**
  - **Sidebar Navigation:** Collapsible fixed width of `240px` (desktop) or `64px` (iconic rail).
  - **Workspace Canvas:** Fluid horizontal region bound between a min-width of `320px` and max readable line-length boundaries (`1440px` for kanban/board views; `840px` for contextual document views).
- **Responsive Adaptations:**
  - **Desktop (1024px+):** 12-column adaptive fluid grid with `1.5rem` gutters and `2rem` outer framing margin.
  - **Tablet (768px – 1023px):** 8-column layout with `1rem` gutters; sidebar collapses to an overlay drawer or docked rail.
  - **Mobile (< 768px):** 4-column stack; sticky bottom action sheets replace nested flyout menus; margins tighten to `1rem`.
- **Rhythm Rules:** Inter-card element stacking strictly defaults to `space-xs` (4px) and `space-sm` (8px) for high data density, reserving `space-lg` and `space-xl` for macroscopic section isolation.

## Elevation & Depth

Visual depth is achieved through layered tonal surfaces and luminescent, low-opacity ambient shadows rather than harsh drop shadows:

- **Level 0 (App Canvas):** Root dark slate surface (`#0B0F19`), foundational and non-reactive.
- **Level 1 (Panels & Sidebar):** Layered neutral surface (`#0F172A`) separated by an ultra-thin 1px border stroke (`rgba(255, 255, 255, 0.07)`).
- **Level 2 (Cards & Modules):** Surface `#1E293B` raised with an ambient shadow: `0px 4px 20px -2px rgba(0, 0, 0, 0.35)`, bounded by a subtle top-lit inner border: `inset 0 1px 0 0 rgba(255, 255, 255, 0.08)`.
- **Level 3 (Modals, Overlays & Command Palette):** Floating container elevated with dual-tier shadows: `0px 12px 32px -4px rgba(0, 0, 0, 0.5), 0px 4px 12px -2px rgba(0, 0, 0, 0.35)`. Enhanced with an ambient violet bloom when active: `0 0 40px -10px rgba(91, 91, 214, 0.25)`.
- **Glass Surfaces:** Translucent panels (such as sticky headers and floating toolbars) apply `backdrop-filter: blur(12px)` over `rgba(15, 23, 42, 0.82)`.

## Shapes

The design system employs a refined shape language that balances technical precision with organic tactility:

- **Standard Base (0.5rem / 8px):** Applied to inputs, dropdown triggers, list row hover containers, and small interactive targets.
- **Container Curvature (1rem / 16px):** Task cards, dashboard widgets, and contextual flyout dialogs use `rounded-lg` for approachable containment.
- **Structural Framing (1.5rem / 24px):** Large workspace canvases, active panel wrappers, and modal dialogs adopt `rounded-xl`.
- **Pill Profiles (`rounded-full`):** Reserved strictly for priority tags, notification badges, avatar indicators, status chips, and command palette navigation keys.

## Components

### Buttons
- **Primary:** Violet background (`#5B5BD6`) with white text, subtle top inner-bevel (`inset 0 1px 0 rgba(255, 255, 255, 0.2)`), and hover elevation showing a soft violet glow.
- **Secondary / Ghost:** Transparent background, `1px solid rgba(255, 255, 255, 0.1)` border stroke, subtle background shift on hover to `rgba(255, 255, 255, 0.05)`.
- **Focus Rings:** Unclipped `2px` ring in `#5B5BD6` offset by `2px` of background canvas to maintain accessible keyboard navigation.

### Task Cards
- Nested within `rounded-lg` containers with surface fill `#1E293B` and `1px` subtle stroke.
- Hover states initiate a smooth 150ms translation (`translateY(-2px)`) alongside border brightening to `rgba(91, 91, 214, 0.4)`.
- Header houses task title and priority pill; footer contains tabular timestamp, assignee avatar group, and quick-action menu icon.

### Chips & Priority Badges
- Pill-shaped (`rounded-full`) horizontal tags with micro typography (`label-caps` or `label-mono`).
- Features a `6px` circular status indicator dot:
  - **High:** Crimson dot with pulsed ambient halo (`rgba(239, 68, 68, 0.3)`).
  - **Medium:** Amber dot with solid fill.
  - **Low:** Cool slate dot.
  - **Completed:** Emerald dot with solid fill.

### Checkboxes
- `18px × 18px` rounded square (`4px` radius) with `1.5px` border stroke.
- Unchecked: `rgba(255, 255, 255, 0.2)` stroke over transparent fill.
- Checked: Spring-animated scale transition filling the container with `#10B981` (Completed) or `#5B5BD6` (Active), accompanied by an animated SVG checkmark stroke.

### Input Fields & Command Bar
- Inset field container using dark slate neutral `#0F172A`, surrounded by a 1px border.
- Floating Command Palette (`Cmd + K`) features an oversized input header (`headline-md`) without borders, sitting atop a filtered glass backdrop with real-time fuzzy search results.

### Sidebar Navigation & Active Indicators
- Items are vertically stacked with `space-xs` gap.
- Active item displays an inset pill highlight (`rgba(91, 91, 214, 0.12)`) paired with a crisp `3px` vertical violet indicator bar along the leading edge.
## Implementation Notes

The supplied Stitch screens remain the visual reference for the SPA shell and view composition. The implementation keeps the same deep-slate/violet/emerald/amber hierarchy, 240px desktop rail, glass top bar, rounded task containers, compact metadata treatment, Jakarta Sans + JetBrains Mono pairing, and responsive collapse strategy.

The application uses semantic component classes in `css/styles.css` so the visual system is available without the Stitch/Tailwind CDN runtime. JavaScript feature modules control behavior only; they do not replace the visual hierarchy with a different component library.
