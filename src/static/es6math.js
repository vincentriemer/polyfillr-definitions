module.exports = {
  test: 'test/es6/math',
  property: 'es6math',
  matchNames: {
    Math: ['clz32', 'cbrt', 'imul', 'sign', 'log10', 'log2', 'log1p', 'expm1', 'cosh', 'sinh', 'tanh',
           'acosh', 'asinh', 'atanh', 'hypot', 'trunc', 'fround']
  },
  matchType: 'static',
  polyfill: 'core-js/es6/math'
}