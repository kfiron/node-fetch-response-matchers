'use strict';

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
      predicate: function (res, text, args) {
        console.log(args);
        return predicate(text, args[0])
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
      actual: function (res, text) {
        return actual(text);
      }
    });
  }

};