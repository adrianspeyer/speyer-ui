# SUI Icons

483 hand-drawn SVG icons designed for SaaS admin interfaces. Accessible by default, theme-aware, zero dependencies.

**[Browse all icons →](https://adrianspeyer.github.io/speyer-ui/icons.html)**

---

## Quick Start

```html
<!-- Icon CSS (sizing, colour utilities, spin animation, touch targets) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@3.0.0/dist/sui-icons.min.css">

<!-- Load sprite (once, near top of <body>) -->
<script>
  fetch('https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@3.0.0/dist/sui-icons.min.svg')
    .then(r => r.text())
    .then(svg => { const d = document.createElement('div'); d.hidden = true; d.innerHTML = svg; document.body.prepend(d); });
</script>

<!-- Use an icon -->
<svg class="sui-icon" viewBox="0 0 24 24" aria-hidden="true">
  <use href="#sui-icon-act-search"/>
</svg>
```

Replace `@3.0.0` with `@latest` for automatic updates, or pin to a specific version for production stability.

---

## Usage Patterns

Every icon falls into one of these patterns. Pick the right one for accessibility.

### Decorative — icon paired with visible text

The text provides meaning. The icon is visual reinforcement.

```html
<button class="sui-btn sui-btn-primary">
  <svg class="sui-icon" viewBox="0 0 24 24" aria-hidden="true">
    <use href="#sui-icon-act-download"/>
  </svg>
  Download
</button>
```

### Icon-only button — no visible text

The icon IS the interface. Label the button, hide the SVG.

```html
<button class="sui-icon-btn" aria-label="Close panel">
  <svg class="sui-icon" viewBox="0 0 24 24" aria-hidden="true">
    <use href="#sui-icon-nav-x"/>
  </svg>
</button>
```

### Icon-only link — no visible text

```html
<a href="/settings" class="sui-icon-btn" aria-label="Settings">
  <svg class="sui-icon" viewBox="0 0 24 24" aria-hidden="true">
    <use href="#sui-icon-ui-settings"/>
  </svg>
</a>
```

### Standalone informative — rare

An icon outside any interactive element where no text explains it.

```html
<svg class="sui-icon" viewBox="0 0 24 24"
     role="img" aria-label="Warning: action required">
  <use href="#sui-icon-status-alert-triangle"/>
</svg>
```

Full accessibility details: [docs/accessibility.md](accessibility.md)

---

## Sizing

Icons scale with `em` units via size classes on the `<svg>`:

| Class | Size | Use case |
|-------|------|----------|
| `.sui-icon-xs` | 12px | Inline badges, tight spaces |
| `.sui-icon-sm` | 14px | Compact UI, table cells |
| `.sui-icon-md` | 16px | Default body text companion |
| `.sui-icon-lg` | 20px | Buttons, form labels |
| `.sui-icon-xl` | 24px | Section headers, cards |
| `.sui-icon-2xl` | 32px | Feature highlights |
| `.sui-icon-3xl` | 48px | Hero sections, empty states |

```html
<svg class="sui-icon sui-icon-2xl" viewBox="0 0 24 24" aria-hidden="true">
  <use href="#sui-icon-act-rocket"/>
</svg>
```

Default size (no class) inherits from the parent's `font-size`.

### Fine Detail Minimums

Some icons with dense geometry need a minimum display size to remain recognisable:

| Icon | Minimum | Reason |
|------|---------|--------|
| `act-qr-code`, `data-chart-scatter` | `.sui-icon-lg` (20px) | Dense dot/square patterns |
| `ops-barcode`, `a11y-keyboard`, `misc-snowflake`, `brand-codepen` | `.sui-icon-md` (16px) | Fine line detail |

---

## Colour Utilities

Icons inherit `currentColor` from their parent by default. Colour classes override this:

| Class | Token | Use case |
|-------|-------|----------|
| `.sui-icon-primary` | `--sui-blue-primary` | Links, active states |
| `.sui-icon-success` | `--sui-success` | Positive status |
| `.sui-icon-warning` | `--sui-warning` | Caution |
| `.sui-icon-error` | `--sui-error` | Errors, destructive |
| `.sui-icon-info` | `--sui-info` | Informational |
| `.sui-icon-muted` | `--sui-text-muted` | De-emphasised, secondary |

```html
<svg class="sui-icon sui-icon-success" viewBox="0 0 24 24" aria-hidden="true">
  <use href="#sui-icon-status-check-circle"/>
</svg>
Approved
```

**Important:** Colour classes must always be paired with visible text. Never use colour alone to communicate status.

---

## Spinner

Apply `.sui-icon-spin` to any icon for a loading indicator. Respects `prefers-reduced-motion`.

```html
<svg class="sui-icon sui-icon-spin sui-icon-xl" viewBox="0 0 24 24"
     role="img" aria-label="Loading">
  <use href="#sui-icon-status-loader"/>
</svg>
```

The `status-loader` icon is designed for this purpose, but `.sui-icon-spin` works on any icon.

---

## Icon Button

`.sui-icon-btn` provides a 44px touch target with hover/focus states:

```html
<button class="sui-icon-btn" aria-label="Edit">
  <svg class="sui-icon" viewBox="0 0 24 24" aria-hidden="true">
    <use href="#sui-icon-act-edit"/>
  </svg>
</button>
```

- 44px minimum width and height (WCAG 2.5.5 Enhanced)
- Keyboard focus ring via `:focus-visible`
- Hover state with elevated background
- Works with both `<button>` and `<a>` elements

---

## Categories

483 icons across 28 categories. Browse them all at the [icon browser](https://adrianspeyer.github.io/speyer-ui/icons.html).

| Prefix | Category | Count |
|--------|----------|-------|
| `a11y` | Accessibility | 5 |
| `act` | Actions | 55 |
| `ai` | Artificial Intelligence | 14 |
| `brand` | Brands | 14 |
| `comm` | Communication | 15 |
| `data` | Data & Charts | 29 |
| `dev` | Development | 18 |
| `edu` | Education | 6 |
| `file` | Files & Documents | 22 |
| `health` | Health & Wellness | 6 |
| `input` | Form Inputs | 12 |
| `loc` | Location | 11 |
| `media` | Media | 15 |
| `misc` | Miscellaneous | 21 |
| `nav` | Navigation | 36 |
| `ops` | Operations | 9 |
| `pay` | Payments & Commerce | 24 |
| `people` | People & Users | 14 |
| `sci` | Science | 1 |
| `sec` | Security | 16 |
| `soc` | Social | 17 |
| `status` | Status & Feedback | 28 |
| `time` | Time & Date | 13 |
| `travel` | Travel | 6 |
| `ui` | UI Elements | 45 |
| `view` | View & Display | 12 |
| `weather` | Weather | 8 |
| `work` | Workspace | 11 |

---

## Naming Convention

```
sui-icon-{category}-{descriptor}
```

- Base noun comes last: `data-bar-chart`, not `data-chart-bar`
- Hyphens between words: `heart-pulse`, not `heartPulse`
- Be specific: `nav-arrow-down-circle`, not `nav-arrow-2`
- Follow existing patterns: if `nav-arrow-down` exists, a circled version is `nav-arrow-down-circle`

### Aliases

27 icons have aliases — alternate names pointing to the same geometry. Aliases are marked with ↗ in the [icon browser](https://adrianspeyer.github.io/speyer-ui/icons.html). Either name works in your markup:

```html
<!-- These render the same icon -->
<use href="#sui-icon-soc-heart"/>
<use href="#sui-icon-soc-like"/>
```

---

## Accessibility Features

All built into `sui-icons.css` — no configuration needed.

| Feature | Implementation |
|---------|----------------|
| **Forced colours mode** | `forced-color-adjust: auto` — icons render in the user's chosen system text colour under Windows High Contrast |
| **Reduced motion** | `.sui-icon-spin` animation stops when `prefers-reduced-motion: reduce` is active |
| **Touch targets** | `.sui-icon-btn` enforces 44px minimum (WCAG 2.5.5 Enhanced) |
| **Focus indicators** | `:focus-visible` with `outline` (survives forced-colours mode) |
| **currentColor** | All icons inherit text colour — automatic contrast compliance |
| **`<title>` in every symbol** | Preserved for documentation and search — accessibility patterns use `aria-label` instead |

Full accessibility guide: [docs/accessibility.md](accessibility.md)

---

## Bring Your Own Icons

SUI Icons is optional. If you prefer Heroicons, Phosphor, Lucide, or any other library, the component system works with any SVG icon. Just follow the same accessibility patterns (Patterns A–D above) regardless of the icon source.

The `sui-icons.css` size classes (`.sui-icon-sm`, `.sui-icon-xl`, etc.) and colour utilities (`.sui-icon-success`, etc.) work with any SVG that uses the `.sui-icon` class and `currentColor`.

---

## File Reference

| File | Description |
|------|-------------|
| `sui-icons.svg` | Source sprite — 483 `<symbol>` elements |
| `sui-icons.css` | Companion CSS — sizing, colours, spin, touch targets, forced colours |
| `sui-icons.min.svg` | Minified sprite (in `dist/`) |
| `sui-icons.min.css` | Minified CSS (in `dist/`) |
| `icons.html` | Interactive browser — search, size/theme toggles, click-to-copy |
| `scripts/validate-icons.mjs` | 12-point sprite validator (2,873 checks) |
| `svgo.config.mjs` | SVGO config for contributors preparing individual icon SVGs |

---

## Design Rules (For Contributors)

| Rule | Value |
|------|-------|
| Canvas | 24 × 24px, `viewBox="0 0 24 24"` |
| Stroke | 2px, `currentColor`, round caps and joins |
| Fill | `none` (outline) or `currentColor` (solid) |
| Content area | 2px – 22px boundary (2px padding on all sides) |
| Hardcoded colours | Never — always `currentColor` |
| `<title>` | Required, first child of `<symbol>` |
| Aliases | `<use href>` — never duplicate geometry |

---

*Made in Canada with love 🇨🇦*
