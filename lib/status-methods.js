'use strict';

module.exports.addStatusMethods = methodBuilder => {
  statusMethod('successful', 200);
  statusMethod('created', 201);
  statusMethod('unAuthorized', 401);
  statusMethod('rejected', 403);
  statusMethod('notFound', 404);
  statusMethod('serverError', 500);
  statusMethod('serviceUnAvailable', 503);
  statusMethod('haveStatus'); // TODO refactor that

  function statusMethod(name, code) {
    methodBuilder({
      name: name,
      predicate: function (res, text, args) {
        return (args.length == 0) ? res.status == code : res.status == args[0];
      },
      msgSuccess: 'expected http status to equal ' + code,
      msgFail: 'expected status to not equal ' + code,
      expected: function () {
        return code;
      },
      actual: function (res) {
        return res.status;
      }
    });
  }

};