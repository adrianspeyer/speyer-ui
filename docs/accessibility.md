# Accessibility Guide

SUI was built by a colour-blind developer. Accessibility isn't a feature — it's the architecture.

---

## Philosophy

Most design systems treat accessibility as a checklist. SUI treats it as a constraint that shapes every component:

- **Status is never communicated by colour alone.** Every badge, alert, and indicator requires icon + text. The component markup won't let you skip it.
- **Keyboard navigation is not optional.** Every interactive element is reachable by Tab, operable by Enter/Space, and dismissible by Escape where appropriate.
- **Touch targets are enforced.** Minimum 44px (WCAG 2.1 AA). Buttons, links, and interactive elements all meet this.
- **Reduced motion is respected.** All transitions drop to 0ms when `prefers-reduced-motion: reduce` is active.
- **High contrast is supported.** When `prefers-contrast: more` is active, borders thicken, text darkens, and focus rings intensify. No configuration needed.
- **Forced colours mode is supported.** SUI Icons use `forced-color-adjust: auto` so icons render in the user's chosen text colour under Windows High Contrast themes.
- **Components work without JavaScript.** A modal without JS is still a visible dialog. A dropdown without JS is still a visible menu. CSS handles appearance; JS adds interactivity.

---

## ARIA Requirements by Component

| Component | Required ARIA |
|-----------|--------------|
| **Tabs** | `role="tablist"` on container, `role="tab"` on buttons, `role="tabpanel"` on panels, `aria-selected` managed by JS |
| **Dropdown** | `aria-haspopup` + `aria-expanded` on trigger, `role="menu"` on menu, `role="menuitem"` on items |
| **Modal** | Native `<dialog>` with `aria-label` or `aria-labelledby`. Focus trapped inside. |
| **Sheet** | `aria-modal="true"`, `role="dialog"`, `aria-label` |
| **Panel** | `aria-label` on panel, `aria-hidden` managed by JS, `aria-expanded` on trigger, `aria-label` on close button |
| **Sidenav groups** | `aria-expanded` + `aria-controls` on toggle button, `id` on links container |
| **Segmented control** | `role="radiogroup"` on container, `role="radio"` on segments, `aria-checked` managed by JS |
| **Accordion** | `aria-expanded` on trigger, `hidden` attribute on collapsed panel |
| **Stepper** | `<ol>` + `<li>` for list semantics, `aria-current="step"` on active step |
| **Badge count** | Parent element has `aria-label` with count context; count `<span>` has `aria-hidden="true"` |
| **Table interactive** | `tabindex="0"` + `role="link"` on clickable rows |
| **Skip link** | `<a href="#main" class="sui-visually-hidden">Skip to main content</a>` as first child of `<body>` |

---

## Keyboard Behaviour

| Component | Tab | Enter/Space | Escape | Arrow Keys |
|-----------|-----|-------------|--------|------------|
| Buttons | Focus | Activate | — | — |
| Tabs | Focus active tab | Activate | — | Left/Right switch tabs |
| Accordion | Focus trigger | Toggle panel | — | — |
| Modal | Trapped inside | Activate buttons | Close modal | — |
| Sheet | Focus inside | Activate buttons | Close sheet | — |
| Dropdown | Focus trigger | Open / select item | Close menu | Up/Down navigate items |
| Segmented | Focus active segment | Select | — | Left/Right/Up/Down switch |
| Tooltip | Focus trigger shows tip | — | — | — |
| Pagination | Focus each button | Navigate | — | — |
| Table interactive | Focus each row | Activate row action | — | — |

---

## Colour-Blind Design

SUI uses red and green hues for success/error states. These hues are never the only signal. Every status pattern includes:

1. A descriptive **text label** (e.g., "Active," "Failed")
2. A distinguishing **icon** (✓, ✕, ⚠, ℹ)
3. Sufficient **contrast** on its background

A user who cannot distinguish red from green will still see "✓ Active" and "✕ Failed" with clear icon differentiation and readable text.

When building custom patterns with SUI, follow the same principle: if you remove all colour from your UI, can the user still understand every status?

---

## Icons and Screen Readers

SUI ships 538 first-party icons with built-in accessibility. If you use SUI Icons, the `sui-icon` class handles sizing and `currentColor` inheritance. If you bring your own icons (Heroicons, Phosphor, Font Awesome, inline SVG), the same three patterns apply.

### Pattern A — Decorative icon (icon + visible text)

The most common pattern. The text already conveys meaning, so the icon is decorative. **Hide the icon from screen readers.**

```html
<!-- SUI Icons -->
<svg class="sui-icon" viewBox="0 0 24 24" aria-hidden="true">
  <use href="#sui-icon-status-check-circle"/>
</svg>
Active

<!-- Any icon library — same principle -->
<button class="sui-btn sui-btn-primary" type="button">
  <svg aria-hidden="true" focusable="false"><!-- your icon --></svg>
  Save Changes
</button>
```

