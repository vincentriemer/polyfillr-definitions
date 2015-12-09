var path = require('path'),
  fs = require('fs'),
  polyfill = require('autopolyfiller-helpers'),
  factory = polyfill.scannerFactory,
  matcher = polyfill.matcher;

function collectDefinitions(folder) {
  var definitions = [];
  fs.readdirSync(path.join(__dirname, folder)).forEach(function(file) {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
      definitions.push(require(path.join(__dirname, folder, file)));
    }
  });
  return definitions;
}

var polyfillDefinitions = {},
    globalList = {},
    methodList = {},
    staticList = {},
    constructorList = {};

// constructor
collectDefinitions('constructor').forEach(function(definition) {
  definition.matchNames.forEach(function(matchName) {
    constructorList[matchName] = definition.test;
  });

  polyfillDefinitions[definition.test] = {
    polyfill: definition.polyfill,
    property: definition.property
  };
});

// method
collectDefinitions('method').forEach(function(definition) {
  definition.matchNames.forEach(function(matchName) {
    methodList[matchName] = definition.test;
  });

  polyfillDefinitions[definition.test] = {
    polyfill: definition.polyfill,
    property: definition.property
  };
});

// global
collectDefinitions('global').forEach(function(definition) {
  definition.matchNames.forEach(function(matchName) {
    globalList[matchName] = definition.test;
  });

  polyfillDefinitions[definition.test] = {
    polyfill: definition.polyfill,
    property: definition.property
  };
});

// static
collectDefinitions('static').forEach(function(definition) {
  for (var property in definition.matchNames) {
    if (definition.matchNames.hasOwnProperty(property)) {
      if (!staticList.hasOwnProperty(property)) {
        staticList[property] = {};
      }
      definition.matchNames[property].forEach(function(matchName) {
        staticList[property][matchName] = definition.test;
      });
    }
  }

  polyfillDefinitions[definition.test] = {
    polyfill: definition.polyfill,
    property: definition.property
  };
});

var globals = {
  polyfills: globalList,
  tester: matcher('global', { methods: Object.keys(globalList) })
};

var methods = {
  polyfills: methodList,
  tester: matcher('method', { methods: Object.keys(methodList) })
};

var constructors = {
  polyfills: constructorList,
  tester: matcher('constructor', { constructors: Object.keys(constructorList) })
};

var statics = {
  polyfills: Object.keys(staticList).reduce(function(map, object) {
    return Object.keys(staticList[object]).reduce(function (map, method) {
      map[object + '.' + method] = staticList[object][method];
      return map;
    }, map);
  }, {}),
  tester: matcher('static', {
    objects: Object.keys(staticList).reduce(function(objects, object) {
      objects[object] = Object.keys(staticList[object]);
      return objects;
    }, {})
  })
};

var matchers = [globals, methods, constructors, statics].map(factory);
function test(ast) {
  return matchers.reduce(function(polyfills, matcher) {
    return polyfills.concat(matcher.test(ast));
  }, []);
};

module.exports = {
  test: test,
  polyfills: polyfillDefinitions
};