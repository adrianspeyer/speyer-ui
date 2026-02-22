# Changelog

All notable changes to the Speyer UI System are documented here.

---

## [2.7.1] — 2026-02-22

### Theme: Accessibility Hardening + Version Hygiene

Zero-violation axe scan, CDN pinning, extended preflight checks, and documentation drift fixes. No changes to core CSS or JavaScript — demo and tooling only.

### Fixed

- **8 axe-core a11y violations in demo** — Command Palette missing `aria-controls` and `aria-label` on listbox (critical). Record Detail inputs missing `for`/`id` label association (critical). Popover selects missing label association (critical). FilePond input missing accessible label. App Shell recipe had duplicate `<main>` landmark. Empty `<th>` in table recipe. Popover form inputs missing label association.
- **README version drift** — 6 stale `v2.6.0` references (hero, pinned CDN snippets, distribution note) updated to `v2.7.1`. Caught by ChatGPT cross-AI review.
- **Third-party CDN breakage risk** — Pinned all external demo dependencies to tested versions: Lucide 0.475.0, Flatpickr 4.6.13, FilePond 4.32.11, Quill 2.0.3, Chart.js 4.4.7. Tom Select was already pinned at 2.5.1.

### Added

- **`scripts/run-axe.mjs`** — Headless axe-core a11y scanner via jsdom. Runs WCAG 2.1 AA + best-practice rules against the full demo page. `npm run axe` (requires `npm install --save-dev jsdom axe-core`).
- **Extended preflight version checks** — `checkVersions()` now validates `README.md` hero, `docs/javascript-api.md`, and `index.html` (JSON-LD, pill, shield) in addition to the 3 source files. Catches version drift before release. 71 checks total (up from 66).

### Improved

- **AI context files** — Added `sui-card-flush` and `sui-card-compact` usage guidance. Added token extension guidance (use `--app-*` prefix, reference SUI tokens as fallbacks). Synced `.cursor/rules` with `DO NOT EDIT` header.
- **CONTRIBUTING.md** — Added stability plateau note and `npm run build` to testing checklist.
- **`llms.txt`** — Added `sui-card-flush`/`sui-card-compact` to hallucination prevention table.

### Bundle

~94KB total (no change — no source file modifications).

---

## [2.7.0] — 2026-02-21

### Theme: Stability Plateau + AI Survivability

Ergonomic fixes, documentation accuracy, and AI guardrails. After this release, SUI enters a stability plateau — patches only for regressions, accessibility issues, or security fixes.

### Added

- **`[data-sui-modal-close]`** — Data attribute alternative to `.sui-modal-close` for closing the nearest parent dialog or legacy overlay. Useful on footer buttons that don't naturally receive the CSS class. Closest-parent resolution only. `.sui-modal-close` remains canonical.
- **Smoke harness** — `tests/smoke.html` with deterministic contract: DOM flags, `window.__SUI_SMOKE_RESULTS__` object, parseable console line, `?autorun=1` support. Covers modal, panel, dropdown, accordion, tabs, and theme toggle.

### Improved

- **Panel Polish recipe** — Corrected `--sui-panel-width` guidance (was `--panel-width`). Added "Record Detail" variant with tabs, table, and sticky footer actions.
- **Search Bar recipe** — Added inline toolbar variant (scoped select + search input + clear + action button).
- **AI context files** — Fixed 198 mojibake instances across `.claude/instructions.md`, `.cursor/rules`, `llms.txt`. Added "How to Find Things" repo map. Added canonical "Does NOT exist" table (13 entries) synchronised across all AI files.

### Fixed

- **README token drift** — Spacing values corrected from `(4, 8, 12, 16, 24, 32)` to `(4, 8, 16, 24, 32, 48)`. `--sui-font` → `--sui-font-primary`/`--sui-font-mono`. `--sui-weight-normal` → `--sui-weight-regular`. Removed non-existent `--sui-text-h4`.

### Docs

- **Table modifier cheat-sheet** in `docs/recipes.md` — quick reference for `.sui-table-wrap`, `.sui-table-sticky`, `.sui-table-stack`, `.sui-table-sortable`, `.sui-table-dense`, `.is-selected`.
- **Icon accessibility patterns** in `docs/accessibility.md` — three-tier pattern: decorative icon, icon-only control, meaningful standalone icon.

### Demo

- **Footer** — "Made in Canada with ❤️"

---

## [2.6.0] — 2026-02-20

### Theme: API Completeness + Showcase Polish

Closes the "hallucination surface" — four interactive modules (tooltip, segmented, toast, panel) lacked complete public APIs that other modules provided, causing AIs to infer non-existent methods. This release adds 11 new methods, 5 CSS primitives, and 7 new recipes.

### Added

**JavaScript (11 new public methods):**
- **`SUI.theme.resolved()`** — Returns the actual rendered theme (`'light'` or `'dark'`), even when preference is `'auto'`. Essential for canvas-based integrations (Chart.js).
- **`SUI.toast.dismiss(el)`** — Programmatic dismissal of a single toast. Type-checks the element, delegates to internal `_dismiss()`.
- **`SUI.toast.clearAll()`** — Dismisses all active toasts. Useful for navigation, logout, or state transitions.
- **`SUI.tooltip.show(el)` / `SUI.tooltip.hide(el)`** — Programmatic tooltip visibility for onboarding flows and guided tours. Advisory hide: CSS hover/focus takes precedence.
- **`SUI.segmented.select(el)`** — Programmatic selection of a segmented control option. Matches the `tabs.activate()` pattern.
- **`SUI.sidenav.isOpen(sel)`** — Boolean getter for sidenav mobile overlay state.
- **`SUI.panel.isOpen(sel)`** — Boolean getter for panel open state.
- **Tab ↔ Panel ARIA wiring (A7)** — `tabs.init()` now generates `aria-controls` on tabs and `aria-labelledby` on panels, completing WAI-ARIA Authoring Practices association.
- **Copy `is-copied` class toggle (A8)** — `[data-sui-copy]` buttons receive `is-copied` class for 1.6s on success. Icon-library-agnostic visual feedback.
- **Toast error `aria-live="assertive"` (A3)** — Error toasts now set `aria-live="assertive"` for immediate screen reader announcement.

**CSS (5 new primitives):**
- **`.sui-kbd`** — Class alias for `<kbd>` element styling. Tokenised padding and font size.
- **`.is-selected` (on table rows)** — Blue tint + left accent for selected row state. Uses box-shadow for border-collapse compatibility.
- **`.sui-card-compact`** — Dense card padding for KPI grids and dashboards.
- **`.sui-kpi-foot`** — Subtext line for KPI cards (font-size, muted colour, spacing).
- **`.is-tooltip-visible`** — CSS class for programmatic tooltip visibility (pairs with `SUI.tooltip.show()`).

