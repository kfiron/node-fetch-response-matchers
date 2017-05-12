'use strict';

module.exports = methodBuilder => {

  cacheControlMethod('cacheControlMustRevalidate', res => {
    return res.headers._headers['cache-control'] == 'must-revalidate';
  }, 'must-revalidate');

  cacheControlMethod('cacheControlNoCache', res => {
    return res.headers._headers['cache-control'] == 'no-cache';
  }, 'no-cache');

  cacheControlMethod('cacheControlNoStore', res => {
    return res.headers._headers['cache-control'] == 'no-store';
  }, 'no-store');

  cacheControlMethod('cacheControlNoTransform', res => {
    return res.headers._headers['cache-control'] == 'no-transform';
  }, 'no-transform');

  cacheControlMethod('cacheControlPublic', res => {
    return res.headers._headers['cache-control'] == 'public';
  }, 'public');

  cacheControlMethod('cacheControlPrivate', res => {
    return res.headers._headers['cache-control'] == 'private';
  }, 'private');

  cacheControlMethod('cacheControlProxyMaxRevalidate', res => {
    return res.headers._headers['cache-control'] == 'proxy-revalidate';
  }, 'proxy-revalidate');

  cacheControlMethod('cacheControlmMaxAge', (res, args) => {
    return res.headers._headers['cache-control'] == 'max-age=' + args[0];
  }, 'max-age=');

  cacheControlMethod('cacheControlSMaxAge', (res, args) => {
    return res.headers._headers['cache-control'] == 's-maxage=' + args[0];
  }, 's-maxage=');


  function cacheControlMethod(name, predicate, val) {
    methodBuilder({
      name: name,
      predicate: function (res, text, args) {
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
        return res.headers._headers['cache-control'];
      }
    });
  }


};