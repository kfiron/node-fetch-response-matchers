'use strict';
const expect = require('chai').expect,
  chai = require('chai'),
  beforeAndAfter = require('./drivers/test-helpers').beforeAndAfter,
  nodeFetch = require('./drivers/fetch-driver'),
  nodeFetchMatchers = require('..');

describe('node fetch matchers', function () {

  beforeAndAfter();

  var responseObject = {foo: 'bar'};
  var responseObjectText = JSON.stringify(responseObject);

  chai.use(nodeFetchMatchers);

  describe('body fetch matchers', () => {
    describe('content validation', () => {
      it('haveBodyObject', () => {
        return expect(nodeFetch.fetchSuccess()).to.be.haveBodyObject(responseObject);
      });
      it('haveBodyText', () => {
        return expect(nodeFetch.fetchSuccess()).to.be.haveBodyText(responseObjectText);
      });
      it('haveBodyRegexpMatch', () => {
        return expect(nodeFetch.fetchSuccess()).to.be.haveBodyRegexpMatch(/foo/);
      });
    });
  });


});
