'use strict';

module.exports.addBodyMethods = methodBuilder => {

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
    methodBuilder({
      name: name,
      predicate: function (res, text, args) {
        return predicate(text, args[0])
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

};