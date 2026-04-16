# Getting Started

SUI is three files. No npm, no bundler, no configuration. This guide gets you from zero to a working page in under 5 minutes.

---

## 1. Add SUI to Your Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>

  <!-- SUI (CDN) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-tokens.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-components.min.css">
  <script src="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui.min.js" defer></script>

  <!-- SUI Icons (optional — or bring your own) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-icons.min.css">
</head>
<body>
  <!-- Load icon sprite -->
  <script defer>
    fetch('https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-icons.min.svg')
      .then(r => r.text())
      .then(svg => { const d = document.createElement('div'); d.style.display = 'none'; d.innerHTML = svg; document.body.prepend(d); });
  </script>
  <h1>Hello, SUI</h1>
</body>
</html>
```

That's it. Three CSS/JS tags for SUI, one optional CSS + sprite loader for icons.

### Version Pinning

`@latest` always serves the newest release. To pin a specific version:

```html
<!-- Pin to v3.0.0 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@3.4.0/dist/sui-tokens.min.css">
```

---

## 2. Your First Component

Add a button:

```html
<button class="sui-btn sui-btn-primary">
  <svg class="sui-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#sui-icon-act-plus"/></svg> Create Project
</button>
```

Add a status badge:

```html
<span class="sui-badge sui-badge-success">
  <svg class="sui-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#sui-icon-status-check-circle"/></svg> Active
</span>
```

Add an alert:

```html
<div class="sui-alert sui-alert-error" role="alert">
  <span class="sui-alert-icon" aria-hidden="true">
    <svg class="sui-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#sui-icon-status-x-circle"/></svg>
  </span>
  <div class="sui-alert-content">
    <div class="sui-alert-title">Upload failed</div>
    <div>File exceeds the 10MB limit.</div>
  </div>
</div>
```

Notice the pattern: every status element has an icon AND a text label. This is SUI's core accessibility constraint.

---

## 3. Your First Page

A simple settings page:

```html
<body style="background: var(--sui-bg-primary);">

  <!-- Top bar -->
  <header class="sui-topbar">
    <div class="sui-brand">
      <span class="sui-brand-name">My App</span>
    </div>
    <div class="sui-topbar-actions">
      <button class="sui-btn sui-btn-ghost" data-sui-theme>
        <svg class="sui-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#sui-icon-ui-moon"/></svg> Theme
      </button>
    </div>
  </header>

  <!-- Content -->
  <main class="sui-section" id="main">
    <div class="sui-section-head">
      <h1>Settings</h1>
      <p class="sui-text-muted">Manage your account preferences.</p>
    </div>

    <div class="sui-card sui-card-lg">
      <div class="sui-flex-between sui-mb-4">
        <div>
          <div class="sui-text-bold">Email notifications</div>
          <small class="sui-text-muted">Get notified when someone mentions you.</small>
        </div>
        <label class="sui-toggle-label">
          <span class="sui-toggle">
            <input type="checkbox" checked>
            <span class="sui-toggle-track"></span>
          </span>
        </label>
      </div>

      <hr class="sui-divider">

      <div class="sui-flex-between sui-mt-4">
        <div>
          <div class="sui-text-bold">Weekly digest</div>
          <small class="sui-text-muted">Summary of activity every Monday.</small>
        </div>
        <label class="sui-toggle-label">
          <span class="sui-toggle">
            <input type="checkbox">
            <span class="sui-toggle-track"></span>
          </span>
        </label>
      </div>
    </div>
  </main>

  <script src="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui.min.js" defer></script>
</body>
```

Click the Theme button — dark mode works automatically. Resize your browser — the layout is mobile-first.

---

## 4. Add Interactivity

SUI's JavaScript auto-initialises. Drop `data-sui-*` attributes on elements and they work:

```html
<!-- Theme toggle (already shown above) -->
<button data-sui-theme>Toggle Theme</button>

<!-- Modal trigger -->
<button data-sui-modal="#my-modal">Open Modal</button>
<dialog class="sui-dialog" id="my-modal" aria-label="Confirmation">
  <div class="sui-modal-body">
    <h2>Are you sure?</h2>
    <p>This action cannot be undone.</p>
    <div class="sui-flex sui-gap-2 sui-mt-4">
      <button class="sui-btn sui-btn-danger" onclick="SUI.modal.close('#my-modal')">Delete</button>
      <button class="sui-btn sui-btn-ghost" onclick="SUI.modal.close('#my-modal')">Cancel</button>
    </div>
  </div>
</dialog>

<!-- Copy to clipboard -->
<div class="sui-input-action">
  <input class="sui-input" value="https://example.com/invite/abc123" id="invite-link" readonly>
  <button class="sui-btn" data-sui-copy="#invite-link">Copy</button>
</div>

<!-- Toast notification -->
<button class="sui-btn sui-btn-primary" onclick="SUI.toast.success('Saved!', 'Your settings have been updated.')">
  Save Changes
</button>
```

For programmatic control, use the [JavaScript API](javascript-api.md).

---

## 5. Explore

- **[Live Demo](https://adrianspeyer.github.io/speyer-ui/)** — Interactive examples of every component
- **[JavaScript API](javascript-api.md)** — Complete method reference
- **[Design Tokens](design-tokens.md)** — Every `--sui-*` custom property
- **[Accessibility](accessibility.md)** — ARIA requirements and testing guide
- **[Recipes](recipes.md)** — Common application patterns

---

## Using SUI with AI Assistants

SUI isn't in any AI's training data. To teach an AI assistant about SUI, paste one of the prompts from the [live demo](https://adrianspeyer.github.io/speyer-ui/) (AI tab), or point it at the [AI rules file](https://raw.githubusercontent.com/adrianspeyer/speyer-ui/main/.claude/instructions.md).

The critical rule for AI-generated code: **never invent `sui-*` classes.** If a class isn't in the documentation, it doesn't exist. Use your own namespace (`app-*`, `my-*`) with SUI tokens for custom patterns.
