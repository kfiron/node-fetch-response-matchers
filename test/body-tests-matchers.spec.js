'use strict';
const expect = require('chai').expect,
  chai = require('chai'),
  err = require('./drivers/test-helpers').err,
  beforeAndAfter = require('./drivers/test-helpers').beforeAndAfter,
  nodeFetch = require('./drivers/fetch-driver'),
  nodeFetchMatchers = require('..');

describe('body fetch matchers', function () {

  beforeAndAfter();

  var responseObject = {foo: 'bar'};
  var responseObjectText = JSON.stringify(responseObject);

  chai.use(nodeFetchMatchers);

  describe('body content validation', () => {

    describe('haveBodyObject', function(){
      it('success', () => {
        return expect(nodeFetch.fetchSuccess()).to.be.haveBodyObject(responseObject);
      });
      it('fail', done => {
        return err(expect(nodeFetch.fetchSuccess()).to.be.haveBodyObject({bla: 'bla'}),
          'expected { bla: \'bla\' } to match body with { foo: \'bar\' }',
          done);
      });
    });

    describe('haveBodyText', function(){
      it('success', () => {
        return expect(nodeFetch.fetchSuccess()).to.be.haveBodyText(responseObjectText);
      });
      it('fail', done => {
        return err(expect(nodeFetch.fetchSuccess()).to.be.haveBodyText('bla'),
          'expected \'bla\' to match body with \'{"foo":"bar"}\'',
          done);
      });
    });


    describe('haveBodyRegexpMatch', function(){
      it('success', () => {
        return expect(nodeFetch.fetchSuccess()).to.be.haveBodyRegexpMatch(/foo/);
      });
      it('fail', done => {
        return err(expect(nodeFetch.fetchSuccess()).to.be.haveBodyRegexpMatch(/bla/),
          'expected /bla/ to match body with \'{"foo":"bar"}\'',
          done);
      });
    });

    it('haveBodyThat', () => {
      const haveFoo = text => text.indexOf('foo') != -1;
      return expect(nodeFetch.fetchSuccess()).to.be.haveBodyThat(haveFoo);
    });
    it('haveBodyThat not success', done => {
      const haveFoo = text => text.indexOf('foo') == -1;
      return err(expect(nodeFetch.fetchSuccess()).to.be.haveBodyThat(haveFoo),
        'expected [Function: haveFoo] to match body with \'{"foo":"bar"}\'',
        done);
    });
  });


});
