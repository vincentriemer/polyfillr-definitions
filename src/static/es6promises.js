module.exports = {
  test: 'test/es6/promises',
  property: 'promises',
  matchNames: {
    Promise: ['resolve', 'reject', 'all', 'race']
  },
  matchType: 'static',
  polyfill: 'core-js/es6/promise'
};
