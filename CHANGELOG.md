# Changelog

All notable changes to the Speyer UI System are documented here.

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
