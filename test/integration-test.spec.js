'use strict';
const expect = require('chai').expect,
  chai = require('chai'),
  err = require('./drivers/test-helpers').err,
  beforeAndAfter = require('./drivers/test-helpers').beforeAndAfter,
  nodeFetch = require('./drivers/fetch-driver'),
  nodeFetchMatchers = require('..');

describe('status fetch matchers', function () {

  beforeAndAfter();

  chai.use(nodeFetchMatchers);

  var responseObject = {foo: 'bar'};

  it('integration with chai "not"', () => {
    return expect(nodeFetch.fetchSuccess()).to.not.be.rejected();
  });
  describe('composition', () => {
    var assert = () => expect(nodeFetch.fetchSuccess());
    it('success', () => {
      return assert().to.be.successful()
        .and.to.haveBodyObject(responseObject);
    });
    it('fail on first assert', done => {
      err(assert().to.be.rejected()
        .and.to.haveBodyObject(responseObject),
        'expected http status 200 to equal 403',
        done);
    });
    it('fail on the second assert', done => {
      err(assert().to.be.successful()
        .and.to.haveBodyObject({invalid: 'object'}),
        'expected { invalid: \'object\' } to match body with { foo: \'bar\' }',
        done);
    });
  });

});