**Recipes (7 new, all zero bundle cost):**
- **Search Bar** — Input + action button, non-wrapping flex composition.
- **Inline Selection Bar** — Selection count + actions above content. Distinct from Floating Action Bar (FAB).
- **Command Palette** — ⌘K dialog with search input, results list, and `sui-kbd` shortcut hints.
- **Confirmation Dialog** — `role="alertdialog"` with destructive action pattern. Demonstrates why there is no `SUI.modal.confirm()`.
- **Panel Polish** — Header/footer/sizing patterns + CRM-style detail drawer variant.
- **Popover** — Light (click-outside dismissal) and heavy (focus-trap) interactive content patterns.
- **App Shell Scaffold** — Canonical responsive layout with `sui-topbar` + `sui-sidenav` + scrollable main. Uses `app-*` classes (not `sui-*`). Documents the alternative to hallucinated `sui-layout`/`sui-main`.

**Documentation:**
- **JS API Reference Table** in AI context files (`.claude/instructions.md`, `.cursor/rules`, `llms.txt`) — replaces prose API descriptions with scannable table. Directly addresses #1 root cause of API hallucinations.
- **Card double-padding callout** in demo page — documents `sui-card-flush` + `sui-card-compact` pattern.
- **docs/ folder** updated: `javascript-api.md` reflects all new methods, `recipes.md` includes all 29 recipes.

### Fixed

- **Sidenav token mismatches (B5)** — 6 undefined token references fixed: `--sui-text-sm` → `--sui-text-small`, `--sui-text-xs` → `--sui-text-meta`, `--sui-text-lg` → `--sui-text-h3`, `--sui-weight-medium` → `--sui-weight-semibold`.
- **Preflight false positives (D1)** — `aria-hidden-focus` regex tightened to only match container elements. Decorative `aria-hidden="true"` on `<i>` and `<svg>` icons no longer triggers false focusable-element warnings.

### Bundle

- **Total:** ~94KB minified (under 95KB ceiling)
- **CSS delta:** +18 lines source
- **JS delta:** +81 lines source (~1.8KB minified)

---

## [2.5.1] — 2026-02-18

### Added

- **`SUI.tabs.activate(tabElement)`** — Programmatic tab switching. Pass a `.sui-tab` button element to activate its tab and show its associated panel. Works with scoped tabs (`data-sui-tabs`). Closes the last API gap: every interactive component now has a public imperative API.
- **`SUI.accordion.toggle(trigger)`** — Programmatic accordion toggle. Also adds `expandAll(container)` and `collapseAll(container)` for bulk operations, matching the sidenav groups pattern.
- **`window.SUI` global exposure** — `const SUI` at top-level script scope creates a lexical binding but not a `window` property (ES6 spec). Added `window.SUI = SUI;` after the IIFE so defensive checks (`if (window.SUI)`), test frameworks (Selenium/Playwright), and AI-generated code all work. Identified by ChatGPT, confirmed by Gemini.
- **Flatpickr integration recipe** — First "integration recipe": token-based CSS overrides that make Flatpickr match SUI in both light and dark mode. Includes focus-visible ring (keyboard nav), z-index stacking, and `appendTo: document.body` for clipping prevention. Live demo with date, range, and datetime pickers. Copy-paste `<style>` block. Flatpickr is not bundled — you bring the library, SUI makes it match. Tested with v4.6.13.

### Fixed

- **Init count accuracy** — Console log now counts tabs (`.sui-nav[aria-label]`) and tooltips (`.sui-tooltip`). Dropdown selector corrected from `[data-sui-dropdown-trigger]` to `.sui-dropdown` to match what `init()` actually targets.
- **README bundle size** — Updated from "under 90KB" to "under 95KB" (actual: 91.6KB minified).
- **`preflight.js` encoding** — All 38 mojibake lines in decorative characters (section dividers, pass/fail markers) fixed with byte-level replacements. Terminal output now renders clean Unicode.

---

## [2.5.0] — 2026-02-18

### Added

- **Table modifiers** — Three new opt-in modifiers for `sui-table`:
  - `sui-table-stack` — Card stacking at tablet width (768px). Wider than the default 520px mobile stacking. Useful for data-heavy admin tables on tablets.
  - `sui-table-sticky` — Pins `<thead>` when scrolling long tables. Uses `position: sticky` with `z-index: 1` and `box-shadow` separator.
  - `sui-table-dense` — Compact padding (`--sui-space-1` × `--sui-space-2`) with smaller font size. Note: may fall below 44px touch target — do not combine with `sui-table-interactive` on touch-heavy interfaces without custom padding.
- **Input action modifier** (`sui-input-action`) — Wrapper for embedding a button inside an input field. Common use cases: search, copy, clear, show/hide password. Button sits absolute-positioned right, input gets extra right padding. Focus-visible ring on the embedded button. Both themes.
- **Floating Action Bar recipe** — Fixed-position bulk action bar that appears when items are selected. Composes from `sui-card-shadow` + `sui-btn` + `sui-badge` + fixed positioning. Live demo with checkbox selection.
- **`llms.txt`** — AI discoverability file at repo root pointing to the comprehensive reference.
- **SUI init console log** — `sui.js` now logs `SUI v2.5.0 — N components initialised` at the end of auto-init. Counts all data-sui-* triggers, accordions, segmented controls, and sidenav group toggles.

### Fixed

- **Screen layout blank-page footgun** — A single `sui-screen` without `.is-active` no longer renders as blank. Changed from `.sui-screen:not(.is-active) { display: none }` to `.sui-screen ~ .sui-screen:not(.is-active) { display: none }`. The sibling selector means a lone `sui-screen` always renders. `sui-screen-solo` kept as legacy alias for backwards compatibility.

### Improved

- **AI prompt overhaul (all 3 tiers)** — Quick, Minimal, and System prompts updated with:
  - Recipe awareness table (16 SaaS patterns with composition details)
  - Common name → SUI solution alias table (Sidebar → sui-sidenav, Modal → sui-dialog, etc.)
  - Pointer URL to comprehensive AI reference (`.claude/instructions.md`)
  - New v2.5.0 modifiers documented in all tiers
