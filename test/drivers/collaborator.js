'use strict';
const express = require('express');

var app = express();
const response = {foo: 'bar'};
const ok = 200;


app.get('/status/:status', function (req, res) {
  sendResponse(res, req.params['status']);
});

app.get('/buffer/:request', function (req, res) {
  res.status(200);
  res.send(req.params['request'])
});

app.get('/cache/:res', function (req, res) {
  res.setHeader('Cache-Control', req.params['res']);
  sendResponse(res, ok);
});

app.get('/cookie/:name/:val', function (req, res) {
  res.cookie(req.params['name'], req.params['val'], { domain: '.example.com'});
  res.cookie('foo', 'bar', { domain: '.example.com'});
  sendResponse(res, ok);
});

function sendResponse(res, status){
  res.statusCode = status;
  res.send(JSON.stringify(response))
}


var server;
module.exports.before = ()=> {
  server = app.listen(3000);
};

module.exports.after = ()=> {
  server.close();
};