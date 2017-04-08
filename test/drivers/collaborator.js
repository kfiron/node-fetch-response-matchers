'use strict';
const express = require('express');

var app = express();
const response = {foo: 'bar'};

app.get('/success', function (req, res) {
  res.send(JSON.stringify(response))
});

app.get('/not-success', function (req, res) {
  res.statusCode = 400;
  res.send(JSON.stringify(response))
});

app.get('/reject', function (req, res) {
  res.statusCode = 403;
  res.send(JSON.stringify(response))
});

app.get('/server-error', function (req, res) {
  res.statusCode = 500;
  res.send(JSON.stringify(response))
});

app.get('/server-error', function (req, res) {
  res.statusCode = 500;
  res.send(JSON.stringify(response))
});

app.get('/created', function (req, res) {
  res.statusCode = 201;
  res.send(JSON.stringify(response))
});


app.get('/un-authorized', function (req, res) {
  res.statusCode = 401;
  res.send(JSON.stringify(response))
});

app.get('/service-unavailable', function (req, res) {
  res.statusCode = 503;
  res.send(JSON.stringify(response))
});

app.get('/status/:code', function (req, res) {
  res.statusCode = parseInt(req.params['code']);
  res.send(JSON.stringify(response))
});

app.get('/cookie/:name/:val', function (req, res) {
  res.cookie(req.params['name'], req.params['val'], { domain: '.example.com'});
  res.cookie('foo', 'bar', { domain: '.example.com'});
  res.send(JSON.stringify(response))
});


var server;
module.exports.before = ()=> {
  server = app.listen(3000);
};

module.exports.after = ()=> {
  server.close();
};