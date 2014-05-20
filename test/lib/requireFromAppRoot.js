var path = require('path');

function requireFromAppRoot(relativePath) {
  var absolutePath
    ;

  // sample require system
  absolutePath = requireFromAppRoot.resolve(relativePath);
  return require(absolutePath);
};

requireFromAppRoot.resolve = function (relativePath) {
  var absolutePath = path.resolve(__dirname, '../../', relativePath);
  return require.resolve(absolutePath);
}

Object.defineProperty(requireFromAppRoot, 'cache', {
  get: function () {
    return require.cache;
  },
  set: function (cache) {
    return (require.cache = cache);
  }
});

module.exports = requireFromAppRoot;
