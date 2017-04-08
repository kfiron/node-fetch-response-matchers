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
      var derivedPromise = this._obj.then(res => {
        result.res = res;
        return result;
      });

      if(options.isBodyMatcher){
        derivedPromise = derivedPromise.then(result => {
          return result.res.text();
        }).then(text => {
          result.text = text;
          return result;
        });
      }

      derivedPromise = derivedPromise.then(result => {
        this.assert(
          options.predicate(result.res, result.text, args),
          options.msgSuccess(args),
          options.msgFail(args),
          options.expected(args),
          options.actual(result.res, result.text)
        );
      });
      // credit to chai-as-promised
      transferPromiseness(that, derivedPromise);
    });
  }

  function transferPromiseness(assertion, promise) {
    assertion.then = promise.then.bind(promise);
  }

};


