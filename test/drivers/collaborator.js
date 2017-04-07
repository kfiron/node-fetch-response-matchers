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


module.exports.before = ()=> {
  app.listen(3000);
};