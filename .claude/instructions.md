# Speyer UI System (SUI) â€” AI Rules

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

SUI is the **shell** â€” containers, chrome, interactive primitives, typography, and tokens. What goes *inside* (data visualisation, icons, charts, drag-and-drop) is the developer's choice. SUI makes it look consistent and accessible.

**Core constraints:**
- Mobile-first (375px baseline, enhance upward)
- Min touch target: 44px
- WCAG 2.1 AA contrast
- Status never communicated by colour alone â€” always pair with icon + text
- Components work without JavaScript. CSS handles appearance, JS adds interactivity
- Script tags use `defer`
- Borders are the default card separation. Shadows are opt-in (`sui-card-shadow`)

**SUI does NOT ship:** icons, charts, data visualisation, drag-and-drop, or application logic. These are bring-your-own. SUI provides the visual tokens to keep them consistent. Integration recipes exist for Flatpickr (dates), Tom Select (enhanced selects), FilePond (file upload), Quill (rich text), and Chart.js (data viz) â€” SUI provides token overrides, you bring the library.

---

## The `sui-` Namespace â€” Critical

**Never invent `sui-*` classes that don't exist in this document.**

The `sui-` prefix is a namespace contract. If you create `sui-calendar` today and SUI ships a real `sui-calendar` tomorrow with different markup, every site using your code breaks on the next CDN update.

**When SUI doesn't have what you need:**
1. **Check the recipes list** â€” the pattern may already be documented
2. **Compose from existing SUI classes** â€” most patterns are 5â€“15 lines of custom CSS on top of SUI primitives
3. **Use your own class names** for custom CSS (e.g. `app-calendar`, `my-sidebar`)
4. **Use SUI tokens** (`var(--sui-radius-lg)`, `var(--sui-border)`, etc.) in your custom CSS for visual consistency
5. **Tell the human** â€” suggest they open an issue or contribute if SUI is missing a common pattern

**Never silently invent a fake `sui-*` class.** Warn the human: *"SUI doesn't have sui-calendar. I'll build this with custom CSS using SUI tokens. If this comes up often, consider proposing it as a component."*

---

## Complete Component List

### Layout & Structure
- `sui-topbar` â€” Sticky top bar (grid layout, default)
- `sui-topbar-aligned` â€” Modifier: flex layout, brand left, nav+actions right
- `sui-topbar-inner` â€” Max-width container inside topbar
- `sui-brand`, `sui-brand-mark`, `sui-brand-title`, `sui-brand-name` â€” Brand area
- `sui-nav` â€” Tab navigation bar
- `sui-tab` â€” Individual tab button
- `sui-topbar-actions` â€” Right-side action area
- `sui-section`, `sui-section-head` â€” Content sections
- `sui-footer` â€” Page footer
- `sui-screen` â€” Full-viewport app shell (100dvh)
- `sui-screen-header`, `sui-screen-body`, `sui-screen-footer` â€” Screen regions
- `sui-screen-solo` â€” Single-screen mode
- `sui-container` â€” Opt-in container queries

### Buttons
- `sui-btn` â€” Base button (44px, 12px radius)
- `sui-btn-primary` â€” Primary action (blue)
- `sui-btn-secondary` â€” Secondary action (grey fill)
- `sui-btn-ghost` â€” Ghost (transparent, border)
- `sui-btn-dashed` â€” Dashed border, muted â€” for de-emphasised actions ("Skip", "Add item")
- `sui-btn-danger` â€” Destructive action (red)
- `sui-btn-success` â€” Positive action (green)
- `sui-btn-outline` â€” Outline variant
- `sui-btn-sm` â€” Small (36px)
- `sui-btn-full` â€” Full width

### Cards
- `sui-card` â€” Base card (border, radius, padding)
- `sui-card-lg` â€” Large padding
- `sui-card-muted` â€” Muted background
- `sui-card-shadow` â€” Shadow elevation (opt-in)
- `sui-card-flush` â€” No padding
- `sui-card-interactive` â€” Clickable (hover shadow + focus ring)

### Badges
- `sui-badge` + variants: `-success`, `-warning`, `-error`, `-info`, `-neutral`, `-new`, `-beta`, `-pro`
- Modifiers: `sui-badge-outline`, `sui-badge-sm`, `sui-badge-dot`, `sui-badge-count`
- `sui-badge-count` requires `aria-label` (e.g. "3 notifications")

### Forms & Inputs
- `sui-input`, `sui-input-group`, `sui-input-label`, `sui-input-error`, `sui-input-error-msg`
- `sui-input-action` â€” Wrapper for input with embedded button (search, copy, clear, show/hide password). Place `.sui-btn` inside after `.sui-input`
- `sui-select` â€” Select dropdown
- `sui-checkbox-label` â€” Checkbox
- `sui-toggle`, `sui-toggle-label`, `sui-toggle-track` â€” Toggle switch

### Alerts
- `sui-alert` + variants: `-success`, `-warning`, `-error`, `-info`
- **Always include icon + text. Never colour alone.**

### Avatars
- `sui-avatar` + sizes: `-sm`, `-md`, `-lg`, `-xl`
- Initials-first with optional `<img>` + `onerror="this.remove()"`

