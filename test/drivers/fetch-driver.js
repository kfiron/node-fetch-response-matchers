'use strict';
const nodeFetch = require('node-fetch');

const baseUrl = 'http://localhost:3000';

module.exports =  {
  fetchSuccess: function(){
    return fetch('/status/200');
  },
  fetchBufferSuccess: request => {
    return fetch(`/buffer/${request}`);
  },
  fetchNotSuccess: function(){
    return fetch('/status/400');
  },
  fetchCreated: function(){
    return fetch('/status/201');
  },
  fetchUnauthorized: function(){
    return fetch('/status/401');
  },
  fetchServiceUnavailable: function(){
    return fetch('/status/503');
  },
  fetchNotFound: function(){
    return fetch('/not-found');
  },
  fetchServerError: function(){
    return fetch('/status/500');
  },
  fetchWithStatus: function(code){
    return fetch(`/status/${code}`);
  },
  fetchWithCookie: function(name, val){
    return fetch(`/cookie/${name}/${val}`);
  },
  fetchCache: function(val){
    return fetch(`/cache/${val}`);
  }
};

function fetch(path){
  return nodeFetch(`${baseUrl}${path}`);
}

