'use strict';
const express = require('express');

var app = express();
const response = {foo: 'bar'};


app.get('/status/:status', function (req, res) {
  res.statusCode = req.params['status'];
  res.send(JSON.stringify(response))
});

app.get('/cache/:res', function (req, res) {
  res.setHeader('Cache-Control', req.params['res']);
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