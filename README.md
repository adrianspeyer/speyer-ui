# 🎨 Speyer UI System (SUI)

**The design system that treats accessibility as architecture, not afterthought.**

SUI is a lightweight, zero-dependency UI system for people who believe interfaces should work for everyone — including the 300 million people with color vision deficiency, the billions on mobile devices, and the developers who shouldn't need a 200MB `node_modules` folder to make a button look right.

Three files. 45KB minified. No build step required.

**[Live Demo & Docs](https://adrianspeyer.github.io/speyer-ui/)** · **[GitHub](https://github.com/adrianspeyer/speyer-ui)** · Created by [Adrian Speyer](https://github.com/adrianspeyer)

Made in Canada with love 🇨🇦

---

## Why SUI Exists

Most design systems bolt accessibility on as a checklist item at the end. SUI builds it into the architecture from the start.

**Every status badge, alert, and indicator in SUI structurally requires an icon and text label.** You can't use a success badge without a checkmark and a word. You can't create an error alert without an icon and a description. This isn't a guideline you might forget — it's how the components are built.

We made this choice because:

- **8% of men have red-green color deficiency.** A green dot that means "active" is invisible to them unless it also says "Active."
- **Accessibility isn't an edge case.** It's 1 in 12 men. It's everyone using a screen in direct sunlight. It's the person who's tired and can't tell your muted gray from your slightly less muted gray.
- **Good accessibility is good design.** When you're forced to pair icons with labels and choose contrast ratios that work for everyone, the result is clearer for everyone.

SUI also rejects the complexity tax that most design systems impose:

| What others require | What SUI requires |
|--------------------|--------------------|
| npm install + build pipeline | Copy 3 files |
| Framework lock-in (React, Vue, etc.) | Plain HTML + CSS |
| 500KB+ bundled CSS | 36KB minified CSS |
| Configuration files | CSS custom properties |
| Documentation site to learn | AI prompt to get started |

This isn't anti-modern. It's anti-unnecessary. You can use SUI with React, Vue, Svelte, or plain HTML. The tokens are CSS custom properties that work everywhere.

---

## Quick Start

### Option 1: CDN (Fastest)

```html
<!-- Minified — production ready -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@2.0.0/dist/sui-tokens.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@2.0.0/dist/sui-components.min.css">
<script src="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@2.0.0/dist/sui.min.js"></script>
```

### Option 2: Download

Download the [latest release](https://github.com/adrianspeyer/speyer-ui/releases) and add the files to your project:

```html
<link rel="stylesheet" href="sui-tokens.css">
<link rel="stylesheet" href="sui-components.css">
<script src="sui.js"></script> <!-- Optional: adds interactive behaviors -->
```

### Option 3: AI-Assisted

Paste one of the [AI prompts](#-ai-integration) into ChatGPT, Claude, Copilot, or Cursor. The prompt tells the AI to fetch SUI and apply it to whatever you're building.

### Then just use it:

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

## Core Principles

These aren't aspirational. They're enforced by the component architecture.

| Principle | How SUI enforces it |
|-----------|-------------------|
| **Readability** | Type scale optimized for scanning. 70ch max content width. Clear visual hierarchy. |
| **Accessibility** | WCAG 2.1 AA contrast. Keyboard navigation. Focus states. `prefers-reduced-motion`. |
| **Mobile-First** | Layouts designed small-screen-first. 44px minimum touch targets. Responsive grids. |
| **Color-Blind Friendly** | Every status component requires icon + text structurally. No red/green-only patterns. |
| **Consistency** | All components built from shared tokens. Same spacing, radii, and patterns everywhere. |

---

## Architecture

| File | Purpose | Size (min) | Required? |
|------|---------|-----------|-----------|
| `sui-tokens.css` | Design tokens — colors, spacing, typography, shadows, z-index | 4KB | **Yes** |
| `sui-components.css` | 25+ component classes built from tokens | 32KB | **Yes** |
| `sui.js` | Interactive toolkit — modals, toasts, dropdowns, tooltips, accordion | 9KB | Optional |

**Total: 45KB minified.** For comparison, Tailwind CSS is 300KB+ and Bootstrap is 200KB+.

CSS handles all appearance. JavaScript adds behavior. Everything works without `sui.js` — it just won't have modals, toasts, or dropdown menus.

---

## Repo Structure

```
speyer-ui/
├── dist/                    ← Minified files (CDN/production)
│   ├── sui-tokens.min.css
│   ├── sui-components.min.css
│   └── sui.min.js
├── sui-tokens.css           ← Source (readable, commented)
├── sui-components.css       ← Source
├── sui.js                   ← Source
├── index.html               ← Live demo (GitHub Pages)
├── package.json             ← Repo identity & build scripts
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
└── LICENSE
```

**Source files** are human-readable with full comments — use these for learning and development.
**Dist files** are minified — use these for production and CDN links.

---

## Display Modes

```html
<!-- Light mode (default) -->
<html>

<!-- Dark mode -->
<html data-theme="dark">

<!-- Auto (follows OS preference) — omit the attribute -->
```

Toggle with JavaScript: `SUI.theme.toggle()` or `SUI.theme.set('dark')`.

Both modes maintain identical contrast ratios, component behavior, and accessibility standards.

---

## Color System

All colors are CSS custom properties with the `--sui-` prefix. Every color has light and dark mode values.

### Brand & Actions

| Token | Usage |
|-------|-------|
| `--sui-blue-primary` | Primary buttons, links, active states |
| `--sui-blue-hover` | Hover state |
| `--sui-blue-active` | Active/pressed state |
| `--sui-blue-soft` | Subtle backgrounds, focus rings |

### Backgrounds & Surfaces

| Token | Usage |
|-------|-------|
| `--sui-bg-primary` | Page background |
| `--sui-bg-card` | Card and panel backgrounds |
| `--sui-bg-elevated` | Elevated/nested surfaces |
| `--sui-border` | Borders and dividers |

### Text

| Token | Usage |
|-------|-------|
| `--sui-text-primary` | Headings, body text |
| `--sui-text-secondary` | Supporting text |
| `--sui-text-muted` | Placeholder, metadata |
| `--sui-text-inverse` | Text on colored backgrounds |

### Status Colors

Each status has three variants: base (icons), strong (text on soft bg), and soft (backgrounds).

| Status | Usage | Tokens |
|--------|-------|--------|
| Success | Active, passed, deployed | `--sui-success`, `-strong`, `-soft` |
| Warning | Pending, review needed | `--sui-warning`, `-strong`, `-soft` |
| Error | Failed, critical, blocked | `--sui-error`, `-strong`, `-soft` |
| Info | Stable, informational | `--sui-info`, `-strong`, `-soft` |
| Neutral | Inactive, default | `--sui-neutral`, `-strong`, `-soft` |
| Pro | Premium, paid features | `--sui-pro`, `-strong`, `-soft` |

### Elevation

| Token | Usage |
|-------|-------|
| `--sui-shadow-sm` | Dropdowns, subtle depth |
| `--sui-shadow-md` | Cards (opt-in), popovers |
| `--sui-shadow-lg` | Modals, dialogs |
| `--sui-overlay` | Modal/dialog backdrops |

**Design choice:** Borders are the default separation method. Shadows are opt-in via `sui-card-shadow`. This keeps interfaces flat and scannable.

### Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--sui-z-dropdown` | 100 | Dropdown menus |
| `--sui-z-sticky` | 200 | Sticky headers |
| `--sui-z-modal` | 300 | Modals/dialogs |
| `--sui-z-tooltip` | 400 | Tooltips, toasts |

---

## Accessibility

### The Core Rule

**Color must never be the only way information is communicated.**

Every status indicator requires:
- ✅ An icon or symbol
- ✅ A text label
- ✅ Sufficient contrast (WCAG AA)

This is enforced by component structure, not by developer discipline.

### Required Alert Patterns

| State | Icon | Example |
|-------|------|---------|
| Success | ✔ | "Saved successfully" |
| Warning | ⚠ | "Review required" |
| Error | ✕ | "Upload failed" |
| Info | ℹ | "Changes applied" |

### What SUI Prevents

- ❌ Color-only status indicators (green dot with no label)
- ❌ Red/green-only patterns
- ❌ Unlabeled colored badges
- ❌ Traffic-light patterns without text

### WCAG 2.1 AA Compliance

All SUI projects include: contrast ratios meeting AA, full keyboard navigation, screen reader compatibility, visible focus states, proper ARIA labels, and `prefers-reduced-motion` support.

---

## Typography

**Font:** [Inter](https://rsms.me/inter/) (Google Fonts) — free, open-source, optimized for screens.

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 32px | 700 | 1.3 |
| H2 | 24px | 600 | 1.3 |
| H3 | 20px | 600 | 1.3 |
| Body | 16px | 400 | 1.5 |
| Small | 14px | 400 | 1.5 |
| Meta | 12px | 400 | 1.5 |

---

## Layout & Spacing

**8px grid:** `--sui-space-1` (4px) through `--sui-space-6` (48px).

| Rule | Value |
|------|-------|
| Minimum touch target | 44px × 44px |
| Max content width | 1280px |
| Approach | Mobile-first, scale up |
| Breakpoints | 480px, 721px, 769px, 1025px |

---

## Components

SUI provides 25+ components. Full code examples are on the [live demo](https://adrianspeyer.github.io/speyer-ui/).

### Buttons

`sui-btn` · `sui-btn-primary` · `sui-btn-secondary` · `sui-btn-ghost` · `sui-btn-danger` · `sui-btn-success` · `sui-btn-sm` · `sui-btn-full`

```html
<button class="sui-btn sui-btn-primary"><i data-lucide="plus"></i>Create</button>
```

### Cards

`sui-card` · `sui-card-lg` · `sui-card-flush` · `sui-card-muted` · `sui-card-shadow` · `sui-card-header` · `sui-card-body`

### Inputs

`sui-input` · `sui-input-group` · `sui-input-label` · `sui-input-hint` · `sui-input-error` · `sui-input-error-msg` · `sui-select` · `sui-checkbox-label`

### Toggle / Switch

`sui-toggle-label` · `sui-toggle` · `sui-toggle-track`

### Badges (complete SaaS set)

Status: `sui-badge-success` · `sui-badge-warning` · `sui-badge-error` · `sui-badge-info` · `sui-badge-neutral`

Feature: `sui-badge-new` · `sui-badge-beta` · `sui-badge-pro`

Modifiers: `sui-badge-outline` · `sui-badge-sm` · `sui-badge-dot` · `sui-badge-count`

```html
<span class="sui-badge sui-badge-success"><i data-lucide="check-circle"></i>Active</span>
<span class="sui-badge sui-badge-pro"><i data-lucide="crown"></i>Pro</span>
<span class="sui-badge sui-badge-success sui-badge-dot">Online</span>
<span class="sui-badge-count">3</span>
```

### Alerts

`sui-alert` · `sui-alert-success` · `sui-alert-warning` · `sui-alert-error` · `sui-alert-info`

### Avatars (initials only — no images by design)

`sui-avatar` · `sui-avatar-sm` (32px) · `sui-avatar-md` (40px) · `sui-avatar-lg` (56px) · `sui-avatar-group`

### Progress Bars

`sui-progress` · `sui-progress-bar` · `sui-progress-success/warning/error/info` · `sui-progress-lg` · `sui-progress-indeterminate`

### Tables

`sui-table-wrap` · `sui-table` · `sui-table-striped` · `sui-table-hover`

Responsive: stacks to card layout on mobile via `data-label` attributes.

### Navigation

**Breadcrumb:** `sui-breadcrumb` · **Pagination:** `sui-pagination` · `sui-page-btn`

### Interactive (requires `sui.js`)

**Accordion:** `sui-accordion` · **Dropdown:** `sui-dropdown` · **Modal:** `sui-modal-overlay` + `sui-modal` · **Toast:** `SUI.toast.success()` · **Tooltip:** `sui-tooltip`

### Structural

**Dividers:** `sui-divider` · `sui-divider-label` · `sui-divider-v`

**Empty State:** `sui-empty` · `sui-empty-icon` · `sui-empty-title` · `sui-empty-text`

**Skeleton Loader:** `sui-skeleton` · `sui-skeleton-text` · `sui-skeleton-avatar` · `sui-skeleton-card`

**Stats:** `sui-stat` · `sui-kpi-label` · `sui-kpi-value`

### Layout & Grid

`sui-wrap` · `sui-grid` · `sui-grid-2/3/4/sidebar` · `sui-section` · `sui-section-head`

### Utilities

**Spacing:** `sui-mt-1` to `sui-mt-6` · `sui-mb-2` to `sui-mb-4` · `sui-p-3` to `sui-p-5`

**Flex:** `sui-flex` · `sui-flex-col` · `sui-flex-between` · `sui-flex-center`

**Text:** `sui-text-muted` · `sui-text-secondary` · `sui-text-bold` · `sui-text-center` · `sui-text-cap`

---

## JavaScript API (`sui.js`)

Optional. Auto-initializes via `data-sui-*` attributes.

### Auto-init Attributes

| Attribute | Effect |
|-----------|--------|
| `data-sui-theme` | Toggles light/dark/auto |
| `data-sui-modal="#id"` | Opens modal |
| `data-sui-copy="#id"` | Copies element text |
| `data-sui-dropdown-trigger` | Opens parent dropdown |

### Programmatic API

```javascript
SUI.theme.set('dark')                          // 'light', 'dark', 'auto'
SUI.theme.toggle()                             // Cycles modes
SUI.modal.open('#id')                          // Open modal
SUI.modal.close('#id')                         // Close modal
SUI.toast.success('Saved!', 'Details here')    // Show toast
SUI.toast.error('Failed', 'Try again')
SUI.dropdown.toggle(element)                   // Toggle dropdown
SUI.copy.text('string')                        // Copy to clipboard
SUI.avatar.colorFor('AS')                      // Get deterministic color
```

---

## CDN Usage (jsDelivr)

jsDelivr automatically serves any tagged GitHub release. After you create a release (see below), these URLs work immediately:

### Latest tagged release

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@2.0.0/dist/sui-tokens.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@2.0.0/dist/sui-components.min.css">
<script src="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@2.0.0/dist/sui.min.js"></script>
```

### Source files (readable, for development)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@2.0.0/sui-tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@2.0.0/sui-components.css">
<script src="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@2.0.0/sui.js"></script>
```

Replace `@2.0.0` with any version tag. Use `@main` for bleeding edge (not recommended for production).

---

## 🤖 AI Integration

SUI is designed to work with AI coding assistants. No AI has SUI in its training data — these prompts teach it.

### How It Works

1. Paste one of the prompts into your AI tool
2. The AI fetches the official SUI files from GitHub
3. It applies SUI tokens and component classes to whatever you build

Three prompt tiers are available on the [live demo](https://adrianspeyer.github.io/speyer-ui/) with copy buttons:

- **Quick Prompt** — recommended for most tasks
- **Minimal Prompt** — for fast, simple requests
- **System Prompt** — for Cursor rules or custom instructions

### Tips

- Paste the prompt before describing your task
- Say "continue using SUI" for follow-up requests
- If the AI encounters a pattern SUI doesn't cover, ask it to note what's missing — then [open an issue](https://github.com/adrianspeyer/speyer-ui/issues) so we can evaluate it for inclusion

---

## Creating a Release (For Maintainers)

When you're ready to publish a new version:

### Step 1: Update version numbers

Update the version in these files:
- `package.json` → `"version": "2.0.0"`
- `sui-tokens.css` → comment header
- `sui-components.css` → comment header
- `sui.js` → comment header
- `index.html` → version pill and footer

### Step 2: Rebuild minified files

```bash
npm run build
```

This creates fresh minified files in `/dist`.

### Step 3: Commit everything

```bash
git add -A
git commit -m "Release v2.0.0"
```

### Step 4: Create a Git tag

```bash
git tag v2.0.0
git push origin main --tags
```

### Step 5: Create a GitHub Release

1. Go to your repo → **Releases** → **Draft a new release**
2. Choose the tag you just pushed (`v2.0.0`)
3. Title: `v2.0.0`
4. Description: Copy the relevant section from CHANGELOG.md
5. Click **Publish release**

**That's it.** Within minutes, jsDelivr will serve your files at:
```
https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@2.0.0/dist/sui-tokens.min.css
```

No configuration, no signup, no deployment pipeline.

---

## Testing Checklist

- [ ] Light mode contrast meets WCAG AA
- [ ] Dark mode contrast meets WCAG AA
- [ ] Color blindness simulation tested
- [ ] All status indicators include text + icon
- [ ] Mobile layout verified (320px minimum)
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] `prefers-reduced-motion` respected
- [ ] Touch targets at least 44px

### Recommended Tools

- [Stark](https://www.getstark.co/) — Figma accessibility
- [Color Oracle](https://colororacle.org/) — Color blindness simulator
- Chrome DevTools → Rendering → Emulate vision deficiencies
- [axe DevTools](https://www.deque.com/axe/) — Accessibility auditing

---

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

**Using SUI with an AI tool and noticed something missing?** [Open an issue](https://github.com/adrianspeyer/speyer-ui/issues) or submit a pull request. We're building this system to be comprehensive enough that any AI can generate compliant UI without extra instructions — and we need real-world usage to find the gaps.

---

## License

[MIT](LICENSE) — free for personal and commercial use.

---

*Made in Canada with love 🇨🇦*
