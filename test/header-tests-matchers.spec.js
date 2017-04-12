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
    describe('haveHeader', () => {
      it('success', () => {
        return expect(nodeFetch.fetchSuccess()).to.haveHeader(header1Name, header1Value);
      });
      it('not success', done => {
        let name = 'n';
        let value = 'v';
        let header = {};
        header[name] = value;
        return err(expect(nodeFetch.fetchSuccess()).to.haveHeader(name, value),
          'expected { \'0\': \'n\', \'1\': \'v\' } match headers',
          done);
      });
    });
    it('headerExists', () => {
      return expect(nodeFetch.fetchSuccess()).to.headerExists(header1Name);
    });
    it('haveHeaderThat', function () {
      const headerWithCL = value => value.indexOf('cl') > -1;
      return expect(nodeFetch.fetchSuccess()).to
        .haveHeaderThat(header1Name, headerWithCL);
    });
    describe('haveHeaders', function () {
      it('success', function () {
        const headers = {
          connection: 'close',
          'x-powered-by': 'Express'
        };
        return expect(nodeFetch.fetchSuccess()).to.haveHeaders(headers);
      });
      it('fail', done => {
        const headers = {
          connection: 'close',
          'foo': 'not-exists'
        };
        err(expect(nodeFetch.fetchSuccess()).to.haveHeaders(headers),
          'expected { \'0\': { connection: \'close\', foo: \'not-exists\' } } match headers',
          done);

      });
    });

  });


});
