'use strict';
const nodeFetch = require('node-fetch');

var baseUrl = 'http://localhost:3000';

module.exports =  {
  fetchSuccess: function(){
    return nodeFetch(`${baseUrl}/status/200`);
  },
  fetchNotSuccess: function(){
    return nodeFetch(`${baseUrl}/status/400`);
  },
  fetchCreated: function(){
    return nodeFetch(`${baseUrl}/status/201`);
  },
  fetchUnauthorized: function(){
    return nodeFetch(`${baseUrl}/status/401`);
  },
  fetchServiceUnavailable: function(){
    return nodeFetch(`${baseUrl}/status/503`);
  },
  fetchNotFound: function(){
    return nodeFetch(`${baseUrl}/not-found`);
  },
  fetchServerError: function(){
    return nodeFetch(`${baseUrl}/status/500`);
  },
  fetchWithStatus: function(code){
    return nodeFetch(`${baseUrl}/status/${code}`);
  },
  fetchWithCookie: function(name, val){
    return nodeFetch(`${baseUrl}/cookie/${name}/${val}`);
  },
  fetchCache: function(val){
    return nodeFetch(`${baseUrl}/cache/${val}`);
  }

};

