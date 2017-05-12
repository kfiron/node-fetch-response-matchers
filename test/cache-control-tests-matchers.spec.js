'use strict';
const expect = require('chai').expect,
  chai = require('chai'),
  err = require('./drivers/test-helpers').err,
  beforeAndAfter = require('./drivers/test-helpers').beforeAndAfter,
  nodeFetch = require('./drivers/fetch-driver'),
  nodeFetchMatchers = require('..');

describe('cache control fetch matchers', function () {

  beforeAndAfter();

  chai.use(nodeFetchMatchers);

  describe('must-revalidate', () => {
    it('success', () => {
      return expect(nodeFetch.fetchCache('must-revalidate'))
           .to.be.cacheControlMustRevalidate();
    });
    it('error', done => {
      err(expect(nodeFetch.fetchCache('none')).to.be.cacheControlMustRevalidate(),
        'expected [ \'none\' ] to be must-revalidate',
        done);
    });
  });

  describe('no-cache', () => {
    it('success', () => {
      return expect(nodeFetch.fetchCache('no-cache'))
        .to.be.cacheControlNoCache();
    });
    it('error', done => {
      err(expect(nodeFetch.fetchCache('none')).to.be.cacheControlNoCache(),
        'expected [ \'none\' ] to be no-cache',
        done);
    });
  });

  describe('no-store', () => {
    it('success', () => {
      return expect(nodeFetch.fetchCache('no-store'))
        .to.be.cacheControlNoStore();
    });
    it('error', done => {
      err(expect(nodeFetch.fetchCache('none')).to.be.cacheControlNoStore(),
        'expected [ \'none\' ] to be no-store',
        done);
    });
  });

  describe('no-transform', () => {
    it('success', () => {
      return expect(nodeFetch.fetchCache('no-transform'))
        .to.be.cacheControlNoTransform();
    });
    it('error', done => {
      err(expect(nodeFetch.fetchCache('none')).to.be.cacheControlNoTransform(),
        'expected [ \'none\' ] to be no-transform',
        done);
    });
  });

  describe('public', () => {
    it('success', () => {
      return expect(nodeFetch.fetchCache('public'))
        .to.be.cacheControlPublic();
    });
    it('error', done => {
      err(expect(nodeFetch.fetchCache('none')).to.be.cacheControlPublic(),
        'expected [ \'none\' ] to be public',
        done);
    });
  });

  describe('private', () => {
    it('success', () => {
      return expect(nodeFetch.fetchCache('private'))
        .to.be.cacheControlPrivate();
    });
    it('error', done => {
      err(expect(nodeFetch.fetchCache('none')).to.be.cacheControlPrivate(),
        'expected [ \'none\' ] to be private',
        done);
    });
  });

  describe('proxy-revalidate', () => {
    it('success', () => {
      return expect(nodeFetch.fetchCache('proxy-revalidate'))
        .to.be.cacheControlProxyMaxRevalidate();
    });
    it('error', done => {
      err(expect(nodeFetch.fetchCache('none')).to.be.cacheControlProxyMaxRevalidate(),
        'expected [ \'none\' ] to be proxy-revalidate',
        done);
    });
  });

  describe('max-age', () => {
    it('success', () => {
      return expect(nodeFetch.fetchCache('max-age=120'))
        .to.be.cacheControlmMaxAge(120);
    });
    it('error', done => {
      err(expect(nodeFetch.fetchCache('none')).to.be.cacheControlmMaxAge(120),
        'expected [ \'none\' ] to be max-age=120',
        done);
    });
  });

  describe('s-max-age', () => {
    it('success', () => {
      return expect(nodeFetch.fetchCache('s-maxage=120'))
        .to.be.cacheControlSMaxAge(120);
    });
    it('error', done => {
      err(expect(nodeFetch.fetchCache('none')).to.be.cacheControlSMaxAge(120),
        'expected [ \'none\' ] to be s-maxage=120',
        done);
    });
  });

  //


});
