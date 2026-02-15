# Speyer UI System (SUI)

A lightweight design system built around four constraints:

1. **Accessibility is mandatory, not optional.** WCAG 2.1 AA is the baseline, tested and documented.
2. **No build tools required.** Three files, drop them in, it works.
3. **Components work with or without JavaScript.** CSS handles appearance, JS adds behavior.
4. **Status is never communicated by color alone.** Every badge, alert, and indicator requires icon + text.

Under 55KB minified. Zero required dependencies. Works with any framework or none.

**What you get:** buttons, cards, badges, alerts, avatars, toggles, tables, forms, progress bars, modals, toasts, dropdowns, tooltips, accordions, breadcrumbs, pagination, empty states, skeletons, and a dark mode that works.

**[Live Demo](https://adrianspeyer.github.io/speyer-ui/)** · [GitHub](https://github.com/adrianspeyer/speyer-ui)

Built for internal tools, SaaS dashboards, and lightweight web applications.

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
  <script src="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui.min.js"></script>

  <!-- Icons — any library works. Lucide shown here. -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <script>lucide.createIcons();</script>
</body>
</html>
```

> **Pin a version for production:** replace `@latest` with a tag like `@2.0.11` for stability.

### Download

Download the [latest release](https://github.com/adrianspeyer/speyer-ui/releases) and add the files to your project:

```html
<!-- Styles in <head> -->
<link rel="stylesheet" href="sui-tokens.css">
<link rel="stylesheet" href="sui-components.css">

<!-- Scripts before </body> -->
<script src="sui.js"></script>

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
| `sui-tokens.css` | Design tokens (colours, spacing, typography, shadows) | ~5KB | Yes |
| `sui-components.css` | Component classes built from tokens | ~38KB | Yes |
| `sui.js` | Interactive behaviours (modals, toasts, dropdowns) | ~12KB | **No** |

**Core:** under 55KB (tokens + components + JS). Zero dependencies.

CSS handles all appearance. JS adds interactivity for modals, toasts, dropdowns, tooltips, and accordion. Components render correctly without JS — they just won't open/close/animate.

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

### Dependencies

SUI has **no required dependencies** — no icon library, no JavaScript framework, no build step. Add whichever icon library you prefer to your HTML.

---

## Accessibility Evidence

Here is a quick review of SUI vs WCAG 2.1 AA compliance.

### Contrast Ratios (Light Mode)

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
| `--sui-text-muted` (#5C6C80) | `--sui-bg-elevated` (#F1F5F9) | 4.90:1 | AA |
| `--sui-text-muted` (#8494A9) | `--sui-bg-card` (#161E2C) | 5.41:1 | AA |
| `--sui-text-muted` (#8494A9) | `--sui-bg-elevated` (#1E293B) | 4.73:1 | AA |
| `--sui-text-muted` (#8494A9) | `--sui-bg-primary` (#0B0F1A) | 6.19:1 | AA |
| `--sui-blue-strong` (#1D4ED8) | `--sui-blue-soft` (#DBEAFE) | 6.68:1 | AAA |
| White | `--sui-blue-primary` (#2563EB) | 5.2:1 | AA |
| White | `--sui-success-strong` (#15803D) | 5.0:1 | AA |
| White | `--sui-error-strong` (#B91C1C) | 6.5:1 | AA |

### Contrast Ratios (Dark Mode)

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

### Known Limitations

All previously documented contrast limitations have been resolved in v2.0.11. The light blue-primary token was shifted from #3B82F6 (3.68:1) to #2563EB (5.17:1). Dark mode buttons use hardcoded backgrounds that pass independently of token values. Badge-error and input-error-msg use dark overrides to switch from `error-strong` to `error` base.

Tested with Chrome Lighthouse (Accessibility audit) — 100/100 in both light and dark mode. If you find a contrast issue we missed, open an issue.

### Keyboard Behavior Per Component

| Component | Tab | Enter/Space | Escape | Arrow Keys |
|-----------|-----|-------------|--------|------------|
| Buttons | Focus | Activate | — | — |
| Tabs | Focus | Activate | — | Left/Right switch |
| Accordion | Focus trigger | Toggle panel | — | — |
| Modal | Trapped inside | Activate buttons | Close | — |
| Dropdown | Focus trigger | Open/select item | Close | Up/Down navigate |
| Tooltip | Focus trigger shows | — | — | — |
| Pagination | Focus each button | Navigate | — | — |

### Color-Blind Design

SUI uses red and green hues for success/error states. These hues are **never the only signal.** Every status pattern includes:

- A descriptive **text label** (e.g., "Active", "Failed")
- A distinguishing **icon** (✔, ✕, ⚠, ℹ)
- Sufficient **contrast** on its background

This means a user who cannot distinguish red from green will still see "✔ Active" and "✕ Failed" with clear icon differentiation and readable text.

### Reduced Motion

When `prefers-reduced-motion: reduce` is set:
- All CSS transitions are set to 0ms
- All CSS animations are set to 0ms
- Scroll behavior is set to `auto`
- Progress bar indeterminate animation stops

### High Contrast

When `prefers-contrast: more` is set at the OS level:
- Muted and secondary text colours darken for increased readability
- Borders on cards, inputs, and outline buttons thicken to 2px
- Focus ring outlines thicken to 4px
- Focus ring colours intensify
- Works in both light and dark modes

---

## Display Modes

```html
<html>                       <!-- Light mode (default) -->
<html data-theme="dark">     <!-- Dark mode -->
<!-- Omit attribute for auto (follows OS preference) -->
```

Toggle with JavaScript: `SUI.theme.toggle()` or `SUI.theme.set('dark')`.

---

## Color System

All colors are CSS custom properties with the `--sui-` prefix. Every color has light and dark mode values defined in three blocks: `:root`, `[data-theme="dark"]`, and `@media (prefers-color-scheme: dark)`.

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

### Backgrounds, Text, Brand, Elevation

Full token reference with hex values is in `sui-tokens.css` (readable source) and on the [live demo](https://adrianspeyer.github.io/speyer-ui/) Designers tab.

### Elevation Philosophy

Borders are the default card separation. Shadows are opt-in via `sui-card-shadow`. This is a deliberate aesthetic choice — flat interfaces are more scannable, and shadows are reserved for layered elements (dropdowns, modals, tooltips) where depth communicates function.

| Token | Usage |
|-------|-------|
| `--sui-shadow-sm` | Dropdowns, subtle depth |
| `--sui-shadow-md` | Cards (opt-in), popovers |
| `--sui-shadow-lg` | Modals, dialogs |

---

## Typography

**Font:** [Inter](https://rsms.me/inter/) via Google Fonts. Fallback: `system-ui, -apple-system, sans-serif`.

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 32px | 700 | 1.3 |
| H2 | 24px | 600 | 1.3 |
| H3 | 20px | 600 | 1.3 |
| Body | 16px | 400 | 1.5 |
| Small | 14px | 400 | 1.5 |
| Meta | 12px | 400 | 1.5 |

## Layout & Spacing

8px grid: `--sui-space-1` (4px) through `--sui-space-6` (48px). Min touch target: 44px. Max content width: 1280px. Mobile-first breakpoints at 480px, 721px, 769px, 1025px.

---

## Components

SUI provides 25+ components. All built from design tokens. Code examples for every component are on the [live demo](https://adrianspeyer.github.io/speyer-ui/) Components tab.

### Buttons

`sui-btn` · `sui-btn-primary` · `sui-btn-secondary` · `sui-btn-ghost` · `sui-btn-danger` · `sui-btn-success` · `sui-btn-sm` · `sui-btn-full`

### Cards

`sui-card` · `sui-card-lg` · `sui-card-flush` · `sui-card-muted` · `sui-card-shadow` · `sui-card-header` · `sui-card-body`

### Inputs

`sui-input` · `sui-input-group` · `sui-input-label` · `sui-input-hint` · `sui-input-error` · `sui-input-error-msg` · `sui-select` · `sui-checkbox-label` · `sui-radio` · `sui-radio-label`

### Toggle / Switch

`sui-toggle-label` · `sui-toggle` · `sui-toggle-track`

### Badges (Complete SaaS Set)

Status: `sui-badge-success` · `sui-badge-warning` · `sui-badge-error` · `sui-badge-info` · `sui-badge-neutral`

Feature: `sui-badge-new` · `sui-badge-beta` · `sui-badge-pro`

Modifiers: `sui-badge-outline` · `sui-badge-sm` · `sui-badge-dot` · `sui-badge-count` · `sui-badge-overlay`

### Shields (Two-Segment Badges)

Shields.io-style two-tone badges — no external dependency. Dark mode aware.

`sui-shield` · `sui-shield-success` · `sui-shield-error` · `sui-shield-warning` · `sui-shield-info` · `sui-shield-neutral`

```html
<span class="sui-shield">
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

### Avatars (Initials-First)

`sui-avatar` · `sui-avatar-sm` (32px) · `sui-avatar-md` (40px) · `sui-avatar-lg` (56px) · `sui-avatar-group`

Initials by default with deterministic colours from `sui.js`. Optional photo support — add an `<img>` inside the avatar and initials show as automatic fallback when the image fails:

```html
<div class="sui-avatar sui-avatar-md">
  <img src="photo.jpg" alt="Jane Smith" onerror="this.hidden=true">
  JS
</div>
```

### Progress Bars

`sui-progress` · `sui-progress-bar` · Status variants · `sui-progress-lg` · `sui-progress-indeterminate`

### Tables

`sui-table-wrap` · `sui-table` · `sui-table-striped` · `sui-table-hover`

Responsive: stacks to card layout on mobile via `data-label` attributes on `<td>`.

### Navigation

Breadcrumb: `sui-breadcrumb` · Pagination: `sui-pagination` · `sui-page-btn` · Nav links: `sui-nav` · `sui-nav-link` · `sui-nav-toggle`

### Interactive (requires `sui.js`)

Accordion · Dropdown · Modal (native `<dialog>` recommended, legacy overlay supported) · Toast notifications · Tooltip

### Structural

Dividers · Empty state · Skeleton loaders · Stat cards · Responsive embed (`sui-embed`)

### Prose & Typography

Lists (`ul`, `ol`) · Blockquote · Figure/figcaption · Inline `code` · `kbd` keyboard input · Responsive images (`img { max-width: 100% }`)

### Layout & Utilities

Grid (`sui-grid-2/3/4/sidebar`) · Spacing (`sui-mt-*`, `sui-gap-*`) · Flex (`sui-flex`, `sui-flex-col`, `sui-flex-between`) · Text (`sui-text-muted`, `sui-text-bold`, `sui-text-cap`) · Radius (`sui-round-none`, `sui-round-sm`, `sui-round-md`, `sui-round-lg`, `sui-round-full`) · Visibility (`sui-hidden`, `sui-visually-hidden`)

### Radius Utilities

Override the border-radius on any component. Compose with badges, buttons, cards, inputs — anything.

| Class | Radius | Use case |
|-------|--------|----------|
| `sui-round-none` | 0 | Fully square corners |
| `sui-round-sm` | 8px | Subtle rounding |
| `sui-round-md` | 12px | Moderate rounding |
| `sui-round-lg` | 16px | Pronounced rounding |
| `sui-round-full` | 9999px | Full pill shape |

```html
<span class="sui-badge sui-badge-neutral sui-round-sm">SUI v2.0.11</span>
<button class="sui-btn sui-btn-primary sui-round-none">Submit</button>
<div class="sui-card sui-round-sm">Sharper card</div>
```

### Visibility Utilities

Two-tier visibility system for toggling content.

| Class | Effect | Accessibility tree | Use case |
|-------|--------|--------------------|----------|
| `sui-hidden` | `display: none !important` | Removed | Toggling panels, tabs, conditional content |
| `sui-visually-hidden` | Clipped to 1px | Preserved | Skip links, icon-only button labels |

```html
<!-- Completely hidden (layout + screen readers) -->
<div class="sui-hidden">This panel is toggled off.</div>

<!-- Visually hidden (screen readers still see it) -->
<button>
  <svg aria-hidden="true"><!-- icon --></svg>
  <span class="sui-visually-hidden">Close menu</span>
</button>
```

### High Contrast Support

SUI responds to `prefers-contrast: more` — when enabled at the OS level, borders thicken, muted text darkens, and focus rings strengthen. No configuration needed.

---

## Signature Patterns

These patterns demonstrate how SUI components combine for common SaaS views.

### Status Table (Admin Dashboard)

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

### Settings Form

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

### Empty State + Call to Action

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
| `data-sui-copy="#id"` | Copies element text on click |
| `data-sui-dropdown-trigger` | Opens parent dropdown on click |

### API

```javascript
SUI.theme.set('dark')                          // 'light', 'dark', 'auto'
SUI.theme.toggle()                             // Cycles modes
SUI.modal.open('#id')                          // Native <dialog> or legacy overlay
SUI.modal.close('#id')                         // Works with both patterns
SUI.toast.success('Saved!', 'Details here')    // Auto-dismiss, stackable
SUI.toast.error('Failed', 'Try again')
SUI.dropdown.toggle(element)                   // Click toggle, outside-click close
SUI.copy.text('string')                        // Clipboard with fallback
SUI.avatar.colorFor('AS')                      // Deterministic color from initials
```

---

## CDN Usage

jsDelivr serves any tagged GitHub release automatically. No signup required.

```html
<!-- Production (minified, always latest) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-tokens.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-components.min.css">
<script src="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui.min.js"></script>

<!-- Development (readable) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/sui-tokens.css">
```

`@latest` always pulls the newest release. To pin a specific version, replace with a tag like `@2.0.11`.

---

## AI Integration

No AI has SUI in its training data. These prompts teach it. Paste into ChatGPT, Claude, Copilot, Cursor, or any assistant.

Three prompt tiers are on the [live demo](https://adrianspeyer.github.io/speyer-ui/) with copy buttons:

- **Quick Prompt** — comprehensive, recommended for most tasks
- **Minimal Prompt** — fast, for simple requests
- **System Prompt** — for Cursor rules or custom instructions

All prompts instruct the AI to fetch the actual CSS files, ensuring it uses the latest token values. If an AI encounters a pattern SUI doesn't cover, the prompt tells it to flag it.

---

## Repo Structure

```
speyer-ui/
├── dist/                    ← Minified (CDN/production)
│   ├── sui-tokens.min.css
│   ├── sui-components.min.css
│   └── sui.min.js
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

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). If you're using SUI with an AI tool and notice a missing component, [open an issue](https://github.com/adrianspeyer/speyer-ui/issues) or submit a pull request. We want this system to be comprehensive enough that any AI can generate compliant UI without extra instructions — real-world usage helps us find the gaps.

---

## License

[MIT](LICENSE) — free for personal and commercial use.

Created by [Adrian Speyer](https://github.com/adrianspeyer). Made in Canada 🇨🇦