### Tables
- `sui-table-wrap` > `sui-table` â€” Use `data-label` on `<td>` for mobile stacking
- `sui-table-interactive` â€” Clickable rows (add `tabindex="0"`, `role="link"`)
- `sui-table-sortable` â€” Sort indicators: `th[data-sort="asc|desc|none"]`
- `sui-table-stack` â€” Card stacking at tablet (768px). Wider than default 520px mobile stacking
- `sui-table-sticky` â€” Sticky `<thead>` when scrolling long tables
- `sui-table-dense` â€” Compact padding. Note: may fall below 44px touch target. Do not combine with `sui-table-interactive` on touch-heavy interfaces without custom padding

### Progress
- `sui-progress` + `sui-progress-bar` + status variants
- `sui-progress-labeled` + `sui-progress-text` â€” Text inside bar
- `sui-progress-indeterminate` â€” Animated
- **Always pair with label text â€” colour alone is not sufficient**

### Navigation
- `sui-breadcrumb`, `sui-pagination`, `sui-page-btn`

### Stepper
- `sui-stepper` (`<ol>`) + `sui-step` (`<li>`) + `sui-step-indicator`
- States: `.is-complete` (checkmark, green), `.is-active` (blue ring, `aria-current="step"`), `.is-pending` (hollow)
- CSS-only. Horizontal desktop, vertical mobile
```html
<ol class="sui-stepper">
  <li class="sui-step is-complete"><span class="sui-step-indicator">âœ“</span><span>Account</span></li>
  <li class="sui-step is-active" aria-current="step"><span class="sui-step-indicator">2</span><span>Details</span></li>
  <li class="sui-step is-pending"><span class="sui-step-indicator">3</span><span>Review</span></li>
</ol>
```

### Interactive (require sui.js)
- `sui-accordion` â€” Collapsible sections
- `sui-dropdown` â€” Dropdown menu (`aria-haspopup`, `aria-expanded`)
- `sui-dialog` â€” Native `<dialog>` modal (`SUI.modal.open/close`)
- `sui-sheet` â€” Bottom sheet (`SUI.sheet.open/close`)
- `sui-sidenav` â€” Responsive sidebar nav, sticky desktop, slide-in mobile (`SUI.sidenav.open/close/toggle/isOpen`)
  - `sui-sidenav-group` / `sui-sidenav-group-toggle` / `sui-sidenav-group-links` â€” Collapsible groups (`SUI.sidenav.collapseAll/expandAll`)
- `sui-panel` â€” Side panel / slide-over, slides from right. Desktop: no focus trap (parallel content). Mobile: focus trap (full-screen). Width via `--sui-panel-width`. (`SUI.panel.open/close/toggle/isOpen`)
- `sui-segmented` + `sui-segment` â€” Segmented control (`role="radiogroup"`)
- `sui-tooltip` + `sui-tooltip-content` â€” Tooltip (Escape to dismiss)
- Toast â€” `SUI.toast.success/error/warning/info(title, message)`

### JS API Reference (grep-verified against sui.js and dist/sui.min.js)

| Module | Public Methods |
|--------|---------------|
| SUI.theme | set(mode), toggle(), current(), resolved() |
| SUI.tabs | activate(el) |
| SUI.accordion | toggle(trigger), expandAll(container), collapseAll(container) |
| SUI.dropdown | open(el), close(el), toggle(el) |
| SUI.modal | open(sel), close(sel) |
| SUI.toast | show(opts), success(t,m), error(t,m), warning(t,m), info(t,m), dismiss(el), clearAll() |
| SUI.tooltip | show(el), hide(el) |
| SUI.copy | text(str), fromElement(sel) |
| SUI.sheet | open(sel), close(sel), toggle(sel) |
| SUI.segmented | select(el) |
| SUI.sidenav | open(sel), close(sel), toggle(sel), expandAll(nav), collapseAll(nav), isOpen(sel) |
| SUI.panel | open(sel), close(sel), toggle(sel), isOpen(sel) |

**Classes that do NOT exist** (commonly hallucinated):
- ✘ `sui-card-content` — use `sui-card-body`
- ✘ `SUI.utils.copy()` — use `SUI.copy.text()` or `SUI.copy.fromElement()`
- ✘ `SUI.modal.confirm()` / `SUI.modal.prompt()` — do not exist. Use the Confirmation Dialog recipe
- ✘ `sui-layout` / `sui-main` / `sui-layout-body` — do not exist. Use the App Shell Scaffold recipe

### Content & Typography
- `sui-prose` (+ `-sm`/`-lg`/`-narrow`/`-wide`) â€” Long-form typography
- `sui-mark`, `sui-mark-current` â€” Search highlights
- `sui-meta` â€” Dot-separated metadata
- `sui-toolbar`, `sui-toolbar-btn`, `sui-toolbar-sep` â€” Action bar
- `sui-kpi-value`, `sui-kpi-label` â€” Metric display

