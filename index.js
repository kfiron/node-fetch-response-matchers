'use strict';


module.exports = (chai, utils) => {

  statusMethod('successful', 200);
  statusMethod('created', 201);
  statusMethod('redirected', 301);
  statusMethod('unAuthorized', 401);
  statusMethod('rejected', 403);
  statusMethod('notFound', 404);
  statusMethod('serverError', 500);
  statusMethod('serviceUnAvailable', 503);

  bodyMethod('haveBodyObject',
    function predicate(textResponse, text) {
      return textResponse == JSON.stringify(text)
    },
    function actual(text) {
      return JSON.parse(text)
    });
  bodyMethod('haveBodyText',
    function predicate(textResponse, text) {
      return textResponse == text
    },
    function actual(text) {
      return text
    });
  bodyMethod('haveBodyRegexpMatch',
    function predicate(textResponse, regexp) {
      return textResponse.match(regexp)
    },
    function actual(text) {
      return text
    });


  function bodyMethod(name, predicate, actual) {
    method({
      name: name,
      predicate: function (res, text, args) {
        return  predicate(text, args[0])
      },
      msgSuccess: 'expected to match body',
      msgFail: 'expected not to match body',
      expected: function (args) {
        return args[0]
      },
      actual: function (res, text) {
        return actual(text);
      }
    });
  }

  function statusMethod(name, code) {
    method({
      name: name,
      predicate: function (res) {
        return res.status == code;
      },
      msgSuccess: 'expected http status to equal ' + code,
      msgFail: 'expected status to not equal ' + code,
      expected: function () {
        return code;
      },
      actual: function (res) {
        return res.status;
      }
    });
  }

  function method(options) {
    utils.addMethod(chai.Assertion.prototype, options.name, function () {
      var result = {};
      var args = arguments;
      return this._obj.then(res => {
        result.res = res;
        return res.text();
      }).then(text => {
        result.text = text;
        return result;
      }).then(result => {
        this.assert(
          options.predicate(result.res, result.text, args),
          options.msgSuccess,
          options.msgFail,
          options.expected(args),
          options.actual(result.res, result.text)
        );
      });
    });
  }

};


