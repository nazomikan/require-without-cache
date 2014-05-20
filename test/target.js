/**
 * normal require
 */
var model = require('./lib/model').create()
  ;

exports.handle = function (cb) {
  model.get('foo/model', function (err, res) {
    cb(err, res);
  });
};


/**
 * custom require
 */
var requireFromAppRoot = require('./lib/requireFromAppRoot')
  , model2 = requireFromAppRoot('test/lib/model2').create()
  ;

exports.handle2 = function (cb) {
  model2.get('foo/model', function (err, res) {
    cb(err, res);
  });
};