### Pattern B — Icon-only button (no visible text)

Buttons with only an icon. **Label the control, hide the icon.**

```html
<button class="sui-icon-btn" aria-label="Delete item">
  <svg class="sui-icon" viewBox="0 0 24 24" aria-hidden="true">
    <use href="#sui-icon-act-trash"/>
  </svg>
</button>
```

- `aria-label` goes on the **button**, not on the SVG
- `aria-hidden="true"` on the SVG — screen readers read the button label
- `.sui-icon-btn` enforces 44px minimum touch target

### Pattern C — Icon-only link (no visible text)

```html
<a href="/search" class="sui-icon-btn" aria-label="Search">
  <svg class="sui-icon" viewBox="0 0 24 24" aria-hidden="true">
    <use href="#sui-icon-act-search"/>
  </svg>
</a>
```

- `aria-label` goes on the **`<a>`**, not on the SVG

### Pattern D — Meaningful standalone icon (rare)

An icon displayed outside an interactive control where no visible text explains it. **Label the icon itself.**

```html
<svg class="sui-icon" viewBox="0 0 24 24"
     role="img" aria-label="Warning">
  <use href="#sui-icon-status-alert-triangle"/>
</svg>
```

Use `role="img"` + `aria-label` on the SVG. Do **not** combine `aria-label` with a `<title>` element inside the same SVG — this causes duplicate announcements in some screen readers.

### Why `<title>` alone is not enough

The consensus from Deque, Scott O'Hara, and cross-browser testing (2021–2025): `<title>` inside SVG sprites via `<use>` does **not** reliably propagate to assistive technology across all browser/screen reader combinations. The robust pattern is: **label on the interactive parent, hide the SVG.**

SUI Icons preserves `<title>` in every `<symbol>` for documentation, search, and direct SVG use — but recommended patterns never rely on it for accessibility.

### Quick Reference

| Scenario | SVG attribute | Accessible name lives on |
|----------|--------------|--------------------------|
| Icon + visible text | `aria-hidden="true"` | The visible text |
| Icon-only button | `aria-hidden="true"` | `aria-label` on `<button>` |
| Icon-only link | `aria-hidden="true"` | `aria-label` on `<a>` |
| Standalone informative | `role="img" aria-label="..."` | `aria-label` on `<svg>` |

### Tips

- **Use `currentColor`** so icons inherit SUI text utilities (`sui-text-primary`, `sui-text-muted`) automatically.
- **Prefer Pattern A** (decorative icon + text). SUI's core principle is that icons always accompany text labels.
- **Pattern B/C** (icon-only) should be limited to well-understood icons (close, search, menu, notifications). If users might not recognise the icon, add visible text.
- **Never use `aria-hidden="true"` on an icon-only control** without an `aria-label` on the parent — this makes the control invisible to screen readers.

---

## Icon Colour Utilities & Contrast

SUI Icons include colour utility classes that must always be paired with text — never as the sole status indicator:

```html
<!-- ✓ Correct — icon colour reinforces text -->
<svg class="sui-icon sui-icon-success" viewBox="0 0 24 24" aria-hidden="true">
  <use href="#sui-icon-status-check-circle"/>
</svg>
Approved

<!-- ✗ Wrong — colour alone, no text -->
<svg class="sui-icon sui-icon-error" viewBox="0 0 24 24" aria-hidden="true">
  <use href="#sui-icon-status-x-circle"/>
</svg>
```

Available colour classes: `.sui-icon-primary`, `.sui-icon-success`, `.sui-icon-warning`, `.sui-icon-error`, `.sui-icon-info`, `.sui-icon-muted`.

Since all SUI Icons use `currentColor`, they automatically inherit the text colour of their parent — which means they automatically meet the same contrast ratio as the surrounding text.

---

## Forced Colours Mode (Windows High Contrast)

SUI Icons ships forced colours support in `sui-icons.css`:

```css
@media (forced-colors: active) {
  .sui-icon {
    forced-color-adjust: auto;
  }
}
```

With `forced-color-adjust: auto` and `currentColor` in the SVG, icons render in the user's chosen system text colour. Without this rule, SVG fills and strokes are **not** automatically overridden by forced colours mode — icons could become invisible against the high-contrast background.

**Test with:** Windows Settings → Accessibility → Contrast themes (all four presets).

---

## Contrast Ratios

SUI's preflight validator (`npm run build`) checks 40+ foreground/background token pairs in both themes before every build. All combinations meet WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text).

Key ratios:

