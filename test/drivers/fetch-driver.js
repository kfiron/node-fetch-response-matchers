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

module.exports.fetchCreated = () => {
  return nodeFetch('http://localhost:3000/created');
};


module.exports.fetchUnAuthorized = () => {
  return nodeFetch('http://localhost:3000/un-authorized');
};

module.exports.fetchForbidden = () => {
  return nodeFetch('http://localhost:3000/forbidden');
};

module.exports.fetchServiceUnavailable = () => {
  return nodeFetch('http://localhost:3000/service-unavailable');
};

module.exports.fetchNotFound = () => {
  return nodeFetch('http://localhost:3000/not-found');
};

module.exports.fetchServerError = () => {
  return nodeFetch('http://localhost:3000/server-error');
};

module.exports.fetchWithStatus = code => {
  return nodeFetch('http://localhost:3000/status/' + code);
};


