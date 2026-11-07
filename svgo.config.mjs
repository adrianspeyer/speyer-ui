/**
 * svgo.config.mjs — SUI Icons
 *
 * Conservative SVGO configuration for contributor use.
 * Run on individual icon files BEFORE adding them to the sprite.
 *
 * SVGO is a development dependency for contributor tooling and regression tests.
 * The build pipeline uses scripts/minify-sprite.mjs (whitespace stripping),
 * not SVGO, for the assembled sprite.
 * After npm install:
 *   npx svgo --config svgo.config.mjs --input icon.svg --output icon.optimized.svg
 *
 * ⚠ DO NOT run this on the assembled sprite (sui-icons.svg).
 *   This configuration targets standalone icons; the sprite has its own
 *   assembly, alias validation, and whitespace-only minification workflow.
 *
 * What this config does:
 *   ✓ Removes editor metadata (Figma, Illustrator, Inkscape IDs)
 *   ✓ Removes comments
 *   ✓ Removes empty attributes and redundant xmlns on child elements
 *   ✓ Collapses useless groups
 *   ✓ Removes <desc> (SUI uses a required <title> for each icon)
 *
 * What this config deliberately does NOT do:
 *   ✗ Simplify or round path data — hand-crafted geometry must be preserved
 *   ✗ Merge paths — separate paths are intentional
 *   ✗ Convert shapes — rects/circles stay as rects/circles for readability
 *   ✗ Remove viewBox — required by SUI spec
 *   ✗ Remove fill/stroke attributes — required by SUI spec (currentColor)
 *   ✗ Collapse attributes — stroke-linecap/linejoin must remain explicit
 */

export default {
  multipass: false,
  // Explicit allowlist: SVGO 3+ ignores `active: false`. Plugins that must
  // not run (including removeTitle and geometry optimizers) must be omitted.
  // Do not add preset-default: its extra optimizations are not safe for SUI.
  plugins: [
    // Safe: remove editor-injected metadata
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',

    // Safe: remove genuinely empty or redundant elements
    'removeEmptyAttrs',
    'removeEmptyContainers',
    'collapseGroups',

    // Remove unknown/editor attributes while preserving explicit SVG styling.
    {
      name: 'removeUnknownsAndDefaults',
      params: {
        keepDataAttrs: false,
        keepAriaAttrs: true,
        keepRoleAttr: true,
        defaultAttrs: false,
        uselessOverrides: false,
      },
    },

    // SUI requires <title> and forbids <desc>, including authored descriptions.
    {
      name: 'removeDesc',
      params: { removeAny: true },
    },
  ],
};
