# Speyer UI System (SUI) — AI Rules

You are working with the **Speyer UI System (SUI)**, a lightweight, accessible CSS design system for SaaS applications.

**Repo:** https://github.com/adrianspeyer/speyer-ui
**CDN:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-tokens.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-components.min.css">
<script src="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui.min.js" defer></script>
```

---

## Design Philosophy

SUI is the **shell** — containers, chrome, interactive primitives, typography, and tokens. What goes *inside* (data visualisation, icons, charts, drag-and-drop) is the developer's choice. SUI makes it look consistent and accessible.

**Core constraints:**
- Mobile-first (375px baseline, enhance upward)
- Min touch target: 44px
- WCAG 2.1 AA contrast
- Status never communicated by colour alone — always pair with icon + text
- Components work without JavaScript. CSS handles appearance, JS adds interactivity
- Script tags use `defer`
- Borders are the default card separation. Shadows are opt-in (`sui-card-shadow`)

**SUI does NOT ship:** icons, charts, data visualisation, drag-and-drop, date pickers, or application logic. These are bring-your-own. SUI provides the visual tokens to keep them consistent.

---

## The `sui-` Namespace — Critical

**Never invent `sui-*` classes that don't exist in this document.**

The `sui-` prefix is a namespace contract. If you create `sui-calendar` today and SUI ships a real `sui-calendar` tomorrow with different markup, every site using your code breaks on the next CDN update.

**When SUI doesn't have what you need:**
1. **Check the recipes list** — the pattern may already be documented
2. **Compose from existing SUI classes** — most patterns are 5–15 lines of custom CSS on top of SUI primitives
3. **Use your own class names** for custom CSS (e.g. `app-calendar`, `my-sidebar`)
4. **Use SUI tokens** (`var(--sui-radius-lg)`, `var(--sui-border)`, etc.) in your custom CSS for visual consistency
5. **Tell the human** — suggest they open an issue or contribute if SUI is missing a common pattern

**Never silently invent a fake `sui-*` class.** Warn the human: *"SUI doesn't have sui-calendar. I'll build this with custom CSS using SUI tokens. If this comes up often, consider proposing it as a component."*

---

## Complete Component List

### Layout & Structure
- `sui-topbar` — Sticky top bar (grid layout, default)
- `sui-topbar-aligned` — Modifier: flex layout, brand left, nav+actions right
- `sui-topbar-inner` — Max-width container inside topbar
- `sui-brand`, `sui-brand-mark`, `sui-brand-title`, `sui-brand-name` — Brand area
- `sui-nav` — Tab navigation bar
- `sui-tab` — Individual tab button
- `sui-topbar-actions` — Right-side action area
- `sui-section`, `sui-section-head` — Content sections
- `sui-footer` — Page footer
- `sui-screen` — Full-viewport app shell (100dvh)
- `sui-screen-header`, `sui-screen-body`, `sui-screen-footer` — Screen regions
- `sui-screen-solo` — Single-screen mode
- `sui-container` — Opt-in container queries

### Buttons
- `sui-btn` — Base button (44px, 12px radius)
- `sui-btn-primary` — Primary action (blue)
- `sui-btn-secondary` — Secondary action (grey fill)
- `sui-btn-ghost` — Ghost (transparent, border)
- `sui-btn-dashed` — Dashed border, muted — for de-emphasised actions ("Skip", "Add item")
- `sui-btn-danger` — Destructive action (red)
- `sui-btn-success` — Positive action (green)
- `sui-btn-outline` — Outline variant
- `sui-btn-sm` — Small (36px)
- `sui-btn-full` — Full width

### Cards
- `sui-card` — Base card (border, radius, padding)
- `sui-card-lg` — Large padding
- `sui-card-muted` — Muted background
- `sui-card-shadow` — Shadow elevation (opt-in)
- `sui-card-flush` — No padding
- `sui-card-interactive` — Clickable (hover shadow + focus ring)

### Badges
- `sui-badge` + variants: `-success`, `-warning`, `-error`, `-info`, `-neutral`, `-new`, `-beta`, `-pro`
- Modifiers: `sui-badge-outline`, `sui-badge-sm`, `sui-badge-dot`, `sui-badge-count`
- `sui-badge-count` requires `aria-label` (e.g. "3 notifications")

### Forms & Inputs
- `sui-input`, `sui-input-group`, `sui-input-label`, `sui-input-error`, `sui-input-error-msg`
- `sui-select` — Select dropdown
- `sui-checkbox-label` — Checkbox
- `sui-toggle`, `sui-toggle-label`, `sui-toggle-track` — Toggle switch

### Alerts
- `sui-alert` + variants: `-success`, `-warning`, `-error`, `-info`
- **Always include icon + text. Never colour alone.**

### Avatars
- `sui-avatar` + sizes: `-sm`, `-md`, `-lg`, `-xl`
- Initials-first with optional `<img>` + `onerror="this.remove()"`

### Tables
- `sui-table-wrap` > `sui-table` — Use `data-label` on `<td>` for mobile stacking
- `sui-table-interactive` — Clickable rows (add `tabindex="0"`, `role="link"`)
- `sui-table-sortable` — Sort indicators: `th[data-sort="asc|desc|none"]`

### Progress
- `sui-progress` + `sui-progress-bar` + status variants
- `sui-progress-labeled` + `sui-progress-text` — Text inside bar
- `sui-progress-indeterminate` — Animated
- **Always pair with label text — colour alone is not sufficient**

### Navigation
- `sui-breadcrumb`, `sui-pagination`, `sui-page-btn`

### Stepper
- `sui-stepper` (`<ol>`) + `sui-step` (`<li>`) + `sui-step-indicator`
- States: `.is-complete` (checkmark, green), `.is-active` (blue ring, `aria-current="step"`), `.is-pending` (hollow)
- CSS-only. Horizontal desktop, vertical mobile
```html
<ol class="sui-stepper">
  <li class="sui-step is-complete"><span class="sui-step-indicator">✓</span><span>Account</span></li>
  <li class="sui-step is-active" aria-current="step"><span class="sui-step-indicator">2</span><span>Details</span></li>
  <li class="sui-step is-pending"><span class="sui-step-indicator">3</span><span>Review</span></li>
