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

  if (customRequire) {
    filePath = customRequire.resolve(filePath);
  } else {
    filePath = path.resolve(path.dirname(module.parent.filename), filePath);
    customRequire = module.parent.require;
  }

  // save cache
  cache = require.cache[filePath];
  delete require.cache[filePath];
  targetModule = customRequire(filePath);

  // restore cache
  require.cache[filePath] = cache;

  return targetModule;
};

// for update module.parent
delete require.cache[__filename];