- **Sidenav keyword search** — All 46 sidenav links now have `data-keywords` attributes. Filter search matches on keywords in addition to link text (e.g. searching "drawer" finds Panel and Bottom Sheet).
- **AI context files** (`.claude/instructions.md`, `.cursor/rules`) — Added: table modifiers, `sui-input-action`, FAB recipe, complete JS API method reference (`SUI.tabs`, `SUI.accordion`, `SUI.tooltip`, `SUI.segmented`), common name alias table.
- **README** — Added: table modifier docs, `sui-input-action` docs, "Static page vs SPA shell" usage guide, complete JS API reference (13 additional methods: panel, sidenav, tabs, accordion, tooltip, segmented).

## [2.4.1] — 2026-02-17

### Fixed

- **Panel Escape key (a11y):** Escape now closes panels even when focus is in the main content area. Previously, the keydown listener was attached to the panel element only — on desktop, the dual focus model meant Escape was ignored when focus was outside the panel. Now uses a document-level listener.
- **Sidenav count badge alignment:** Group count badges (e.g. "28", "16") now right-align consistently regardless of label width. Changed from `margin-left: var(--sui-space-1)` to `margin-left: auto`.

### Improved

- **Recipe demos:** Sidenav Search, Sidenav Context, Panel Push Mode, Master-Detail, and Notification Centre recipes now include live interactive demos and collapsible "View code" accordions, matching the pattern used by all other recipes.
- **Sidenav alphabetical order:** Component links (28) and Recipe links (16) are now sorted A–Z. Added missing Panel link to Components group.
- **Scroll lock fix:** Clicking a sidenav anchor link no longer locks scroll position. The URL hash is cleared after smooth scroll completes.

## [2.4.0] — 2026-02-17

### Added

- **Sidenav collapsible groups** (`sui-sidenav-group`, `sui-sidenav-group-toggle`, `sui-sidenav-group-links`, `sui-sidenav-group-count`) — Expand/collapse groups within sidenav. Chevron via CSS `::after` pseudo-element (zero icon dependency). `aria-expanded` + `aria-controls` pairing. Works without JS (groups expanded by default). JS API: `SUI.sidenav.collapseAll(nav)` / `.expandAll(nav)`. Auto-init on `.sui-sidenav-group-toggle` buttons. Both themes, high contrast, reduced motion. ~45 lines CSS + ~25 lines JS.
- **Panel** (`sui-panel`, `sui-panel-header`, `sui-panel-title`, `sui-panel-close`, `sui-panel-body`, `sui-panel-footer`) — Side panel / slide-over, the third overlay type. Dialog blocks, sheet slides up, panel slides from right. Desktop: coexists with main content, no focus trap. Mobile: full-screen blocking overlay with focus trap. Dual focus model toggles automatically on breakpoint resize. `--sui-panel-width` custom property for configurable width. `.sui-panel-no-backdrop` modifier. Escape closes, backdrop click closes. JS API: `SUI.panel.open()` / `.close()` / `.toggle()`. Auto-init via `data-sui-panel`. Both themes, high contrast (2px border), reduced motion. ~100 lines CSS + ~60 lines JS.
- **5 new recipes** — Sidenav search/filter, sidenav context-switching, panel push mode (content resize), master-detail (table + panel), notification centre (panel + cards). All on demo Recipes tab.
- **Preflight: sidenav group ARIA check** — Validates `aria-expanded` + `aria-controls` on `.sui-sidenav-group-toggle`.
- **Preflight: panel ARIA checks** — Validates `aria-label` on `.sui-panel` and `aria-label` on `.sui-panel-close`.

### Fixed

- **Sidenav panel scroll** — `max-height` + `overflow-y` moved from `.sui-sidenav` to `.sui-sidenav-panel` on desktop (was on `main` since v2.3.0, now tagged).
- **README stale claims** — "Zero dependencies" updated to "zero runtime dependencies" (SUI has dev dependencies for minification). Bundle size claims updated from "under 75KB" to "under 90KB" (accurate since v2.1.2). Preflight check count updated 58 → 66. "What you get" list updated with sidenav and panel. File size table updated with current numbers. (Planned for v2.4.1, folded into v2.4.0.)
- **Encoding cleanup** — Mojibake characters fixed across all source files inherited from project library transfer.

### Changed

- **Demo sidenav groups** migrated from `demo-*` classes to `sui-*` component classes. Group expand/collapse now handled by SUI auto-init instead of demo-only JS.
- **`.gitignore` added** — Ignores `node_modules/`, `package-lock.json`, `.DS_Store`. `package-lock.json` removed from tracking (dev-only lockfile, misleading for a zero-runtime-dependency project).
- **Preflight validator** — 63 → 66 checks (+3: sidenav group ARIA, panel labels, panel close buttons).
- **AI context files** updated with panel component, sidenav groups, and 5 new recipes.
- **README recipe table** updated with 5 new entries (16 total).

---

## [2.3.0] — 2026-02-17

### Added

- **Sidenav** (`sui-sidenav`, `sui-sidenav-panel`, `sui-sidenav-link`, `sui-sidenav-heading`, `sui-sidenav-toggle`, `sui-sidenav-close`) — Responsive section navigation. Desktop (≥769px): sticky sidebar with vertical link list, always visible, no overlay. Mobile (<769px): off-canvas left panel with backdrop, focus trap, Escape-to-close. JS module: `SUI.sidenav.open()` / `.close()` / `.toggle()`. Auto-init via `data-sui-sidenav`. Includes: active state (`.is-active` or `aria-current="page"`), group headings, reduced motion, high contrast support. ~130 lines CSS + ~80 lines JS.
- **Scroll target utility** (`sui-scroll-target`) — Adds `scroll-margin-top: 80px` to anchor targets. Prevents sticky headers from covering scrolled-to content.
- **Demo section navigation** — Sidenav integrated into demo page with links to all 27 component sections and 10 recipe sections. Tab-switching on cross-tab links. Flex layout (sticky sidebar on desktop, hamburger on mobile).
- **Preflight: RGBA composite contrast check** — New check blends rgba() overlays against `--sui-bg-card` dark value, tests composited text contrast. Catches issues Lighthouse cannot see (Lighthouse skips rgba backgrounds). 1 new check.
- **Preflight: encoding hygiene** — Checks 7 source files for mojibake patterns (double-encoded em dashes, arrows, symbols). Prevents corrupted characters from shipping. 1 new check.

### Fixed