</ol>
```

### Interactive (require sui.js)
- `sui-accordion` — Collapsible sections
- `sui-dropdown` — Dropdown menu (`aria-haspopup`, `aria-expanded`)
- `sui-dialog` — Native `<dialog>` modal (`SUI.modal.open/close`)
- `sui-sheet` — Bottom sheet (`SUI.sheet.open/close`)
- `sui-sidenav` — Responsive sidebar nav, sticky desktop, slide-in mobile (`SUI.sidenav.open/close/toggle`)
- `sui-segmented` + `sui-segment` — Segmented control (`role="radiogroup"`)
- `sui-tooltip` + `sui-tooltip-content` — Tooltip (Escape to dismiss)
- Toast — `SUI.toast.success/error/warning/info(title, message)`

### Content & Typography
- `sui-prose` (+ `-sm`/`-lg`/`-narrow`/`-wide`) — Long-form typography
- `sui-mark`, `sui-mark-current` — Search highlights
- `sui-meta` — Dot-separated metadata
- `sui-toolbar`, `sui-toolbar-btn`, `sui-toolbar-sep` — Action bar
- `sui-kpi-value`, `sui-kpi-label` — Metric display

### Other Components
- `sui-empty` + `sui-empty-icon/title/text` — Empty states
- `sui-skeleton` + `-text/-heading/-avatar/-card` — Loading
- `sui-chip` + `sui-chip-remove` — Tags (CSS only, BYOJS)
- `sui-dropzone` — File drop area (CSS only, BYOJS)
- `sui-timeline` + `sui-timeline-item/content` — Activity feed
- `sui-shield` — Two-segment badge (label + value)
- `sui-divider` — Horizontal rule

### Utilities
- `sui-flex`, `sui-flex-col`, `sui-flex-nowrap`, `sui-flex-between`, `sui-items-center`
- `sui-grid`, `sui-grid-2/3/4`, `sui-grid-auto`
- `sui-gap-1/2/3/4`, `sui-mt-1/2/3/4`, `sui-mb-1/2/3/4`
- `sui-scroll-x` — Horizontal scroll
- `sui-hidden` — `display: none !important`
- `sui-visually-hidden` — Screen reader only
- `sui-text-center/right`, `sui-text-cap`
- `sui-round-none/sm/md/lg/full` — Radius overrides

---

## Design Tokens

All colours use `--sui-*` custom properties. **Never hardcode hex in components.**

- **Backgrounds:** `--sui-bg-card`, `--sui-bg-elevated`, `--sui-bg-body`
- **Text:** `--sui-text-primary`, `--sui-text-secondary`, `--sui-text-muted`, `--sui-text-inverse`
- **Status:** `--sui-success/error/warning/info` + `-strong` + `-soft`
- **Blue:** `--sui-blue-primary`, `--sui-blue-strong`, `--sui-blue-soft`
- **Borders:** `--sui-border`
- **Spacing:** `--sui-space-1` through `--sui-space-6` (8px grid)
- **Radius:** `--sui-radius-sm/md/lg/full`
- **Brand buttons:** `--sui-btn-primary-bg`, `--sui-btn-danger-bg`, `--sui-btn-success-bg`

### Brand Colours Warning

Semantic tokens like `--sui-blue-primary` **shift between themes** (light: #2563EB, dark: #60A5FA). **Do NOT use them for logos or brand marks.** Hardcode brand colours or use a custom property: `--app-brand: #1a1a2e`.

