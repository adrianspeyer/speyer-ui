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

**SUI ships 538 purpose-built icons** with built-in accessibility (forced-colours, reduced-motion, 44px touch targets). Icons are optional — bring-your-own is fully supported.

**SUI does NOT ship:** charts, data visualisation, drag-and-drop, or application logic. Integration recipes exist for Flatpickr (dates), Tom Select (enhanced selects), FilePond (file upload), Quill (rich text), and Chart.js (data viz) — SUI provides token overrides, you bring the library.

---

## How to Find Things

| Need | File | How to find |
|---|---|---|
| Token values | `sui-tokens.css` | Search `/* Spacing */`, `/* Typography */`, etc. |
| Component classes | `sui-components.css` | Search `.sui-<component>` |
| JS API (canonical) | `docs/javascript-api.md` | Complete method table |
| JS API (source) | `sui.js` | Search `return {` in the IIFE |
| Recipe code | `index.html` | Search `id="recipe-"` |
| Recipe catalogue | `docs/recipes.md` | Linked list with descriptions |
| Token catalogue | `docs/design-tokens.md` | Organised by category with both theme values |
| Icon names | `sui-icons.svg` | Search `id="sui-icon-"` |
| Icon reference | `docs/icons.md` | Sizing, colours, categories, accessibility patterns |
| Icon browser | `icons.html` | Visual catalogue with search and copy |

**For recipes:** Every recipe in `index.html` has a "View code" accordion with copy/paste HTML.

**Token truth:** `sui-tokens.css` and `docs/design-tokens.md` are canonical. README is a summary only.

**Critical rule:** Never invent `sui-*` classes. If it's not in `sui-components.css`, it doesn't exist.

---

## The `sui-` Namespace — Critical

**Never invent `sui-*` classes that don't exist in this document.**

The `sui-` prefix is a namespace contract. If you create `sui-calendar` today and SUI ships a real `sui-calendar` tomorrow with different markup, every site using your code breaks on the next CDN update.

**When SUI doesn't have what you need:**
1. **Check the recipes list** — the pattern may already be documented
2. **Compose from existing SUI classes** — most patterns are 5—15 lines of custom CSS on top of SUI primitives
3. **Use your own class names** for custom CSS (e.g. `app-calendar`, `my-sidebar`)
4. **Use SUI tokens** (`var(--sui-radius-lg)`, `var(--sui-border)`, etc.) in your custom CSS for visual consistency
5. **Tell the human** — suggest they open an issue or contribute if SUI is missing a common pattern

**Never silently invent a fake `sui-*` class.** Warn the human: *"SUI doesn't have sui-calendar. I'll build this with custom CSS using SUI tokens. If this comes up often, consider proposing it as a component."*

### Extending Tokens for App-Specific Needs

When building on SUI and you need custom tokens (brand colours, app-specific spacing, etc.):
- **Use your own prefix** — `--app-*`, `--brand-*`, `--my-*`. Never extend `--sui-*`.
- **Reference SUI tokens as fallbacks** — `--app-sidebar-bg: var(--sui-bg-elevated)` keeps visual consistency.
- **Define in `:root`** — same scope as SUI tokens, both themes get the value.
- **For theme-aware custom tokens**, use the `[data-theme="dark"]` selector to provide dark variants.

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
- Multi-screen toggling: wrap screens in `<div data-sui-screens>` and add `.is-active` to the default
- `sui-container` — Opt-in container queries

### Buttons
- `sui-btn` — Base button (44px, 12px radius)
- `sui-btn-primary` — Primary action (blue fill, white text)
- `sui-btn-secondary` — Secondary action (filled slate grey, white text) — filled button for secondary emphasis
- `sui-btn-outline` — Outline variant (transparent background, blue border, blue text) — outlined button for tertiary emphasis
- `sui-btn-ghost` — Ghost (transparent, grey border)
- `sui-btn-dashed` — Dashed border, muted — for de-emphasised actions ("Skip", "Add item")
- `sui-btn-danger` — Destructive action (red fill)
- `sui-btn-success` — Positive action (green fill)
- `sui-btn-sm` — Small (36px)
- `sui-btn-full` — Full width

### Cards
- `sui-card` — Base card (border, radius, padding)
- `sui-card-lg` — Large padding
- `sui-card-muted` — Muted background
- `sui-card-shadow` — Shadow elevation (opt-in)
- `sui-card-flush` — No padding (use when card content handles its own padding, e.g. tables, tab panels, or full-bleed images inside cards)
- `sui-card-interactive` — Clickable (hover shadow + focus ring)
- `sui-card-compact` — Reduced padding (use for KPI/stat cards in dense grids)