- **Mark/Highlight dark mode contrast** — Dark `sui-mark` opacity bumped 0.2 → 0.25 (clearer highlight). Dark `sui-mark-current` opacity bumped 0.5 → 0.6, text switched from white to black (contrast improved from 5.35:1 to 6.9:1). Light mode unchanged.
- **Stepper complete indicator dark contrast** — `--sui-success-strong` → `--sui-btn-success-bg` (contrast improved from 2.28:1 to 5.02:1).
- **Encoding cleanup** — 200+ mojibake characters fixed across all source files (em dashes, arrows, multiply symbols). Added preflight gate to prevent recurrence.
- **Decorative emoji removed** — Flag emoji removed from footer (index.html, README.md). Functional emoji (status indicators ✓ ⚠ ✕) retained.

### Changed

- **Preflight validator** — 58 → 63 checks (+5: stepper aria-current, radiogroup labels, stepper contrast pair, RGBA composites, encoding hygiene). 6 categories: contrast token pairs, hardcoded overrides, RGBA composites, HTML/ARIA, version consistency, dist hygiene, encoding hygiene.
- **Demo page version** references updated to v2.3.0.
- **Bundle size** — 78.3KB → 82.3KB (tokens 5.6KB + components 57.3KB + JS 19.6KB).

---

## [2.2.0] — 2026-02-17

### Added

- **Stepper** (`sui-stepper`, `sui-step`, `sui-step-indicator`) — CSS-only multi-step wizard promoted from recipe. Flexbox + `::after` connectors, states (`.is-complete`, `.is-active`, `.is-pending`) with shape + colour distinction (not colour alone). `<ol>` semantics, `aria-current="step"` on active. Responsive: horizontal desktop, vertical mobile. Works with any step count.
- **Dashed Button** (`sui-btn-dashed`) — Tertiary button variant with dashed border, muted text, transparent background. Hover fills with `--sui-bg-elevated`. For de-emphasised actions ("Skip", "Add item", dropzone triggers). Composes with `sui-btn` + `sui-btn-sm`.
- **Topbar Aligned** (`sui-topbar-aligned`) — Flex layout modifier for `sui-topbar`. Brand stays left, nav + actions push right. Solves the problem where 2 nav items float awkwardly in a 3-column grid centre. Default topbar unchanged.
- **Button Group recipe** — Single-select option grid with `role="radiogroup"` + `role="radio"` + `aria-checked` ARIA pattern. Demo on Recipes tab.
- **Action Sheet recipe** — Mobile action menu composing `sui-sheet` + stacked `sui-btn-ghost` + dividers. Destructive action at bottom. Demo on Recipes tab.
- **AI context files** (`.cursor/rules`, `.claude/instructions.md`) — Comprehensive reference for AI coding assistants. Includes: all 50+ components with exact class names, design tokens, ARIA requirements per component, recipe list, brand colour guidance, common AI mistakes, namespace protection (`sui-*` prefix contract). Zero private file references.
- **Brand colour guidance** — Documented in README, AI prompts, and AI context files. Semantic tokens shift between themes — do not use for logos or brand marks. Hardcode brand colours or use custom properties.

### Changed

- **Stepper recipe** on Recipes tab now redirects to the Stepper component on the Components tab (promoted from recipe to first-class component).
- **README recipe table** expanded from 5 to 10 entries (added Blog Post, Document Library, App Shell, Profile Page, Button Group, Action Sheet; removed Stepper).
- **AI prompts** (Quick, Minimal, System) updated with stepper, btn-dashed, topbar-aligned, and brand colour guidance.
- **"What you get" one-liner** updated to include steppers.

---

## [2.1.2] — 2026-02-16

### Added

- **Screen Layout** (`sui-screen`, `sui-screen-header`, `sui-screen-body`, `sui-screen-footer`) — Full-viewport app shell for mobile-first apps. Flex column with `100dvh`, sticky header/footer with `env(safe-area-inset-*)`, scrollable body. Multi-view switching via `.is-active` / `hidden`. `sui-screen-solo` for single-screen apps.
- **Preflight Validator** — Build-time script (`npm run preflight`) runs before every build. 58 checks across 5 categories: WCAG AA contrast (40+ token pairs, both themes), hardcoded overrides, HTML/ARIA (12 axe-core rules including button-name, image-alt, heading-order, link-name, duplicate-id, aria-hidden-focus), version consistency, and dist hygiene. Zero dependencies. Focus ring contrast tracked as advisory (AAA, not AA).
- **Brand Tokens** (`--sui-btn-primary-bg`, `--sui-btn-danger-bg`, `--sui-btn-success-bg` + hover variants) — Overridable button/component background tokens. In light mode, defaults resolve to existing colors (`var(--sui-blue-primary)`, etc.). In dark mode, locked to contrast-safe hex values. Fixes the broken theming chain from v2.0.11 where hardcoded dark overrides bypassed `--sui-blue-primary`. Developers can now override brand colors and the preflight validator catches unsafe values.

### Changed

- Button, pagination, and progress-labeled components now use brand tokens instead of hardcoded hex values in dark mode. 18 dark override lines removed. Zero visual change for existing users.

### Fixed

