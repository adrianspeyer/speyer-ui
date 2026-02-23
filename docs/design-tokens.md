# Design Tokens Reference

All SUI styling uses CSS custom properties (design tokens) with the `--sui-` prefix. Tokens are defined in `sui-tokens.css` and have separate values for light and dark modes.

**Rule:** Never hardcode hex values in components. Use `--sui-*` tokens. This ensures automatic theme switching and consistent styling.

---

## How Theming Works

SUI defines tokens in three blocks:

1. **`:root`** — Light mode defaults (always applied)
2. **`[data-theme="dark"]`** — Explicit dark mode (user chose dark)
3. **`@media (prefers-color-scheme: dark) :root:not([data-theme])`** — Auto dark mode (follows OS preference, no explicit choice)

```html
<html>                       <!-- Light mode (default) -->
<html data-theme="dark">     <!-- Dark mode (explicit) -->
<!-- Omit data-theme for auto (follows OS preference) -->
```

Toggle with JavaScript: `SUI.theme.toggle()` or `SUI.theme.set('dark')`.

---

## Brand & Interactive Colours

Primary action colour used for buttons, links, focus rings, and active states.

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--sui-blue-primary` | `#2563EB` | `#60A5FA` | Primary buttons, links, active tabs |
| `--sui-blue-hover` | `#1D4ED8` | `#3B82F6` | Hover state for blue elements |
| `--sui-blue-active` | `#1E40AF` | `#2563EB` | Active/pressed state |
| `--sui-blue-strong` | `#1D4ED8` | `#93C5FD` | Text on blue-soft backgrounds |
| `--sui-blue-soft` | `#DBEAFE` | `#1E3A8A` | Subtle blue backgrounds |
| `--sui-blue-focus` | `#93C5FD` | `#60A5FA` | Focus ring colour |

**Brand colour warning:** Semantic tokens like `--sui-blue-primary` shift between themes. Do NOT use them for logos or brand marks. Hardcode brand colours or use a custom property: `--app-brand: #1a1a2e`.

### Button Background Overrides

Override these to customise your brand colour while keeping contrast safe:

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| `--sui-btn-primary-bg` | `var(--sui-blue-primary)` | `#2563EB` | Primary button fill |
| `--sui-btn-primary-bg-hover` | `var(--sui-blue-hover)` | `#1D4ED8` | Primary button hover |
| `--sui-btn-danger-bg` | `var(--sui-error-strong)` | `#B91C1C` | Danger button fill |
| `--sui-btn-danger-bg-hover` | `#991B1B` | `#991B1B` | Danger button hover |
| `--sui-btn-success-bg` | `var(--sui-success-strong)` | `#15803D` | Success button fill |
| `--sui-btn-success-bg-hover` | `#116932` | `#116932` | Success button hover |

Dark mode locks these to contrast-safe values (≥4.5:1 with white text).

---

## Background & Surface

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--sui-bg-primary` | `#F9FBFD` | `#0B0F1A` | Page background |
| `--sui-bg-card` | `#FFFFFF` | `#161E2C` | Card, panel, modal surfaces |
| `--sui-bg-elevated` | `#F1F5F9` | `#1E293B` | Elevated surfaces, hovers |
| `--sui-border` | `#E5EDF5` | `#242F3E` | Borders, dividers |
| `--sui-overlay` | `rgba(15,23,42,0.5)` | `rgba(0,0,0,0.65)` | Modal/sheet backdrop |

---

## Text

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--sui-text-primary` | `#0F172A` | `#F8FAFC` | Body text, headings |
| `--sui-text-secondary` | `#475569` | `#94A3B8` | Descriptions, secondary labels |
| `--sui-text-muted` | `#5C6C80` | `#8494A9` | Timestamps, help text, placeholders |
| `--sui-text-inverse` | `#FFFFFF` | `#FFFFFF` | Text on dark/coloured backgrounds |

---

## Status Colours

Each status has three variants: base (icons, small accents), strong (text on soft backgrounds), soft (backgrounds).