### Badges
- `sui-badge` + variants: `-success`, `-warning`, `-error`, `-info`, `-neutral`, `-new`, `-beta`, `-pro`
- Modifiers: `sui-badge-outline`, `sui-badge-sm`, `sui-badge-dot`, `sui-badge-count`
- `sui-badge-count` requires `aria-label` (e.g. "3 notifications")

### Forms & Inputs
- `sui-input`, `sui-input-group`, `sui-input-label`, `sui-input-error`, `sui-input-error-msg`
- `sui-input-action` — Wrapper for input with embedded button (search, copy, clear, show/hide password). Place `.sui-btn` inside after `.sui-input`
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
- `sui-table-stack` — Card stacking at tablet (768px). Wider than default 520px mobile stacking
- `sui-table-sticky` — Sticky `<thead>` when scrolling long tables
- `sui-table-dense` — Compact padding. Note: may fall below 44px touch target. Do not combine with `sui-table-interactive` on touch-heavy interfaces without custom padding

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
  - Close buttons use the JS hook class `.sui-sheet-close` (style the button with `sui-btn` variants as usual).
- `sui-sidenav` — Responsive sidebar nav, sticky desktop, slide-in mobile (`SUI.sidenav.open/close/toggle/isOpen`)
  - `sui-sidenav-group-toggle` / `sui-sidenav-group-links` / `sui-sidenav-group-count` — Collapsible groups (`SUI.sidenav.collapseAll/expandAll`)
- `sui-panel` — Side panel / slide-over, slides from right. Desktop: no focus trap (parallel content). Mobile: focus trap (full-screen). Width via `--sui-panel-width`. (`SUI.panel.open/close/toggle/isOpen`)
- `sui-segmented` + `sui-segment` — Segmented control (`role="radiogroup"`)
- `sui-tooltip` + `sui-tooltip-content` — Tooltip (Escape to dismiss)
- Toast — `SUI.toast.success/error/warning/info(title, message)`

### JS API Reference (grep-verified against sui.js and dist/sui.min.js)

| Module | Public Methods |
|--------|---------------|
| SUI.theme | set(mode), toggle(), current(), resolved() |
| SUI.tabs | activate(el), destroy(navEl) |
| SUI.accordion | toggle(trigger), expandAll(container), collapseAll(container), destroy(container) |
| SUI.dropdown | open(el), close(el), toggle(el), destroy(el) |
| SUI.modal | open(sel), close(sel) |
| SUI.toast | show(opts), success(t,m), error(t,m), warning(t,m), info(t,m), dismiss(el), clearAll() |
| SUI.tooltip | show(el), hide(el), destroy(el) |
| SUI.avatar | colorFor(text), destroy(el) |
| SUI.copy | text(str), fromElement(sel) |
| SUI.sheet | open(sel), close(sel), toggle(sel) |
| SUI.segmented | select(el), destroy(container) |
| SUI.sidenav | open(sel), close(sel), toggle(sel), expandAll(nav), collapseAll(nav), isOpen(sel) |
| SUI.panel | open(sel), close(sel), toggle(sel), isOpen(sel) |

## Classes and Methods That Do NOT Exist

Do not invent or reference these — they are common AI hallucinations:

