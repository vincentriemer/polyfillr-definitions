module.exports = {
  test: 'test/es6/number',
  property: 'es6number',
  matchNames: {
    Number: ['isFinite', 'isInteger', 'isSafeInteger', 'isNaN', 'parseInt', 'parseFloat',
             'MAX_SAFE_INTEGER', 'MIN_SAFE_INTEGER', 'EPSILON'],
  },
  matchType: 'static',
  polyfill: 'core-js/es6/number'
};
