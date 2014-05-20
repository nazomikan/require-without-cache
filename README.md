require-without-cache
===================

require without cache

## How to use

```sh
npm install require-without-cache
```

```javascript
var requireWithoutCache = require('require-without-cache')
  , hoge = requireWithoutCache('./path/to/module', require)
  ;

// ...
```

## Using case

It is intended to be used in the spec file.

target file

```javascript
var model = require('path/to/model').create();

exports.handle = function (cb) {
  model.get('foo/model', function (err, res) {
    cb(err, res);
  });
};
```

spec file

```javascript
var requireWithoutCache = require('require-without-cache')
  , sinon = require('sinon')
  , assert = require('assert')
  ;

describe('#handle', function () {
  it('should be error', function (done) {
    var model = require('path/to/model')
      , sinon = require('sinon')
      , target
      ;

    sinon.stub(model, 'create', function () {
      return {get: function (name, cb) { return cb('an_error'); }};
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

However, you may want to carry out the test without a problem if you use the `require-without-cache`.


## API

* requireWithoutCache(path, [require])
  * path {String} filePath
  * [require] {Function} require method

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

`require-without-cache` need `require.resolve` and `require.cache`
