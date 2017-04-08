'use strict';
var setCookie = require('set-cookie-parser');


module.exports = methodBuilder => {

  cookieMethod('haveCookieByName', (res, text, args) => {
    return matchCookiesByPredicate(res, cookie => {
      return cookie.name === args[0];
    })
  });

  cookieMethod('haveCookie', (res, text, args) => {
    return matchCookiesByPredicate(res, cookie => {
      return cookie.name === args[0] && cookie.value === args[1];
    })
  });

  function matchCookiesByPredicate(res, predicate) {
    var cookies = res.headers._headers['set-cookie'];
    for (var i = 0; i < cookies.length; i++) {
      const cookie = setCookie.parse(cookies[i])[0];
      if(predicate(cookie))
        return true;
    }
    return false;
  }

  function cookieMethod(name, predicate) {
    methodBuilder({
      name: name,
      predicate: predicate,
      msgSuccess: function () {
        return 'expected #{exp} match cookies in http response'
      },
      msgFail: function (args) {
        return 'expected #{exp} not to match cookies in http response'
      },
      expected: function (args) {
        return args;
      },
      actual: function (res) {
        return res.headers._headers['set-cookie'];
      }
    });
  }

};