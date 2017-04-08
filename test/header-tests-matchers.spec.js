'use strict';
const expect = require('chai').expect,
  chai = require('chai'),
  err = require('./drivers/test-helpers').err,
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
    it('haveHeader not success', done => {
      let name = 'n';
      let value = 'v';
      let header = {};
      header[name] = value;
      return err(expect(nodeFetch.fetchSuccess()).to.haveHeader(name, value),
        'expected { \'0\': \'n\', \'1\': \'v\' } match headers',
        done);
    });
    it('headerExists', () => {
      return expect(nodeFetch.fetchSuccess()).to.headerExists(header1Name);
    });
  });


});
