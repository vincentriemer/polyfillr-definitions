var modernizr = require('modernizr');

var metadata = modernizr.metadata();
var desiredMetadata = metadata.filter(function(feature) {
  return feature.polyfills.length !== 0 && feature.amdPath.indexOf('css') === -1;
});

desiredMetadata.forEach(function(feature) {
  console.log(feature.amdPath);
});