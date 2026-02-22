# Contributing to Speyer UI System

Thank you for your interest in contributing to SUI! This project is built on the belief that good design should be accessible to everyone — and that includes making the system itself easy to contribute to.

## Current Status

SUI is currently in a **stability plateau** following v3.0.0. The core component set, API surface, and icon system are complete. We are accepting:

- **Bug fixes** — regressions, accessibility issues, browser compatibility
- **Documentation improvements** — corrections, clarifications, better examples
- **Recipe contributions** — new SaaS patterns using existing SUI components
- **Icon contributions** — new icons following the design rules below

We are **not** accepting new core components or API additions unless they address a clearly demonstrated, broad-base need. If you think something is missing, open an issue first to discuss.

## How to Contribute

### Reporting Issues

If you find a bug, accessibility problem, or inconsistency, [open an issue](https://github.com/adrianspeyer/speyer-ui/issues) with:

- A clear description of the problem
- Steps to reproduce (if applicable)
- Browser and device information
- Screenshots (if visual)

### Suggesting Components

SUI aims to cover the components most commonly needed across SaaS, dashboards, and content-driven applications. If you're using SUI (especially with an AI coding assistant) and notice a missing component or pattern:

1. **Check existing components** — it may already be covered. See the [README](README.md) or [live demo](https://adrianspeyer.github.io/speyer-ui/).
2. **Open an issue** describing the component, its use case, and why it has broad-base need.
3. **Include examples** of how you'd expect it to look and behave.

We prioritize components that serve a wide range of projects over niche, application-specific patterns.

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-component`)
3. Make your changes
4. Test against the [testing checklist](#testing-checklist)
5. Submit a pull request with a clear description

### What We Look For

All contributions must align with the five SUI design principles:

- **Readability** — Is it easy to scan and understand?
- **Accessibility** — Does it meet WCAG 2.1 AA? Is it keyboard navigable?
- **Mobile-Friendly** — Does it work on small screens with 44px touch targets?
- **Colour-Blind Friendly** — Does it use icon + text for status (never colour alone)?
- **Consistency** — Does it follow existing SUI patterns and use tokens?

### Code Standards

- All colours, spacing, typography, and radii must use SUI tokens (`--sui-` custom properties)
- No inline styles in the demo (except dynamic values like progress bar widths)
- Component classes follow the `sui-` prefix convention
- JavaScript behaviors go in `sui.js` and follow the existing API pattern
- CSS components must work without JavaScript (JS adds behavior, not appearance)
- All interactive elements need visible focus states and keyboard support

## Contributing Icons

SUI ships 483 hand-drawn SVG icons. New icons are welcome — especially for under-represented categories. Before starting, check the [icon browser](https://adrianspeyer.github.io/speyer-ui/icons.html) to see if the icon (or a close variant) already exists.

### Design Rules

Every SUI icon must follow these rules:

| Rule | Value |
|------|-------|
| Canvas | 24 × 24px, `viewBox="0 0 24 24"` |
| Stroke | 2px, `currentColor`, round caps and joins |
| Fill | `none` (outline icons) or `currentColor` (solid fills) |
| Content area | 2px – 22px boundary (2px padding on all sides) |
| Hardcoded colours | **Never** — only `currentColor` |

### Naming Convention

Icons follow the pattern `sui-icon-{category}-{descriptor}`:

- Base noun comes last: `data-bar-chart`, not `data-chart-bar`
- Hyphens between words: `heart-pulse`, not `heartPulse`
- Be specific: `nav-arrow-down-circle`, not `nav-arrow-2`

Pick from the existing 28 categories (`act`, `ai`, `brand`, `comm`, `data`, `dev`, `edu`, `file`, `health`, `input`, `loc`, `media`, `misc`, `nav`, `ops`, `pay`, `people`, `sci`, `sec`, `soc`, `status`, `time`, `travel`, `ui`, `view`, `weather`, `work`, `a11y`). Don't create new categories without discussion.

### What to Submit

1. The SVG file(s) — one icon per file, cleaned of editor metadata
2. The proposed name and category for each icon
3. A human-readable title (e.g., "Flower" for `misc-flower`)
4. Notes on any aliases (alternate names for the same geometry)

### Validation

Run the sprite validator after adding your icon to `sui-icons.svg`:

```bash
npm run validate:icons
```

This runs 12 checks on every symbol: viewBox, `<title>` presence, no hardcoded colours, stroke-width, no duplicate IDs, alias resolution, and more. All checks must pass.

### What Happens Next

Icon additions ship as minor version bumps (e.g., 3.0.0 → 3.1.0). The maintainer handles sprite assembly, `icons.html` updates, count updates across all files, and the version bump.

Full icon reference: [docs/icons.md](docs/icons.md)

## Testing Checklist

Before submitting:

- [ ] `npm run build` passes (preflight + minification) with 0 failures
- [ ] `npm run axe` passes (0 violations on index.html)
- [ ] `npm run axe -- icons.html` passes (0 violations on icons.html)
- [ ] Light mode contrast meets WCAG AA
- [ ] Dark mode contrast meets WCAG AA
- [ ] Tested with colour blindness simulation
- [ ] All status indicators include text + icon
- [ ] Mobile layout works at 320px minimum
- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] `prefers-reduced-motion` is respected
- [ ] Touch targets are at least 44px

**For icon contributions, also:**

- [ ] `npm run validate:icons` passes (0 failures)
- [ ] Icon renders cleanly at 16px and 48px
- [ ] Icon uses `currentColor` only (no hardcoded colours)
- [ ] `<title>` is first child of `<symbol>`

## AI-Generated Contributions

If you're using an AI tool to generate SUI components, that's great — this system is designed for it. Please review the generated code against the standards above before submitting. AI tools sometimes miss accessibility details or use hardcoded values instead of tokens.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

*Made in Canada with love 🇨🇦*
