'use strict';
const bufferEqual = require('buffer-equal');

module.exports = methodBuilder => {

  bodyMethod('haveBodyObject',
    function predicate(textResponse, text) {
      return textResponse == JSON.stringify(text);
    },
    function actual(text) {
      return JSON.parse(text);
    });
  bodyMethod('haveBodyText',
    function predicate(textResponse, text) {
      return textResponse == text;
    },
    function actual(text) {
      return text;
    });
  bodyMethod('haveBodyRegexpMatch',
    function predicate(textResponse, regexp) {
      return textResponse.match(regexp);
    },
    function actual(text) {
      return text
    });

  bufferMethod('haveBodyBuffer');

  bodyMethod('haveBodyThat',
    function predicate(textResponse, predicate) {
      return predicate(textResponse);
    },
    function actual(text) {
      return text;
    });

  function bodyMethod(name, predicate, actual) {
    methodBuilder({
      name: name,
      predicate: function (res, args) {
        return predicate(res.text, args[0])
      },
      msgSuccess: function(){
        return 'expected #{exp} to match body with #{act}';
      },
      msgFail: function(){
        return 'expected #{exp} not to match body with #{act}';
      },
      expected: function (args) {
        return args[0]
      },
      actual: function (res) {
        return actual(res.text);
      }
    });
  }

  function bufferMethod(name) {
    methodBuilder({
      name: name,
      predicate: function (res, args) {
        return bufferEqual(res.buffer, args[0]);
      },
      msgSuccess: function () {
        return 'expected #{exp} to match body with #{act}';
      },
      msgFail: function () {
        return 'expected #{exp} not to match body with #{act}';
      },
      expected: function (args) {
        return args[0]
      },
      actual: function (res) {
        return res.buffer;
      }
    });
  }

}