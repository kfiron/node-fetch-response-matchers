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
  //


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