| Status | Base | Strong | Soft |
|--------|------|--------|------|
| **Success** | `--sui-success` | `--sui-success-strong` | `--sui-success-soft` |
| **Warning** | `--sui-warning` | `--sui-warning-strong` | `--sui-warning-soft` |
| **Error** | `--sui-error` | `--sui-error-strong` | `--sui-error-soft` |
| **Info** | `--sui-info` | `--sui-info-strong` | `--sui-info-soft` |
| **Neutral** | `--sui-neutral` | `--sui-neutral-strong` | `--sui-neutral-soft` |
| **Pro** | `--sui-pro` | `--sui-pro-strong` | `--sui-pro-soft` |

**Accessibility rule:** Status is never communicated by colour alone. Always pair with icon + text label.

---

## Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--sui-font-primary` | `'Inter', system-ui, -apple-system, sans-serif` | All text |
| `--sui-font-mono` | `ui-monospace, SFMono-Regular, Menlo, ...` | Code, `<kbd>`, monospace |
| `--sui-text-h1` | `32px` | H1 headings |
| `--sui-text-h2` | `24px` | H2 headings |
| `--sui-text-h3` | `20px` | H3 headings |
| `--sui-text-body` | `16px` | Body text |
| `--sui-text-small` | `14px` | Small text, labels |
| `--sui-text-meta` | `12px` | Metadata, captions |
| `--sui-weight-regular` | `400` | Body text |
| `--sui-weight-semibold` | `600` | Headings, emphasis |
| `--sui-weight-bold` | `700` | Strong emphasis, H1 |
| `--sui-leading-body` | `1.5` | Body line height |
| `--sui-leading-heading` | `1.3` | Heading line height |

**Important:** Use `--sui-text-small` and `--sui-text-meta`, not `--sui-text-sm` or `--sui-text-xs`. The abbreviated forms do not exist in the token file.

---

## Spacing

Spacing scale built on a 4px base unit. Use for padding, margins, and gaps.

| Token | Value | Usage |
|-------|-------|-------|
| `--sui-space-1` | `4px` | Tight spacing (inline elements, icon gaps) |
| `--sui-space-2` | `8px` | Compact spacing (badge padding, small gaps) |
| `--sui-space-3` | `16px` | Standard spacing (card padding, section gaps) |
| `--sui-space-4` | `24px` | Generous spacing (card body, major sections) |
| `--sui-space-5` | `32px` | Large spacing (page sections) |
| `--sui-space-6` | `48px` | Extra-large spacing (hero sections) |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--sui-radius-sm` | `8px` | Buttons, badges, inputs, `<kbd>` |
| `--sui-radius-md` | `12px` | Cards, modals |
| `--sui-radius-lg` | `16px` | Large cards, panels |
| `--sui-radius-full` | `9999px` | Pills, avatars |

---

## Shadows

Borders are the default card separation. Shadows are opt-in and reserved for elements where depth communicates function.

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--sui-shadow-sm` | Subtle | Deeper | Dropdowns |
| `--sui-shadow-md` | Medium | Deeper | Cards (opt-in via `sui-card-shadow`), popovers |
| `--sui-shadow-lg` | Prominent | Deeper | Modals, dialogs |

---

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--sui-z-dropdown` | `100` | Dropdown menus |
| `--sui-z-sticky` | `200` | Sticky headers, topbar |
| `--sui-z-modal` | `300` | Modals, sheets, panels |
| `--sui-z-tooltip` | `400` | Tooltips (always on top) |

---

## Motion

| Token | Default | Reduced Motion | Usage |
|-------|---------|---------------|-------|
| `--sui-duration-fast` | `150ms` | `0ms` | Hovers, small transitions |
| `--sui-duration-normal` | `250ms` | `0ms` | Opens, closes, slides |
| `--sui-easing` | `ease-out` | — | All animations |

When `prefers-reduced-motion: reduce` is active, all durations drop to `0ms`.

---

## Layout

| Token | Value | Usage |
|-------|-------|-------|
| `--sui-max-width` | `1280px` | Content max-width |
| `--sui-touch-target` | `44px` | Minimum touch target size (WCAG) |

---

## High Contrast Mode

When `prefers-contrast: more` is active, SUI adjusts these tokens automatically:

- Muted/secondary text darkens for readability
- Borders thicken to 2px
- Focus rings thicken to 4px
- Blue-soft intensifies

No configuration needed. Works in both light and dark modes.
