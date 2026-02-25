# JavaScript API Reference

SUI's JavaScript (`sui.js`) is optional. Components render correctly without it — they just won't open, close, or animate. When included, it auto-initialises interactive behaviours via `data-sui-*` attributes.

**Current version:** 3.3.1
**Bundle size:** ~26KB minified
**Dependencies:** Zero

---

## Supported Public API

This table documents every public method developers should call directly. Methods not listed (such as module-level `init()` helpers) exist for internal auto-initialisation via `SUI.init()` and are not part of the supported surface.

**Verification standard:** Every method in this table has been confirmed present in both `sui.js` (source) and `dist/sui.min.js` (built output). If a method is not in this table, do not assume it exists.

| Module | Public Methods | Since |
|--------|---------------|-------|
| `SUI.theme` | `set(mode)`, `toggle()`, `current()`, `resolved()` | v2.0, resolved v2.6.0 |
| `SUI.tabs` | `activate(el)`, `destroy(navEl)` | v2.5.1, destroy v3.2.0 |
| `SUI.accordion` | `toggle(trigger)`, `expandAll(container)`, `collapseAll(container)`, `destroy(container)` | v2.5.1, destroy v3.2.0 |
| `SUI.dropdown` | `open(el)`, `close(el)`, `toggle(el)`, `destroy(el)` | v2.5.1, destroy v3.2.0 |
| `SUI.modal` | `open(sel)`, `close(sel)` | v2.0 |
| `SUI.toast` | `show(opts)`, `success(t, m)`, `error(t, m)`, `warning(t, m)`, `info(t, m)`, `dismiss(el)`, `clearAll()` | v2.5.1, dismiss/clearAll v2.6.0 |
| `SUI.tooltip` | `show(el)`, `hide(el)`, `destroy(el)` | v2.6.0, destroy v3.2.0 |
| `SUI.avatar` | `colorFor(text)`, `destroy(el)` | v2.5.0, destroy v3.2.0 |
| `SUI.copy` | `text(str)`, `fromElement(sel)` | v2.5.0 |
| `SUI.sheet` | `open(sel)`, `close(sel)`, `toggle(sel)` | v2.0 |
| `SUI.segmented` | `select(el)`, `destroy(container)` | v2.6.0, destroy v3.2.0 |
| `SUI.sidenav` | `open(sel)`, `close(sel)`, `toggle(sel)`, `expandAll(nav)`, `collapseAll(nav)`, `isOpen(sel)` | v2.5.0, isOpen v2.6.0 |
| `SUI.panel` | `open(sel)`, `close(sel)`, `toggle(sel)`, `isOpen(sel)` | v2.5.0, isOpen v2.6.0 |

---

## Auto-init Attributes

Drop these on HTML elements. SUI's `init()` wires up the behaviour automatically on page load.

| Attribute | Effect |
|-----------|--------|
| `data-sui-theme` | Toggles light/dark/auto on click |
| `data-sui-modal="#id"` | Opens modal on click |
| `data-sui-modal-close` | Closes nearest parent dialog/overlay on click (v2.7.0) |
| `data-sui-sheet="#id"` | Opens bottom sheet on click |
| `data-sui-copy="#id"` | Copies element text on click |
| `data-sui-dropdown-trigger` | Opens parent dropdown on click |
| `data-tab="name"` | Tab button (inside `[role="tablist"]`) |
| `data-view="name"` | Tab panel (matches `data-tab` value) |

---

## Module Details

### SUI.theme

Controls light/dark/auto mode. Persists preference in `localStorage`.

```javascript
SUI.theme.set('dark');    // 'light', 'dark', or 'auto'
SUI.theme.toggle();       // Flips between light and dark based on current visual state
SUI.theme.current();      // Returns stored preference: 'light', 'dark', or 'auto'
SUI.theme.resolved();     // Returns actual rendered theme: always 'light' or 'dark'
```

**Important:** `current()` returns the *stored preference*, which may be `'auto'`. Use `resolved()` when you need the actual rendered theme (e.g., for Chart.js colour configuration).

### SUI.modal

Opens and closes `<dialog>` elements.

```javascript
SUI.modal.open('#my-modal');
SUI.modal.close('#my-modal');
```

Accepts a CSS selector string or a DOM element. Manages focus trapping, Escape to close, and overlay click dismissal.

