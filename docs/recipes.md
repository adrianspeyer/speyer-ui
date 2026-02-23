# Recipes Guide

Recipes are documented composition patterns that show how to combine SUI components for common application layouts. They live on the [demo page](https://adrianspeyer.github.io/speyer-ui/) with live examples and copy-paste code.

---

## Philosophy

**Components ship in the bundle. Recipes don't.**

A recipe is a documented pattern — typically 4–20 lines of custom CSS plus SUI component markup. Recipe CSS lives in `<style>` tags on the demo page. This means:

- **Zero bundle cost.** Adding recipes doesn't increase SUI's 95KB budget.
- **Zero maintenance commitment.** Recipes can change between versions without breaking your app.
- **Starting points, not contracts.** Copy a recipe, modify it for your needs. It's guidance, not a dependency.

**When does a recipe become a component?** When the same pattern appears in every SUI project and removing it would force every developer to reinvent the same 20 lines of CSS. Integration recipes (Chart.js, Flatpickr, etc.) stay as recipes permanently — they depend on third-party libraries.

---

## Before You Build Custom

Check this list first. The pattern you need may already be documented:

### Application Patterns

| Recipe | What it solves | Custom CSS | Demo |
|--------|---------------|------------|------|
| **Inline Edit** | Click-to-edit fields with save/cancel | ~4 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-inline-edit) |
| **Kanban Board** | Horizontal scrolling card columns | ~6 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-kanban) |
| **Split Pane** | Two-panel layout (list + detail) | ~8 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-split-pane) |
| **Settings** | Preferences page with toggles | ~4 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-settings) |
| **Blog Post** | Article with prose, meta, avatar | ~4 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-blog-post) |
| **Document Library** | File list with badges and avatars | ~6 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-doc-library) |
| **App Shell** | Multi-screen mobile app with tab nav | 0 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-app-shell) |
| **Profile Page** | User profile with stats and activity | ~8 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-profile-page) |
| **Button Group** | Single-select option grid with radiogroup ARIA | ~10 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-button-group) |
| **Action Sheet** | Mobile action menu via bottom sheet | ~15 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-action-sheet) |
| **Search Bar** | Input + action button, non-wrapping | ~4 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-search-bar) |
| **Inline Selection Bar** | Selection count + actions above content | ~6 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-inline-selection-bar) |
| **Command Palette** | ⌘K dialog with search input + results | ~10 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-command-palette) |
| **Confirmation Dialog** | `role="alertdialog"` destructive action | 0 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-confirm) |
| **App Shell Scaffold** | Responsive topbar + sidenav + main content | ~15 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-app-shell-scaffold) |

### Navigation Patterns

| Recipe | What it solves | Custom CSS | Demo |
|--------|---------------|------------|------|
| **Sidenav Search** | Real-time filter for sidenav links | ~20 lines JS | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-sidenav-search) |
| **Sidenav Context** | Auto-collapse inactive groups | ~15 lines JS | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-sidenav-context) |

### Panel & Overlay Patterns

| Recipe | What it solves | Custom CSS | Demo |
|--------|---------------|------------|------|
| **Panel Push Mode** | Content resizes instead of overlay | ~8 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-push-mode) |
| **Master-Detail** | Table row click → panel detail (CRM pattern) | ~10 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-master-detail) |
| **Notification Centre** | Bell icon → panel with notification cards | ~8 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-notification-centre) |
| **Floating Action Bar** | Sticky toolbar for bulk/batch actions | ~6 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-fab) |
| **Stepper / Wizard** | Multi-step form with progress | ~10 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-stepper) |
| **Panel Polish** | Header/footer/sizing + CRM detail drawer | ~10 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-panel-polish) |
| **Popover** | Light (click-outside) and heavy (focus-trap) | ~12 lines | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-popover) |

### Integration Recipes

These make third-party widgets SUI-native using token-based CSS overrides. SUI provides the tokens and theme awareness; you bring the library.

