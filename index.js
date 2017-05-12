'use strict';

module.exports = (chai, utils) => {

  require('./lib/status-methods')(method);
  require('./lib/body-methods')(method);
  require('./lib/header-methods')(method);
  require('./lib/cookie-methods')(method);
  require('./lib/cache-control-methods')(method);

  function method(options) {
    utils.addMethod(chai.Assertion.prototype, options.name, function () {

      if (!utils.flag(this, 'promise')) {
        var promise = buildBasedPromiseWithData(this._obj);
        var derivedPromise = assert(promise, options, this, arguments);
        utils.flag(this, 'promise', derivedPromise);
      } else {
        var promiseAssert = assert(utils.flag(this, 'promise'), options, this, arguments);
        utils.flag(this, 'promise', promiseAssert);
      }

      transferPromiseness(this, utils.flag(this, 'promise'));
    });
  }

  function buildBasedPromiseWithData(obj){
    var result = {};
    var promise = fetchResult(obj, result);
    return enrichBody(promise,
      result);
  }

  function fetchResult(promise, result) {
    return promise.then(res => {
      result.res = res;
      return result;
    });
  }

  function enrichBody(promise, result) {
    return promise.then(result => {
      return result.res.text();
    }).then(text => {
      result.text = text;
      return result;
    });
  }

  function assert(promise, options, that, args) {
    return promise.then(result => {
      that.assert(
        options.predicate(result.res, result.text, args),
        options.msgSuccess(args),
        options.msgFail(args),
        options.expected(args),
        options.actual(result.res, result.text)
      );
      return result;
    })
  }

  function transferPromiseness(assertion, promise) {
    assertion.then = promise.then.bind(promise);
  }
};


