'use strict';
const expect = require('chai').expect,
  chai = require('chai'),
  err = require('./drivers/test-helpers').err,
  beforeAndAfter = require('./drivers/test-helpers').beforeAndAfter,
  collaborator = require('./drivers/collaborator'),
  nodeFetch = require('./drivers/fetch-driver'),
  nodeFetchMatchers = require('..');

describe('status fetch matchers', function () {

  beforeAndAfter();

  chai.use(nodeFetchMatchers);

  var responseObject = {foo: 'bar'};

  it('integration with chai "not"', () => {
    return expect(nodeFetch.fetchSuccess()).to.not.be.rejected();
  });
  it.skip('integration with chai "and"', () => {
    return expect(nodeFetch.fetchSuccess()).to.be.successful()
            .and.to.haveBodyObject(responseObject);
  });




});