| Hallucinated name | Reality / correct approach |
|---|---|
| **Buttons** | |
| `sui-btn-link` | Not shipped. Use a native `<a>` element — SUI styles links already. |
| `sui-btn-lg` / `sui-btn-xl` / `sui-btn-xs` | Not shipped. SUI has base (44px) and `sui-btn-sm` (36px) only. |
| `sui-btn-block` | Use `sui-btn-full`. |
| `sui-btn-group` | Not shipped. Use the Button Group recipe. |
| `sui-btn-loading` | Not shipped. Use `disabled` + add a spinner icon/animation in app code. |
| `sui-btn-warning` / `sui-btn-info` | Not shipped. Filled buttons: `primary`, `secondary`, `danger`, `success`. Use `sui-btn-outline` or `sui-btn-ghost` for other intents. |
| `sui-btn-text` / `sui-btn-default` | Base `sui-btn` is the default. For text-only, use `sui-btn-ghost`. |
| `sui-btn-disabled` | Not a class. Use the `disabled` attribute or `.is-disabled`. |
| **Cards** | |
| `sui-card-content` | Use `sui-card-body`. |
| `sui-card-title` | Not shipped. Use a heading element inside `sui-card-header` or `sui-card-body`. |
| `sui-card-footer` | Not shipped. Use `sui-card-body` with flex layout, or put a border-top `<div>` at the bottom. |
| `sui-card-actions` | Not shipped. Use `sui-flex-between` inside `sui-card-header` or `sui-card-body`. |
| **Forms** | |
| `sui-form` / `sui-form-group` | Not shipped. Use `sui-input-group` for label + input + hint combos. |
| `sui-label` (for inputs) | Use `sui-input-label`. |
| `sui-textarea` | Not a class. Use `<textarea class="sui-input">`. |
| `sui-input-sm` / `sui-input-lg` | Not shipped. Inputs have one size (44px touch target). |
| **Text & typography** | |
| `sui-text-danger` | Use `sui-text-error`. Note: buttons use `-danger`, text utilities use `-error` (follows token names). |
| `sui-text-sm` / `sui-text-lg` / `sui-text-xl` | Not shipped. Use tokens directly: `font-size: var(--sui-text-small)` / `var(--sui-text-h3)`. |
| `sui-h1` / `sui-h2` / `sui-h3` | Not shipped. Use native heading elements — SUI styles them globally. |
| **Layout** | |
| `sui-layout` / `sui-main` / `sui-layout-body` | Not shipped. Use App Shell Scaffold recipe (`app-*` classes). |
| `sui-container` (for max-width wrapping) | `sui-container` is for container queries. For max-width wrapping, use `sui-wrap`. |
| `sui-sidebar` | Use `sui-sidenav`. |
| `sui-row` / `sui-col` | Not shipped. Use `sui-grid` + `sui-grid-2/3/4` or `sui-flex`. |
| `sui-header` / `sui-content` | Not shipped. Use `sui-topbar`, `sui-screen-header/body/footer`. |
| **Overlays** | |
| `sui-dialog-xl` / `sui-modal-xl` | Not shipped. Use `sui-dialog-wide` (720px). For wider, use `--sui-panel-width`. |
| `sui-dialog-sm` / `sui-modal-sm` / `sui-modal-lg` | Not shipped. Dialogs have one default size (520px) and one wide size (`sui-dialog-wide`, 720px). |
| `sui-dialog-content` / `sui-dialog-body` / `sui-dialog-header` / `sui-dialog-footer` | Use `sui-modal-body`, `sui-modal-header`, `sui-modal-footer`. The `dialog` element gets `sui-dialog`; its inner structure uses `sui-modal-*`. |
| `sui-dialog-close` | Use `sui-modal-close`. |
| `sui-popover` | Not shipped. Use the Popover recipe (light or heavy pattern). |
| **Navigation** | |
| `sui-tabs` / `sui-tab-panel` / `sui-tab-content` / `sui-tab-pane` | Use `sui-nav` + `[role="tablist"]` for the bar, `[data-view]` for panels. |
| `sui-navbar` / `sui-nav-item` | Use `sui-topbar` for the bar, `sui-tab` for items, `sui-nav-link` for link-style items. |
| **Components** | |
| `sui-tag` | Use `sui-chip` + `sui-chip-remove`. |
| `sui-spinner` / `sui-loading` | Use `sui-skeleton` (loading placeholders) or `sui-progress-indeterminate` (animated bar). |
| `sui-collapse` | Use `sui-accordion`. |
| `sui-list` / `sui-list-item` | Not shipped. Use native `<ul>` / `<ol>` — SUI styles them globally. |
| `sui-alert-body` | Use `sui-alert-content`. |
| `sui-alert-close` / `sui-alert-dismiss` | Not shipped. Alerts are static. For dismissible, add your own close button. |
| `sui-toggle-slider` | Use `sui-toggle-track`. |
| **Utilities** | |
| `sui-sr-only` | Use `sui-visually-hidden`. |
| `sui-d-none` / `sui-d-flex` / `sui-d-block` | Not shipped. Use `sui-hidden` or `sui-flex`. For `display: block`, use plain CSS. |
| `sui-w-full` / `sui-w-100` / `sui-h-full` | Not shipped. Use `width: 100%` in custom CSS. For buttons, use `sui-btn-full`. |
| `sui-shadow` / `sui-shadow-sm` / `sui-shadow-lg` | Not classes. Shadows are opt-in on cards only: `sui-card-shadow`. Use tokens `var(--sui-shadow-sm/md/lg)` in custom CSS. |
| `sui-border` / `sui-rounded` | Not classes. Use tokens `var(--sui-border)`, `var(--sui-radius-md)` in custom CSS. For radius overrides, use `sui-round-sm/md/lg/full`. |
| **Icons** | |
| `SUI.icons.*` | No JS API for icons — they're pure CSS + SVG. |
| `sui-icon-{name}` (no category) | Must include category: `sui-icon-{category}-{name}`. |
| `data-sui-icon` | No data attribute for icons — use `<svg><use href>` pattern. |
| **JS API** | |
| `SUI.utils.*` | No `utils` namespace. Modules are top-level: `SUI.copy`, `SUI.modal`, etc. |
| `SUI.modal.confirm()` / `SUI.modal.prompt()` | Not shipped. Use Confirmation Dialog recipe. |
| `SUI.toast.close()` | Not shipped. Toasts use `SUI.toast.dismiss(el)` or `SUI.toast.clearAll()`. |
| `data-sui-toast-close` | Not shipped. Toast close uses `.sui-toast-close` (internal) + `SUI.toast.dismiss()`. |
| `data-sui-modal-dismiss` | Not shipped. Use `[data-sui-modal-close]` — close ≠ dismiss. |
| `SUI.animate()` | Not shipped. SUI uses CSS transitions; use WAAPI in app code. |
| **Tokens** | |
| `--sui-font` | Use `--sui-font-primary` or `--sui-font-mono`. |
| `--sui-weight-normal` | Use `--sui-weight-regular`. |
| `--sui-text-h4` | Does not exist. Heading tokens stop at `--sui-text-h3`. |
| `--sui-bg-body` | Use `--sui-bg-primary`. Background tokens: `bg-primary`, `bg-card`, `bg-elevated`. |
| `--sui-radius` | Use `--sui-radius-sm`, `--sui-radius-md`, or `--sui-radius-lg`. |
| `--sui-text-sm` | Use `--sui-text-small`. |
| `--sui-text-lg` | Use `--sui-text-h3` (20px) or `--sui-text-h2` (24px). |
| `--sui-space-7`/`--sui-space-8` | Do not exist. Spacing scale is 1–6 (4px–48px). |
| `sui-sidenav-group` (class) | Not a CSS class. Use `data-sui-sidenav-group` attribute on the wrapper. CSS classes are `sui-sidenav-group-toggle`, `-links`, `-count`. |

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
- `sui-text-center`, `sui-text-right`, `sui-text-cap`
- `sui-text-truncate` — Single-line ellipsis (overflow hidden, text-overflow ellipsis, nowrap)
- `sui-round-none/sm/md/lg/full` — Radius overrides

