'use strict';
const nodeFetch = require('node-fetch');


module.exports.fetchSuccess = () => {
  return nodeFetch('http://localhost:3000/status/200');
};

module.exports.fetchNotSuccess = () => {
  return nodeFetch('http://localhost:3000/status/400');
};

module.exports.fetchRejected = () => {
  return nodeFetch('http://localhost:3000/status/403');
};

module.exports.fetchCreated = () => {
  return nodeFetch('http://localhost:3000/status/201');
};


module.exports.fetchUnauthorized = () => {
  return nodeFetch('http://localhost:3000/status/401');
};

module.exports.fetchForbidden = () => {
  return nodeFetch('http://localhost:3000/forbidden');
};

module.exports.fetchServiceUnavailable = () => {
  return nodeFetch('http://localhost:3000/status/503');
};

module.exports.fetchNotFound = () => {
  return nodeFetch('http://localhost:3000/not-found');
};

module.exports.fetchServerError = () => {
  return nodeFetch('http://localhost:3000/status/500');
};

module.exports.fetchWithStatus = code => {
  return nodeFetch('http://localhost:3000/status/' + code);
};

module.exports.fetchWithCookie = (name, val) => {
  return nodeFetch(`http://localhost:3000/cookie/${name}/${val}`);
};

module.exports.fetchCache = (val) => {
  return nodeFetch(`http://localhost:3000/cache/${val}`);
};


