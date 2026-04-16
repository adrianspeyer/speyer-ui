# PUSH — SUI v3.4.0

**Date:** 2026-04-16
**Previous:** v3.3.1

---

## Pre-Flight

- [x] All files saved and current
- [x] `npm run build` completed (preflight + minify)
- [x] Preflight: 77 passed, 0 failed (6 advisory = expected)
- [x] Dist files contain v3.4.0 headers
- [x] `npm run axe` passes (0 violations on index.html — 53 passes, 3 incomplete/manual-review)
- [x] `npm run axe -- icons.html` passes (0 violations on icons.html — 38 passes, 3 incomplete/manual-review)
- [x] **No private file references in any shipped file** — deep scan passed

## Files Changed

| File | Changes |
|------|---------|
| `sui-tokens.css` | v3.4.0. Added `--sui-btn-secondary-bg` and `--sui-btn-secondary-bg-hover` in all three theme scopes (`:root`, `[data-theme="dark"]`, `@media (prefers-color-scheme: dark)`) |
| `sui-components.css` | v3.4.0. Renamed old `.sui-btn-secondary` (blue outline) → `.sui-btn-outline`. New `.sui-btn-secondary` is filled slate-grey. Added `sui-text-right` and `sui-text-truncate` utilities. High-contrast `.sui-btn-outline` override now legitimate |
| `sui.js` | v3.4.0 header + runtime console.log version string |
| `sui-icons.css` | v3.4.0 header |
| `sui-icons.svg` | v3.4.0 header |
| `package.json` | Version bump to 3.4.0 |
| `index.html` | v3.4.0 throughout (4 locations). Added Outline button to demo showcase. Updated embedded AI-context class list |
| `icons.html` | v3.4.0 throughout (3 locations) |
| `README.md` | v3.4.0 throughout (5 locations). Added `sui-btn-outline` to Actions list |
| `CHANGELOG.md` | New `[3.4.0]` entry with BREAKING note, migration guide, full change list |
| `llms.txt` | Pinned version example updated |
| `docs/getting-started.md` | Pinned CDN example updated |
| `docs/javascript-api.md` | Version updated |
| `.claude/instructions.md` | Fixed button variant descriptions. Added `SUI.avatar` to JS API table. Added `--sui-btn-secondary-bg` to token list. Added `sui-text-truncate` to utilities. Expanded hallucination table from ~27 to ~55 entries |
| `.cursor/rules` | Regenerated from `.claude/instructions.md` |
| `dist/sui-tokens.min.css` | Rebuilt |
| `dist/sui-components.min.css` | Rebuilt |
| `dist/sui.min.js` | Rebuilt |
| `dist/sui-icons.min.css` | Rebuilt |
| `dist/sui-icons.min.svg` | Rebuilt |

## Backwards Compatibility

**BREAKING: `sui-btn-secondary` semantics changed.**

The old `sui-btn-secondary` was a blue-outlined button (transparent bg, blue border, blue text). It is now a filled slate-grey button with white text.

**Migration (one-line):** Any existing `sui-btn-secondary` that was intended as a blue-outlined button should be updated to `sui-btn-outline`.

Since Adrian is the sole consumer, this only affects SMMR and personal projects. Search for `sui-btn-secondary` in SMMR and evaluate each instance: if it was meant as an outline, change to `sui-btn-outline`. If neutral secondary emphasis was the intent, the new filled style is correct.

## Git Commands

```bash
cd ~/path-to-speyer-ui

git add -A
git status

git commit -m 'v3.4.0: Button variant naming overhaul + utility additions

BREAKING: sui-btn-secondary is now filled slate-grey (was blue-outline).
Migration: Replace sui-btn-secondary with sui-btn-outline where blue-outline was intended.

New: sui-btn-outline — transparent bg, blue border (old secondary behaviour)
New: --sui-btn-secondary-bg + hover tokens (light #334155, dark #475569) — WCAG AAA
New: sui-text-right utility (was documented but missing from CSS)
New: sui-text-truncate utility (single-line ellipsis)
Fix: Orphaned sui-btn-outline high-contrast rule now has a base variant
Fix: .claude/instructions.md JS API table missing SUI.avatar row
Fix: Button variant descriptions in AI context files matched code
Fix: sui-text-right documented as existing but was not in CSS
Change: Hallucination prevention table expanded from ~27 to ~55 entries
Change: Button demo shows both Secondary (filled) and Outline variants

~98KB core + ~269KB icon sprite (~29KB gzipped). 538 icons.'

git push origin main

git tag -a v3.4.0 -m 'v3.4.0: Button variant naming overhaul'
git push origin v3.4.0
```

## GitHub Release

**URL:** https://github.com/adrianspeyer/speyer-ui/releases/new?tag=v3.4.0

**Title:** v3.4.0 — Button Variant Naming Overhaul

