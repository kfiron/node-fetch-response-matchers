'use strict';

module.exports = (chai, utils) => {

  require('./lib/status-methods')(method);
  require('./lib/body-methods')(method);
  require('./lib/header-methods')(method);

  function method(options) {
    utils.addMethod(chai.Assertion.prototype, options.name, function () {
      var result = {};
      var args = arguments;
      var that = this;
      var derivedPromise = fetchResult(this._obj, result);
      derivedPromise = enrichBodyIfBodyMatcher(derivedPromise,
                                               result,
                                               options.isBodyMatcher);
      derivedPromise = assert(derivedPromise, options, that, args);

      // credit to chai-as-promised
      transferPromiseness(that, derivedPromise);
    });
  }

  function fetchResult(promise, result) {
    return promise.then(res => {
      result.res = res;
      return result;
    });
  }

  function enrichBodyIfBodyMatcher(promise, result, conditation) {
    if (conditation) {
      return promise.then(result => {
        return result.res.text();
      }).then(text => {
        result.text = text;
        return result;
      });
    } else {
      return promise;
    }
  }

  function assert(promise, options, that, args){
    return promise.then(result => {
      that.assert(
        options.predicate(result.res, result.text, args),
        options.msgSuccess(args),
        options.msgFail(args),
        options.expected(args),
        options.actual(result.res, result.text)
      );
    })
  }

  function transferPromiseness(assertion, promise) {
    assertion.then = promise.then.bind(promise);
  }

};