### Other Components
- `sui-empty` + `sui-empty-icon/title/text` â€” Empty states
- `sui-skeleton` + `-text/-heading/-avatar/-card` â€” Loading
- `sui-chip` + `sui-chip-remove` â€” Tags (CSS only, BYOJS)
- `sui-dropzone` â€” File drop area (CSS only, BYOJS)
- `sui-timeline` + `sui-timeline-item/content` â€” Activity feed
- `sui-shield` â€” Two-segment badge (label + value)
- `sui-divider` â€” Horizontal rule

### Utilities
- `sui-flex`, `sui-flex-col`, `sui-flex-nowrap`, `sui-flex-between`, `sui-items-center`
- `sui-grid`, `sui-grid-2/3/4`, `sui-grid-auto`
- `sui-gap-1/2/3/4`, `sui-mt-1/2/3/4`, `sui-mb-1/2/3/4`
- `sui-scroll-x` â€” Horizontal scroll
- `sui-hidden` â€” `display: none !important`
- `sui-visually-hidden` â€” Screen reader only
- `sui-text-center/right`, `sui-text-cap`
- `sui-round-none/sm/md/lg/full` â€” Radius overrides

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
| Master-Detail | `sui-table-interactive` row click â†’ `sui-panel` detail |
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

### Common Names â†’ SUI Solutions

| What you call it | SUI solution | Type |
|-----------------|-------------|------|
| Sidebar / Side menu | `sui-sidenav` + `sui-sidenav-group` | Component |
| Modal / Popup / Dialog | `sui-dialog` with native `<dialog>` | Component |
| Drawer / Slide-over | `sui-panel` (right) or `sui-sheet` (bottom) | Component |
| Toast / Snackbar | `SUI.toast.success/error/warning/info()` | JS API |
| Tabs / Tab bar | `sui-nav` + `[role="tablist"]` + `data-tab`/`data-view` â€” `SUI.tabs.activate(el)` for programmatic switching | Component |
| Wizard / Steps | `sui-stepper` + `sui-step` + `sui-step-indicator` | Component |
| Activity feed / Log | `sui-timeline` + `sui-timeline-item` | Component |
| Search highlight | `sui-mark` + `sui-mark-current` | Component |
| Action bar | `sui-toolbar` + `sui-toolbar-btn` + `sui-toolbar-sep` | Component |
| Tag / Chip | `sui-chip` + `sui-chip-remove` | Component |
| Segmented toggle | `sui-segmented` + `sui-segment` | Component |
| Empty state | `sui-empty` + `sui-empty-icon/title/text` | Component |
| File upload area | `sui-dropzone` | Component |
| App shell / SPA layout | `sui-screen` + `sui-screen-header/body/footer` | Component |
| Date picker / Calendar | Flatpickr integration recipe â€” SUI token overrides, not a native component | Recipe |
| Kanban / Board | `sui-flex-nowrap` + `sui-scroll-x` + `sui-card` | Recipe |
| Master-Detail / Inbox | `sui-table-interactive` row click â†’ `sui-panel` detail | Recipe |
| Push layout | CSS grid toggle resizing main content | Recipe |
| Notification panel | `sui-panel` + stacked `sui-card` + `sui-badge` | Recipe |
| Inline edit | `sui-input` + click-to-edit | Recipe |
| Floating action bar | `sui-card-shadow` + `sui-btn` + fixed positioning | Recipe |
| Chart / Graph / Data viz | Chart.js integration recipe â€” SUI token helper for colours/fonts | Recipe |
| File upload / Drag-drop | FilePond integration recipe â€” SUI token overrides. Also see `sui-dropzone` for CSS-only | Recipe |
| Rich text / WYSIWYG editor | Quill integration recipe â€” SUI token overrides (CDN-first). TipTap/Lexical for bundlers | Recipe |
| Enhanced select / Autocomplete / Tagging | Tom Select integration recipe â€” SUI token overrides for control + dropdown | Recipe |

---

## Icons

SUI has **zero icon dependency**. Any library works (Lucide, Heroicons, Phosphor, Font Awesome, SVG). **Do NOT assume `sui-icon-*` classes exist â€” they don't.**
- `aria-hidden="true"` on decorative icons
- Always pair icons with text labels

---

## Canadian English

SUI's documentation uses Canadian English (colour, behaviour, organisation). This is a documentation convention â€” it does not apply to your application code.

---

## Common Mistakes

1. **Inventing `sui-*` classes** â€” Warn the human, use custom classes with SUI tokens
2. **Semantic tokens for logos** â€” `--sui-blue-primary` shifts between themes
3. **Colour-only status** â€” Always pair with icon + text
4. **Missing tab ARIA** â€” `role="tablist"`, `role="tab"`, `role="tabpanel"`
5. **Skipping recipes** â€” Check the list before building custom
6. **`!important` in components** â€” Only in utility classes
7. **Hardcoding hex** â€” Use `--sui-*` tokens
8. **Forgetting mobile** â€” 375px first, `data-label` on tables

---

## Contributing

If SUI is missing a common pattern, suggest the developer open an issue at https://github.com/adrianspeyer/speyer-ui. SUI grows from real usage signals. Check scope first: no icons, charts, data viz, or app logic.
