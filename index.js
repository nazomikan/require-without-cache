/**
 * require module without cache
 *
 * @param {String} path [module path]
 * @param {Function} require [module.require or compatible custom require]
 */
module.exports = function (path, require) {
  var cache
    , module
    ;

  path = require.resolve(path);

  // save cache
  cache = require.cache[path];
  delete require.cache[path];
  module = require(path);

  // restore cache
  require.cache[path] = cache[path];

  return module;
};
