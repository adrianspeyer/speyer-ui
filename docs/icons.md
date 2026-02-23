# SUI Icons

536 purpose-built SVG icons designed for SaaS admin interfaces. Accessible by default, theme-aware, zero dependencies.

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
    <use href="#sui-icon-act-x"/>
  </svg>
</button>
```

### Icon-only link — no visible text

```html
<a href="/settings" class="sui-icon-btn" aria-label="Settings">
  <svg class="sui-icon" viewBox="0 0 24 24" aria-hidden="true">
    <use href="#sui-icon-nav-settings"/>
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

536 icons across 29 categories. Browse them all at the [icon browser](https://adrianspeyer.github.io/speyer-ui/icons.html).

| Prefix | Category | Count |
|--------|----------|-------|
| `a11y` | Accessibility | 5 |
| `act` | Actions | 69 |
| `ai` | Artificial Intelligence | 14 |
| `brand` | Brands | 15 |
| `comm` | Communication | 15 |
| `data` | Data & Charts | 29 |
| `dev` | Development | 23 |
| `edu` | Education | 6 |
| `file` | Files & Documents | 24 |
| `format` | Text Formatting | 2 |
| `health` | Health & Wellness | 6 |
| `input` | Form Inputs | 12 |
| `loc` | Location | 11 |
| `media` | Media | 19 |
| `misc` | Miscellaneous | 29 |
| `nav` | Navigation | 36 |
| `ops` | Operations | 9 |
| `pay` | Payments & Commerce | 24 |
| `people` | People & Users | 16 |
| `sci` | Science | 1 |
| `sec` | Security | 16 |
| `soc` | Social | 21 |
| `status` | Status & Feedback | 28 |
| `time` | Time & Date | 13 |
| `travel` | Travel | 6 |
| `ui` | UI Elements | 48 |
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

32 icons have aliases — alternate names pointing to the same geometry. Aliases are marked with ↗ in the [icon browser](https://adrianspeyer.github.io/speyer-ui/icons.html). Either name works in your markup:

```html
<!-- These render the same icon -->
<use href="#sui-icon-act-close"/>
<use href="#sui-icon-act-x"/>
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
| `sui-icons.svg` | Source sprite — 536 `<symbol>` elements |
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


## Migrating from Lucide

SUI provides direct equivalents for 284 Lucide icons. Use this lookup when migrating:

| Lucide | SUI |
|---|---|
| `accessibility` | `sui-icon-people-accessibility` |
| `activity` | `sui-icon-data-activity` |
| `alarm-clock` | `sui-icon-time-alarm` |
| `alert-circle` | `sui-icon-status-alert-circle` |
| `alert-triangle` | `sui-icon-status-alert-triangle` |
| `align-center` | `sui-icon-ui-align-center` |
| `align-left` | `sui-icon-ui-align-left` |
| `align-right` | `sui-icon-ui-align-right` |
| `apple` | `sui-icon-health-apple` |
| `archive` | `sui-icon-act-archive` |
| `arrow-down` | `sui-icon-nav-arrow-down` |
| `arrow-down-a-z` | `sui-icon-act-sort-a-z` |
| `arrow-down-wide-narrow` | `sui-icon-act-sort-desc` |
| `arrow-left` | `sui-icon-nav-arrow-left` |
| `arrow-right` | `sui-icon-nav-arrow-right` |
| `arrow-up` | `sui-icon-nav-arrow-up` |
| `arrow-up-a-z` | `sui-icon-act-sort-z-a` |
| `arrow-up-down` | `sui-icon-nav-arrow-up-down` |
| `arrow-up-narrow-wide` | `sui-icon-act-sort-asc` |
| `atom` | `sui-icon-ai-atom` |
| `badge-check` | `sui-icon-status-badge-check` |
| `ban` | `sui-icon-status-ban` |
| `bandage` | `sui-icon-health-bandage` |
| `bar-chart-2` | `sui-icon-data-bar-chart` |
| `bar-chart-3` | `sui-icon-data-bar-chart` |
| `barcode` | `sui-icon-pay-barcode` |
| `battery` | `sui-icon-status-battery` |
| `battery-low` | `sui-icon-status-battery-low` |
| `beer` | `sui-icon-misc-beer` |
| `binary` | `sui-icon-data-binary` |
| `bitcoin` | `sui-icon-pay-bitcoin` |
| `bluetooth` | `sui-icon-dev-bluetooth` |
| `bold` | `sui-icon-ui-bold` |
| `book-open` | `sui-icon-edu-book-open` |
| `bookmark` | `sui-icon-act-bookmark` |
| `bot` | `sui-icon-ai-bot` |
| `braces` | `sui-icon-dev-braces` |
| `brain` | `sui-icon-ai-brain` |
| `bug` | `sui-icon-dev-bug` |
| `calculator` | `sui-icon-pay-calculator` |
| `calendar` | `sui-icon-view-calendar` |
| `calendar-days` | `sui-icon-time-cal-days` |
| `calendar-range` | `sui-icon-time-cal-range` |
| `camera` | `sui-icon-media-camera` |
| `car` | `sui-icon-travel-car` |
| `check` | `sui-icon-status-check` |
| `check-circle` | `sui-icon-status-check-circle` |
| `chevron-down` | `sui-icon-nav-chevron-down` |
| `chevron-left` | `sui-icon-nav-chevron-left` |
| `chevron-right` | `sui-icon-nav-chevron-right` |
| `chevron-up` | `sui-icon-nav-chevron-up` |
| `chevrons-down` | `sui-icon-nav-chevrons-down` |
| `chevrons-left` | `sui-icon-nav-chevrons-left` |
| `chevrons-right` | `sui-icon-nav-chevrons-right` |
| `chevrons-up` | `sui-icon-nav-chevrons-up` |
| `circle-alert` | `sui-icon-status-alert-circle` |
| `circle-check` | `sui-icon-status-check-circle` |
| `circle-help` | `sui-icon-status-help-circle` |
| `circle-x` | `sui-icon-status-x-circle` |
| `clipboard` | `sui-icon-file-clipboard` |
| `clipboard-copy` | `sui-icon-act-copy` |
| `clipboard-list` | `sui-icon-work-checklist` |
| `clipboard-paste` | `sui-icon-act-paste` |
| `clock` | `sui-icon-time-clock` |
| `cloud` | `sui-icon-weather-cloud` |
| `cloud-lightning` | `sui-icon-weather-cloud-lightning` |
| `cloud-rain` | `sui-icon-weather-cloud-rain` |
| `cloud-snow` | `sui-icon-weather-cloud-snow` |
| `code-2` | `sui-icon-ui-code-block` |
| `codepen` | `sui-icon-brand-codepen` |
| `coffee` | `sui-icon-misc-coffee` |
| `columns-2` | `sui-icon-ui-columns` |
| `compass` | `sui-icon-loc-compass` |
| `contact` | `sui-icon-people-contact` |
| `container` | `sui-icon-dev-container` |
| `copy` | `sui-icon-act-copy` |
| `corner-down-left` | `sui-icon-nav-corner-down-left` |
| `corner-down-right` | `sui-icon-nav-corner-down-right` |
| `corner-up-left` | `sui-icon-nav-corner-up-left` |
| `corner-up-right` | `sui-icon-nav-corner-up-right` |
| `cpu` | `sui-icon-ai-cpu` |
| `credit-card` | `sui-icon-pay-credit-card` |
| `database` | `sui-icon-data-database` |
| `discord` | `sui-icon-brand-discord` |
| `dollar-sign` | `sui-icon-pay-dollar-sign` |
| `download` | `sui-icon-act-download` |
| `droplets` | `sui-icon-weather-droplets` |
| `dumbbell` | `sui-icon-health-dumbbell` |
| `eraser` | `sui-icon-act-eraser` |
| `eye` | `sui-icon-sec-eye` |
| `eye-off` | `sui-icon-sec-eye-off` |
| `facebook` | `sui-icon-soc-facebook` |
| `fast-forward` | `sui-icon-media-fast-forward` |
| `file` | `sui-icon-file-generic` |
| `file-audio` | `sui-icon-file-audio` |
| `file-code` | `sui-icon-file-code` |
| `file-image` | `sui-icon-file-image` |
| `file-json` | `sui-icon-file-json` |
| `file-text` | `sui-icon-file-text` |
| `file-video` | `sui-icon-file-video` |
| `filter` | `sui-icon-act-filter` |
| `fingerprint` | `sui-icon-sec-fingerprint` |
| `flag` | `sui-icon-soc-flag` |
| `flower` | `sui-icon-misc-flower` |
| `folder` | `sui-icon-file-folder` |
| `folder-open` | `sui-icon-file-folder-open` |
| `forward` | `sui-icon-comm-forward` |
| `funnel` | `sui-icon-data-funnel` |
| `gallery-horizontal` | `sui-icon-view-gallery` |
| `gantt-chart` | `sui-icon-work-gantt` |
| `gauge` | `sui-icon-data-gauge` |
| `gift` | `sui-icon-misc-gift` |
| `git-branch` | `sui-icon-dev-git-branch` |
| `git-commit` | `sui-icon-dev-git-commit` |
| `git-commit-horizontal` | `sui-icon-data-git-commit` |
| `git-merge` | `sui-icon-data-git-merge` |
| `github` | `sui-icon-brand-github` |
| `glasses` | `sui-icon-misc-glasses` |
| `globe` | `sui-icon-loc-globe` |
| `graduation-cap` | `sui-icon-edu-graduation` |
| `grip-horizontal` | `sui-icon-nav-grip-horizontal` |
| `grip-vertical` | `sui-icon-nav-grip-vertical` |
| `hard-hat` | `sui-icon-ops-hard-hat` |
| `hash` | `sui-icon-data-hash` |
| `headphones` | `sui-icon-media-headphones` |
| `heart` | `sui-icon-soc-heart` |
| `heart-pulse` | `sui-icon-health-heart-pulse` |
| `help-circle` | `sui-icon-status-help-circle` |
| `history` | `sui-icon-time-history` |
| `hourglass` | `sui-icon-time-hourglass` |
| `id-card` | `sui-icon-people-id-badge` |
| `image` | `sui-icon-media-image` |
| `inbox` | `sui-icon-comm-inbox` |
| `info` | `sui-icon-status-info` |
| `instagram` | `sui-icon-soc-instagram` |
| `italic` | `sui-icon-ui-italic` |
| `kanban` | `sui-icon-work-kanban` |
| `key` | `sui-icon-sec-key` |
| `layers` | `sui-icon-ui-layers` |
| `layout-grid` | `sui-icon-ui-layout-grid` |
| `layout-list` | `sui-icon-view-list` |
| `leaf` | `sui-icon-misc-leaf` |
| `lifebuoy` | `sui-icon-misc-lifebuoy` |
| `lightbulb` | `sui-icon-ai-lightbulb` |
| `line-chart` | `sui-icon-data-line-chart` |
| `link-2` | `sui-icon-ui-link-2` |
| `linkedin` | `sui-icon-soc-linkedin` |
| `list` | `sui-icon-data-list` |
| `list-ordered` | `sui-icon-ui-list-ordered` |
| `loader` | `sui-icon-status-loader` |
| `locate` | `sui-icon-loc-locate` |
| `lock` | `sui-icon-sec-lock` |
| `log-in` | `sui-icon-sec-log-in` |
| `log-out` | `sui-icon-act-logout` |
| `mail` | `sui-icon-comm-mail` |
| `mail-open` | `sui-icon-comm-mail-open` |
| `map` | `sui-icon-loc-map` |
| `map-pin` | `sui-icon-loc-pin` |
| `maximize` | `sui-icon-ui-maximize` |
| `megaphone` | `sui-icon-comm-megaphone` |
| `menu` | `sui-icon-nav-menu` |
| `message-circle` | `sui-icon-soc-message-circle` |
| `message-square` | `sui-icon-comm-message` |
| `mic` | `sui-icon-media-mic` |
| `mic-off` | `sui-icon-media-mic-off` |
| `milestone` | `sui-icon-work-milestone` |
| `minimize` | `sui-icon-ui-minimize` |
| `monitor` | `sui-icon-dev-monitor` |
| `moon` | `sui-icon-ui-moon` |
| `more-horizontal` | `sui-icon-nav-more-horizontal` |
| `more-vertical` | `sui-icon-nav-more-vertical` |
| `mountain` | `sui-icon-misc-mountain` |
| `move` | `sui-icon-nav-move` |
| `music` | `sui-icon-media-music` |
| `navigation` | `sui-icon-loc-navigation` |
| `navigation-2` | `sui-icon-loc-navigation-2` |
| `notebook` | `sui-icon-edu-notebook` |
| `package` | `sui-icon-file-archive` |
| `palette` | `sui-icon-ui-palette` |
| `panel-bottom` | `sui-icon-ui-panel-bottom` |
| `panel-right` | `sui-icon-ui-panel-right` |
| `party-popper` | `sui-icon-misc-party` |
| `passkey` | `sui-icon-sec-passkey` |
| `passport` | `sui-icon-travel-passport` |
| `pause` | `sui-icon-media-pause` |
| `paw-print` | `sui-icon-misc-paw` |
| `pencil` | `sui-icon-act-edit-pencil` |
| `phone` | `sui-icon-comm-phone` |
| `phone-call` | `sui-icon-comm-phone-call` |
| `phone-off` | `sui-icon-comm-phone-off` |
| `picture-in-picture` | `sui-icon-ui-picture-in-picture` |
| `pie-chart` | `sui-icon-data-pie-chart` |
| `piggy-bank` | `sui-icon-pay-piggy-bank` |
| `pill` | `sui-icon-health-pill` |
| `pin` | `sui-icon-act-pin` |
| `pipette` | `sui-icon-input-color-picker` |
| `plane` | `sui-icon-travel-plane` |
| `play` | `sui-icon-media-play` |
| `plug` | `sui-icon-dev-plug` |
| `plus` | `sui-icon-act-plus` |
| `presentation` | `sui-icon-work-presentation` |
| `rainbow` | `sui-icon-misc-rainbow` |
| `receipt` | `sui-icon-pay-receipt` |
| `redo` | `sui-icon-act-redo` |
| `refresh-ccw` | `sui-icon-act-refresh-ccw` |
| `refresh-cw` | `sui-icon-act-refresh-cw` |
| `regex` | `sui-icon-dev-regex` |
| `repeat` | `sui-icon-act-repeat` |
| `replace` | `sui-icon-act-replace` |
| `reply` | `sui-icon-comm-reply` |
| `rocket` | `sui-icon-act-rocket` |
| `save` | `sui-icon-act-save` |
| `scale` | `sui-icon-misc-scale` |
| `scan-face` | `sui-icon-sec-scan-face` |
| `school` | `sui-icon-edu-school` |
| `scissors` | `sui-icon-act-scissors` |
| `search` | `sui-icon-act-search` |
| `send` | `sui-icon-comm-send` |
| `server` | `sui-icon-dev-server` |
| `share` | `sui-icon-act-share` |
| `share-2` | `sui-icon-act-share-2` |
| `shield` | `sui-icon-sec-shield` |
| `shield-check` | `sui-icon-sec-shield-check` |
| `ship` | `sui-icon-travel-ship` |
| `sidebar` | `sui-icon-ui-sidebar` |
| `sigma` | `sui-icon-data-sigma` |
| `signal` | `sui-icon-status-signal` |
| `skip-back` | `sui-icon-media-skip-back` |
| `skip-forward` | `sui-icon-media-skip-fwd` |
| `slack` | `sui-icon-brand-slack` |
| `sliders-horizontal` | `sui-icon-input-slider` |
| `smartphone` | `sui-icon-dev-smartphone` |
| `sort-asc` | `sui-icon-data-sort-asc` |
| `sort-desc` | `sui-icon-data-sort-desc` |
| `sparkles` | `sui-icon-ai-sparkles` |
| `star` | `sui-icon-soc-star` |
| `stethoscope` | `sui-icon-health-stethoscope` |
| `strikethrough` | `sui-icon-ui-strikethrough` |
| `sun` | `sui-icon-weather-sun` |
| `table` | `sui-icon-data-table` |
| `tablet` | `sui-icon-dev-tablet` |
| `terminal` | `sui-icon-dev-terminal` |
| `text-cursor` | `sui-icon-input-text-cursor` |
| `thermometer` | `sui-icon-weather-thermometer` |
| `thumbs-down` | `sui-icon-act-thumbs-down` |
| `thumbs-up` | `sui-icon-act-thumbs-up` |
| `ticket` | `sui-icon-misc-ticket` |
| `timer` | `sui-icon-time-timer` |
| `toggle-left` | `sui-icon-input-toggle-off` |
| `toggle-right` | `sui-icon-input-toggle-on` |
| `train-front` | `sui-icon-travel-train` |
| `trash` | `sui-icon-act-trash` |
| `trash-2` | `sui-icon-act-trash` |
| `tree-pine` | `sui-icon-misc-tree` |
| `trending-down` | `sui-icon-data-trending-down` |
| `trending-up` | `sui-icon-data-trending-up` |
| `triangle-alert` | `sui-icon-status-alert-triangle` |
| `twitter` | `sui-icon-soc-twitter` |
| `type` | `sui-icon-input-type` |
| `umbrella` | `sui-icon-misc-umbrella` |
| `underline` | `sui-icon-ui-underline` |
| `undo` | `sui-icon-act-undo` |
| `unlock` | `sui-icon-sec-unlock` |
| `upload` | `sui-icon-act-upload` |
| `user` | `sui-icon-people-user` |
| `user-check` | `sui-icon-people-user-check` |
| `user-minus` | `sui-icon-people-user-minus` |
| `user-plus` | `sui-icon-people-user-plus` |
| `user-x` | `sui-icon-people-user-x` |
| `video` | `sui-icon-media-video` |
| `volume-1` | `sui-icon-media-volume-low` |
| `volume-2` | `sui-icon-media-volume` |
| `wallet` | `sui-icon-pay-wallet` |
| `wand-2` | `sui-icon-act-wand` |
| `wand-sparkles` | `sui-icon-ai-wand` |
| `wifi` | `sui-icon-status-wifi` |
| `wifi-off` | `sui-icon-status-wifi-off` |
| `wind` | `sui-icon-weather-wind` |
| `wine` | `sui-icon-misc-wine` |
| `wrench` | `sui-icon-ops-wrench` |
| `x` | `sui-icon-act-close` |
| `x-circle` | `sui-icon-status-x-circle` |
| `youtube` | `sui-icon-soc-youtube` |
| `zap` | `sui-icon-act-zap` |

**284 mappings.** For Lucide icons not listed, browse the [Icon Browser](https://adrianspeyer.github.io/speyer-ui/icons.html) to find the closest SUI equivalent.

### Quick Migration Steps

1. Replace `<i data-lucide="icon-name">` with `<svg class="sui-icon"><use href="#sui-icon-{category}-{name}"/></svg>`
2. Remove the Lucide JS import and CDN link
3. Add the SUI icon sprite loader (see [Getting Started](getting-started.md))
4. SUI icons inherit `currentColor` — no separate colour setup needed

*Made in Canada with love 🇨🇦*
