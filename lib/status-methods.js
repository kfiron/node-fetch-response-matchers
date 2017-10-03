'use strict';

module.exports = methodBuilder => {
  statusMethod('successful', 200);
  statusMethod('created', 201);
  statusMethod('badRequest', 400);
  statusMethod('unauthorized', 401);
  statusMethod('rejected', 403);
  statusMethod('notFound', 404);
  statusMethod('serverError', 500);
  statusMethod('serviceUnAvailable', 503);
  statusMethod('haveStatus');

  function statusMethod(name, code) {
    methodBuilder({
      name: name,
      predicate: function (res, args) {
        return (args.length == 0) ? res.response.status == code : res.response.status == args[0];
      },
      msgSuccess: function(args){
        return 'expected http status #{act} to equal ' + (args[0] || code)
      },
      msgFail: function(args){
        return 'expected status #{act} to not equal ' + (args[0] || code);
      },
      expected: function () {
        return code;
      },
      actual: function (res) {
        return res.response.status;
      }
    });
  }
};
