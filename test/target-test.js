var requireWithoutCache = require('../')
  , sinon = require('sinon')
  , assert = require('assert')
  ;

describe('#handle', function () {
  describe('when model send "abc"', function () {
    it('should be error', function (done) {
      var model = require('./lib/model')
        , sinon = require('sinon')
        , target
        , expect = 'abc'
        , res = expect
        ;

      sinon.stub(model, 'create', function () {
        return {get: function (name, cb) { return cb(null, res); }};
      });

      target = requireWithoutCache('./target', require); // [1]
      target.handle(function (err, data) {
        assert.ok(data, expect);
        model.create.restore();
        done();
      });
    });
  });

  describe('when model send error', function () {
    it('should be error', function (done) {
      var model = require('./lib/model')
        , sinon = require('sinon')
        , target
        , expect = 'an_error'
        , error = expect
        ;

      sinon.stub(model, 'create', function () {
        return {get: function (name, cb) { return cb(error); }};
      });

      target = requireWithoutCache('./target', require); // [1]
      target.handle(function (err, data) {
        assert.strictEqual(err, expect);
        model.create.restore();
        done();
      });
    });
  });
});