**Body:**
```
Reconciles button variant names with what the code actually does, adds two missing utilities, and massively expands the AI hallucination prevention table.

### BREAKING

`sui-btn-secondary` is now a **filled slate-grey button** with white text. The old blue-outline behaviour has moved to `sui-btn-outline`.

**Migration:** Replace `sui-btn-secondary` with `sui-btn-outline` where the blue-outlined style was intended.

### New

- **`sui-btn-outline`** — Transparent background, blue border, blue text. This is what `sui-btn-secondary` used to render, under the name every developer and AI expects.
- **`--sui-btn-secondary-bg`** / **`--sui-btn-secondary-bg-hover`** — Overridable brand tokens for the filled secondary button (light: `#334155`/`#1E293B`, dark: `#475569`/`#334155`). Both WCAG AAA.
- **`sui-text-right`** — Text alignment utility. Was documented as existing but missing from CSS.
- **`sui-text-truncate`** — Single-line ellipsis utility (`overflow: hidden; text-overflow: ellipsis; white-space: nowrap`).

### Fixed

- Orphaned `.sui-btn-outline` high-contrast override now has a matching base variant
- `.claude/instructions.md` JS API table was missing `SUI.avatar` row
- Button variant descriptions in AI context files now match actual rendered output
- `sui-text-right` was documented as existing but was not in the CSS

### Changed

- Button demo in `index.html` now shows both Secondary (filled) and Outline variants
- AI hallucination prevention table expanded from ~27 to ~55 entries, organised by category
- Version bumped across 15 source files + 5 dist files

~98KB core · ~269KB icon sprite (~29KB gzipped) · 538 icons (506 unique + 32 aliases) · 29 categories.

### CDN (Full Setup)

```html
<!-- Core (required) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-tokens.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-components.min.css">
<script src="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui.min.js" defer></script>

<!-- Icons (optional — include if using SUI Icons) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-icons.min.css">
<script>
  fetch('https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-icons.min.svg')
    .then(r => r.text())
    .then(svg => { const d = document.createElement('div'); d.hidden = true; d.innerHTML = svg; document.body.prepend(d); });
</script>
```

Pin a version for production: replace `@latest` with `@3.4.0`.
```

## Post-Deploy Checks

- [ ] Lighthouse 100/100 (both themes) on index.html
- [ ] Lighthouse 100/100 (both themes) on icons.html
- [ ] Dark mode toggle works on all components (index.html)
- [ ] Dark mode toggle works on icons.html (icon swap: moon→sun)
- [ ] All recipe anchors work
- [ ] `npm run build` passes preflight
- [ ] `npm run axe` passes (0 violations)
- [ ] `npm run axe -- icons.html` passes (0 violations)
- [ ] CDN @latest picks up v3.4.0 — verify all five:
  - https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-tokens.min.css
  - https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-components.min.css
  - https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui.min.js
  - https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-icons.min.css
  - https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui-icons.min.svg
- [ ] Demo loads: https://adrianspeyer.github.io/speyer-ui/
- [ ] Icon browser loads: https://adrianspeyer.github.io/speyer-ui/icons.html
- [ ] Icon search/filter works, click-to-copy works
- [ ] `grep -rn "SUI-COPILOT\|PUSH-v\|COMPONENT-PROPOSALS" .` returns nothing in public files
- [ ] **New Secondary button renders as filled slate-grey in both themes**
- [ ] **New Outline button renders as blue-outlined in both themes**
- [ ] **"No Backdrop" panel trigger button (sui-btn-outline) now visible and styled**
- [ ] **`sui-text-right` works — test with a card or section**
- [ ] **`sui-text-truncate` works — test with a long string in a constrained container**
- [ ] **Check SMMR for `sui-btn-secondary` usage — update to `sui-btn-outline` where needed**

## PRIVATE FILES — DO NOT PUSH

- SUI-COPILOT-GUIDE.md
- PUSH-v3.4.0.md
- PUSH-v3.3.1.md (previous)
- Any WORKORDER-v*.md files

---

## Update Claude Project Library — MANDATORY

**Do this immediately after every push. Stale library files are worse than no library files — the next session will build on wrong information.**

### Always update these (every release):

| Library file | Replace with |
|-------------|-------------|
| `SUI-COPILOT-GUIDE.md` | Updated version from copilot (Current State table, version log, Next Release Checklist all reflect new version) |
| `sui-components.css` | Source file from repo |
| `sui.js` | Source file from repo |
| `package.json` | Source file from repo |
| `CHANGELOG.md` | Source file from repo |

### Update if changed this release:

| Library file | Replace with | Changed? |
|-------------|-------------|----------|
| `sui-tokens.css` | Source file from repo | **YES** — new `--sui-btn-secondary-bg` tokens |
| `sui-icons.css` | Source file from repo | YES — version header only |
| `PUSH-TEMPLATE.md` | Updated template | NO |

### Remove when completed:

| Library file | Reason |
|-------------|--------|
| Any stale WORKORDER files | Build is done |

### Verification:

- [ ] Open a new Claude conversation in this project
- [ ] Ask: "What is the current SUI version and button variant list?"
- [ ] Copilot should answer: **v3.4.0** and list **primary, secondary (filled grey), outline (blue border), ghost, dashed, danger, success** — if it says the old version or describes secondary as blue-outline, the library update failed
