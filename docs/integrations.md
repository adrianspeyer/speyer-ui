# Application Integration Recipes

These examples compose existing SUI styles. They add no runtime dependencies or SUI APIs. Keep the application code and generated assets in your own project; the SUI source files remain unchanged.

- [ShadowRoot installation and themes](#shadowroot-installation-and-themes)
- [Progress under a strict Content Security Policy](#progress-under-a-strict-content-security-policy)
- [React fields with separate labels and descriptions](#react-fields-with-separate-labels-and-descriptions)

## ShadowRoot installation and themes

A stylesheet in the document does not style elements inside a shadow tree. Install SUI styles inside that tree and adapt document-root selectors to the shadow host. `:host` selects the host only from a stylesheet inside its shadow tree. See [MDN's shadow DOM guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) and [`:host` reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:host).

For an independently themed widget, adapt both **tokens and components**. Components also contain dark-theme rules, including error messages and labeled progress bars. A token-only rewrite misses those rules.

### Generate an application stylesheet

Copy the pinned SUI source files into your application's `vendor/` directory. Save this as `scripts/build-widget-styles.mjs` and run `node scripts/build-widget-styles.mjs` from the application root:

```js
import { mkdir, readFile, writeFile } from 'node:fs/promises';

// These exact selector replacements match SUI 3.5.2 source assets.
// Review them when upgrading SUI; this is not a general CSS transformer.
function forShadow(css) {
  return css
    .replaceAll(':root:not([data-theme])', ':host(:not([data-theme]))')
    .replaceAll('[data-theme="dark"]', ':host([data-theme="dark"])')
    .replaceAll(':root', ':host');
}

const tokens = await readFile('vendor/sui-tokens.css', 'utf8');
const components = await readFile('vendor/sui-components.css', 'utf8');
const widgetStyles = `
:host { display: block; }
.app-widget {
  font-family: var(--sui-font-primary);
  font-size: var(--sui-text-body);
  line-height: var(--sui-leading-body);
  color: var(--sui-text-primary);
  background: var(--sui-bg-primary);
  padding: var(--sui-space-3);
}
`;

await mkdir('public/widget', { recursive: true });
await writeFile('public/widget/sui-shadow.css',
  forShadow(tokens) + '\n' + forShadow(components) + widgetStyles);
```

The wrapper supplies the typography normally provided by SUI's `body` rule, which does not match inside a shadow tree. The source selectors for automatic dark mode, reduced motion and higher contrast retain their media queries. Use this recipe with one theme on the host; nested theme regions need their own selector strategy.

### Install inside the shadow tree

Serve `public/` as your application's web root. Add the host and external module to a page:

```html
<div id="help-widget" data-theme="light"></div>
<script type="module" src="/widget/widget.js"></script>
```

Save the following as `public/widget/widget.js`. It waits for the stylesheet before inserting the widget content:

```js
const host = document.getElementById('help-widget');
const root = host.attachShadow({ mode: 'open' });
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '/widget/sui-shadow.css';

await new Promise((resolve, reject) => {
  link.addEventListener('load', resolve, { once: true });
  link.addEventListener('error', () => reject(new Error('Widget CSS failed to load')),
    { once: true });
  root.append(link);
});

const content = document.createElement('section');
content.className = 'app-widget';
content.setAttribute('aria-label', 'Help');
// Static application markup; use textContent for untrusted content.
content.innerHTML = `
  <div class="sui-card">
    <h2>How can we help?</h2>
    <p>Search our help articles or contact support.</p>
  </div>
`;
root.append(content);

export function setWidgetTheme(mode) {
  if (!['light', 'dark', 'auto'].includes(mode)) {
    throw new TypeError('Expected light, dark or auto');
  }
  if (mode === 'auto') host.removeAttribute('data-theme');
  else host.setAttribute('data-theme', mode);
}
```

Set `data-theme="light"` or `data-theme="dark"` **on the host**. For system preference, remove the attribute; `data-theme="auto"` does not match SUI's automatic-theme selector. The widget owns this preference independently of the embedding document. If it should follow an application theme, call `setWidgetTheme()` whenever that application's preference changes.

This is a CSS installation recipe, not a promise of full toolkit compatibility with shadow DOM. `SUI.init()` scans the document, `SUI.theme` targets `document.documentElement`, and some toolkit behaviours query document-level panels or focus. Use native HTML or application/framework handlers inside the widget. Scope queries to `root` and manage focus, events and overlays there. Do not assume loading `sui.js` will initialise shadow-tree controls.

Shadow DOM isolates internal selectors, but inherited properties and custom properties can still enter through the host, and the embedding page can style the host itself. Host placement, sizing and stacking remain application concerns. If using icons, install the icon stylesheet and sprite within the same tree. External stylesheet and script URLs must also be allowed by the embedding page's CSP.

## Progress under a strict Content Security Policy

For a checklist with a finite number of states, map a data attribute to widths in an external stylesheet. The existing `sui-progress` and `sui-progress-bar` classes supply the presentation. No inline styles, inline event handlers or new progress component are needed.

This example is compatible with the following response header when all assets are served from the same origin:

```http
Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; style-src-attr 'none'; base-uri 'none'; object-src 'none'
```

`style-src-attr 'none'` blocks style attributes; external stylesheets are allowed here by `style-src 'self'`. See [MDN's CSP directive reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src-attr). This example does not establish CSP compatibility for every SUI JavaScript feature.

### HTML

```html
<link rel="stylesheet" href="/vendor/sui-tokens.css">
<link rel="stylesheet" href="/vendor/sui-components.css">
<link rel="stylesheet" href="/launch.css">
<script src="/launch.js" defer></script>

<h2 id="launch-label">Launch checklist</h2>
<div id="launch-progress" class="sui-progress app-launch-progress"
     role="progressbar" aria-labelledby="launch-label"
     aria-valuemin="0" aria-valuemax="4" aria-valuenow="0"
     aria-valuetext="0 of 4 steps complete" data-complete="0">
  <div class="sui-progress-bar"></div>
</div>
<p id="launch-status" role="status">0 of 4 steps complete</p>
<button id="launch-next" type="button" class="sui-btn sui-btn-primary">
  Complete next step
</button>
```

### `launch.css`

```css
.app-launch-progress > .sui-progress-bar { width: 0; }
.app-launch-progress[data-complete="1"] > .sui-progress-bar { width: 25%; }
.app-launch-progress[data-complete="2"] > .sui-progress-bar { width: 50%; }
.app-launch-progress[data-complete="3"] > .sui-progress-bar { width: 75%; }
.app-launch-progress[data-complete="4"] > .sui-progress-bar { width: 100%; }
```

### `launch.js`

```js
const progress = document.getElementById('launch-progress');
const status = document.getElementById('launch-status');
const next = document.getElementById('launch-next');

function renderProgress(completed) {
  if (!Number.isInteger(completed) || completed < 0 || completed > 4) {
    throw new RangeError('Expected an integer from 0 to 4');
  }
  const text = `${completed} of 4 steps complete`;
  progress.dataset.complete = String(completed);
  progress.setAttribute('aria-valuenow', String(completed));
  progress.setAttribute('aria-valuetext', text);
  status.textContent = text;
  next.disabled = completed === 4;
}

// Demo state. In an application, derive completion from the actual checklist.
let completed = 0;
next.addEventListener('click', () => renderProgress(++completed));
renderProgress(completed);
```

Keep the visual width, numeric ARIA value and visible status in the same update. The status region communicates changes without relying on colour. This five-state mapping is suitable for a four-step checklist, not arbitrary continuous percentages. Add explicit states for a different finite workflow, or choose another application-level progress strategy for continuous values.

## React fields with separate labels and descriptions

Use the existing input classes in your React application; SUI does not ship a React component package. React owns the value, validation and submission. A `<label htmlFor>` supplies the accessible name, while hint and error elements outside the label supply the description through `aria-describedby`.

React's [`useId`](https://react.dev/reference/react/useId) provides IDs for these relationships across repeated component instances. Keep the server and client tree consistent when hydrating; for multiple independent React roots, use distinct `identifierPrefix` values in your React root setup.

```jsx
import { useId, useState } from 'react';

export function TextField({
  id,
  label,
  hint,
  error,
  className = '',
  'aria-describedby': describedBy,
  ...inputProps
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const description = [describedBy, hint ? hintId : null, error ? errorId : null]
    .filter(Boolean).join(' ') || undefined;

  return (
    <div className="sui-input-group">
      <label className="sui-input-label" htmlFor={inputId}>{label}</label>
      <input
        {...inputProps}
        id={inputId}
        className={`sui-input ${error ? 'sui-input-error' : ''} ${className}`}
        aria-describedby={description}
        aria-invalid={error ? true : undefined}
      />
      {hint && <p className="sui-input-hint" id={hintId}>{hint}</p>}
      {error && (
        <p className="sui-input-error-msg" id={errorId}>
          <span aria-hidden="true">!</span> Error: {error}
        </p>
      )}
    </div>
  );
}

export default function NameForm() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const error = submitted && !name.trim() ? 'Enter your display name.' : undefined;

  function submit(event) {
    event.preventDefault();
    setSubmitted(true);
    if (!name.trim()) {
      event.currentTarget.elements.namedItem('displayName').focus();
      return;
    }
    // Submit through your application's authenticated save handler.
  }

  return (
    <form onSubmit={submit} noValidate>
      <TextField
        name="displayName"
        label="Display name"
        hint="Shown to other members."
        required
        value={name}
        onChange={event => setName(event.target.value)}
        error={error}
      />
      <button type="submit" className="sui-btn sui-btn-primary sui-mt-3">Save</button>
    </form>
  );
}
```

The input's accessible name is “Display name”; its hint and any current error are separate descriptions. Only rendered hint/error IDs are referenced. If you provide an explicit `id`, it must be unique on the page. Keep error text concise and provide a form-level announcement or error summary when validating several fields; focus and announcement strategy remain application responsibilities.
