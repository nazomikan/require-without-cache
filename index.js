var path = require('path')
  ;

/**
 * customRequire module without cache
 *
 * @param {String} filePath [module filePath]
 * @param {Function} customRequire [module.customRequire or compatible custom customRequire]
 */
module.exports = function (filePath, customRequire) {
  var cache
    , targetModule
    ;

  filePath = customRequire.resolve(filePath);

  // save cache
  cache = require.cache[filePath];
  delete require.cache[filePath];
  targetModule = customRequire(filePath);

  // restore cache
  require.cache[filePath] = cache;

  return targetModule;
};
