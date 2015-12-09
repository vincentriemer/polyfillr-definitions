module.exports = {
  test: '/test/es6/object',
  property: 'es6object',
  matchNames: {
    Object: ['assign', 'is', 'setPrototypeOf']
  },
  matchType: 'static',
  polyfill: 'core-js/es6/object'
};
