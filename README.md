# Speyer UI System (SUI)

A lightweight design system built around four constraints:

1. **Accessibility is mandatory, not optional.** WCAG 2.1 AA is the baseline, tested and documented.
2. **No build tools required.** Three files, drop them in, it works.
3. **Components work with or without JavaScript.** CSS handles appearance, JS adds behavior.
4. **Status is never communicated by color alone.** Every badge, alert, and indicator requires icon + text.

45KB minified. Zero required dependencies. Works with any framework or none.

**[Live Demo](https://adrianspeyer.github.io/speyer-ui/)** · [GitHub](https://github.com/adrianspeyer/speyer-ui)

Built for internal tools, SaaS dashboards, and lightweight web applications.

---

## Why This Exists

I'm color blind. When I started using AI coding assistants to build web applications, every tool produced interfaces that relied on color to communicate status — green for success, red for error, with no icons, no labels, nothing else. I'd ship a dashboard and realize I couldn't tell which rows were active and which had failed.

I asked the AI to "make it accessible." It added some ARIA labels and moved on. The colors stayed. The pattern stayed.

So I built SUI — a system where the components themselves won't let you skip accessibility. You can't create a success badge without an icon and a label. You can't build an alert without a text description. The constraint is structural, not aspirational.

I use this for my own work. I'm sharing it because if you're color blind, or you build for people who are, or you just think UI should work for everyone without a 200MB `node_modules` folder — this might be useful to you too.

— [Adrian Speyer](https://github.com/adrianspeyer)

---

## Quick Start

### CDN (Fastest)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@2.0.1/dist/sui-tokens.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@2.0.1/dist/sui-components.min.css">
<script src="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@2.0.1/dist/sui.min.js"></script>
```

### Download

Download the [latest release](https://github.com/adrianspeyer/speyer-ui/releases) and add the files to your project:

```html
<link rel="stylesheet" href="sui-tokens.css">
<link rel="stylesheet" href="sui-components.css">
<script src="sui.js"></script>
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
| `sui-tokens.css` | Design tokens (colors, spacing, typography, shadows) | 4KB | Yes |
| `sui-components.css` | Component classes built from tokens | 32KB | Yes |
| `sui.js` | Interactive behaviors (modals, toasts, dropdowns) | 9KB | **No** |

Total: 45KB with JS, 36KB without.

CSS handles all appearance. JS adds interactivity for modals, toasts, dropdowns, tooltips, and accordion. Components render correctly without JS — they just won't open/close/animate.

### Dependencies

SUI has **no required dependencies.**

Icon examples in documentation use [Lucide](https://lucide.dev/) (`data-lucide` attributes). Lucide is recommended but not required — any icon library works, or plain text/emoji/SVG. If `sui.js` detects Lucide, it refreshes icons after dynamic updates. If Lucide isn't present, everything still works.

The SUI JavaScript toolkit checks for `typeof lucide !== 'undefined'` in exactly two places — both are convenience re-renders, not functional requirements.

---

## Accessibility Evidence

SUI claims WCAG 2.1 AA compliance. Here are the receipts.

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
| White | `--sui-blue-primary` (#3B82F6) | 3.7:1 | AA-lg |
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
| `--sui-error-strong` (#EF4444) | `--sui-error-soft` (#450A0A) | 4.3:1 | AA-lg |
| `--sui-info-strong` (#22D3EE) | `--sui-info-soft` (#083344) | 7.4:1 | AAA |

### Known Limitations

| Pair | Ratio | Status | Why |
|------|-------|--------|-----|
| `--sui-text-muted` on card | 2.6:1 (light) / 2.2:1 (dark) | Below AA | Intentional. Muted text is for non-essential metadata (timestamps, placeholder, helper text). Essential content must never use muted. |
| White on `--sui-blue-primary` | 3.7:1 | AA for large text | Primary buttons use 14px/600 weight. At this size the ratio passes AA for UI components per common industry practice but falls short of AA normal text (4.5:1). |
| `--sui-error-strong` on `--sui-error-soft` (dark) | 4.3:1 | AA for large text | Badge/alert text at 12px falls slightly below AA normal text in dark mode. The icon + text pattern provides the redundant signal. |

These limitations are documented, not hidden. SUI achieves AA for body text, headings, and status text in both modes. Buttons and muted text have noted exceptions.

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

`sui-input` · `sui-input-group` · `sui-input-label` · `sui-input-hint` · `sui-input-error` · `sui-input-error-msg` · `sui-select` · `sui-checkbox-label`

### Toggle / Switch

`sui-toggle-label` · `sui-toggle` · `sui-toggle-track`

### Badges (Complete SaaS Set)

Status: `sui-badge-success` · `sui-badge-warning` · `sui-badge-error` · `sui-badge-info` · `sui-badge-neutral`

Feature: `sui-badge-new` · `sui-badge-beta` · `sui-badge-pro`

Modifiers: `sui-badge-outline` · `sui-badge-sm` · `sui-badge-dot` · `sui-badge-count`

### Alerts

`sui-alert` · `sui-alert-success` · `sui-alert-warning` · `sui-alert-error` · `sui-alert-info`

### Avatars (Initials Only)

`sui-avatar` · `sui-avatar-sm` (32px) · `sui-avatar-md` (40px) · `sui-avatar-lg` (56px) · `sui-avatar-group`

No images by design. Deterministic colors from initials via `sui.js`. Privacy-friendly, no broken states, no CDN dependency.

### Progress Bars

`sui-progress` · `sui-progress-bar` · Status variants · `sui-progress-lg` · `sui-progress-indeterminate`

### Tables

`sui-table-wrap` · `sui-table` · `sui-table-striped` · `sui-table-hover`

Responsive: stacks to card layout on mobile via `data-label` attributes on `<td>`.

### Navigation

Breadcrumb: `sui-breadcrumb` · Pagination: `sui-pagination` · `sui-page-btn`

### Interactive (requires `sui.js`)

Accordion · Dropdown · Modal/Dialog · Toast notifications · Tooltip

### Structural

Dividers · Empty state · Skeleton loaders · Stat cards

### Layout & Utilities

Grid (`sui-grid-2/3/4/sidebar`) · Spacing (`sui-mt-*`, `sui-gap-*`) · Flex (`sui-flex`, `sui-flex-col`, `sui-flex-between`) · Text (`sui-text-muted`, `sui-text-bold`, `sui-text-cap`)

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
SUI.modal.open('#id')                          // Focus trap, Escape, scroll lock
SUI.modal.close('#id')
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
<!-- Production (minified) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@2.0.1/dist/sui-tokens.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@2.0.1/dist/sui-components.min.css">
<script src="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@2.0.1/dist/sui.min.js"></script>

<!-- Development (readable) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@2.0.1/sui-tokens.css">
```

Replace `@2.0.0` with any version tag. Use exact versions in production, not `@main`.

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

## Creating a Release

```bash
# Update version in: package.json, sui-tokens.css, sui-components.css, sui.js, index.html
npm run build              # Regenerate /dist
git add -A
git commit -m "Release vX.Y.Z"
git tag vX.Y.Z
git push origin main --tags
```

Then create a [GitHub Release](https://github.com/adrianspeyer/speyer-ui/releases) from the tag. jsDelivr picks it up automatically within minutes.

---

## Testing Checklist

- [ ] Light mode contrast meets documented levels
- [ ] Dark mode contrast meets documented levels
- [ ] Color blindness simulation tested (Chrome DevTools → Rendering)
- [ ] All status indicators include text + icon
- [ ] Mobile layout verified (320px minimum)
- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus states visible
- [ ] `prefers-reduced-motion` respected
- [ ] Touch targets at least 44px

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). If you're using SUI with an AI tool and notice a missing component, [open an issue](https://github.com/adrianspeyer/speyer-ui/issues) or submit a pull request. We want this system to be comprehensive enough that any AI can generate compliant UI without extra instructions — real-world usage helps us find the gaps.

---

## License

[MIT](LICENSE) — free for personal and commercial use.

Created by [Adrian Speyer](https://github.com/adrianspeyer). Made in Canada 🇨🇦
