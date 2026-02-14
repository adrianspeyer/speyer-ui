# 🎨 Speyer UI System (SUI)

A lightweight, accessible design system for building clear, modern, and readable web applications.

Created by [Adrian Speyer](https://github.com/adrianspeyer). Made in Canada with love 🇨🇦

---

## Purpose

The Speyer UI System is a practical design framework that helps developers and designers build interfaces that are easy to read, accessible to everyone, and consistent across devices. It's designed for dashboards, tools, SaaS products, and content-driven applications.

SUI is intentionally lightweight — it provides design tokens, principles, and patterns you can adopt incrementally without locking into a heavy framework.

---

## Core Principles

Every SUI interface is built on five principles:

| # | Principle | What It Means |
|---|-----------|---------------|
| 1 | **Readability** | Text and data must be easy to scan and understand at a glance. |
| 2 | **Accessibility** | Interfaces must work for all users, including those with visual impairments. |
| 3 | **Mobile-Friendly** | Layouts are designed mobile-first and scale up gracefully. |
| 4 | **Color-Blind Friendly** | Color is never the sole way information is communicated. |
| 5 | **Consistency** | Similar components behave and look the same everywhere. |

---

## Quick Start

### Option 1: Link the Token File

Add `sui-tokens.css` to your project:

```html
<link rel="stylesheet" href="sui-tokens.css">
```

Use the tokens in your own styles:

```css
.my-button {
  background: var(--sui-blue-primary);
  color: var(--sui-text-inverse);
  border-radius: var(--sui-radius-md);
  padding: var(--sui-space-3) var(--sui-space-4);
  font-family: var(--sui-font-primary);
}
```

### Option 2: Copy the Tokens

Open `sui-tokens.css` and copy the `:root` and `[data-theme="dark"]` blocks into your own stylesheet.

### Option 3: AI-Assisted Development

See the [AI Integration](#-ai-integration) section below for prompts you can paste into any AI coding assistant.

---

## Display Modes

SUI supports two display modes:

| Mode | Description |
|------|-------------|
| **Light Mode** | Default. Clean, neutral backgrounds with dark text. |
| **Dark Mode** | Optional alternative. Deep navy backgrounds with light text. |

Both modes provide the same functionality, contrast ratios, and clarity. Toggle between them using the `data-theme="dark"` attribute on your root element:

```html
<!-- Light mode (default) -->
<html>

<!-- Dark mode -->
<html data-theme="dark">
```

---

## Color System

All colors are defined as CSS custom properties with the `--sui-` prefix.

### Light Mode

#### Brand & Actions

| Token | Value | Usage |
|-------|-------|-------|
| `--sui-blue-primary` | `#3B82F6` | Primary buttons, links, active states |
| `--sui-blue-hover` | `#2563EB` | Hover state for primary actions |
| `--sui-blue-active` | `#1E40AF` | Active/pressed state |
| `--sui-blue-soft` | `#DBEAFE` | Subtle backgrounds, badges, highlights |
| `--sui-blue-focus` | `#93C5FD` | Focus rings |

#### Backgrounds

| Token | Value | Usage |
|-------|-------|-------|
| `--sui-bg-primary` | `#F9FBFD` | Page background |
| `--sui-bg-card` | `#FFFFFF` | Card and panel backgrounds |
| `--sui-border` | `#E5EDF5` | Borders and dividers |

#### Text

| Token | Value | Usage |
|-------|-------|-------|
| `--sui-text-primary` | `#0F172A` | Headings, body text |
| `--sui-text-secondary` | `#475569` | Supporting text, descriptions |
| `--sui-text-muted` | `#94A3B8` | Placeholder text, metadata |
| `--sui-text-inverse` | `#FFFFFF` | Text on dark/colored backgrounds |

#### Status Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--sui-success` | `#22C55E` | Success states |
| `--sui-warning` | `#F59E0B` | Warnings, caution |
| `--sui-error` | `#EF4444` | Errors, destructive actions |
| `--sui-info` | `#06B6D4` | Informational messages |

#### High-Contrast Status (Critical Alerts)

| Token | Value | Usage |
|-------|-------|-------|
| `--sui-success-strong` | `#15803D` | High-contrast success borders/icons |
| `--sui-error-strong` | `#B91C1C` | High-contrast error borders/icons |

### Dark Mode

All tokens automatically update when `data-theme="dark"` is applied. See [`sui-tokens.css`](sui-tokens.css) for the full dark mode palette.

---

## Accessibility

### Color-Blind Friendly Design

SUI is designed from the ground up for users with color vision deficiency, particularly red/green color blindness.

**The Core Rule:** Color must never be the only way information is communicated.

Every status indicator, alert, or state change must include:

- ✅ A text label
- ✅ An icon or symbol
- ✅ Sufficient contrast (WCAG AA minimum)

### Required Alert Patterns

| State | Icon | Example Text |
|-------|------|-------------|
| Success | ✔ | Saved successfully |
| Warning | ⚠ | Review required |
| Error | ✕ | Upload failed |
| Info | ℹ | Changes applied |

### What to Avoid

- ❌ Color-only status indicators (e.g., a green dot with no label)
- ❌ Red/green-only data visualizations
- ❌ Unlabeled colored dots or badges
- ❌ Traffic-light patterns without text

### WCAG Compliance

All SUI projects should meet:

- **WCAG 2.1 Level AA** contrast ratios
- Full **keyboard navigation** support
- **Screen reader** compatibility
- Visible **focus states** on all interactive elements
- Proper **ARIA labels** where needed
- Support for **`prefers-reduced-motion`**

---

## Typography

### Font Stack

```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

[Inter](https://rsms.me/inter/) is the primary typeface — free, open-source, and optimized for screen readability.

### Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 32px | 700 (Bold) | 1.3 |
| H2 | 24px | 600 (Semibold) | 1.3 |
| H3 | 20px | 600 (Semibold) | 1.3 |
| Body | 16px | 400 (Regular) | 1.5 |
| Small | 14px | 400 (Regular) | 1.5 |
| Meta | 12px | 400 (Regular) | 1.5 |

---

## Layout & Spacing

### 8px Grid

All spacing uses an 8px base grid:

| Token | Value |
|-------|-------|
| `--sui-space-1` | 4px |
| `--sui-space-2` | 8px |
| `--sui-space-3` | 16px |
| `--sui-space-4` | 24px |
| `--sui-space-5` | 32px |
| `--sui-space-6` | 48px |

### Layout Rules

- **Mobile-first**: Design for small screens, then scale up
- **Minimum touch target**: 44px × 44px
- **Max content width**: 1280px
- **Content-first**: Prioritize content over chrome

---

## Components

### Buttons

- Minimum height: **44px** (touch-friendly)
- Border radius: **12px** (`--sui-radius-md`)
- Primary buttons use `--sui-blue-primary`
- Must include visible **focus states**
- Variants: Primary (filled), Secondary (outlined), Ghost (text-only)

### Cards

- Border radius: **16px** (`--sui-radius-lg`)
- Use **border-based** separation (not shadows by default)
- Padding: **16–24px**
- Background: `--sui-bg-card`

### Inputs

- Clear visible **borders**
- Visible **focus ring** using `--sui-blue-focus`
- Error messages must include **icon + text** (never color alone)
- Minimum height: **44px**

### Alerts

- Always include: **icon + text + appropriate contrast**
- Use status colors with matching strong variants for borders
- Must be fully understandable without color perception

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--sui-radius-sm` | 8px | Small elements, badges |
| `--sui-radius-md` | 12px | Buttons, inputs |
| `--sui-radius-lg` | 16px | Cards, panels |
| `--sui-radius-full` | 9999px | Pills, avatars |

---

## Motion

| Property | Value |
|----------|-------|
| Duration | 150–250ms |
| Easing | ease-out |
| Purpose | Feedback and transitions only |

- ✅ Use motion for hover states, focus transitions, and state changes
- ❌ Avoid decorative or distracting animations
- ❌ Always respect `prefers-reduced-motion`

---

## Icons

### Recommended Libraries

- [Lucide](https://lucide.dev/) — primary recommendation
- [Phosphor](https://phosphoricons.com/) — outline style alternative

### Icon Rules

| Context | Color |
|---------|-------|
| Active/selected | `--sui-blue-primary` |
| Inactive/default | `--sui-text-secondary` |
| Alerts/status | Matching status color |

Icons used for status must always be paired with text labels.

---

## 🤖 AI Integration

No AI model has the Speyer UI System in its training data. These prompts give an AI everything it needs to apply SUI correctly. Copy and paste the prompt that fits your situation.

---

### How It Works

1. You paste one of the prompts below into your AI tool (ChatGPT, Claude, Copilot, Cursor, etc.).
2. The prompt tells the AI to **fetch the official SUI token file** from GitHub so it always uses the latest values.
3. The AI applies the SUI design system to whatever you're building.

---

### Quick Prompt (Recommended)

Use this for most tasks. Copy the entire block below:

````
I want you to use the Speyer UI System (SUI) for this project.

## Step 1: Fetch the design tokens
Fetch the official SUI CSS token file from this URL:
https://raw.githubusercontent.com/adrianspeyer/speyer-ui/main/sui-tokens.css

Use the CSS custom properties defined in that file as the foundation for all styling. All tokens use the --sui- prefix.

## Step 2: Confirm display mode
Before writing any code, ask me:
"Would you like light mode only, dark mode only, or both (with a toggle)?"
Then implement accordingly:
- Light mode = default :root tokens
- Dark mode = [data-theme="dark"] tokens
- Both = include both token sets + a toggle using the data-theme attribute on <html>

## Step 3: Apply SUI design rules
Follow these rules for everything you build:

**Core Principles:** readability, accessibility, mobile-friendly, color-blind friendly, consistency.

**Typography:** Use Inter font (Google Fonts: https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap). Fallback: system-ui. Type scale: H1 32px/700, H2 24px/600, H3 20px/600, Body 16px/400, Small 14px/400, Meta 12px/400.

**Layout:** 8px spacing grid (use --sui-space-1 through --sui-space-6). Mobile-first responsive design. Max content width: 1280px. Minimum touch target: 44px.

**Components:**
- Buttons: 44px min height, 12px border-radius, visible focus states
- Cards: 16px border-radius, border-based separation (not shadows), 16-24px padding
- Inputs: visible borders, focus ring, minimum 44px height
- Alerts: ALWAYS include icon + text label (never use color alone to convey meaning)

**Accessibility (mandatory):**
- WCAG 2.1 AA contrast ratios
- Color must NEVER be the only indicator of status — always pair with icon + text
- Color-blind friendly: no red/green-only patterns, no unlabeled colored dots
- Keyboard navigation support
- Visible focus states on all interactive elements
- Proper ARIA labels
- Respect prefers-reduced-motion (disable animations)

**Status patterns (always use icon + text):**
- Success: ✔ icon + text (e.g., "Saved successfully")
- Warning: ⚠ icon + text (e.g., "Review required")
- Error: ✕ icon + text (e.g., "Upload failed")
- Info: ℹ icon + text (e.g., "Changes applied")

**Motion:** 150-250ms duration, ease-out easing. Use only for feedback/transitions. No decorative animations.

## Reference
Full documentation: https://github.com/adrianspeyer/speyer-ui
````

---

### Minimal Prompt (Quick Tasks)

For small requests where you just need SUI styling applied fast:

```
Use the Speyer UI System (SUI).
Fetch tokens from: https://raw.githubusercontent.com/adrianspeyer/speyer-ui/main/sui-tokens.css
Ask me if I want light mode, dark mode, or both before coding.
Key rules: Inter font, 8px spacing grid, 44px min touch targets, 12px button radius, 16px card radius, WCAG 2.1 AA, all status indicators must use icon + text (never color alone), mobile-first, color-blind friendly.
Full docs: https://github.com/adrianspeyer/speyer-ui
```

---

### System Prompt (For Developers)

If you're building a tool or using a system prompt / custom instructions, add this:

```
When the user says "use SUI", "use the Speyer UI System", or "Speyer UI":

1. Fetch the SUI design tokens from:
   https://raw.githubusercontent.com/adrianspeyer/speyer-ui/main/sui-tokens.css
2. Ask the user: "Would you like light mode, dark mode, or both?"
3. Apply all CSS custom properties (--sui- prefix) from the token file.
4. Follow these design rules:
   - Font: Inter (Google Fonts), fallback system-ui
   - 8px spacing grid (--sui-space-1 through --sui-space-6)
   - Min touch target: 44px, max content width: 1280px
   - Buttons: 44px height, 12px radius | Cards: 16px radius, border separation
   - WCAG 2.1 AA contrast | Keyboard nav | prefers-reduced-motion support
   - CRITICAL: Never use color alone for status. Always pair with icon + text.
   - Color-blind safe: no red/green-only patterns
5. Reference: https://github.com/adrianspeyer/speyer-ui
```

---

### Tips for Best Results

- **Always paste the prompt first**, before describing what you want built. This gives the AI context before it starts generating code.
- If the AI doesn't fetch the CSS file, you can paste the contents of [`sui-tokens.css`](sui-tokens.css) directly into the conversation.
- You can combine SUI with any framework (React, Vue, Tailwind, etc.) — the tokens are plain CSS custom properties.
- For follow-up prompts in the same conversation, you can just say "continue using SUI" — the AI will remember the rules from the initial prompt.

---

## Testing Checklist

Before shipping any SUI-based interface:

- [ ] Light mode contrast meets WCAG AA
- [ ] Dark mode contrast meets WCAG AA
- [ ] Red/green color blindness simulation tested
- [ ] All status indicators include text + icon
- [ ] Mobile layout verified (320px minimum)
- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus states are visible
- [ ] `prefers-reduced-motion` is respected
- [ ] Touch targets are at least 44px

### Recommended Testing Tools

- [Stark](https://www.getstark.co/) — Figma accessibility plugin
- [Color Oracle](https://colororacle.org/) — System-wide color blindness simulator
- Chrome DevTools — Rendering → Emulate vision deficiencies
- [axe DevTools](https://www.deque.com/axe/) — Accessibility auditing

---

## Repo Structure

```
sui/
├── README.md              ← You are here
├── LICENSE                 ← MIT License
├── CONTRIBUTING.md         ← How to contribute
├── CHANGELOG.md            ← Version history
├── sui-tokens.css          ← Design tokens (CSS custom properties)
└── demo/
    └── index.html          ← Interactive component library & example page
```

---

## Versioning

SUI follows semantic versioning:

| Version | Change Type |
|---------|-------------|
| v1.x.x | Small improvements, new tokens |
| v2.x.x | Structural changes, breaking token renames |
| v3.x.x | Major redesign |

---

## License

[MIT License](LICENSE) — free for personal and commercial use.

---

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

*Made in Canada with love 🇨🇦*