---

## Design Tokens

All colours use `--sui-*` custom properties. **Never hardcode hex in components.**

- **Backgrounds:** `--sui-bg-card`, `--sui-bg-elevated`, `--sui-bg-primary`
- **Text:** `--sui-text-primary`, `--sui-text-secondary`, `--sui-text-muted`, `--sui-text-inverse`
- **Status:** `--sui-success/error/warning/info` + `-strong` + `-soft`
- **Blue:** `--sui-blue-primary`, `--sui-blue-strong`, `--sui-blue-soft`
- **Borders:** `--sui-border`
- **Spacing:** `--sui-space-1` through `--sui-space-6` (8px grid)
- **Radius:** `--sui-radius-sm/md/lg/full`
- **Brand buttons:** `--sui-btn-primary-bg`, `--sui-btn-secondary-bg`, `--sui-btn-danger-bg`, `--sui-btn-success-bg`

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
| Panel | `aria-label` on panel, `aria-hidden` managed by JS, `aria-expanded` on trigger, `aria-label` on close button |
| Sidenav groups | `aria-expanded` + `aria-controls` on toggle, `id` on links container |
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
| Sidenav Search | `sui-input` + filter JS hiding `sui-sidenav-link` elements |
| Sidenav Context | `SUI.sidenav.collapseAll()` + expand active group |
| Panel Push Mode | CSS grid toggle resizing main content |
| Master-Detail | `sui-table-interactive` row click → `sui-panel` detail |
| Notification Centre | `sui-panel` + stacked `sui-card` + `sui-badge` |
| Floating Action Bar | `sui-card-shadow` + `sui-btn` + `sui-badge` + `position: fixed` |
| Stepper / Wizard | `sui-card` + `sui-badge` + numbered steps + JS state |
| Flatpickr Integration | SUI token overrides for Flatpickr datepicker (light/dark). You bring Flatpickr CDN |
| Chart.js Integration | SUI token helper reads `--sui-*` at runtime, passes to Chart.js config. MutationObserver for theme toggle |
| FilePond Integration | SUI token overrides for FilePond file upload (background, border, status colours). Complements `sui-dropzone` |
| Quill Integration | SUI token overrides for Quill Snow theme (toolbar, editor, picker dropdowns). CDN-first choice; TipTap/Lexical for bundler setups |
| Tom Select Integration | SUI token overrides for Tom Select (control, dropdown, tags, focus ring). Enhanced select/autocomplete/tagging |
| Search Bar | `sui-input` + `sui-btn`, flex non-wrapping. Icon or text button variant |
| Inline Selection Bar | Selection count + action buttons above content. `sui-btn`, `aria-live`, `.is-selected` rows |
| Command Palette | `<dialog>` + `sui-input` + results list + `sui-kbd` hints. ⌘K pattern, BYOJS search logic |
| Confirmation Dialog | `role="alertdialog"` + `sui-btn-danger`. No `SUI.modal.confirm()` API — build your own |
| Panel Polish | Panel header/footer/sizing patterns. CRM detail drawer variant. Recipe CSS, not modifiers |
| Popover | Light (click-outside) and heavy (focus-trap) patterns. Positioned content region |
| App Shell Scaffold | `sui-topbar` + `sui-sidenav` + scrollable main. Uses `app-*` classes, not `sui-*` |

