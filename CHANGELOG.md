# Changelog

All notable changes to the Speyer UI System are documented here.

---

## [2.0.8] — 2026-02-15

### Added
- **Hidden utility:** `sui-hidden` — `display: none !important`. Removes elements from layout and accessibility tree. Completes the two-tier visibility system alongside `sui-visually-hidden`. Resolves [#3](https://github.com/adrianspeyer/speyer-ui/issues/3).

### Changed
- **CDN URLs default to `@latest`** — README, index.html prompts, and copilot guide now use `@latest` instead of pinned version tags. Keeps AI-generated markup current. Pinning note included for production use.

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
