'use strict';
const bufferEqual = require('buffer-equal');

module.exports = methodBuilder => {


  bodyMethod('haveBodyObject',
    function predicate(res, text) {
      return res.text == JSON.stringify(text);
    },
    function actual(res) {
      return JSON.parse(res.text);
    });

  bodyMethod('haveBodyText',
    function predicate(res, text) {
      return res.text == text;
    },
    function actual(res) {
      return res.text;
    });

  bodyMethod('haveBodyRegexpMatch',
    function predicate(res, regexp) {
      return res.text.match(regexp);
    },
    function actual(res) {
      return res.text
    });

  bodyMethod('haveBodyBuffer',
    function predicate(res, buffer) {
      return bufferEqual(res.buffer, buffer);
    },
    function actual(res) {
      return res.buffer;
    });


  bodyMethod('haveBodyThat',
    function predicate(res, predicate) {
      return predicate(res.text);
    },
    function actual(res) {
      return res.text;
    });

  function bodyMethod(name, predicate, actual) {
    methodBuilder({
      name: name,
      predicate: function (res, args) {
        return predicate(res, args[0])
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
        return actual(res);
      }
    });
  }


};