# Contributing to the Speyer UI System

Thanks for your interest in improving SUI! Contributions of all kinds are welcome — whether it's fixing a typo, suggesting a new token, improving accessibility, or building new examples.

## How to Contribute

### Reporting Issues

If you find a bug, accessibility problem, or have a suggestion:

1. Check [existing issues](../../issues) to see if it's already been reported.
2. Open a new issue with a clear description.
3. Include screenshots or code examples if relevant.

### Submitting Changes

1. **Fork** the repository.
2. **Create a branch** for your change: `git checkout -b fix/button-contrast`
3. **Make your changes** following the guidelines below.
4. **Test** your changes against the [Testing Checklist](README.md#testing-checklist).
5. **Submit a pull request** with a clear description of what you changed and why.

## Guidelines

### Design Token Changes

- All tokens must use the `--sui-` prefix.
- New colors must meet WCAG 2.1 AA contrast ratios in both light and dark modes.
- Test any color changes with a color blindness simulator.

### Accessibility

This is non-negotiable. All contributions must:

- Maintain WCAG 2.1 AA compliance.
- Never use color as the sole indicator of state or meaning.
- Include proper focus states for interactive elements.
- Support keyboard navigation.

### Code Style

- Use CSS custom properties (not preprocessor variables).
- Follow the existing naming conventions (`--sui-category-name`).
- Keep the demo HTML clean and well-commented.

### Commit Messages

Use clear, descriptive commit messages:

```
fix: improve error alert contrast in dark mode
feat: add --sui-bg-elevated token for nested cards
docs: clarify AI prompt usage section
```

## What We're Looking For

- Accessibility improvements
- New component examples in the demo
- Color blindness testing results
- Mobile responsiveness fixes
- Documentation improvements
- Translations

## Code of Conduct

Be kind, respectful, and constructive. This is a community project meant to help people build better, more accessible interfaces.

---

*Made in Canada with love 🇨🇦*