---

## ARIA Requirements

| Component | Required ARIA |
|-----------|--------------|
| Tabs | `role="tablist"` on container, `role="tab"` on buttons, `role="tabpanel"` on panels |
| Dropdown | `aria-haspopup`, `aria-expanded`, `role="menu"`, `role="menuitem"` |
| Modal | `<dialog>` with `aria-label` or `aria-labelledby` |
| Sheet | `aria-modal="true"`, `role="dialog"`, `aria-label` |
| Segmented | `role="radiogroup"`, `role="radio"`, `aria-checked` |
| Accordion | `aria-expanded` on trigger, `hidden` on collapsed panel |
| Stepper | `<ol>`+`<li>`, `aria-current="step"` on active |
| Badge count | `aria-label` with count context |
| Table interactive | `tabindex="0"`, `role="link"` on rows |
| Skip link | `<a href="#main" class="sui-visually-hidden">Skip to main content</a>` first in `<body>` |

---

## Recipes

Check these before building custom patterns:

| Recipe | Composes From |
|--------|--------------|
| Inline Edit | `sui-input`, click-to-edit |
| Kanban Board | `sui-flex-nowrap`, `sui-scroll-x`, `sui-card` |
| Split Pane | CSS grid, `sui-card`, `sui-avatar` |
| Settings | `sui-toggle`, `sui-input`, `sui-segmented` |
| Blog Post | `sui-prose`, `sui-meta`, `sui-avatar` |
| Document Library | `sui-table`, `sui-badge`, `sui-avatar` |
| App Shell | `sui-screen`, `sui-segmented` |
| Profile Page | `sui-avatar-xl`, `sui-badge`, `sui-card` |
| Button Group | `sui-grid`, `sui-btn`, `role="radiogroup"` |
| Action Sheet | `sui-sheet`, `sui-btn-ghost`, `sui-divider` |

---

## Icons

SUI has **zero icon dependency**. Any library works (Lucide, Heroicons, Phosphor, Font Awesome, SVG). **Do NOT assume `sui-icon-*` classes exist — they don't.**
- `aria-hidden="true"` on decorative icons
- Always pair icons with text labels

---

## Canadian English

SUI's documentation uses Canadian English (colour, behaviour, organisation). This is a documentation convention — it does not apply to your application code.

---

## Common Mistakes

1. **Inventing `sui-*` classes** — Warn the human, use custom classes with SUI tokens
2. **Semantic tokens for logos** — `--sui-blue-primary` shifts between themes
3. **Colour-only status** — Always pair with icon + text
4. **Missing tab ARIA** — `role="tablist"`, `role="tab"`, `role="tabpanel"`
5. **Skipping recipes** — Check the list before building custom
6. **`!important` in components** — Only in utility classes
7. **Hardcoding hex** — Use `--sui-*` tokens
8. **Forgetting mobile** — 375px first, `data-label` on tables

---

## Contributing

If SUI is missing a common pattern, suggest the developer open an issue at https://github.com/adrianspeyer/speyer-ui. SUI grows from real usage signals. Check scope first: no icons, charts, data viz, or app logic.
