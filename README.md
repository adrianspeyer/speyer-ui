# Speyer UI System

A lightweight, batteries-included design system that treats accessibility as architecture, not afterthought. 538 purpose-built icons. Colour-blind friendly, mobile-first, AI-ready. Made in Canada 🇨🇦

**v3.3.1** · ~98KB core · 538 icons · WCAG 2.1 AA · Zero runtime dependencies · [Live Demo →](https://adrianspeyer.github.io/speyer-ui/) · [Icon Browser →](https://adrianspeyer.github.io/speyer-ui/icons.html)

> **⚠️ v3.2.0 migration note:** Multi-screen apps using `.sui-screen` must now wrap screens in a parent with `data-sui-screens` and add `.is-active` to the default screen. Single-screen apps are unaffected. See [CHANGELOG](CHANGELOG.md) for details.

---

## Table of Contents

- [Why SUI](#why-sui)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Components](#components)
- [Icons](#icons)
- [Design Tokens](#design-tokens)
- [Recipes](#recipes)
- [JavaScript API](#javascript-api)
- [Accessibility](#accessibility)
- [AI Integration](#ai-integration)
- [Documentation](#documentation)
- [Development](#development)

---

## Why SUI

SUI is built for SaaS teams who need a design system that works without a build step, respects accessibility standards, and plays well with AI-assisted development. Four CDN links, one SVG sprite, and you have buttons, cards, modals, toasts, tables, navigation, 538 purpose-built icons, and 29 documented composition patterns — all under 100KB core.

**What SUI provides:** Containers, chrome, interactive primitives, typography, design tokens, and 538 purpose-built icons with built-in accessibility (forced-colours mode, 44px touch targets, reduced-motion guards).

**What SUI does not provide:** Charts, data visualisation, drag-and-drop, or application logic. Those are bring-your-own. Integration recipes show how to make third-party libraries (Chart.js, Flatpickr, Tom Select, FilePond, Quill) match SUI in both themes.

---

## Quick Start

### CDN (Recommended)

```html
<!-- Design tokens (colours, spacing, typography) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-tokens.min.css">

<!-- Component styles (buttons, cards, tables, etc.) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-components.min.css">

<!-- SUI Icons (optional — or bring your own) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-icons.min.css">

<!-- Interactive behaviours (modals, toasts, dropdowns) -->
<script src="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui.min.js" defer></script>

<!-- Load icon sprite (paste once, near top of <body>) -->
<script defer>
  fetch('https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-icons.min.svg')
    .then(r => r.text())
    .then(svg => { const d = document.createElement('div'); d.style.display = 'none'; d.innerHTML = svg; document.body.prepend(d); });
</script>
```

Pin a version for production: replace `@latest` with `@3.3.1`.

### Starter Template

```html
<!DOCTYPE html>
<html lang="en" data-theme="auto">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@3.3.1/dist/sui-tokens.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@3.3.1/dist/sui-components.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@3.3.1/dist/sui-icons.min.css">
</head>
<body>
  <script defer>
    fetch('https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@3.3.1/dist/sui-icons.min.svg')
      .then(r => r.text())
      .then(svg => { const d = document.createElement('div'); d.style.display = 'none'; d.innerHTML = svg; document.body.prepend(d); });
  </script>
  <main style="max-width: 720px; margin: 0 auto; padding: var(--sui-space-4);">
    <h1>Hello, SUI</h1>
    <button class="sui-btn sui-btn-primary">
      <svg class="sui-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#sui-icon-act-rocket"/></svg>
      Get Started
    </button>
  </main>
  <script src="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@3.3.1/dist/sui.min.js" defer></script>
</body>
</html>
```

---

## Architecture

SUI is three files with clear responsibilities:

| File | Purpose | Size |
|------|---------|------|
| `sui-tokens.css` | Design tokens — colours, spacing, typography, shadows, z-index | ~5.5KB |
| `sui-components.css` | All component classes — buttons, cards, badges, tables, and more | ~63.6KB |
| `sui.js` | Interactive toolkit — modals, toasts, dropdowns, tooltips, accordion | ~27KB |

**Key principles:**

- **CSS handles appearance, JS adds interactivity.** Every component renders correctly without JavaScript — it just won't open, close, or animate.
- **Design tokens for everything.** Never hardcode hex colours in components. Use `--sui-*` custom properties.
- **Mobile-first.** Design for 375px, enhance upward. Minimum touch target: 44px.
- **Accessibility as architecture.** WCAG 2.1 AA baseline. Status never communicated by colour alone — always pair with icon + text.
- **538 purpose-built icons included.** First-party icon system with forced-colours mode, 44px touch targets, and reduced-motion guards. Bring-your-own icons still fully supported.
- **`!important` only in utility classes.** Never in components.

### File Structure

```
speyer-ui/
├── .claude/
│   └── instructions.md       ← AI context for Claude
├── .cursor/
│   └── rules                 ← AI context for Cursor
├── dist/                      ← Minified (CDN/production)
│   ├── sui-tokens.min.css
│   ├── sui-components.min.css
│   ├── sui.min.js
│   ├── sui-icons.min.css
│   └── sui-icons.min.svg
├── docs/                      ← Extended documentation
│   ├── getting-started.md
│   ├── javascript-api.md
│   ├── design-tokens.md
│   ├── icons.md
│   ├── recipes.md
│   ├── accessibility.md
│   └── design-decisions.md
├── scripts/
│   ├── minify-sprite.mjs      ← Build: sui-icons.svg → dist/sui-icons.min.svg
│   ├── preflight.js           ← Build-time accessibility validator
│   ├── run-axe.mjs            ← Axe a11y scanner (jsdom)
│   └── validate-icons.mjs     ← Icon sprite validator
├── sui-tokens.css             ← Source (readable)
├── sui-components.css
├── sui.js
├── sui-icons.css              ← Icon companion stylesheet
├── sui-icons.svg              ← 538-symbol SVG sprite
├── icons.html                 ← Icon browser (search, copy)
├── index.html                 ← Live demo (GitHub Pages)
├── llms.txt                   ← AI crawler context
├── package.json
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
└── LICENSE
```

---

## Components

SUI provides 25+ component classes. Full documentation with live examples: [adrianspeyer.github.io/speyer-ui](https://adrianspeyer.github.io/speyer-ui/)

**Layout:** `sui-grid`, `sui-flex`, `sui-flex-nowrap`, `sui-scroll-x`, `sui-screen` (mobile viewport), `sui-screen-header`, `sui-screen-body`, `sui-screen-footer`, `sui-topbar`, `sui-topbar-aligned`

**Content:** `sui-card` (+ `sui-card-header`, `sui-card-body`, `sui-card-flush`, `sui-card-compact`, `sui-card-shadow`, `sui-card-interactive`), `sui-prose`, `sui-divider`, `sui-empty`, `sui-timeline`, `sui-meta`

**Navigation:** `sui-sidenav` (+ `sui-sidenav-group`, `sui-sidenav-link`), `sui-nav` (tabs), `sui-segmented`

**Data Display:** `sui-table` (+ `sui-table-hover`, `sui-table-interactive`, `sui-table-sortable`, `sui-table-stack`, `sui-table-sticky`, `sui-table-dense`), `sui-badge`, `sui-chip`, `sui-avatar`, `sui-stepper`, `sui-mark`, `sui-kbd`

**Inputs:** `sui-input`, `sui-input-action`, `sui-toggle`, `sui-select`, `sui-dropzone`

**Actions:** `sui-btn` (+ `sui-btn-primary`, `sui-btn-secondary`, `sui-btn-ghost`, `sui-btn-dashed`, `sui-btn-danger`, `sui-btn-success`), `sui-toolbar`

**Overlays:** `sui-dialog` (modal), `sui-sheet` (bottom), `sui-panel` (side), `sui-dropdown`, `sui-tooltip`

**Feedback:** `sui-alert`, `sui-progress`, `sui-skeleton`, toast container (JS-managed)

### Avoid Double Padding

If you use `.sui-card-header` / `.sui-card-body`, pair the wrapper with `.sui-card-flush` to zero out the card's own padding. Use `.sui-card-compact` for dense layouts like KPI grids.

---

## Icons

SUI ships 538 purpose-built SVG icons (506 unique + 32 cross-category aliases) across 29 categories. The icon system is optional — omit `sui-icons.css` and the sprite loader to bring your own.

### Usage

```html
<!-- Decorative (icon + visible text) -->
<svg class="sui-icon" viewBox="0 0 24 24" aria-hidden="true">
  <use href="#sui-icon-status-check-circle"/>
</svg>
Active

<!-- Icon button -->
<button class="sui-icon-btn" aria-label="Delete item">
  <svg class="sui-icon" viewBox="0 0 24 24" aria-hidden="true">
    <use href="#sui-icon-act-trash-2"/>
  </svg>
</button>
```

**Browse all 538 icons:** [Icon Browser →](https://adrianspeyer.github.io/speyer-ui/icons.html)

### Size Classes

Use font-size-based sizing: `.sui-icon-xs` (12px) through `.sui-icon-3xl` (48px). Default is 1em.

### Colour Utilities

`.sui-icon-primary`, `.sui-icon-success`, `.sui-icon-warning`, `.sui-icon-error`, `.sui-icon-info`, `.sui-icon-muted`

### Bring Your Own Icons

Skip `sui-icons.css` and the sprite loader. Use any icon library (Heroicons, Phosphor, Font Awesome) or plain SVGs. SUI's component classes work with any icon approach — only pair icons with text labels and use `aria-hidden="true"` on decorative icons.

Full icon reference: [docs/icons.md](docs/icons.md)

---

## Design Tokens

SUI uses CSS custom properties (`--sui-*`) for all visual values. Tokens are defined in `sui-tokens.css` and automatically switch between light and dark themes via `[data-theme]`.

**Colour:** `--sui-blue-primary`, `--sui-success-strong`, `--sui-error-strong`, `--sui-warning-strong`, `--sui-text-primary`, `--sui-text-muted`, `--sui-bg-primary`, `--sui-bg-card`, `--sui-bg-elevated`, `--sui-border`

**Spacing:** `--sui-space-1` through `--sui-space-6` (4px, 8px, 16px, 24px, 32px, 48px)

**Typography:** `--sui-font-primary`, `--sui-font-mono`, `--sui-text-body`, `--sui-text-small`, `--sui-text-meta`, `--sui-text-h1` through `--sui-text-h3`, `--sui-weight-regular`, `--sui-weight-semibold`, `--sui-weight-bold`

**Other:** `--sui-radius-sm`, `--sui-radius-md`, `--sui-radius-lg`, `--sui-shadow-sm`, `--sui-shadow-md`, `--sui-shadow-lg`, `--sui-z-*` layers

Full token reference: [docs/design-tokens.md](docs/design-tokens.md)

**Brand colours:** SUI semantic tokens (like `--sui-blue-primary`) shift between themes. Do not use them for logos or brand marks. Hardcode brand colours or define your own custom properties.

---

## Recipes

Recipes are documented composition patterns — typically 4–20 lines of custom CSS plus SUI markup. They live on the demo page with live examples and copy-paste code. **Zero bundle cost.** Adding recipes doesn't increase SUI's bundle size.

### Application Patterns (16)

Inline Edit, Kanban Board, Split Pane, Settings, Blog Post, Document Library, App Shell (mobile), Profile Page, Button Group, Action Sheet, Search Bar, Inline Selection Bar, Command Palette, Confirmation Dialog, App Shell Scaffold (desktop)

### Navigation Patterns (2)

Sidenav Search, Sidenav Context

### Panel & Overlay Patterns (7)

Panel Push Mode, Master-Detail, Notification Centre, Floating Action Bar, Stepper/Wizard, Panel Polish, Popover

### Integration Recipes (5)

Chart.js, FilePond, Flatpickr, Quill, Tom Select — SUI provides token overrides, you bring the library via CDN.

**Total: 29 recipes.** Full details: [docs/recipes.md](docs/recipes.md) · [Live demos →](https://adrianspeyer.github.io/speyer-ui/)

---

## JavaScript API

SUI's JavaScript is optional. Components render correctly without it — they just won't open, close, or animate. When included, it auto-initialises via `data-sui-*` attributes.

| Module | Public Methods |
|--------|---------------|
| `SUI.theme` | `set(mode)`, `toggle()`, `current()`, `resolved()` |
| `SUI.tabs` | `activate(el)` |
| `SUI.accordion` | `toggle(trigger)`, `expandAll(container)`, `collapseAll(container)` |
| `SUI.dropdown` | `open(el)`, `close(el)`, `toggle(el)` |
| `SUI.modal` | `open(sel)`, `close(sel)` |
| `SUI.toast` | `show(opts)`, `success(t,m)`, `error(t,m)`, `warning(t,m)`, `info(t,m)`, `dismiss(el)`, `clearAll()` |
| `SUI.tooltip` | `show(el)`, `hide(el)` |
| `SUI.copy` | `text(str)`, `fromElement(sel)` |
| `SUI.sheet` | `open(sel)`, `close(sel)`, `toggle(sel)` |
| `SUI.segmented` | `select(el)` |
| `SUI.sidenav` | `open(sel)`, `close(sel)`, `toggle(sel)`, `expandAll(nav)`, `collapseAll(nav)`, `isOpen(sel)` |
| `SUI.panel` | `open(sel)`, `close(sel)`, `toggle(sel)`, `isOpen(sel)` |

**There is no `SUI.utils` namespace.** The copy module is `SUI.copy` directly.
**There is no `SUI.modal.confirm()` or `SUI.modal.prompt()`.** Use the Confirmation Dialog recipe.

Full reference with code examples: [docs/javascript-api.md](docs/javascript-api.md)

---

## Accessibility

SUI maintains WCAG 2.1 AA compliance as an architectural requirement. The preflight validator (`scripts/preflight.js`) runs 66 automated checks before every build:

- **Contrast:** 40+ foreground/background token pairs in both themes, P1–P3 error tiers
- **HTML/ARIA:** 15 axe-core rules including button-name, link-name, heading-order, aria-hidden-focus
- **Encoding:** Scans source files for mojibake patterns
- **Version consistency:** Checks all files agree on the version number

Lighthouse score: 100/100 (both themes). Additional details: [docs/accessibility.md](docs/accessibility.md)

### Key Rules

- Status never communicated by colour alone — always pair with icon + text
- Minimum touch target: 44px
- Focus ring visible in both themes
- All interactive elements keyboard-accessible
- Native `<dialog>` for modals (browser handles focus trapping)
- `aria-live` regions for dynamic content (toasts use `polite`; error toasts use `assertive`)

---

## AI Integration

SUI ships with AI context files that teach LLMs how to use the system correctly:

| File | Purpose |
|------|---------|
| `.claude/instructions.md` | Full rules, component list, API table, recipes, anti-hallucination list |
| `.cursor/rules` | Same content, Cursor IDE format |
| `llms.txt` | Lightweight context for web crawlers and agents |

These files prevent common AI hallucinations by documenting what **does not** exist alongside what does. For example, there is no `sui-card-content` (use `sui-card-body`), no `SUI.utils.copy()` (use `SUI.copy.text()`), and no `sui-layout` / `sui-main` (use the App Shell Scaffold recipe).

---

## Documentation

Extended documentation lives in the `docs/` folder:

| File | Content |
|------|---------|
| [getting-started.md](docs/getting-started.md) | Installation, CDN, starter templates |
| [javascript-api.md](docs/javascript-api.md) | Complete API reference with code examples |
| [design-tokens.md](docs/design-tokens.md) | Full token catalogue with values |
| [icons.md](docs/icons.md) | Icon system: sizing, colours, categories, accessibility patterns |
| [recipes.md](docs/recipes.md) | All 29 recipes with links and guidance |
| [accessibility.md](docs/accessibility.md) | WCAG compliance details, icon a11y, and testing |
| [design-decisions.md](docs/design-decisions.md) | Architecture rationale and trade-offs |

---

## Development

### Build

```bash
npm install
npm run build    # Runs preflight validator + minifies to dist/
```

### Preflight Validator

The preflight script (`scripts/preflight.js`) runs 66 checks across 7 categories. It must pass with 0 failures before any release. Advisory warnings (focus ring AAA contrast) are expected and documented.

```bash
npm run preflight
```

### CDN Usage

SUI is distributed via [jsDelivr](https://www.jsdelivr.com/). Files in `dist/` are the production assets. Use `@latest` for development, pin `@3.3.1` for production.

### Versioning

SUI follows semver: patch (bugfixes), minor (new components/tokens/modifiers), major (breaking changes).

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## Classes That Do NOT Exist

These have been hallucinated by AI assistants. They are documented here to prevent recurrence:

| Hallucinated | Correct |
|-------------|---------|
| `sui-card-content` | `sui-card-body` |
| `SUI.utils.copy()` | `SUI.copy.text()` or `SUI.copy.fromElement()` |
| `SUI.modal.confirm()` | Use Confirmation Dialog recipe |
| `SUI.modal.prompt()` | Build with `SUI.modal.open()` + custom form |
| `sui-layout`, `sui-main` | Use App Shell Scaffold recipe with `app-*` classes |
| `SUI.icons.*` | No JS API for icons — they're pure CSS + SVG |
| `sui-icon-{name}` (no category) | Must include category prefix: `sui-icon-{category}-{name}` |
| `data-sui-icon` | No data attribute for icons — use `<svg><use href>` pattern |

---

## License

[MIT](LICENSE) · Made in Canada
