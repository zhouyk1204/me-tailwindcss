'use strict';
function _interopDefault(e) {
  return e && 'object' == typeof e && 'default' in e ? e.default : e;
}
var postcss = _interopDefault(require('postcss')),
  PurgeCSS = require('purgecss'),
  PurgeCSS__default = _interopDefault(PurgeCSS);
const purgeCSSPlugin = postcss.plugin('postcss-plugin-purgecss', function(e) {
  return async function(t, s) {
    const r = new PurgeCSS__default(),
      o = { ...PurgeCSS.defaultOptions, ...e };
    r.options = o;
    const { content: n, extractors: u } = o,
      c = n.filter((e) => 'string' == typeof e),
      i = n.filter((e) => 'object' == typeof e),
      p = await r.extractSelectorsFromFiles(c, u),
      a = r.extractSelectorsFromString(i, u),
      l = PurgeCSS.mergeExtractorSelectors(p, a);
    r.walkThroughCSS(t, l),
      r.options.fontFace && r.removeUnusedFontFaces(),
      r.options.keyframes && r.removeUnusedKeyframes(),
      r.options.variables && r.removeUnusedCSSVariables(),
      r.options.rejected &&
        r.selectorsRemoved.size > 0 &&
        (s.messages.push({
          type: 'purgecss',
          plugin: 'postcss-purgecss',
          text: `purging ${r.selectorsRemoved.size} selectors:\n        ${Array.from(r.selectorsRemoved)
            .map((e) => e.trim())
            .join('\n  ')}`,
        }),
        r.selectorsRemoved.clear());
  };
});
module.exports = purgeCSSPlugin;