| Pairing | Light | Dark | Level |
|---------|-------|------|-------|
| Primary text on card | 17.9:1 | 16.0:1 | AAA |
| Secondary text on card | 7.6:1 | 6.5:1 | AAA/AA |
| Muted text on card | 5.37:1 | 5.41:1 | AA |
| Success strong on success soft | 4.8:1 | 6.5:1 | AA |
| Error strong on error soft | 5.9:1 | 5.8:1 | AA |
| White on primary button | 5.2:1 | 5.2:1 | AA |

Full contrast tables with every token pair are in the [README](../README.md#accessibility).

---

## Reduced Motion

When `prefers-reduced-motion: reduce` is set at the OS level:

- All CSS transition durations → `0ms`
- All CSS animation durations → `0ms`
- Scroll behaviour → `auto` (no smooth scrolling)
- Progress bar indeterminate animation stops
- Icon spin animation (`.sui-icon-spin`) stops — the icon remains visible

This is handled automatically by token overrides in `sui-tokens.css` and `sui-icons.css`. No configuration needed.

---

## High Contrast

When `prefers-contrast: more` is set at the OS level:

- `--sui-text-muted` and `--sui-text-secondary` darken for increased readability
- Borders on cards, inputs, and outline buttons thicken to 2px
- Focus ring outlines thicken to 4px
- Focus ring colours intensify

Works in both light and dark modes. No configuration needed.

---

## Focus Indicators

Icon buttons use `:focus-visible` (not `:focus`) — the outline appears for keyboard navigation only, not mouse clicks:

```css
.sui-icon-btn:focus-visible {
  outline: 2px solid var(--sui-blue-focus, #60a5fa);
  outline-offset: 2px;
}
```

Uses `outline` not `box-shadow` — outline survives forced-colours mode.

---

## Touch Targets

`.sui-icon-btn` enforces 44px minimum dimensions via `var(--sui-touch-target)`:

- Exceeds WCAG 2.5.8 Target Size (Minimum) — 24×24px required
- Meets WCAG 2.5.5 Target Size (Enhanced) — 44×44px required
- The icon itself can be any size (12px – 48px) — the touch target is always 44px

---

## Testing Your Implementation

### Quick Checks

1. **Tab through your entire page.** Can you reach every interactive element? Can you see where focus is?
2. **Use only your keyboard** to complete the primary task. No mouse.
3. **Zoom to 200%.** Does anything break or become inaccessible?
4. **Turn on a screen reader** (VoiceOver on Mac, NVDA on Windows). Navigate your page. Does it make sense?
5. **Simulate colour blindness** (Chrome DevTools → Rendering → Emulate vision deficiency). Can you still understand every status?

### Automated

- **Lighthouse** (Chrome DevTools → Lighthouse → Accessibility). SUI scores 100/100 on both `index.html` and `icons.html` in both themes.
- **axe-core** (`npm run axe` for index.html, `npm run axe -- icons.html` for the icon browser). 0 violations on both pages.
- **SUI Preflight** (`npm run build`). Runs 76 automated checks including ARIA validation, contrast ratios, and heading order.

### Icon-Specific Testing Checklist

- [ ] axe-core scan of icons.html: 0 violations
- [ ] VoiceOver (macOS Safari): decorative icons silent, icon buttons announced by label
- [ ] NVDA (Windows Chrome): same verification
- [ ] Windows High Contrast Black: all icons visible
- [ ] Windows High Contrast White: all icons visible
- [ ] `prefers-reduced-motion`: spin animation stops, icon remains visible
- [ ] Keyboard-only navigation: all icon buttons reachable and focusable
- [ ] 16px rendering: all icons recognisable (no detail collapse)
- [ ] 48px rendering: no visual artefacts

---

## Common Accessibility Mistakes

1. **Colour-only status.** Adding a red background without an icon and label. SUI badges require both.
2. **Missing tab ARIA.** Tabs need `role="tablist"`, `role="tab"`, and `role="tabpanel"`. SUI's JS enforces this during init, but the HTML structure must be correct.
3. **Decorative icons without `aria-hidden`.** If an icon is decorative (next to a text label), add `aria-hidden="true"` to prevent screen readers from announcing it.
4. **Custom components without focus management.** If you build a custom modal or dropdown, ensure focus is trapped, Escape closes it, and focus returns to the trigger element.
5. **Missing `data-label` on responsive tables.** SUI tables stack on mobile. Each `<td>` needs `data-label="Column Name"` so the label appears when stacked.
6. **Relying on `<title>` in SVG sprites.** `<title>` inside `<symbol>` via `<use>` does not reliably propagate to screen readers. Use `aria-label` on the interactive parent instead.
7. **Icon-only control without `aria-label`.** If you hide the icon with `aria-hidden="true"` but forget `aria-label` on the button/link, the control is invisible to screen readers.

---

*Made in Canada with love 🇨🇦*
