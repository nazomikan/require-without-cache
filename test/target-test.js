var requireWithoutCache = require('../')
  , sinon = require('sinon')
  , assert = require('assert')
  ;

describe('#handle (normal require)', function () {
  describe('when model send "abc"', function () {
    it('should send "abc"', function (done) {
      var model = require('./lib/model')
        , sinon = require('sinon')
        , target
        , expect = 'abc'
        , res = expect
        ;

      sinon.stub(model, 'create', function () {
        return {get: function (name, cb) { return cb(null, res); }};
      });

      target = requireWithoutCache('./target', require);
      target.handle(function (err, data) {
        assert.ok(data, expect);
        model.create.restore();
        done();
      });
    });
  });

  describe('when model send error', function () {
    it('should send error', function (done) {
      var model = require('./lib/model')
        , sinon = require('sinon')
        , target
        , expect = 'an_error'
        , error = expect
        ;

      sinon.stub(model, 'create', function () {
        return {get: function (name, cb) { return cb(error); }};
      });

      target = requireWithoutCache('./target', require);
      target.handle(function (err, data) {
        assert.strictEqual(err, expect);
        model.create.restore();
        done();
      });
    });
  });
});


describe('#handle2 (custom require)', function () {
  var requireFromAppRoot = require('./lib/requireFromAppRoot');

  describe('when model send "abc"', function () {
    it('should send "abc"', function (done) {
      var model = requireFromAppRoot('test/lib/model')
        , sinon = require('sinon')
        , target
        , expect = 'abc'
        , res = expect
        ;

      sinon.stub(model, 'create', function () {
        return {get: function (name, cb) { return cb(null, res); }};
      });

      target = requireWithoutCache('test/target', requireFromAppRoot);
      target.handle(function (err, data) {
        assert.ok(data, expect);
        model.create.restore();
        done();
      });
    });
  });

  describe('when model send error', function () {
    it('should send error', function (done) {
      var model = requireFromAppRoot('test/lib/model')
        , sinon = require('sinon')
        , target
        , expect = 'an_error'
        , error = expect
        ;

      sinon.stub(model, 'create', function () {
        return {get: function (name, cb) { return cb(error); }};
      });

      target = requireWithoutCache('test/target', requireFromAppRoot);
      target.handle(function (err, data) {
        assert.strictEqual(err, expect);
        model.create.restore();
        done();
      });
    });
  });
});