**There is no `SUI.modal.confirm()` or `SUI.modal.prompt()`.** Confirmation dialogs are app-specific — use the [Confirmation Dialog recipe](https://adrianspeyer.github.io/speyer-ui/#recipe-confirm) instead.

### SUI.toast

Stackable notification toasts. Auto-dismiss after timeout (default 4 seconds).

```javascript
// Full control
const el = SUI.toast.show({
  title: 'Saved',
  message: 'Your changes have been saved.',
  type: 'success',        // 'success', 'error', 'warning', 'info'
  duration: 4000           // milliseconds (0 = no auto-dismiss)
});

// Convenience methods (return the toast DOM element)
SUI.toast.success('Saved!', 'Your changes have been saved.');
SUI.toast.error('Upload failed', 'File exceeds 10MB limit.');
SUI.toast.warning('Session expiring', 'You will be logged out in 5 minutes.');
SUI.toast.info('Update available', 'A new version is ready.');
```

**Programmatic dismissal:**

```javascript
const el = SUI.toast.success('Saved!');
SUI.toast.dismiss(el);    // Dismiss a single toast
SUI.toast.clearAll();      // Dismiss all active toasts (useful for navigation/logout)
```

**Accessibility:** Error toasts (`type: 'error'`) automatically get `aria-live="assertive"` for immediate screen reader announcement. All other types use `polite` via the container.

### SUI.tabs

Programmatic tab switching. Works with the `data-tab` / `data-view` attribute pattern.

```javascript
SUI.tabs.activate(tabElement);  // Pass a [role="tab"] element or selector
```

The tab must be inside a `[role="tablist"]` container. `activate()` updates ARIA states and shows the corresponding `data-view` panel.

**Teardown:**

```javascript
SUI.tabs.destroy(navElement);  // Pass the [role="tablist"] element
```

Removes all SUI event listeners from the tab navigation and resets the initialisation flag, allowing safe re-init or DOM removal. See [Lifecycle: destroy()](#lifecycle-destroy) below.

### SUI.accordion

Toggle, expand, or collapse accordion sections.

```javascript
SUI.accordion.toggle(triggerElement);          // Toggle one section
SUI.accordion.expandAll(containerElement);     // Open all sections
SUI.accordion.collapseAll(containerElement);   // Close all sections
```

**Teardown:**

```javascript
SUI.accordion.destroy(containerElement);  // Remove all SUI listeners from accordion
```

See [Lifecycle: destroy()](#lifecycle-destroy) below.

### SUI.dropdown

Click-to-open dropdown menus with outside-click dismissal.

```javascript
SUI.dropdown.open(element);    // Open programmatically
SUI.dropdown.close(element);   // Close programmatically
SUI.dropdown.toggle(element);  // Toggle state
```

ARIA: trigger gets `aria-haspopup` + `aria-expanded`, menu gets `role="menu"`, items get `role="menuitem"`. Keyboard: arrow keys navigate items, Escape closes.

**Teardown:**

```javascript
SUI.dropdown.destroy(element);  // Closes if open, then removes all SUI listeners
```

If the dropdown is currently open, `destroy()` closes it first (removing the outside-click handler) before tearing down. See [Lifecycle: destroy()](#lifecycle-destroy) below.

### SUI.sheet

Bottom sheet (mobile action menus, mobile filters).

```javascript
SUI.sheet.open('#my-sheet');
SUI.sheet.close('#my-sheet');
SUI.sheet.toggle('#my-sheet');
```

Markup note: include a close button inside the sheet using the JS hook class `.sui-sheet-close` (for example, a `button` that also has `sui-btn` classes for styling).

### SUI.panel

Slide-over side panels (detail views, settings, notifications).

```javascript
SUI.panel.open('#my-panel');
SUI.panel.close('#my-panel');
SUI.panel.toggle('#my-panel');
SUI.panel.isOpen('#my-panel');   // Returns true if panel is open
```

### SUI.sidenav

Collapsible sidebar navigation with group expand/collapse.

```javascript
SUI.sidenav.open('#my-sidenav');
SUI.sidenav.close('#my-sidenav');
SUI.sidenav.toggle('#my-sidenav');
SUI.sidenav.expandAll('#my-sidenav');     // Open all groups
SUI.sidenav.collapseAll('#my-sidenav');   // Collapse all groups
SUI.sidenav.isOpen('#my-sidenav');          // Returns true if mobile overlay is open
```

**Desktop behaviour:** On viewports ≥769px, sidenav is a sticky sidebar. `open()` / `close()` control the mobile overlay state.


### SUI.tooltip

Programmatic tooltip visibility for onboarding flows, guided tours, or contextual help.

```javascript
SUI.tooltip.show('.my-tooltip');   // Show tooltip programmatically
SUI.tooltip.hide('.my-tooltip');   // Remove programmatic visibility
```

**Advisory hide:** If the user is hovering or focusing the tooltip trigger, CSS takes precedence and the tooltip stays visible. Programmatic `hide()` only removes the programmatic reveal. Dismiss on Escape is automatic.

**Teardown:**

```javascript
SUI.tooltip.destroy(element);  // Removes reposition logic and all SUI listeners
```

Cleans up the stored reposition handler and all event listeners. See [Lifecycle: destroy()](#lifecycle-destroy) below.

### SUI.segmented

Programmatic selection of segmented control options.

```javascript
SUI.segmented.select('.my-segment');  // Select a segment (moves focus)
```

Matches the `SUI.tabs.activate()` pattern. The selected segment must be inside a `.sui-segmented` container.

**Teardown:**

```javascript
SUI.segmented.destroy(containerElement);  // Removes selection logic and all SUI listeners
```

Cleans up the stored selection handler and all event listeners. See [Lifecycle: destroy()](#lifecycle-destroy) below.
### SUI.copy

Clipboard operations with async API fallback.

```javascript
SUI.copy.text('Hello, world!');        // Copy a string
SUI.copy.fromElement('#my-code');      // Copy an element's text content
```

**There is no `SUI.utils.copy()` or `SUI.utils` namespace.** The module is `SUI.copy` directly.

### SUI.avatar

Deterministic colour assignment from text (initials, names).

```javascript
const colour = SUI.avatar.colorFor('AS');  // Returns a hex colour
```

Uses a hash of the input string to select from a curated palette. Same input always produces the same colour.

**Teardown:**

```javascript
SUI.avatar.destroy(element);  // Resets the initialisation flag
```

Unlike other modules, avatar has no event listeners to remove — `destroy()` only clears the `_suiInit` flag so the element can be re-initialised with new content. See [Lifecycle: destroy()](#lifecycle-destroy) below.

---

## Lifecycle: destroy()

Six modules support `destroy()` for safe teardown — useful for SPAs, dynamic content removal, or re-initialisation after DOM changes. Added in v3.2.0.

| Module | `destroy()` parameter | Extra behaviour |
|--------|-----------------------|-----------------|
| `SUI.tabs` | `navEl` — the `[role="tablist"]` element | Removes click and keyboard listeners |
| `SUI.accordion` | `container` — the accordion wrapper | Removes click and keyboard listeners |
| `SUI.dropdown` | `el` — the `.sui-dropdown` element | Closes first if currently open |
| `SUI.tooltip` | `el` — the `.sui-tooltip` element | Clears stored reposition handler |
| `SUI.avatar` | `el` — the `.sui-avatar` element | Resets init flag only (no listeners) |
| `SUI.segmented` | `container` — the `.sui-segmented` element | Clears stored selection handler |

**What destroy() does:**

1. Removes all event listeners registered via SUI's internal handler tracking (`suiOn`/`suiOff` pattern)
2. Clears the `_suiInit` flag, allowing `SUI.init()` to re-initialise the element
3. Cleans up any stored references (`_suiSetView`, `_suiReposition`, `_suiSetValue`)

**What destroy() does NOT do:**

- Does not remove the DOM element
- Does not reset ARIA attributes added during init
- Does not remove inline styles (e.g., avatar background colour)

**Usage pattern (SPA route change):**

```javascript
// Before removing a section from the DOM
const nav = document.querySelector('#my-tabs [role="tablist"]');
SUI.tabs.destroy(nav);
nav.closest('#my-tabs').remove();

// After inserting new dynamic content
document.getElementById('app').innerHTML = newHTML;
SUI.init();  // Safe — destroyed elements won't double-init
```

All `destroy()` methods accept either a CSS selector string or a DOM element, consistent with SUI's [Selector Resolution](#selector-resolution) pattern.

---

## Selector Resolution

All methods that accept `el` or `sel` parameters work with both CSS selector strings and DOM elements:

```javascript
SUI.modal.open('#my-modal');              // String selector
SUI.modal.open(document.querySelector('#my-modal'));  // DOM element
```

---

## Global Initialisation

On page load with `defer`, SUI auto-initialises all components:

```javascript
// Runs automatically — you don't need to call this
SUI.init();
```

If you add dynamic content after page load, call `SUI.init()` to initialise new components. It's safe to call multiple times — already-initialised components are skipped.

---

## Classes and Methods That Do NOT Exist

Do not invent or reference these — they are common AI hallucinations:

| Hallucinated name | Reality / correct approach |
|---|---|
| `sui-card-content` | Use `sui-card-body` |
| `SUI.icons.*` | No JS API for icons — they're pure CSS + SVG |
| `sui-layout` / `sui-main` / `sui-layout-body` | Not shipped. Use App Shell Scaffold recipe (`app-*` classes). |
| `sui-dialog-xl` / `sui-modal-xl` | Not shipped. Use `--sui-panel-width` for wide detail surfaces. |
| `SUI.utils.*` | No `utils` namespace. Modules are top-level: `SUI.copy`, `SUI.modal`, etc. |
| `SUI.modal.confirm()` / `SUI.modal.prompt()` | Not shipped. Use Confirmation Dialog recipe. |
| `SUI.toast.close()` | Not shipped. Toasts use `SUI.toast.dismiss(el)` or `SUI.toast.clearAll()`. |
| `data-sui-toast-close` | Not shipped. Toast close uses `.sui-toast-close` (internal) + `SUI.toast.dismiss()`. |
| `data-sui-modal-dismiss` | Not shipped. Use `[data-sui-modal-close]` — close ≠ dismiss. |
| `SUI.animate()` | Not shipped. SUI uses CSS transitions; use WAAPI in app code. |
| `--sui-font` | Use `--sui-font-primary` or `--sui-font-mono`. |
| `--sui-weight-normal` | Use `--sui-weight-regular`. |
| `--sui-text-h4` | Does not exist. Heading tokens stop at `--sui-text-h3`. |
