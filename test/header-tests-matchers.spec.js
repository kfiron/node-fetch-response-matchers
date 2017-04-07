'use strict';
const expect = require('chai').expect,
  chai = require('chai'),
  beforeAndAfter = require('./drivers/test-helpers').beforeAndAfter,
  nodeFetch = require('./drivers/fetch-driver'),
  nodeFetchMatchers = require('..');

describe('header fetch matchers', function () {

  beforeAndAfter();

  chai.use(nodeFetchMatchers);

  var header1Name = 'connection';
  var header1Value = 'close';

  describe('header fetch matchers', () => {
    it('haveHeader', () => {
      return expect(nodeFetch.fetchSuccess()).to.haveHeader(header1Name, header1Value);
    });
    it('headerExists', () => {
      return expect(nodeFetch.fetchSuccess()).to.headerExists(header1Name);
    });
  });


});