| Library | What it does | Tested Version | Demo |
|---------|-------------|----------------|------|
| **Chart.js** | Bar, line, pie charts with SUI token colours | v4.x | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-chartjs) |
| **FilePond** | File upload with drag-and-drop | v4.32.11 | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-filepond) |
| **Flatpickr** | Date picker, range, datetime | v4.6.13 | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-flatpickr) |
| **Quill** | Rich text editor (Snow theme) | v2.0.3 | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-quill) |
| **Tom Select** | Enhanced select, autocomplete, tagging | v2.5.1 | [View →](https://adrianspeyer.github.io/speyer-ui/#recipe-tom-select) |

---

## Table Modifiers — Quick Reference

SUI tables have several modifiers that combine freely. Here's what to reach for:

| Modifier | What it does | When to use it |
|----------|-------------|----------------|
| `.sui-table-wrap` | Scrollable container for wide tables | Always wrap `<table>` in this |
| `.sui-table-sticky` | Sticky `<thead>` when scrolling long tables | Tables with 10+ rows in a scrollable container |
| `.sui-table-stack` | Card-stacks rows at tablet (768px) instead of default 520px | Tables viewed primarily on tablets |
| `.sui-table-sortable` | Sort indicators via `th[data-sort="asc\|desc\|none"]` | Sortable columns (you provide sort logic) |
| `.sui-table-dense` | Compact padding | Data-heavy admin tables. Caution: may fall below 44px touch target |
| `tr.is-selected` | Highlighted row (soft blue background) | Multi-select, batch actions |
| `.sui-table-interactive` | Clickable rows with hover + focus ring | Master-detail patterns (add `tabindex="0"` + `role="link"`) |

**Mobile stacking:** Add `data-label="Column Name"` to every `<td>` for automatic card-style layout on small screens.

**Combining modifiers:** All modifiers can be combined. Example: `.sui-table.sui-table-sticky.sui-table-sortable.sui-table-dense` gives you a compact, scrollable, sortable table with a pinned header.

→ [Live demos](https://adrianspeyer.github.io/speyer-ui/#comp-tables)

---

## Choosing the Right Pattern

### "I need a sidebar with navigation"
→ Use `sui-sidenav` (component). For search filtering, add the **Sidenav Search** recipe. For context-aware group collapsing, add the **Sidenav Context** recipe.

### "I need a table where clicking a row shows details"
→ **Master-Detail** recipe. Uses `sui-table-interactive` for the table and `sui-panel` for the detail view.

### "I need a mobile-first app with tab navigation"
→ **App Shell** recipe. Uses `sui-screen` for the viewport, `sui-segmented` for bottom tabs, multiple `sui-screen` siblings with `.is-active` toggling.

### "I need a date picker / file upload / rich text editor"
→ Check the **Integration Recipes**. SUI provides token overrides, you bring the library via CDN.

### "I need a search bar with an action button"
→ **Search Bar** recipe. Flex composition of `sui-input` + `sui-btn`, stays inline at all breakpoints.

### "I need to show bulk actions when rows are selected"
→ **Inline Selection Bar** recipe. Count + action buttons above content. Pair with `.is-selected` table row state.

### "I need a command palette (⌘K)"
→ **Command Palette** recipe. Uses `<dialog>` + `sui-input` + `sui-kbd`. You provide the search logic.

### "I need a confirmation dialog for destructive actions"
→ **Confirmation Dialog** recipe. Uses `role="alertdialog"` + `sui-btn-danger`. There is no `SUI.modal.confirm()`.

### "I need a responsive app shell with topbar and sidebar"
→ **App Shell Scaffold** recipe. Uses `app-*` classes (not `sui-*`) composing `sui-topbar` + `sui-sidenav`. Note: `sui-layout` and `sui-main` do **not** exist.

### "I need a popover or dropdown with form content"
→ **Popover** recipe. Light variant (no focus trap) for filters; heavy variant (focus trap) for quick-add forms.

### "I need something SUI doesn't have"
1. Check if a recipe covers it (this page)
2. Compose from existing SUI components with custom CSS using `--sui-*` tokens
3. Use your own namespace (`app-calendar`, `my-widget`) — never invent `sui-*` classes
4. If the pattern is common, [open an issue](https://github.com/adrianspeyer/speyer-ui/issues) — it might become a recipe or component

---

## Version History

**v2.6.0** added 7 recipes: Search Bar, Inline Selection Bar, Command Palette, Confirmation Dialog, Panel Polish, Popover, App Shell Scaffold. Total: 29 recipes (22 application/navigation + 5 integration + 2 promoted to component).
