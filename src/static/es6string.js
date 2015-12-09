module.exports = {
  test: 'test/es6/string',
  property: 'es6string',
  matchNames: {
    String: ['fromCodePoint', 'raw']
  },
  matchType: 'static',
  polyfill: 'core-js/es6/string'
};