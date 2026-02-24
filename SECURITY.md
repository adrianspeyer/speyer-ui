# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Speyer UI, please report it through [GitHub's private vulnerability reporting](https://github.com/adrianspeyer/speyer-ui/security/advisories/new). This keeps the report confidential until a fix is available.

**Please do not open a public issue for security vulnerabilities.**

## Supported Versions

Only the latest release receives security updates.

| Version | Supported |
|---------|-----------|
| Latest  | ✓         |
| Older   | ✗         |

## Security Guidance for Consumers

### Pin versions in production

SUI documentation uses `@latest` for convenience. In production, pin to a specific version for reproducible builds:

```html
<!-- Development / prototyping -->
<script src="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@latest/dist/sui.min.js" defer></script>

<!-- Production — pin the version -->
<script src="https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@3.3.0/dist/sui.min.js" defer></script>
```

### Use textContent for untrusted data

SUI components use `textContent` for user-supplied strings. If you build on top of SUI, follow the same pattern — never interpolate untrusted input into `innerHTML`:

```javascript
// ✓ Safe
element.textContent = userInput;

// ✗ Dangerous — XSS vector
element.innerHTML = userInput;
```

### Load the icon sprite from trusted origins only

The SVG sprite is injected into the page via `innerHTML`. Only load it from origins you control (your own domain or a pinned CDN version):

```javascript
// ✓ Same-origin or pinned CDN
fetch('./sui-icons.svg')
fetch('https://cdn.jsdelivr.net/gh/adrianspeyer/speyer-ui@3.3.0/dist/sui-icons.min.svg')

// ✗ Never load sprites from untrusted origins
```
