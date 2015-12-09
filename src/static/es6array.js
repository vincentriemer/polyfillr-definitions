module.exports = {
  test: 'test/es6/array',
  property: 'es6array',
  matchNames: {
    Array: ['from', 'of']
  },
  matchType: 'static',
  polyfills: 'core-js/es6/array'
};