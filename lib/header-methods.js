'use strict';

module.exports = methodBuilder => {

  headerMethod('haveHeader', (res, args) => {
    return headerFromRequest(res, args[0]) == args[1];
  });

  headerMethod('headerExists', (res, args) => {
    return headerFromRequest(res, args[0]) != null
  });

  headerMethod('haveHeaderThat', (res, args) => {
    const header = headerFromRequest(res, args[0]);
    return (header != null && args[1](headerFromRequest(res, args[0])[0]));
  });

  function headerFromRequest(res, name){
    return res.response.headers._headers[name];
  }

  headerMethod('haveHeaders', (res, args) => {
    var headers = {};
    var headersExsits = true;
    Object.keys(res.response.headers._headers).forEach(function(key) {
      return headers[key] = res.response.headers._headers[key][0];
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
      predicate: function (res, args) {
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
        return res.response.headers._headers;
      }
    });
  }


};