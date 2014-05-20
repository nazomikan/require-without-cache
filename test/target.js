var model = require('./lib/model').create();

exports.handle = function (cb) {
  model.get('foo/model', function (err, res) {
    cb(err, res);
  });
};
