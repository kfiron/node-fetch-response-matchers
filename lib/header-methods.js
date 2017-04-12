'use strict';

module.exports = methodBuilder => {

  headerMethod('haveHeader', (res, args) => {
    return res.headers._headers[args[0]] == args[1];
  });

  headerMethod('headerExists', (res, args) => {
    return res.headers._headers[args[0]] != null
  });

  headerMethod('haveHeaderThat', (res, args) => {
    const header = res.headers._headers[args[0]];
    return (header != null && args[1](res.headers._headers[args[0]][0]));
  });

  headerMethod('haveHeaders', (res, args) => {
    var headers = {};
    var headersExsits = true;
    Object.keys(res.headers._headers).forEach(function(key) {
      return headers[key] = res.headers._headers[key][0];
    });
    Object.keys(args[0]).forEach(key => {
      if(headers[key] != args[0][key])
        headersExsits = false;
    });
    return headersExsits;
  });


  function headerMethod(name, predicate) {
    methodBuilder({
      name: name,
      predicate: function (res, text, args) {
        return predicate(res, args)
      },
      msgSuccess:  function(){
        return 'expected #{exp} match headers';
      },
      msgFail:  function(){
        return 'expected #{exp} not match headers';
      },
      expected: function (args) {
        return args;
      },
      actual: function (res) {
        return res.headers._headers;
      }
    });
  }


};