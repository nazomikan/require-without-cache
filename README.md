requireWithoutCache
===================

require without cache

## How to use

```sh
npm install requireWithoutCache
```

```javascript
var hoge = requireWithoutCache('./path/to/module', require);
```

## Using case

It is intended to be used in the spec file.

target file

```javascript
var model = require('path/to/model');

exports.handle = function (cb) {
  model.get('foo/model', function (err, res) {
    cb(err, res);
  });
};
```

spec file

```javascript
var requireWithoutCache = require('requireWithoutCache')
  ;

describe('#handle', function () {
  it('should be error', function (done) {
    var model = require('path/to/model')
      , sinon = require('sinon');
      , target
      ;

    sinon.stub(model, 'create', function () {
      return {get: function (name, cb) { return cb('i_am_error'); }};
    });

    target = requireWithoutCache('./path/to/module', require); // [1]
    target.handle(function (err, data) {
      assert.ok(err);
      model.create.restore();
      done();
    });
  });
});
```

if [1] use normal `require`, `target` may be cache.

In that case, `model` does not replace the stub.

by require.cache

However, you may want to carry out the test without a problem if you use the `requireWithoutCache`.


## If using custom require

Please define an API for use by the following.

```javascript
var path = require('path');

function requireFromAppRoot(relativePath) {
  var absolutePath
    ;

  // sample require system
  absolutePath = requireFromAppRoot.resolve(relativePath);
  return require(absolutePath);
};

requireFromAppRoot.resolve = function (relativePath) {
  var absolutePath = path.resolve(app_route, relativePath);
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
```

`requireWithoutCache` need `require.resolve` and `require.cache`
