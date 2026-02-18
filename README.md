# Speyer UI System (SUI)

A lightweight design system built around four constraints:

1. **Accessibility is mandatory, not optional.** WCAG 2.1 AA is the baseline, tested and documented.
2. **No build tools required.** Three files, drop them in, it works.
3. **Components work with or without JavaScript.** CSS handles appearance, JS adds behavior.
4. **Status is never communicated by color alone.** Every badge, alert, and indicator requires icon + text.

Under 90KB minified. Zero runtime dependencies. Works with any framework or none.

**What you get:** buttons, cards, badges, alerts, avatars (sm/md/lg/xl), toggles, tables (interactive rows, sortable columns), forms, progress bars (including labelled), modals, toasts, dropdowns, tooltips, accordions, breadcrumbs, pagination, empty states, skeletons, bottom sheets, segmented controls, chips/tags, dropzones, timelines, steppers, sidenav (collapsible groups), side panels (slide-over), prose (long-form typography), mark (search highlights), meta (metadata lines), toolbars, screen layout (app shells), and a dark mode that works.

**[Live Demo](https://adrianspeyer.github.io/speyer-ui/)** · [GitHub](https://github.com/adrianspeyer/speyer-ui)

Built for internal tools, SaaS dashboards, and lightweight web applications.

---

## Table of Contents

- [Why This Exists](#why-this-exists)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Components](#components)
- [Design Tokens](#design-tokens)
- [Recipes](#recipes)
- [JavaScript API](#javascript-api-suijs)
- [Accessibility](#accessibility)
- [AI Integration](#ai-integration)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## Why This Exists

I'm colour blind. When I started using AI coding assistants to build web applications, every project was inconsistent and depended on the AI's decisions. Sometimes it produced interfaces that relied on colour to communicate status, or the readability and contrast were way off. I got tired of having to manually go back and fix things and thought there had to be a better way.

So I built SUI for myself — a system where the components themselves won't let you skip accessibility and understand what the expectations are rather than guessing. Most importantly, it ensures things like you can't create a success badge without an icon and a label. You can't build an alert without a text description. The constraint is structural, not aspirational.

I now use this for my own work. I'm sharing it because if you're colour blind, or just want a nice, cool-looking UI system that works easily as you vibe code without a 200MB `node_modules` folder — this might be useful to you too.

— [Adrian Speyer](https://github.com/adrianspeyer)

---

## Quick Start

### CDN (Fastest)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>

  <!-- SUI Styles — go in <head> -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-tokens.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-components.min.css">
</head>
<body>

  <!-- Your content here -->

  <!-- SUI + Icons — go before </body> so the DOM is ready -->
  <script src="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui.min.js" defer></script>

  <!-- Icons — any library works. Lucide shown here. -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <script>lucide.createIcons();</script>
</body>
</html>
```

> **Pin a version for production:** replace `@latest` with a tag like `@2.1.2` for stability.

### Download

Download the [latest release](https://github.com/adrianspeyer/speyer-ui/releases) and add the files to your project:

```html
<!-- Styles in <head> -->
<link rel="stylesheet" href="sui-tokens.css">
<link rel="stylesheet" href="sui-components.css">

<!-- Scripts before </body> -->
<script src="sui.js" defer></script>

<!-- Icons — bring your own. Lucide, Heroicons, Phosphor, Font Awesome, or plain SVG. -->
```

### AI-Assisted

Paste one of the [AI prompts](#ai-integration) into any coding assistant. The prompt tells the AI to fetch SUI and apply it.

### Usage

```html
<button class="sui-btn sui-btn-primary">
  <i data-lucide="plus"></i> Create Project
</button>

<span class="sui-badge sui-badge-success">
  <i data-lucide="check-circle"></i> Active
</span>

<div class="sui-alert sui-alert-error" role="alert">
  <span class="sui-alert-icon" aria-hidden="true">
    <i data-lucide="x-circle"></i>
  </span>
  <div class="sui-alert-content">
    <div class="sui-alert-title">Upload failed</div>
    <div>File exceeds the 10MB limit.</div>
  </div>
</div>
```

---

## Architecture

| File | Purpose | Minified | Required? |
|------|---------|----------|-----------|
| `sui-tokens.css` | Design tokens (colours, spacing, typography, shadows) | ~6KB | Yes |
| `sui-components.css` | Component classes built from tokens | ~60KB | Yes |
| `sui.js` | Interactive behaviours (modals, toasts, dropdowns, sheets, panels) | ~23KB | **No** |

**Core:** under 95KB (tokens + components + JS). Zero runtime dependencies.

CSS handles all appearance. JS adds interactivity for modals, toasts, dropdowns, tooltips, accordion, sheets, sidenav, and panels. Components render correctly without JS — they just won't open/close/animate.

### Icons

SUI does not ship its own icon library — icons are bring-your-own. **SUI's CSS and JS have zero icon library code.** Any icon library works:

- **[Lucide](https://lucide.dev/)** — 1,500+ icons, inline SVG, MIT licensed. The demo uses Lucide.
- **[Heroicons](https://heroicons.com/)** — clean, Tailwind team, 300+ icons.
- **[Phosphor](https://phosphoricons.com/)** — 6 weights per icon, very flexible.
- **[Font Awesome](https://fontawesome.com/)** — largest library, font-based.
- **Plain SVG** — inline or sprite sheet, no library needed.

SUI's accessibility rule (never rely on colour alone — pair icons with text labels) works with any icon system.

```html
<!-- Example: Lucide -->
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>

<!-- Example: Heroicons (inline SVG, no JS needed) -->
<svg class="..." viewBox="0 0 24 24">...</svg>
```

---

## Components

SUI provides 50+ components. All built from design tokens. Code examples for every component are on the [live demo](https://adrianspeyer.github.io/speyer-ui/) Components tab.

### Buttons

`sui-btn` · `sui-btn-primary` · `sui-btn-secondary` · `sui-btn-ghost` · `sui-btn-dashed` · `sui-btn-danger` · `sui-btn-success` · `sui-btn-sm`

### Cards

`sui-card` · `sui-card-lg` · `sui-card-flush` · `sui-card-shadow` · `sui-card-header` · `sui-card-body` · `sui-card-interactive`

`sui-card-interactive` adds `cursor: pointer` and hover shadow elevation. Compose with any card variant. Add `tabindex="0"` for keyboard accessibility when the card isn't wrapped in a link.

### Inputs

`sui-input` · `sui-input-error` · `sui-input-label` · `sui-input-group` · `sui-input-help` · `sui-input-action` · `sui-checkbox` · `sui-radio` · `sui-checkbox-label` · `sui-radio-label`

**v2.5.0:** `sui-input-action` wraps an input with an embedded button for search, copy, clear, or show/hide password. Place `.sui-btn` inside after `.sui-input`.

### Toggle / Switch

`sui-toggle` · `sui-toggle-track` · `sui-toggle-label`

### Badges

`sui-badge` · `sui-badge-success` · `sui-badge-warning` · `sui-badge-error` · `sui-badge-info` · `sui-badge-neutral` · `sui-badge-pro` · `sui-badge-dot` · `sui-badge-sm`

When using `sui-badge-count`, always pair with a parent element that provides context via `aria-label`. The count element should have `aria-hidden="true"` since the parent's label conveys the full meaning.

```html
<span class="sui-badge-overlay">
  <button aria-label="Notifications, 3 unread">ðŸ””</button>
  <span class="sui-badge-count" aria-hidden="true">3</span>
</span>
```

### Shields (Two-Segment Badges)

`sui-shield` · `sui-shield-label` · `sui-shield-value` · Status variants

GitHub-style status badges for dashboards. Can be links or static.

```html
<span class="sui-shield sui-shield-info">
  <span class="sui-shield-label">built with</span>
  <span class="sui-shield-value">SUI</span>
</span>

<a class="sui-shield sui-shield-success" href="#">
  <span class="sui-shield-label">build</span>
  <span class="sui-shield-value">passing</span>
</a>
```

### Alerts

`sui-alert` · `sui-alert-success` · `sui-alert-warning` · `sui-alert-error` · `sui-alert-info`

### Avatars

`sui-avatar` · `sui-avatar-sm` (32px) · `sui-avatar-md` (40px) · `sui-avatar-lg` (56px) · `sui-avatar-xl` (80px) · `sui-avatar-group`

Initials by default with deterministic colours from `sui.js`. Optional photo support — add an `<img>` inside the avatar and initials show as automatic fallback when the image fails:

```html
<div class="sui-avatar sui-avatar-md">
  <img src="photo.jpg" alt="Jane Smith" onerror="this.hidden=true">
  JS
</div>
```

### Progress Bars

`sui-progress` · `sui-progress-bar` · Status variants · `sui-progress-lg` · `sui-progress-indeterminate` · `sui-progress-labeled` · `sui-progress-text`

`sui-progress-labeled` puts text inside the bar. Contrast-safe in both themes.

### Tables

`sui-table-wrap` · `sui-table` · `sui-table-striped` · `sui-table-hover` · `sui-table-interactive` · `sui-table-sortable` · `sui-table-stack` · `sui-table-sticky` · `sui-table-dense`

Responsive: stacks to card layout on mobile via `data-label` attributes on `<td>`. `sui-table-interactive` adds clickable rows with cursor and focus ring — developer adds `tabindex="0"`, `role="link"`, `aria-label`, and click handler. `sui-table-sortable` adds visual sort indicators on `<th data-sort>`.

**v2.5.0 modifiers:** `sui-table-stack` stacks at 768px (tablet) — wider than the default 520px mobile stacking, useful for data-heavy admin tables. `sui-table-sticky` pins `<thead>` when scrolling long tables. `sui-table-dense` reduces padding for high-density views (note: may fall below 44px touch target — do not combine with `sui-table-interactive` on touch-heavy interfaces without custom padding).

### Navigation

Breadcrumb: `sui-breadcrumb` · Pagination: `sui-pagination` · `sui-page-btn` · Nav links: `sui-nav` · `sui-nav-link` · `sui-nav-toggle`

### Bottom Sheet / Drawer

`sui-sheet` · `sui-sheet-panel` · `sui-sheet-handle` · `sui-sheet-header` · `sui-sheet-title` · `sui-sheet-body` · `sui-sheet-footer` · `sui-sheet-close`

### Sidenav

`sui-sidenav` · `sui-sidenav-panel` · `sui-sidenav-link` · `sui-sidenav-heading` · `sui-sidenav-toggle` · `sui-sidenav-close`

Responsive section navigation. Sticky sidebar on desktop (â‰¥769px), off-canvas slide-in on mobile with focus trap and Escape-to-close. Active state via `.is-active` or `aria-current="page"`.

```html
<nav class="sui-sidenav" aria-label="Section navigation" aria-hidden="true">
  <div class="sui-sidenav-panel">
    <span class="sui-sidenav-heading">Sections</span>
    <a href="#section1" class="sui-sidenav-link">Section 1</a>
    <a href="#section2" class="sui-sidenav-link is-active">Section 2</a>
  </div>
</nav>
<button class="sui-sidenav-toggle" data-sui-sidenav=".sui-sidenav"
        aria-label="Open navigation" type="button">â˜°</button>
```

JS API: `SUI.sidenav.open('.sui-sidenav')` · `SUI.sidenav.close('.sui-sidenav')` · `SUI.sidenav.toggle('.sui-sidenav')`

**Collapsible groups:** Wrap links in `.sui-sidenav-group` with a toggle button. Groups work without JS (expanded by default). JS adds expand/collapse behaviour.

```html
<div class="sui-sidenav-group">
  <button class="sui-sidenav-group-toggle" type="button"
          aria-expanded="true" aria-controls="group-nav">
    Navigation <span class="sui-sidenav-group-count">5</span>
  </button>
  <div class="sui-sidenav-group-links" id="group-nav">
    <a href="#" class="sui-sidenav-link">Link 1</a>
    <a href="#" class="sui-sidenav-link">Link 2</a>
  </div>
</div>
```

Group API: `SUI.sidenav.collapseAll(nav)` · `SUI.sidenav.expandAll(nav)`

### Panel

`sui-panel` · `sui-panel-header` · `sui-panel-title` · `sui-panel-close` · `sui-panel-body` · `sui-panel-footer`

Side panel / slide-over — the third overlay type. Dialog blocks, sheet slides up, panel slides from right. Desktop: coexists with main content (no focus trap). Mobile: full-screen with focus trap. Width configurable via `--sui-panel-width`. Optional backdrop via `.sui-panel-no-backdrop`.

```html
<div class="sui-panel" id="myPanel" aria-label="Detail" aria-hidden="true">
  <div>
    <div class="sui-panel-header">
      <span class="sui-panel-title">Title</span>
      <button class="sui-panel-close" type="button" aria-label="Close panel">&times;</button>
    </div>
    <div class="sui-panel-body">Content</div>
    <div class="sui-panel-footer">
      <button class="sui-btn sui-btn-ghost" onclick="SUI.panel.close('#myPanel')">Cancel</button>
      <button class="sui-btn sui-btn-primary">Save</button>
    </div>
  </div>
</div>
<button data-sui-panel="#myPanel" aria-expanded="false">Open Panel</button>
```

JS API: `SUI.panel.open('#id')` · `SUI.panel.close('#id')` · `SUI.panel.toggle('#id')`

Custom width: `style="--sui-panel-width: 50vw"`. No backdrop on desktop: add `.sui-panel-no-backdrop`.

### Bottom Sheet

Mobile-first slide-up drawer. Handles `env(safe-area-inset-bottom)` for iOS notch, `overscroll-behavior: contain` for scroll trapping, Escape key to close, backdrop click to close. Requires `sui.js`.

```html
<div class="sui-sheet" id="mySheet" aria-hidden="true" aria-label="Share project">
  <div class="sui-sheet-panel">
    <div class="sui-sheet-handle"></div>
    <div class="sui-sheet-header">
      <span class="sui-sheet-title">Share Project</span>
      <button class="sui-sheet-close sui-btn sui-btn-ghost sui-btn-sm" aria-label="Close">âœ•</button>
    </div>
    <div class="sui-sheet-body">
      <p>Sheet content goes here.</p>
    </div>
    <div class="sui-sheet-footer">
      <button class="sui-btn sui-btn-ghost" onclick="SUI.sheet.close('#mySheet')">Cancel</button>
      <button class="sui-btn sui-btn-primary">Confirm</button>
    </div>
  </div>
</div>

<!-- Trigger -->
<button data-sui-sheet="#mySheet">Open Sheet</button>
```

### Segmented Control

`sui-segmented` · `sui-segment`

Value picker with `role="radiogroup"` + `role="radio"` semantics. Arrow keys navigate between segments. Not tabs — semantically distinct. Requires `sui.js` for keyboard navigation and ARIA state management.

```html
<div class="sui-segmented" role="radiogroup" aria-label="View mode">
  <button class="sui-segment" role="radio" aria-checked="true">Grid</button>
  <button class="sui-segment" role="radio" aria-checked="false">List</button>
  <button class="sui-segment" role="radio" aria-checked="false">Board</button>
</div>
```

### Chip / Tag

`sui-chip` · `sui-chip-remove` · Status variants: `sui-chip-success` · `sui-chip-warning` · `sui-chip-error` · `sui-chip-info` · `sui-chip-pro`

Visual pill component. CSS only — behaviour (keyboard add/remove, deduplication) is bring-your-own JS, same philosophy as icons.

```html
<span class="sui-chip">Design</span>
<span class="sui-chip sui-chip-success">Approved</span>
<span class="sui-chip">
  React
  <button class="sui-chip-remove" aria-label="Remove React">âœ•</button>
</span>
```

### Interactive Components (require `sui.js`)

Accordion · Dropdown · Modal (native `<dialog>` recommended, legacy overlay supported) · Toast notifications · Tooltip

Scoped tabs: wrap in `data-sui-tabs` to isolate multiple tab sets on one page.

### Structural

Dividers · Empty state · Skeleton loaders · Stat cards · Responsive embed (`sui-embed`)

### Content

**Prose** — `sui-prose` for long-form typography (articles, docs, rendered Markdown). Covers headings (h1–h6 with scroll-margin-top), paragraphs, links, lists, blockquotes, code blocks, tables, images, horizontal rules, and task list checkboxes. Size variants: `sui-prose-sm` (15px), default (18px), `sui-prose-lg` (20px). Width: `sui-prose-narrow` (680px), `sui-prose-wide` (900px). Overridable via CSS custom properties (`--sui-prose-font`, `--sui-prose-size`, `--sui-prose-leading`).

**Mark** — `sui-mark` for search result highlighting. `sui-mark-current` for the active match. Automatic dark mode adaptation and print suppression.

**Meta** — `sui-meta` for dot-separated metadata lines. Separator added via CSS `::before` — HTML stays semantic.

### Toolbar

`sui-toolbar` — horizontal scrolling action bar with hidden scrollbar. `sui-toolbar-btn` for buttons, `sui-toolbar-sep` for separators, `aria-pressed="true"` for active state. Variants: `sui-toolbar-bordered`, `sui-toolbar-compact`.

### Top Bar

`sui-topbar` uses a 3-column CSS grid by default (brand | nav | actions). Add `sui-topbar-aligned` as a modifier to switch to flex layout — brand stays left, nav and actions push right. Useful when you have fewer nav items that look lost in the centre column.

**Brand colours:** SUI semantic tokens (like `--sui-blue-primary`) shift between light and dark themes. Do not use them for logos or brand marks — hardcode brand colours or use a custom property (e.g. `--app-brand: #1a1a2e`).

### Screen Layout

`sui-screen` — full-viewport flex column (`100dvh`) for mobile-first app shells. `sui-screen-header` (sticky top with safe area inset), `sui-screen-body` (scrollable `flex:1`), `sui-screen-footer` (pinned bottom with safe area inset). Multi-view switching: only sibling screens without `.is-active` are hidden (v2.5.0 — a single `sui-screen` renders without needing `.is-active`). Use `sui-screen-solo` for legacy single-screen apps (now redundant but kept for backwards compatibility).

#### Static page vs SPA shell

SUI supports two usage modes:

**Static page (most common):** Standard HTML page with scrollable `<body>`. Use `sui-topbar`, `sui-section`, and `sui-footer` as needed. The page scrolls naturally. This is the default — no `sui-screen` required.

**SPA shell (app mode):** Full-viewport layout with fixed header/footer and scrollable body region. Use `sui-screen` + `sui-screen-header` + `sui-screen-body` + `sui-screen-footer`. The `sui-screen-body` scrolls independently while header/footer stay pinned. Multi-view switching: add multiple `sui-screen` elements and toggle `.is-active` to switch between views.

**When to use which:** If your page has a natural document flow with scrolling content, use static page mode. If you're building a mobile-first app with fixed navigation bars and independently scrolling content regions (like a native app), use SPA shell mode.

### File Upload

`sui-dropzone` — file upload area. CSS only — drag-and-drop JS is bring-your-own.

### Timeline

`sui-timeline` · `sui-timeline-item` · `sui-timeline-content` — activity feed. Optimised for `sui-avatar-sm`. Container: `role="feed"`, items: `role="article"`.

### Stepper

`sui-stepper` · `sui-step` · `sui-step-indicator` — multi-step wizard. CSS-only, horizontal on desktop, vertical on mobile. Use `<ol>` for list semantics. States: `.is-complete` (checkmark, green fill), `.is-active` (blue ring, `aria-current="step"`), `.is-pending` (hollow circle). Connectors stretch with `flex: 1` — works with any step count.

### Utilities

**Layout** — Grid (`sui-grid-2/3/4/sidebar/auto`) · Spacing (`sui-mt-*`, `sui-gap-*`) · Flex (`sui-flex`, `sui-flex-col`, `sui-flex-between`, `sui-flex-nowrap`) · Scroll (`sui-scroll-x`) · Container queries (`sui-container`, `sui-cq-stack`, `sui-cq-full`, `sui-cq-hide`, `sui-cq-row`, `sui-cq-show`)

**Text** — `sui-text-muted` · `sui-text-bold` · `sui-text-cap`

**Radius** — Override border-radius on any component: `sui-round-none` (0) · `sui-round-sm` (8px) · `sui-round-md` (12px) · `sui-round-lg` (16px) · `sui-round-full` (pill)

**Visibility** — Two-tier system: `sui-hidden` (display: none, removed from accessibility tree) · `sui-visually-hidden` (clipped to 1px, preserved for screen readers)

**Skip Link** — Add `<a href="#main" class="sui-visually-hidden">Skip to main content</a>` as first child of `<body>`. Visible when focused.

---

## Design Tokens

All colours are CSS custom properties with the `--sui-` prefix. Every colour has light and dark mode values defined in three blocks: `:root`, `[data-theme="dark"]`, and `@media (prefers-color-scheme: dark)`.

### Display Modes

```html
<html>                       <!-- Light mode (default) -->
<html data-theme="dark">     <!-- Dark mode -->
<!-- Omit attribute for auto (follows OS preference) -->
```

Toggle with JavaScript: `SUI.theme.toggle()` or `SUI.theme.set('dark')`.

### Status Colors

Each status has three tokens: base (icons), strong (text on soft backgrounds), soft (backgrounds).

| Status | Tokens | Usage |
|--------|--------|-------|
| Success | `--sui-success`, `-strong`, `-soft` | Active, passed, deployed |
| Warning | `--sui-warning`, `-strong`, `-soft` | Pending, review needed |
| Error | `--sui-error`, `-strong`, `-soft` | Failed, critical, blocked |
| Info | `--sui-info`, `-strong`, `-soft` | Stable, informational |
| Neutral | `--sui-neutral`, `-strong`, `-soft` | Inactive, default |
| Pro | `--sui-pro`, `-strong`, `-soft` | Premium, paid features |

### Backgrounds, Text, Elevation

Full token reference with hex values is in `sui-tokens.css` (readable source) and on the [live demo](https://adrianspeyer.github.io/speyer-ui/) Designers tab.

Borders are the default card separation. Shadows are opt-in via `sui-card-shadow`. Flat interfaces are more scannable — shadows are reserved for layered elements (dropdowns, modals, tooltips) where depth communicates function.

| Token | Usage |
|-------|-------|
| `--sui-shadow-sm` | Dropdowns, subtle depth |
| `--sui-shadow-md` | Cards (opt-in), popovers |
| `--sui-shadow-lg` | Modals, dialogs |

### Brand / Interactive Tokens

Button and pagination backgrounds use overridable tokens. In light mode, they default to the blue/status colour tokens. In dark mode, they lock to contrast-safe values (â‰¥4.5:1 with white text). Override these to change your brand colour while the preflight validator catches unsafe values.

| Token | Light Default | Dark Default |
|-------|--------------|-------------|
| `--sui-btn-primary-bg` | `var(--sui-blue-primary)` | `#2563EB` |
| `--sui-btn-danger-bg` | `var(--sui-error-strong)` | `#B91C1C` |
| `--sui-btn-success-bg` | `var(--sui-success-strong)` | `#15803D` |

Hover variants follow the same pattern (`--sui-btn-primary-bg-hover`, etc.).

### Typography

**Font:** [Inter](https://rsms.me/inter/) via Google Fonts. Fallback: `system-ui, -apple-system, sans-serif`.

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 32px | 700 | 1.3 |
| H2 | 24px | 600 | 1.3 |
| H3 | 20px | 600 | 1.3 |
| Body | 16px | 400 | 1.5 |
| Small | 14px | 400 | 1.5 |
| Meta | 12px | 400 | 1.5 |

### Layout & Spacing

8px grid: `--sui-space-1` (4px) through `--sui-space-6` (48px). Min touch target: 44px. Max content width: 1280px. Mobile-first breakpoints at 480px, 721px, 769px, 1025px.

---

## Recipes

SUI ships components. You build patterns. These recipes show common application layouts composed from SUI primitives with minimal custom CSS.

| Recipe | What It Is | Custom CSS | Demo |
|--------|-----------|-----------|------|
| Inline Edit | Click-to-edit fields with ARIA | ~4 lines | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-inline-edit) |
| Kanban Board | Horizontal scrolling card columns | ~6 lines | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-kanban) |
| Split Pane | Master-detail list + panel layout | ~8 lines | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-split-pane) |
| Settings | Preferences page with toggles + controls | ~4 lines | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-settings) |
| Blog Post | Article layout with prose, meta, avatar | ~4 lines | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-blog-post) |
| Document Library | File list with badges and avatars | ~6 lines | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-doc-library) |
| App Shell | Multi-screen mobile app with tab nav | 0 lines | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-app-shell) |
| Profile Page | User profile with stats and activity | ~8 lines | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-profile-page) |
| Button Group | Single-select option grid with radiogroup ARIA | ~10 lines | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-button-group) |
| Action Sheet | Mobile action menu via bottom sheet | ~15 lines | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-action-sheet) |
| Sidenav Search | Real-time filter for sidenav links with group counts | ~20 lines JS | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-sidenav-search) |
| Sidenav Context | Auto-collapse inactive groups on context switch | ~15 lines JS | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-sidenav-context) |
| Panel Push Mode | Content resize instead of overlay | ~8 lines | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-push-mode) |
| Master-Detail | Table row → panel detail (CRM/help desk) | ~10 lines | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-master-detail) |
| Notification Centre | Bell icon → panel with notification cards | ~8 lines | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-notification-centre) |
| Floating Action Bar | Sticky toolbar for bulk/batch actions | ~6 lines | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-fab) |
| Stepper / Wizard | Multi-step form with progress indicators | ~10 lines | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-stepper) |

