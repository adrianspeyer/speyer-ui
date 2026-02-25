# Design Decisions

This document explains *why* SUI works the way it does. If you've ever wondered "why doesn't SUI have X?" or "why did they do it this way?" — the answer is here.

---

## Architecture

### Why CSS-first, JS optional?

Components must render correctly without JavaScript. A button without JS is still a button. A card without JS is still a card. Even interactive components like modals and accordions should show their content (expanded) when JS fails to load.

CSS handles appearance. JS adds interactivity (open, close, toggle, animate). This means SUI works in any environment: static HTML, server-rendered pages, progressive web apps, or full SPA frameworks.

### Why no build tools?

SUI is three files loaded from a CDN. No npm install, no webpack, no Vite, no bundler. This is deliberate — it keeps the barrier to entry at "paste three `<link>`/`<script>` tags."

For developers who want build tools, the source files (`sui-tokens.css`, `sui-components.css`, `sui.js`) work fine as imports. But the CDN path is always the primary use case.

### Why under 95KB?

Every kilobyte is a tax on every page load. SUI's ceiling is 95KB total (tokens + components + JS, minified). This keeps it competitive with loading a single large framework. New features must justify their weight.

### Why borders over shadows?

Flat interfaces are more scannable. Borders separate content cleanly without implying depth hierarchy. Shadows are reserved for elements where depth communicates function: dropdowns float over content, modals float over everything, tooltips float over triggers. That's the `--sui-shadow-sm / md / lg` scale.

Cards use borders by default (`sui-card`). Shadow is opt-in (`sui-card-shadow`).

---

## Components

### Why no icon library?

SUI ships 538 purpose-built SVG icons with built-in accessibility. Icons are optional — bring-your-own is fully supported: Heroicons, Phosphor, Font Awesome, plain SVG, or anything works alongside or instead of SUI Icons.

Why? Icon libraries are 50–200KB. Including one would double SUI's size and lock developers into a specific icon style. Instead, SUI's accessibility rules (always pair icons with text labels, `aria-hidden="true"` on decorative icons) work with any icon system.

### Why no `modal.confirm()` API?

Every app's confirmation dialog is different. Some need checkboxes ("Don't show again"). Some need text input ("Type DELETE to confirm"). Some need multi-step confirmation. A rigid `confirm({ title, onConfirm })` becomes a constraint that developers fight against.

Instead, SUI provides `SUI.modal.open()` and native `<dialog>`. The [Confirmation Dialog recipe](https://adrianspeyer.github.io/speyer-ui/) shows the accessible pattern: `role="alertdialog"`, destructive action button, cancel button, return-of-focus. Five lines of app code.

### Why no popover component?

Positioning is the hard part of popovers. Where does a popover go when it's near the viewport edge? CSS `anchor()` is emerging but not production-ready. JavaScript positioning libraries (Floating UI) are 8KB+ — that's nearly 10% of SUI's budget.

SUI documents popover patterns as recipes: light popovers (enhanced dropdown, click-outside dismissal) and heavy popovers (small dialog, focus trap). When the pattern stabilises, it may become a component.

### Why `sui-card-body`, not `sui-card-content`?

Historical naming. `sui-card-body` was chosen to parallel `sui-card-header` and `sui-card-footer` (the "body" of the card, between header and footer). The class `sui-card-content` does not exist — if an AI suggests it, that's a hallucination.

### Why does `sui-card` + `sui-card-header`/`sui-card-body` cause double padding?

By design. `sui-card` has `padding: var(--sui-space-4)`. `sui-card-header` and `sui-card-body` each add their own `padding: var(--sui-space-4)`. Simple cards (just content inside `sui-card`) get one layer of padding. Structured cards (with header/body/footer) should use `sui-card-flush` on the wrapper to zero the outer padding and let the inner sections control spacing.

This isn't a bug — it's the composition model. Use `sui-card-compact` for dense layouts (KPI grids, dashboards).

---

## Tokens

### Why tokens instead of utility classes?

Utility-class systems (Tailwind, etc.) encode design decisions in HTML: `p-4 bg-white rounded-lg`. SUI encodes them in CSS custom properties: `padding: var(--sui-space-4)`. Both work. SUI chose tokens because:

1. **Theme switching is automatic.** Change `--sui-bg-card` in one place, every card updates. No `dark:bg-gray-800` classes needed.
2. **Custom CSS stays consistent.** When you write custom components with SUI tokens, they inherit theme support for free.
3. **Smaller HTML.** Component classes (`sui-card`) are one class, not five utility classes.

### Why no `--sui-text-sm` or `--sui-text-xs`?

The typography tokens are `--sui-text-small` (14px) and `--sui-text-meta` (12px). The abbreviated forms `--sui-text-sm`, `--sui-text-xs`, and `--sui-text-lg` do not exist in the token file. If you see them in code, that's a bug — they should be `--sui-text-small`, `--sui-text-meta`, and `--sui-text-h3` respectively.

---

## Accessibility

### Why is status-by-colour-alone banned?

The creator is colour blind. When AI coding assistants generate interfaces that use green for success and red for failure with no other differentiation, those interfaces are unusable for colour-blind users. SUI's constraint is structural: badge markup requires an icon element and a text label. You can't create a success badge without both.

### Why `!important` only in utilities?

`!important` is a specificity escape hatch. Using it in components creates specificity wars that are hard to debug. SUI reserves it for utility classes (`sui-hidden`, `sui-visually-hidden`, spacing utilities) where the developer is explicitly overriding component defaults. Components use normal specificity.

### Why 44px minimum touch targets?

WCAG 2.1 AA requires a minimum 44×44px touch target for interactive elements. This isn't just a mobile concern — users with motor impairments benefit from larger targets on all devices. SUI buttons, toggles, and interactive elements all meet this minimum.

---

## Process

### Why the `sui-` namespace contract?

The `sui-` prefix is a promise: if SUI doesn't have a class, you shouldn't invent one with that prefix. If you create `sui-calendar` today and SUI ships a real `sui-calendar` in v2.8 with different markup, every site using your fake class breaks on the next CDN update.

When SUI doesn't have what you need: check recipes first, compose from existing classes, use your own namespace (`app-calendar`, `my-widget`) with SUI tokens for visual consistency.

### Why Canadian English?

The creator is Canadian. Colour, behaviour, organisation, labelled, centre. This applies to documentation and comments, not to your application code.

### Why are recipes "demo page only"?

Recipes are documented composition patterns, not shipped components. Their CSS lives in `<style>` tags on the demo page. This means:

- **Zero bundle cost.** Adding a recipe doesn't increase the 95KB budget.
- **Zero maintenance commitment.** Recipes can evolve without breaking changes.
- **Clear boundary.** If something is in the bundle, it's supported. If it's a recipe, it's a starting point.

When a recipe proves essential across multiple projects, it can be promoted to a component. The promotion threshold is: "would removing this recipe force every SUI user to reinvent the same 20 lines of CSS?"
