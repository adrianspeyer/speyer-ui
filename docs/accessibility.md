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

SUI ships 483 first-party icons with built-in accessibility. If you use SUI Icons, the `sui-icon` class handles sizing and `currentColor` inheritance. If you bring your own icons (Heroicons, Phosphor, Font Awesome, inline SVG), the same three patterns apply.

### 1. Decorative icon (icon + visible text)

The most common pattern. The text already conveys meaning, so the icon is decorative. **Hide the icon from screen readers.**

```html
<span class="sui-badge sui-badge-success">
  <span aria-hidden="true"><!-- icon (any library) --></span>
  Active
</span>

<button class="sui-btn sui-btn-primary" type="button">
  <svg aria-hidden="true" focusable="false"><!-- icon --></svg>
  Save Changes
</button>
```

### 2. Icon-only control (no visible text)

Buttons or links with only an icon. **Label the control, hide the icon.**

```html
<button class="sui-btn sui-btn-ghost sui-btn-sm" type="button"
        aria-label="Notifications">
  <svg aria-hidden="true" focusable="false"><!-- bell icon --></svg>
</button>

<button class="sui-btn sui-btn-ghost sui-btn-sm" type="button"
        aria-label="Close panel">
  <svg aria-hidden="true" focusable="false"><!-- x icon --></svg>
</button>
```

The `aria-label` goes on the **button**, not on the icon. `focusable="false"` prevents SVGs from appearing in the tab order in Internet Explorer and older Edge.

### 3. Meaningful standalone icon (rare)

An icon displayed outside an interactive control where no visible text explains it. **Label the icon itself.**

```html
<svg role="img" aria-label="Warning" focusable="false">
  <!-- icon paths -->
</svg>
```

Use `role="img"` + `aria-label` on the SVG. Do **not** combine `aria-label` with a `<title>` element inside the same SVG — this causes duplicate announcements in some screen readers. If you prefer `<title>`, use `aria-labelledby` to reference it instead.

### Tips

- **Use `currentColor`** so icons inherit SUI text utilities (`sui-text-primary`, `sui-text-muted`) automatically.
- **Prefer Pattern 1** (decorative icon + text). SUI's core principle is that icons always accompany text labels.
- **Pattern 2** (icon-only) should be limited to well-understood icons (close, search, menu, notifications). If users might not recognise the icon, add visible text.
- **Never use `aria-hidden="true"` on an icon-only control** without an `aria-label` on the parent — this makes the control invisible to screen readers.

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

This is handled automatically by token overrides in `sui-tokens.css`. No configuration needed.

---

## High Contrast

When `prefers-contrast: more` is set at the OS level:

- `--sui-text-muted` and `--sui-text-secondary` darken for increased readability
- Borders on cards, inputs, and outline buttons thicken to 2px
- Focus ring outlines thicken to 4px
- Focus ring colours intensify

Works in both light and dark modes. No configuration needed.

---

## Testing Your Implementation

### Quick Checks

1. **Tab through your entire page.** Can you reach every interactive element? Can you see where focus is?
2. **Use only your keyboard** to complete the primary task. No mouse.
3. **Zoom to 200%.** Does anything break or become inaccessible?
4. **Turn on a screen reader** (VoiceOver on Mac, NVDA on Windows). Navigate your page. Does it make sense?
5. **Simulate colour blindness** (Chrome DevTools → Rendering → Emulate vision deficiency). Can you still understand every status?

### Automated

- **Lighthouse** (Chrome DevTools → Lighthouse → Accessibility). SUI's demo page scores 100/100 in both themes.
- **SUI Preflight** (`npm run build`). Runs 66 automated checks including ARIA validation, contrast ratios, and heading order.

### What the Preflight Catches

- Missing button names, image alt text, link text
- Heading order violations (H1 → H3 skip)
- Duplicate IDs
- Focusable elements inside `aria-hidden="true"` containers
- Missing ARIA attributes on tabs, steppers, and interactive tables
- Contrast ratio failures across 40+ token pairs
- Version consistency across files

---

## Common Accessibility Mistakes

1. **Colour-only status.** Adding a red background without an icon and label. SUI badges require both.
2. **Missing tab ARIA.** Tabs need `role="tablist"`, `role="tab"`, and `role="tabpanel"`. SUI's JS enforces this during init, but the HTML structure must be correct.
3. **Decorative icons without `aria-hidden`.** If an icon is decorative (next to a text label), add `aria-hidden="true"` to prevent screen readers from announcing it.
4. **Custom components without focus management.** If you build a custom modal or dropdown, ensure focus is trapped, Escape closes it, and focus returns to the trigger element.
5. **Missing `data-label` on responsive tables.** SUI tables stack on mobile. Each `<td>` needs `data-label="Column Name"` so the label appears when stacked.