#### Integration Recipes

Integration recipes make third-party widgets SUI-native using token-based CSS overrides. SUI provides the tokens; you bring the library.

| Library | What It Does | Tested Version | Demo |
|---------|-------------|----------------|------|
| Chart.js | Bar, line, pie charts with SUI token colours | v4.x | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-chartjs) |
| FilePond | File upload with drag-and-drop | v4.32.11 | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-filepond) |
| Flatpickr | Date picker, range, datetime | v4.6.13 | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-flatpickr) |
| Quill | Rich text editor (Snow theme) | v2.0.3 | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-quill) |
| Tom Select | Enhanced select, autocomplete, tagging | v2.5.1 | [View →](https://adrianspeyer.github.io/speyer-ui/index.html#recipe-tom-select) |

> **Components vs Recipes:** Components ship in the SUI bundle. Recipes are documented patterns that compose those components with minimal custom CSS. Recipes are starting points — modify to fit your app.

### Signature Patterns

These code examples show how SUI components combine for common SaaS views.

**Status Table (Admin Dashboard)**

```html
<div class="sui-card sui-card-flush">
  <div class="sui-card-header">
    <h3>Team Members</h3>
    <button class="sui-btn sui-btn-primary sui-btn-sm">
      <i data-lucide="plus"></i> Invite
    </button>
  </div>
  <div class="sui-table-wrap">
    <table class="sui-table sui-table-hover">
      <thead><tr><th>Name</th><th>Role</th><th>Status</th></tr></thead>
      <tbody>
        <tr>
          <td data-label="Name">
            <div class="sui-flex sui-items-center sui-gap-2">
              <span class="sui-avatar sui-avatar-sm">AS</span>
              <strong>Adrian Speyer</strong>
            </div>
          </td>
          <td data-label="Role">Admin</td>
          <td data-label="Status">
            <span class="sui-badge sui-badge-success sui-badge-dot">Active</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

**Settings Form**

```html
<div class="sui-card sui-card-lg">
  <h2>Notification Settings</h2>
  <p class="sui-mt-2">Choose how you want to be notified.</p>
  <hr class="sui-divider" />
  <div class="sui-flex-between sui-mb-4">
    <div>
      <div class="sui-text-bold">Email notifications</div>
      <small class="sui-text-muted">Get notified when someone mentions you.</small>
    </div>
    <label class="sui-toggle-label">
      <span class="sui-toggle">
        <input type="checkbox" checked>
        <span class="sui-toggle-track"></span>
      </span>
    </label>
  </div>
  <div class="sui-flex-between">
    <div>
      <div class="sui-text-bold">Weekly digest</div>
      <small class="sui-text-muted">Summary of activity every Monday.</small>
    </div>
    <label class="sui-toggle-label">
      <span class="sui-toggle">
        <input type="checkbox">
        <span class="sui-toggle-track"></span>
      </span>
    </label>
  </div>
</div>
```

**Empty State + Call to Action**

```html
<div class="sui-card">
  <div class="sui-empty">
    <div class="sui-empty-icon"><i data-lucide="inbox"></i></div>
    <div class="sui-empty-title">No projects yet</div>
    <div class="sui-empty-text">
      Create your first project to get started.
    </div>
    <button class="sui-btn sui-btn-primary">
      <i data-lucide="plus"></i> Create project
    </button>
  </div>
</div>
```

---

## JavaScript API (`sui.js`)

Optional toolkit. Auto-initializes via `data-sui-*` attributes.

### Auto-init Attributes

| Attribute | Effect |
|-----------|--------|
| `data-sui-theme` | Toggles light/dark/auto on click |
| `data-sui-modal="#id"` | Opens modal on click |
| `data-sui-sheet="#id"` | Opens bottom sheet on click |
| `data-sui-copy="#id"` | Copies element text on click |
| `data-sui-dropdown-trigger` | Opens parent dropdown on click |

### API

```javascript
SUI.theme.set('dark')                          // 'light', 'dark', 'auto'
SUI.theme.toggle()                             // Cycles modes
SUI.modal.open('#id')                          // Native <dialog> or legacy overlay
SUI.modal.close('#id')                         // Works with both patterns
SUI.sheet.open('#id')                          // Bottom sheet
SUI.sheet.close('#id')                         // Close bottom sheet
SUI.panel.open('#id')                          // Side panel
SUI.panel.close('#id')                         // Close panel
SUI.panel.toggle('#id')                        // Toggle panel
SUI.sidenav.open('#id')                        // Open sidenav
SUI.sidenav.close('#id')                       // Close sidenav
SUI.sidenav.toggle('#id')                      // Toggle sidenav
SUI.sidenav.collapseAll('#id')                 // Collapse all groups
SUI.sidenav.expandAll('#id')                   // Expand all groups
SUI.tabs.activate(tabElement)                  // Programmatic tab switch
SUI.accordion.toggle(triggerElement)           // Toggle accordion section
SUI.accordion.expandAll(containerElement)      // Expand all sections
SUI.accordion.collapseAll(containerElement)    // Collapse all sections
SUI.toast.success('Saved!', 'Details here')    // Auto-dismiss, stackable
SUI.toast.error('Failed', 'Try again')
SUI.dropdown.toggle(element)                   // Click toggle, outside-click close
SUI.copy.text('string')                        // Clipboard with fallback
SUI.avatar.colorFor('AS')                      // Deterministic color from initials
```

---

## Accessibility

### Evidence

Here is a quick review of SUI vs WCAG 2.1 AA compliance.

**Contrast Ratios (Light Mode)**

| Foreground | Background | Ratio | WCAG |
|-----------|------------|-------|------|
| `--sui-text-primary` (#0F172A) | `--sui-bg-card` (#FFFFFF) | 17.9:1 | AAA |
| `--sui-text-primary` (#0F172A) | `--sui-bg-primary` (#F9FBFD) | 17.2:1 | AAA |
| `--sui-text-secondary` (#475569) | `--sui-bg-card` (#FFFFFF) | 7.6:1 | AAA |
| `--sui-success-strong` (#15803D) | `--sui-success-soft` (#F0FDF4) | 4.8:1 | AA |
| `--sui-warning-strong` (#92400E) | `--sui-warning-soft` (#FFFBEB) | 6.8:1 | AA |
| `--sui-error-strong` (#B91C1C) | `--sui-error-soft` (#FEF2F2) | 5.9:1 | AA |
| `--sui-info-strong` (#0E7490) | `--sui-info-soft` (#ECFEFF) | 5.2:1 | AA |
| `--sui-neutral-strong` (#334155) | `--sui-neutral-soft` (#F1F5F9) | 9.5:1 | AAA |
| `--sui-pro-strong` (#6D28D9) | `--sui-pro-soft` (#F5F3FF) | 6.5:1 | AA |
| `--sui-text-muted` (#5C6C80) | `--sui-bg-card` (#FFFFFF) | 5.37:1 | AA |
| `--sui-text-muted` (#8494A9) | `--sui-bg-card` (#161E2C) | 5.41:1 | AA |
| `--sui-blue-strong` (#1D4ED8) | `--sui-blue-soft` (#DBEAFE) | 6.68:1 | AAA |
| White | `--sui-blue-primary` (#2563EB) | 5.2:1 | AA |
| White | `--sui-success-strong` (#15803D) | 5.0:1 | AA |
| White | `--sui-error-strong` (#B91C1C) | 6.5:1 | AA |

**Contrast Ratios (Dark Mode)**

| Foreground | Background | Ratio | WCAG |
|-----------|------------|-------|------|
| `--sui-text-primary` (#F8FAFC) | `--sui-bg-card` (#161E2C) | 16.0:1 | AAA |
| `--sui-text-primary` (#F8FAFC) | `--sui-bg-primary` (#0B0F1A) | 18.3:1 | AAA |
| `--sui-text-secondary` (#94A3B8) | `--sui-bg-card` (#161E2C) | 6.5:1 | AA |
| `--sui-success-strong` (#22C55E) | `--sui-success-soft` (#052E16) | 6.5:1 | AA |
| `--sui-warning-strong` (#FBBF24) | `--sui-warning-soft` (#422006) | 8.7:1 | AAA |
| `--sui-error` (#F87171) | `--sui-error-soft` (#450A0A) | 5.8:1 | AA |
| `--sui-info-strong` (#22D3EE) | `--sui-info-soft` (#083344) | 7.4:1 | AAA |
| White | Dark btn-primary (#2563EB) | 5.2:1 | AA |
| White | Dark btn-danger (#B91C1C) | 6.5:1 | AA |
| White | Dark btn-success (#15803D) | 5.0:1 | AA |

All previously documented contrast limitations have been resolved in v2.0.11. Tested with Chrome Lighthouse (Accessibility audit) — 100/100 in both themes. The preflight validator now checks 40+ token pairs automatically before every build. If you find a contrast issue we missed, [open an issue](https://github.com/adrianspeyer/speyer-ui/issues).

### Keyboard Behavior

| Component | Tab | Enter/Space | Escape | Arrow Keys |
|-----------|-----|-------------|--------|------------|
| Buttons | Focus | Activate | — | — |
| Tabs | Focus | Activate | — | Left/Right switch |
| Accordion | Focus trigger | Toggle panel | — | — |
| Modal | Trapped inside | Activate buttons | Close | — |
| Bottom Sheet | Focus inside | Activate buttons | Close | — |
| Dropdown | Focus trigger | Open/select item | Close | Up/Down navigate |
| Segmented | Focus active | Select | — | Left/Right/Up/Down switch |
| Tooltip | Focus trigger shows | — | — | — |
| Pagination | Focus each button | Navigate | — | — |
| Table Interactive | Focus each row | Activate row | — | — |
| Timeline | Focus per item | — | — | — |

### Color-Blind Design

SUI uses red and green hues for success/error states. These hues are **never the only signal.** Every status pattern includes a descriptive **text label** (e.g., "Active", "Failed"), a distinguishing **icon** (âœ”, âœ•, âš , â„¹), and sufficient **contrast** on its background. A user who cannot distinguish red from green will still see "âœ” Active" and "âœ• Failed" with clear icon differentiation and readable text.

### Reduced Motion

When `prefers-reduced-motion: reduce` is set, all CSS transitions and animations are set to 0ms, scroll behaviour is set to `auto`, and the progress bar indeterminate animation stops.

### High Contrast

When `prefers-contrast: more` is set at the OS level, muted and secondary text colours darken for increased readability, borders on cards, inputs, and outline buttons thicken to 2px, focus ring outlines thicken to 4px, and focus ring colours intensify. Works in both light and dark modes. No configuration needed.

---

## AI Integration

No AI has SUI in its training data. These prompts teach it. Paste into ChatGPT, Claude, Copilot, Cursor, or any assistant.

Three prompt tiers are on the [live demo](https://adrianspeyer.github.io/speyer-ui/) with copy buttons:

- **Quick Prompt** — comprehensive, recommended for most tasks
- **Minimal Prompt** — fast, for simple requests
- **System Prompt** — for Cursor rules or custom instructions

All prompts instruct the AI to fetch the actual CSS files, ensuring it uses the latest token values. If an AI encounters a pattern SUI doesn't cover, the prompt tells it to flag it.

---

## Development

### CDN Usage

jsDelivr serves any tagged GitHub release automatically. No signup required.

```html
<!-- Production (minified, always latest) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-tokens.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-components.min.css">
<script src="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui.min.js" defer></script>

<!-- Development (readable) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/sui-tokens.css">
```

`@latest` always pulls the newest release. To pin a specific version, replace with a tag like `@2.1.2`.

### Repo Structure

```
speyer-ui/
├── dist/                    ← Minified (CDN/production)
│   ├── sui-tokens.min.css
│   ├── sui-components.min.css
│   └── sui.min.js
├── scripts/
│   └── preflight.js         ← Build-time accessibility validator
├── sui-tokens.css           ← Source (readable)
├── sui-components.css
├── sui.js
├── index.html               ← Live demo (GitHub Pages)
├── package.json
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
└── LICENSE
```

### Preflight Validator

`scripts/preflight.js` runs automatically before every build (`npm run build`). It catches accessibility and quality regressions before they ship — 66 checks, zero npm dependencies:

- **WCAG AA contrast** — 40+ foreground/background token pairs tested in both light and dark themes
- **HTML/ARIA** — 12 rules mapped to axe-core audit IDs (button-name, image-alt, heading-order, link-name, duplicate-id, aria-hidden-focus, and more)
- **Version consistency** — source file headers match package.json
- **Dist hygiene** — only expected file types in dist/

Run it standalone: `npm run preflight`

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). If you're using SUI with an AI tool and notice a missing component, [open an issue](https://github.com/adrianspeyer/speyer-ui/issues) or submit a pull request. We want this system to be comprehensive enough that any AI can generate compliant UI without extra instructions — real-world usage helps us find the gaps.

---

## License

[MIT](LICENSE) — free for personal and commercial use.

Created by [Adrian Speyer](https://github.com/adrianspeyer). Made in Canada.