### Common Names → SUI Solutions

| What you call it | SUI solution | Type |
|-----------------|-------------|------|
| Sidebar / Side menu | `sui-sidenav` | Component |
| Modal / Popup / Dialog | `sui-dialog` with native `<dialog>` | Component |
| Drawer / Slide-over | `sui-panel` (right) or `sui-sheet` (bottom) | Component |
| Toast / Snackbar | `SUI.toast.success/error/warning/info()` | JS API |
| Tabs / Tab bar | `sui-nav` + `[role="tablist"]` + `data-tab`/`data-view` — `SUI.tabs.activate(el)` for programmatic switching | Component |
| Wizard / Steps | `sui-stepper` + `sui-step` + `sui-step-indicator` | Component |
| Activity feed / Log | `sui-timeline` + `sui-timeline-item` | Component |
| Search highlight | `sui-mark` + `sui-mark-current` | Component |
| Action bar | `sui-toolbar` + `sui-toolbar-btn` + `sui-toolbar-sep` | Component |
| Tag / Chip | `sui-chip` + `sui-chip-remove` | Component |
| Segmented toggle | `sui-segmented` + `sui-segment` | Component |
| Empty state | `sui-empty` + `sui-empty-icon/title/text` | Component |
| File upload area | `sui-dropzone` | Component |
| App shell / SPA layout | `sui-screen` + `sui-screen-header/body/footer` | Component |
| Date picker / Calendar | Flatpickr integration recipe — SUI token overrides, not a native component | Recipe |
| Kanban / Board | `sui-flex-nowrap` + `sui-scroll-x` + `sui-card` | Recipe |
| Master-Detail / Inbox | `sui-table-interactive` row click → `sui-panel` detail | Recipe |
| Push layout | CSS grid toggle resizing main content | Recipe |
| Notification panel | `sui-panel` + stacked `sui-card` + `sui-badge` | Recipe |
| Inline edit | `sui-input` + click-to-edit | Recipe |
| Floating action bar | `sui-card-shadow` + `sui-btn` + fixed positioning | Recipe |
| Chart / Graph / Data viz | Chart.js integration recipe — SUI token helper for colours/fonts | Recipe |
| File upload / Drag-drop | FilePond integration recipe — SUI token overrides. Also see `sui-dropzone` for CSS-only | Recipe |
| Rich text / WYSIWYG editor | Quill integration recipe — SUI token overrides (CDN-first). TipTap/Lexical for bundlers | Recipe |
| Enhanced select / Autocomplete / Tagging | Tom Select integration recipe — SUI token overrides for control + dropdown | Recipe |

---

## Icons

SUI ships **538 purpose-built SVG icons** (506 unique + 32 aliases, 29 categories). Use the `<svg><use href>` pattern:
```html
<svg class="sui-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#sui-icon-act-search"/></svg>
```
- `aria-hidden="true"` on all decorative SVG icons — label the parent element instead
- Always pair icons with text labels
- Icon CSS classes: `.sui-icon`, `.sui-icon-xs/sm/md/lg/xl/2xl/3xl`, `.sui-icon-btn`, `.sui-icon-primary/success/warning/error/info/muted`, `.sui-icon-spin`
- BYOI still supported — skip `sui-icons.css` and sprite loader to use any icon library

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
