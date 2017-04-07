'use strict';
const nodeFetch = require('node-fetch');


module.exports.fetchSuccess = () => {
  return nodeFetch('http://localhost:3000/success');
};

module.exports.fetchNotSuccess = () => {
  return nodeFetch('http://localhost:3000/not-success');
};

module.exports.fetchRejected = () => {
  return nodeFetch('http://localhost:3000/reject');
};

module.exports.fetchNotFound = () => {
  return nodeFetch('http://localhost:3000/not-found');
};

module.exports.fetchServerError = () => {
  return nodeFetch('http://localhost:3000/server-error');
};
