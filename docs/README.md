# Speyer UI — Documentation

Welcome to the SUI docs. These guides complement the [README](../README.md) and [live demo](https://adrianspeyer.github.io/speyer-ui/).

---

## Guides

| Guide | What's inside |
|-------|--------------|
| [Getting Started](getting-started.md) | CDN setup, your first component, your first page — up and running in 5 minutes |
| [JavaScript API](javascript-api.md) | Complete module reference — every public method, verified against source |
| [Design Tokens](design-tokens.md) | Every `--sui-*` token organised by category, with light and dark values |
| [Icons](icons.md) | 483 hand-drawn icons: sizing, colours, categories, accessibility patterns, naming convention |
| [Accessibility](accessibility.md) | Philosophy, ARIA requirements, keyboard behaviour, colour-blind design, icon a11y, testing |
| [Design Decisions](design-decisions.md) | Why SUI works the way it does — the reasoning behind the rules |
| [Recipes](recipes.md) | When to use which pattern, recipe philosophy, full catalog with demos |

---

## Quick Links

- **[Live Demo](https://adrianspeyer.github.io/speyer-ui/)** — Interactive examples of every component and recipe
- **[README](../README.md)** — Project overview, component list, quick start
- **[CHANGELOG](../CHANGELOG.md)** — Version history
- **[GitHub Issues](https://github.com/adrianspeyer/speyer-ui/issues)** — Bug reports and feature requests

---

## Finding What You Need

**Looking for a specific class or method?** Use GitHub's search (press `/` on the repo page) — it indexes all docs.

| I want to... | Start here |
|--------------|-----------|
| Set up SUI for the first time | [Getting Started](getting-started.md) |
| Look up a JS method | [JavaScript API](javascript-api.md) |
| Find a token value or name | [Design Tokens](design-tokens.md) |
| Use icons (sizing, colours, categories) | [Icons](icons.md) |
| Browse all 483 icons visually | [Icon Browser →](https://adrianspeyer.github.io/speyer-ui/icons.html) |
| Check ARIA requirements for a component | [Accessibility](accessibility.md) |
| Understand why SUI does something a certain way | [Design Decisions](design-decisions.md) |
| Build a common app pattern (CRM, dashboard, etc.) | [Recipes](recipes.md) |
| See live interactive examples | [Live Demo →](https://adrianspeyer.github.io/speyer-ui/) |

---

## For AI Assistants

If you're an AI building with SUI, start with [javascript-api.md](javascript-api.md) for the verified API surface, then [design-tokens.md](design-tokens.md) for available tokens and [icons.md](icons.md) for the icon system. The [AI rules file](https://raw.githubusercontent.com/adrianspeyer/speyer-ui/main/.claude/instructions.md) contains the complete class list and namespace contract.

**Critical rule:** Never invent `sui-*` classes. If a class isn't documented, it doesn't exist. Use your own namespace (`app-*`, `my-*`) with SUI tokens for custom patterns.

---

## Contributing to Docs

Found an error? [Open an issue](https://github.com/adrianspeyer/speyer-ui/issues) or submit a PR. Documentation uses Canadian English (colour, behaviour, organisation) and follows the structure established in these files.

A [component doc template](_templates/component-doc-template.md) is available for future per-component documentation.