- **Dark `--sui-error-soft`** token (#450A0A → #380808) — `--sui-error-strong` on `--sui-error-soft` now passes WCAG AA at 4.63:1 (was 4.29:1).
- **ARIA labels** on icon-only buttons in Mobile App Shell recipe (bell button, segmented nav).
- **Autocomplete** attribute on email inputs in demo page.

---

## [2.1.1] — 2026-02-16

### Fixed — Accessibility Hardening (JS)

Four keyboard/screen-reader gaps closed with zero API changes:

- **Dropdown** — Trigger now announces `aria-haspopup="true"` and `aria-expanded` (toggled on open/close). Menu gets `role="menu"`, items get `role="menuitem"`. Screen reader users now know a button opens a menu.
- **Bottom Sheet** — Focus trap added (Tab cycles within panel, matching modal behaviour). Previously keyboard users could Tab into background content.
- **Tabs** — Roving tabindex implemented. Only the active tab has `tabindex="0"`, inactive tabs get `tabindex="-1"`. Keyboard users skip past tab bar with a single Tab instead of arrowing through every tab.
- **Tooltip** — Escape key dismisses tooltip when trigger is focused. Previously no keyboard dismissal existed.

---

## [2.1.0] — 2026-02-16

### Added — The Content & Polish Release

SUI now has an opinion about content, not just interface.

**New Components:**
- **Prose** (`sui-prose`) — Long-form typography container. One class covers headings (h1–h6 with scroll-margin-top), paragraphs, links, lists, blockquotes, code blocks, tables, images, horizontal rules, and task list checkboxes. Size variants: `sui-prose-sm` (15px), default (18px), `sui-prose-lg` (20px). Width constraints: `sui-prose-narrow` (680px), `sui-prose-wide` (900px). Overridable via CSS custom properties. Inspired by Tailwind Typography but built on SUI tokens.
- **Mark** (`sui-mark`, `sui-mark-current`) — Search result highlighting with automatic dark mode adaptation and print suppression. 8 lines of CSS that every search feature needs.
- **Meta** (`sui-meta`) — Dot-separated metadata line. "1,234 words · 5 min read · Updated 3h ago" — separator via CSS `::before`, HTML stays semantic.
- **Toolbar** (`sui-toolbar`, `sui-toolbar-btn`, `sui-toolbar-sep`) — Horizontal scrolling action bar with hidden scrollbar. `aria-pressed="true"` toggle state. Variants: `sui-toolbar-bordered`, `sui-toolbar-compact`.

### Why v2.1.0

`sui-prose` represents a new content philosophy — SUI now handles long-form reading typography, not just interface components. That's a minor version bump by semver standards.

### Lesson
The gap between "design system" and "app framework" is content. Interface components (buttons, cards, modals) are the easy part — every design system has them. But the moment your users render Markdown, write articles, display documentation, or show rich text, you need typography opinions. `sui-prose` fills that gap without crossing into application logic.

---

## [2.0.13] — 2026-02-15

### Added — New Components
- **Scoped Tabs:** `data-sui-tabs` wrapper scopes tab discovery by container. Multiple independent tab sets on one page no longer conflict. Pages without the wrapper work as before (backward compatible).
- **Avatar XL:** `sui-avatar-xl` at 80px for profile pages and account headers.
- **Table Interactive:** `sui-table-interactive` — clickable rows with `cursor: pointer` and focus ring. Composes with `sui-table-hover`. Developer adds `tabindex="0"`, `role="link"`, and handler.
- **Table Sortable:** `sui-table-sortable` — visual sort indicators on `<th data-sort>`. Three states: neutral (…), ascending (↑), descending (↓). Developer toggles attribute value. No JS needed.
- **Progress Labeled:** `sui-progress-labeled` + `sui-progress-text` — text inside the progress bar fill. Uses `-strong` backgrounds in light mode and hardcoded dark-mode overrides for WCAG AA white-text contrast on all five colour variants.
- **Dropzone:** `sui-dropzone` — file upload area with dashed border, hover state, `.is-dragover` state. CSS only — drag-and-drop behaviour is bring-your-own JS.
- **Timeline:** `sui-timeline` + `sui-timeline-item` + `sui-timeline-content` — activity feed layout with avatar-left, content-right, and vertical connector. Optimised for `sui-avatar-sm`. `role="feed"` + `role="article"` for accessibility.

### Fixed
- **Card muted + interactive composability:** Combined modifiers now produce a subtler hover (`shadow-sm`, `translateY(-1px)`) instead of the full interactive lift, maintaining visual hierarchy.

### Added — Demo
- **Recipes tab:** Five documented application patterns composed from SUI primitives — Inline Edit, Kanban Board, Stepper/Wizard, Split Pane, and Settings/Preferences. Each with live example, collapsible code block, components-used list, and custom CSS clearly separated. Recipe CSS is demo-only — not in the SUI bundle.
- **README Recipes section** with table linking to each recipe's demo anchor.

### Lesson
- A design system's job is to ship primitives that compose into application patterns — not to ship the application patterns themselves. When you find yourself asking "but what about step 3's validation state?", you've crossed from component into application logic. Ship the building blocks, document the recipe, let the builder cook.

---

## [2.0.12] — 2026-02-15

### Added — New Components
- **Bottom Sheet / Drawer:** `sui-sheet` — mobile-first slide-up modal with handle bar. Handles `env(safe-area-inset-bottom)` for iOS safe areas, `overscroll-behavior: contain` for scroll trapping, Escape key to close, backdrop click to close. JS: `SUI.sheet.open()` / `SUI.sheet.close()`. Auto-init via `data-sui-sheet="#id"`.
- **Segmented Control:** `sui-segmented` + `sui-segment` — value picker with `role="radiogroup"` + `role="radio"` semantics. Arrow key navigation (Left/Right/Up/Down). Not tabs — semantically distinct. JS handles ARIA state and keyboard nav.
- **Chip / Tag:** `sui-chip` + `sui-chip-remove` — visual pill component with optional × remove button. Colour variants: `sui-chip-success`, `sui-chip-warning`, `sui-chip-error`, `sui-chip-info`, `sui-chip-pro`. CSS only — behaviour (keyboard add/remove, deduplication) is bring-your-own JS.
- **Interactive Card:** `sui-card-interactive` — clickable card modifier with `cursor: pointer`, hover shadow elevation, and focus ring. Composes with any card variant.

### Added — Layout Utilities
- **Grid auto-fit:** `sui-grid-auto` — `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`. Flexible column count without predefined 2/3/4 variants.
- **Horizontal scroll:** `sui-scroll-x` — `overflow-x: auto; -webkit-overflow-scrolling: touch`. For kanban boards, horizontal card lists, and wide content.
- **Flex no-wrap:** `sui-flex-nowrap` — modifier for `sui-flex` to prevent wrapping. Pairs with `sui-scroll-x` for scrollable rows.
- **Container queries (opt-in):** `sui-container` enables `container-type: inline-size`. `@container` variants: `sui-cq-stack`, `sui-cq-full`, `sui-cq-hide`, `sui-cq-row`, `sui-cq-show`, `sui-cq-text-sm`. Additive — nothing existing changes.

### Added — Documentation
- **Badge-count usage guidance (README):** Documented `aria-label` requirement — `sui-badge-count` must be paired with a parent element providing context. Count element should have `aria-hidden="true"`.
- **Skip link pattern (README + AI prompts):** Documented `sui-visually-hidden` skip link pattern. Added to all three AI prompts in index.html so AI-generated pages include it.

### Lesson
- Container queries are the right abstraction for component-level responsiveness, but must be opt-in. Forcing `container-type` on existing components would break any layout that depends on viewport-relative sizing. The `sui-container` class lets developers choose where to apply it — additive, nothing breaks.

---

## [2.0.11] — 2026-02-15

### Fixed — WCAG AA Contrast (color-contrast audit: 100/100 light + dark)
- **Light blue too pale:** `--sui-blue-primary` shifted from `#3B82F6` (3.68:1) → `#2563EB` (5.17:1 on white). Cascaded `--sui-blue-hover` to `#1D4ED8` (6.70:1). Affects links, primary buttons, toggle tracks, secondary button borders, progress bars, blockquote accent.
- **Dark button backgrounds:** Primary (`#2563EB`), danger (`#B91C1C`), and success (`#15803D`) now locked to hardcoded values with `[data-theme="dark"]` overrides so dark-mode token lightening can't break contrast. Includes `@media (prefers-color-scheme: dark)` fallback.
- **Badge count too light:** Background switched from `--sui-error` to `--sui-error-strong` (`#B91C1C`, 6.47:1 on white).
- **Page-btn active in dark:** `[data-theme="dark"] .sui-page-btn[aria-current]` locked to `#2563EB`.
- **Badge-error text in dark:** `error-strong` (#EF4444) on `error-soft` (#450A0A) = 4.28:1. Dark override switches to `error` base (#F87171, 5.84:1).
- **Input error message:** `.sui-input-error-msg` shifted from `--sui-error` to `--sui-error-strong` (3.76:1 → 6.47:1 on white). Dark override to `--sui-error` (#F87171, 6.04:1 on dark card).
- **Avatar palette:** All 10 colors shifted to Tailwind -600/-700 equivalents. Minimum contrast 4.60:1 (pink), maximum 6.47:1 (red). Old: `#3B82F6, #22C55E, #F59E0B, #EF4444, #06B6D4, #8B5CF6, #EC4899, #14B8A6, #F97316, #6366F1`. New: `#2563EB, #15803D, #B45309, #B91C1C, #0E7490, #7C3AED, #DB2777, #0F766E, #C2410C, #4F46E5`.

### Added — WordPress Readiness (10 CSS patterns + JS)
- **Prose typography:** `ul`, `ol` get proper `padding-left`, `margin`, and `color`. Nested lists handled. `li + li` gap.
- **Blockquote:** Left-border accent using `--sui-blue-primary`, elevated background, rounded right corners.
- **Figure + figcaption:** Clean spacing with `--sui-text-meta` caption styling.
- **Responsive image:** `img { max-width: 100%; height: auto; }` base rule.
- **Inline code:** `<code>` gets padding, background, and radius. Pre/code-block nested code exempt.
- **Keyboard input:** `<kbd>` styled with border, background, box-shadow to look like a physical key.
- **Radio button:** `.sui-radio` + `.sui-radio-label` mirroring the checkbox pattern. ARIA label association safety net in JS.
- **Responsive video embed:** `.sui-embed` with `aspect-ratio: 16/9`, absolute-positioned iframe/video.
- **Navigation:** `.sui-nav` + `.sui-nav-link` with `[aria-current="page"]` active state. Mobile-responsive with `.sui-nav-toggle` hamburger. JS handles toggle, Escape-to-close, and ARIA safety nets (`aria-expanded`, `aria-label`, `aria-controls`, `role="navigation"`).
- **Badge overlay:** `.sui-badge-overlay` positions `.sui-badge-count` absolutely at top-right of parent. JS sets `aria-hidden="true"` on count and warns if trigger lacks `aria-label`.

### Fixed — Existing
- **Copy button destroyed icons:** Text-node manipulation instead of `innerHTML` replacement. Icons stay untouched.

### Changed — Existing
- **Truly icon-agnostic:** Removed all `lucide.createIcons()` calls from `sui.js`. Zero icon library code.
- **Quick Start shows full HTML skeleton:** CSS in `<head>`, scripts before `</body>`. Resolves [#4](https://github.com/adrianspeyer/speyer-ui/issues/4).
- **README & AI prompts:** Icons presented as bring-your-own with no default recommendation.
- **Demo h1 spacing:** Added `margin-top: var(--sui-space-4)` to first section-head for breathing room below topbar.

### Lesson
- Mid-tone brand colors are a contrast trap. A color at ~50% luminance fails white text in light mode and fails on dark backgrounds in dark mode — it's too bright for one and too dim for the other. The fix is tokens for light mode, hardcoded overrides for dark mode, because dark-mode tokens lighten values that were already failing. Test every foreground/background pairing, not just the component in isolation.

---

## [2.0.10] — 2026-02-15

### Fixed
- **Dialog visible below footer:** `display: flex` on `dialog.sui-dialog` overrode the browser's default hidden state for closed `<dialog>` elements. Moved `display: flex; flex-direction: column` to `dialog.sui-dialog[open]` so the browser controls visibility.
- **Theme toggle required two clicks:** Three-state cycle (auto → dark → light) caused a silent no-op when system preference matched the next state (e.g. dark system + auto → dark looked identical). Toggle now detects the visual state and flips to the opposite in one click. `SUI.theme.set('auto')` still available programmatically.

### Lesson
- Test new components in context — a `<dialog>` that works in isolation can break page layout when CSS specificity fights the browser's native behaviour. And test interactive features from the user's perspective, not just the code's logic — the three-state toggle was technically correct but functionally broken.

---

## [2.0.9] — 2026-02-15

### Added
- **Native `<dialog>` modal:** New recommended modal pattern using `<dialog class="sui-dialog">`. Browser handles focus trapping, scroll lock, Escape key, and backdrop natively. `SUI.modal.open()` and `SUI.modal.close()` work with both native dialog and legacy overlay. Includes entrance animation and wide variant (`sui-dialog-wide`).
- **Avatar photo support:** Avatars are now "initials-first" — add an optional `<img>` inside `.sui-avatar` and initials show as automatic fallback when the image fails (`onerror="this.hidden=true"`). No breaking change — existing initials-only markup still works.
- **"What you get" one-liner** in README intro — single line listing all component categories for scanners.
- **Lucide Quick Start clarity:** CDN Quick Start now includes Lucide `<script>` tag with comment noting any icon library works. New "Icons" section in README explains SUI is icon-library-agnostic.

### Changed
- **Legacy overlay modal deprecated:** `sui-modal-overlay` + `sui-modal` pattern still works but is marked deprecated in CSS comments. Will be removed in v3.0.
- **README:** Updated architecture table with current sizes (~5KB + ~34KB + ~10KB). Added Icons section recommending Lucide with clear "any library works" guidance. Updated Dependencies section. Updated avatar docs. Updated modal API docs. Added "What you get" component summary.
- **Demo:** Modal now uses native `<dialog>`. All three AI prompts updated to include Lucide CDN, icon usage rules, dialog, and avatar changes.
- **Size claims:** Updated from "45KB" to "under 50KB" (actual: 48.7KB).

### Lesson
- Use the platform. `<dialog>` eliminates ~40 lines of focus-trapping JavaScript and gives you better accessibility than any hand-rolled solution. When browsers ship a native version of something you're building by hand, adopt it.

---

## [2.0.8] — 2026-02-15

### Added
- **Hidden utility:** `sui-hidden` — `display: none !important`. Removes elements from layout and accessibility tree. Completes the two-tier visibility system alongside `sui-visually-hidden`. Resolves [#3](https://github.com/adrianspeyer/speyer-ui/issues/3).

### Changed
- **CDN URLs default to `@latest`** — README, index.html prompts, and AI system prompts now use `@latest` instead of pinned version tags. Keeps AI-generated markup current. Pinning note included for production use.

### Lesson
- AI coding assistants assume common utility classes exist. When `sui-hidden` was missing, AI-generated markup silently failed — panels stayed visible with no error. Ship the utilities AI expects.

---

## [2.0.7] — 2026-02-15

### Fixed
- **Shield value contrast:** Shield backgrounds now use hardcoded contrast-safe colours instead of theme tokens. Theme tokens get lighter in dark mode, causing white text to fail WCAG contrast (e.g. blue: 3.67:1 light / 2.54:1 dark). All six variants now pass 4.5:1 in both modes.

### Lesson
- Components with fixed text colour (e.g. white) must not use theme tokens for backgrounds. Tokens designed for dark-mode text get lighter and invert the contrast relationship when used as backgrounds for white text.

---

## [2.0.6] — 2026-02-15

### Added
- **Shield component:** `sui-shield` — two-segment badge (label + value) in the style of Shields.io. Colour variants: blue (default), success, error, warning, info, neutral. Dark mode aware. No external dependency.
- **Visually hidden utility:** `sui-visually-hidden` — hides content visually while keeping it accessible to screen readers. Focusable elements become visible on focus.
- **High contrast support:** `prefers-contrast: more` media query in both tokens and components. Darker muted text, heavier borders (2px), stronger focus rings (4px) when OS requests increased contrast. Works in light and dark modes.

### Fixed
- **Input error border:** `sui-input-error` now uses 2px border width (was 1px), providing a non-colour cue for error state. Important for colour-blind users (Protan, Deutan) who may not distinguish the red border from the default grey.

### Lesson
- Colour-blind accessibility goes beyond "icon + text." Border weight changes, pattern differences, and high contrast support are additional layers that help users who cannot reliably distinguish red from green.

---

## [2.0.5] — 2026-02-14

### Added
- **Radius utility classes:** `sui-round-none`, `sui-round-sm`, `sui-round-md`, `sui-round-lg`, `sui-round-full`. Override border-radius on any component — badges, buttons, cards, inputs. Uses existing radius tokens. Resolves [#1](https://github.com/adrianspeyer/speyer-ui/issues/1).

---

## [2.0.4] — 2026-02-14

### Fixed (Lighthouse Accessibility Retest — Dark Mode)
- **Dark mode muted text contrast failure:** `--sui-text-muted` in dark mode was #475569 — failed AA on all three dark surfaces: 2.53:1 on body (#0B0F1A), 2.21:1 on card (#161E2C), 1.93:1 on elevated (#1E293B). Lightened to #8494A9 (6.19:1 on body, 5.41:1 on card, 4.73:1 on elevated — all AA pass). Affected 16 elements: 4 `.sui-kpi-label` divs, 9 `<small>` inside `.sui-card-muted`, 2 file description `<small>`, and 1 footer `<small>`.

### Lesson
- The same token can fail differently in light and dark modes. After fixing a token in one mode, always retest the other mode against all its background surfaces.

---

## [2.0.3] — 2026-02-14

### Fixed (Lighthouse Accessibility Retest — 96 → 100)
- **Muted text on elevated backgrounds:** `--sui-text-muted` (#64748B) on `--sui-bg-elevated` (#F1F5F9) was 4.34:1 — failed AA for normal text at 13.3px. Darkened to #5C6C80 (5.37:1 on white, 4.90:1 on elevated — both AA pass). Affected 12 `<small>` elements inside `.sui-card-muted`.

### Lesson
- Always verify muted text contrast against every background surface it appears on, not just the default white.

---

## [2.0.2] — 2026-02-14

### Fixed (Lighthouse Accessibility Audit)
- **Muted text contrast failure:** `--sui-text-muted` was #94A3B8 (2.56:1 on white) — changed to #64748B (4.76:1 on white, but 4.34:1 on elevated — corrected further in v2.0.3)
- **Badge-new contrast failure:** `.sui-badge-new` text was #3B82F6 on #DBEAFE (3.01:1) — added `--sui-blue-strong` token (#1D4ED8), now 6.68:1 (AAA)
- **Tab ARIA mismatch:** `aria-selected` was used on `<button>` without `role="tab"` — added `role="tablist"` on nav, `role="tab"` on buttons, `role="tabpanel"` on sections
- **Tab accessible names:** buttons lacked accessible names at mobile widths — added explicit `aria-label` to each tab

### Added
- **`--sui-blue-strong` token** in all three mode blocks (light, dark, prefers-color-scheme) for consistent accessible text on blue backgrounds
- **Automatic ARIA enforcement** in `sui.js` tab init — roles are applied programmatically as a safety net
- **Lighthouse testing protocol** in co-pilot guide — mandatory before any release
- **ARIA tab pattern rules** in co-pilot guide — prevents future role mismatches

---

## [2.0.1] — 2026-02-14

### Fixed
- **Success button contrast failure:** was 2.3:1 (FAIL), now 5.0:1 (AA) — changed background from `--sui-success` to `--sui-success-strong`
- **Danger button contrast:** was 3.8:1, now 6.5:1 (AA) — changed background from `--sui-error` to `--sui-error-strong`
- **Dark mode primary button:** added explicit override to prevent white-on-light-blue contrast failure (was 2.5:1)
- **Dark mode error-strong on error-soft:** documented as AA-lg (4.3:1) — icon + text pattern provides redundant signal

### Added
- **Accessibility Evidence section** in README: full contrast ratio tables (light + dark), keyboard behavior per component, reduced motion notes, known limitations documented honestly
- **Origin story** in README: why SUI was built (color-blind developer, AI tools ignoring accessibility)
- **Signature Patterns** in README: Status Table, Settings Form, Empty State — concrete SUI use cases
- **Dependencies section** in README: explicit statement that SUI has no required dependencies, Lucide is optional

### Changed
- README rewritten with matter-of-fact tone — constraints framing replaces marketing copy
- Demo hero text tightened to match
- All CDN references updated to v2.0.1

---

## [2.0.0] — 2026-02-14

### 🚀 Major Release — Complete Design System

This release transforms SUI from a token + component starter into a complete, production-ready design system with 25+ components, an optional JavaScript toolkit, and comprehensive AI integration prompts.

### Added

**New: `/dist` folder — production-ready minified files**
- `sui-tokens.min.css` (4KB), `sui-components.min.css` (32KB), `sui.min.js` (9KB)
- Total minified bundle: 45KB (compare: Tailwind 300KB+, Bootstrap 200KB+)
- Served automatically via jsDelivr CDN from tagged GitHub releases

**New: `package.json`**
- Repo identity, version, and build scripts
- `npm run build` regenerates minified files
- Prepares for future npm publishing

**New: CDN support via jsDelivr**
- No signup or configuration required
- URLs work automatically from tagged GitHub releases
- Both minified (dist/) and readable source files available

**New file: `sui.js` — Interactive Toolkit**
- Dependency-free, auto-initializing JavaScript behaviors
- `SUI.modal` — focus trapping, Escape key, body scroll lock, `aria-modal` support
- `SUI.toast` — auto-dismiss notifications (success/warning/error/info), stacking, pause on hover
- `SUI.dropdown` — click toggle, outside click close, arrow key navigation
- `SUI.tooltip` — smart positioning (avoids viewport edges)
- `SUI.accordion` — expand/collapse with keyboard support (Enter/Space)
- `SUI.tabs` — panel switching, ArrowLeft/Right keyboard nav
- `SUI.theme` — dark/light/auto toggle with `localStorage` persistence
- `SUI.copy` — clipboard with fallback + visual confirmation
- `SUI.avatar` — deterministic color generation from initials
- Auto-init via `data-sui-*` attributes (no custom JS required for common patterns)

**New tokens**
- Shadow/elevation: `--sui-shadow-sm`, `--sui-shadow-md`, `--sui-shadow-lg`
- Overlay: `--sui-overlay` (modal backdrops, different values light/dark)
- Z-index scale: `--sui-z-dropdown` (100), `--sui-z-sticky` (200), `--sui-z-modal` (300), `--sui-z-tooltip` (400)
- Neutral palette: `--sui-neutral`, `--sui-neutral-strong`, `--sui-neutral-soft`
- Pro/premium palette: `--sui-pro`, `--sui-pro-strong`, `--sui-pro-soft`
- Motion tokens: `--sui-duration-fast` (150ms), `--sui-duration-normal` (250ms), `--sui-easing`

**New components (CSS)**
- Toggle/Switch — accessible on/off control, 44px touch target, keyboard operable
- Avatar — initials-based (no images), sm/md/lg sizes, deterministic colors, avatar group (overlapping)
- Progress bar — percentage + indeterminate, 4 status variants, large variant, label pattern
- Divider — horizontal, vertical, and labeled variants
- Breadcrumb — nav trail with `aria-label` and current page marking
- Empty state — icon + heading + description + optional action CTA
- Skeleton loader — shimmer animation for text, heading, avatar, card, button placeholders
- Pagination — previous/next + page numbers, keyboard navigable, ellipsis
- Accordion — collapsible sections, chevron indicator, multi-expand
- Dropdown menu — positioned below trigger, items with icons, dividers, danger variant
- Modal/Dialog — centered overlay, header/body/footer, close button, wide variant
- Toast/Notification — auto-dismiss, 4 status types, stacking, slide-in/out animation
- Tooltip — hover + focus hints, top/bottom positioning, smart repositioning via JS
- Card shadow variant (`sui-card-shadow`) — opt-in elevation

**New badge variants**
- `sui-badge-neutral` — inactive, default states
- `sui-badge-new` — "NEW" feature callout
- `sui-badge-beta` — "BETA" label
- `sui-badge-pro` — premium/paid feature
- `sui-badge-outline` — modifier for transparent background on any variant
- `sui-badge-sm` — smaller size modifier
- `sui-badge-dot` — colored dot indicator + text
- `sui-badge-count` — numeric notification count

**New table variants**
- `sui-table-striped` — alternating row backgrounds
- `sui-table-hover` — row highlight on hover

**New utility classes**
- Padding: `sui-p-3`, `sui-p-4`, `sui-p-5`
- Text: `sui-text-pro`, `sui-text-mono`

**Demo improvements**
- Restructured to 4 tabs: Overview, Components, Designers, AI Prompt
- Every component showcased with live interactive examples
- Modal, toast, dropdown, tooltip, and accordion all fully functional in demo

**Documentation**
- README expanded to 700+ lines with complete component reference
- Every component includes code examples
- JavaScript API fully documented with auto-init attributes
- AI prompts updated for v2.0 component classes

### Changed
- **README rewritten** with sharp "why SUI exists" narrative focused on color-blind accessibility and complexity rejection
- README now includes CDN usage instructions, release tagging guide, and complete component reference
- Version bumped across all files
- Demo reorganized from Preview/Example/Designers/AI Prompt to Overview/Components/Designers/AI Prompt
- Demo overview hero text sharpened: "Accessibility as architecture, not afterthought"
- AI prompts updated to include CDN links, `sui.js` reference, and full v2.0 component list
- Repo structure updated to include `/dist` folder and `package.json`

### Fixed
- All inline styles eliminated from demo (except progress bar widths which require dynamic values)
- **Success button contrast:** changed from `--sui-success` (2.3:1 FAIL) to `--sui-success-strong` (5.0:1 AA) background
- **Danger button contrast:** changed from `--sui-error` (3.8:1) to `--sui-error-strong` (6.5:1 AA) background
- **Dark mode primary button:** added explicit override to prevent light-on-light contrast failure (#60A5FA with white was 2.5:1)
- **README:** replaced accessibility claims with measured contrast ratios and documented known limitations
- **Dependency clarity:** explicitly documented that Lucide icons are optional, not required
- **Tone:** tightened README and demo copy to be more matter-of-fact, less marketing-forward

---

## [1.1.0] — 2026-02-14

### Added
- New file: `sui-components.css` — universal component classes built from tokens
- 6 new tokens: `--sui-success-soft`, `--sui-warning-soft`, `--sui-error-soft`, `--sui-info-soft`, `--sui-warning-strong`, `--sui-info-strong`, `--sui-font-mono`
- Responsive header using CSS Grid (mobile: 2-row, desktop: 1-row)
- Keyboard navigation for tabs (ArrowLeft/ArrowRight)
- Utility classes for spacing, flex, and text

### Changed
- Moved from inline CSS to component classes
- Header redesigned for proper responsive behavior

### Fixed
- Mobile/tablet header breaking at various widths
- Tab overflow on small screens

---

## [1.0.0] — 2025-03-15

### Added
- Initial release
- Design tokens (CSS custom properties)
- Light and dark mode support
- Living specification demo
- AI prompt system (quick, minimal, system)
- README with design philosophy and token reference
