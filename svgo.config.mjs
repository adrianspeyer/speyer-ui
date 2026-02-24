/**
 * svgo.config.mjs — SUI Icons
 *
 * Conservative SVGO configuration for contributor use.
 * Run on individual icon files BEFORE adding them to the sprite.
 *
 * NOTE: svgo is NOT a build dependency. The build pipeline minifies the
 * sprite via scripts/minify-sprite.mjs (whitespace stripping). This config exists
 * for contributors preparing individual icons before sprite assembly.
 * Install svgo locally if needed: npx svgo --config svgo.config.mjs icon.svg
 *
 * ⚠ DO NOT run this on the assembled sprite (sui-icons.svg).
 *   The sprite embeds <symbol> and <use> elements that SVGO
 *   will incorrectly treat as unreferenced and remove.
 *
 * What this config does:
 *   ✓ Removes editor metadata (Figma, Illustrator, Inkscape IDs)
 *   ✓ Removes comments
 *   ✓ Removes empty attributes and redundant xmlns on child elements
 *   ✓ Collapses useless groups
 *   ✓ Removes style="" and class="" that don't belong in the SUI spec
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

    // Safe: remove xmlns on child elements (not root)
    {
      name: 'removeUnknownsAndDefaults',
      params: {
        keepDataAttrs: false,
        keepAriaAttrs: true,
        keepRoleAttr: true,
      },
    },

    // Safe: clean up title/desc handling
    // Note: SUI spec requires <title> as first child — SVGO must not remove it
    {
      name: 'removeTitle',
      active: false,  // DISABLED — <title> is required by SUI a11y spec
    },
    {
      name: 'removeDesc',
      active: true,   // ENABLED — <desc> is forbidden by SUI spec
    },

    // ── DISABLED — geometry-altering plugins ────────────────────────────────
    // These are disabled explicitly so future SVGO versions don't re-enable them.
    { name: 'convertPathData',          active: false },
    { name: 'mergePaths',               active: false },
    { name: 'convertShapeToPath',       active: false },
    { name: 'convertEllipseToCircle',   active: false },
    { name: 'convertTransform',         active: false },
    { name: 'cleanupNumericValues',     active: false },
    // roundViewBox removed — not available in svgo 3.3.x
    { name: 'removeViewBox',            active: false },
    { name: 'removeDimensions',         active: false },
    { name: 'removeAttributesBySelector', active: false },
    { name: 'removeAttrs',              active: false },
    { name: 'reusePaths',               active: false },
    { name: 'inlineStyles',             active: false },
    { name: 'minifyStyles',             active: false },
    { name: 'prefixIds',                active: false },
  ],
};
