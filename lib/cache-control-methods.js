'use strict';

module.exports = methodBuilder => {

  cacheControlMethod('cacheControlMustRevalidate', res => {
    return cacheControlFromRespone(res) == 'must-revalidate';
  }, 'must-revalidate');

  cacheControlMethod('cacheControlNoCache', res => {
    return cacheControlFromRespone(res) == 'no-cache';
  }, 'no-cache');

  cacheControlMethod('cacheControlNoStore', res => {
    return cacheControlFromRespone(res) == 'no-store';
  }, 'no-store');

  cacheControlMethod('cacheControlNoTransform', res => {
    return cacheControlFromRespone(res) == 'no-transform';
  }, 'no-transform');

  cacheControlMethod('cacheControlPublic', res => {
    return cacheControlFromRespone(res) == 'public';
  }, 'public');

  cacheControlMethod('cacheControlPrivate', res => {
    return cacheControlFromRespone(res) == 'private';
  }, 'private');

  cacheControlMethod('cacheControlProxyMaxRevalidate', res => {
    return cacheControlFromRespone(res) == 'proxy-revalidate';
  }, 'proxy-revalidate');

  cacheControlMethod('cacheControlmMaxAge', (res, args) => {
    return cacheControlFromRespone(res) == 'max-age=' + args[0];
  }, 'max-age=');

  cacheControlMethod('cacheControlSMaxAge', (res, args) => {
    return cacheControlFromRespone(res) == 's-maxage=' + args[0];
  }, 's-maxage=');

  function cacheControlFromRespone(res){
    return res.response.headers._headers['cache-control'];
  }

  function cacheControlMethod(name, predicate, val) {
    methodBuilder({
      name: name,
      predicate: function (res, args) {
        return predicate(res, args)
      },
      msgSuccess:  function(args){
        return 'expected #{act} to be ' + val + (args[0] || '');
      },
      msgFail:  function(args){
        return 'expected #{act} not to be ' + val + (args[0] || '');
      },
      expected: function (args) {
        return args;
      },
      actual: function (res) {
        return res.response.headers._headers['cache-control'];
      }
    });
  }


};