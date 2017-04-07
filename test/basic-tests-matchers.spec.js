'use strict';
const expect = require('chai').expect,
  chai = require('chai'),
  err = require('./drivers/test-helpers').err,
  collaborator = require('./drivers/collaborator'),
  nodeFetch = require('./drivers/fetch-driver'),
  nodeFetchMatchers = require('..');

describe('node fetch matchers', function () {

  before(() => {
    collaborator.before();
  });

  var responseObject = {foo: 'bar'};
  var responseObjectText = JSON.stringify(responseObject);

  chai.use(nodeFetchMatchers);

  describe('node fetch matchers', () => {
    describe('successful', () => {
      it('successful', () => {
        return expect(nodeFetch.fetchSuccess()).to.be.successful();
      });
      it('successful not success', done => {
        // TODO - improve assertion
        err(expect(nodeFetch.fetchNotSuccess()).to.be.successful(),
                   'expected http status to equal 200',
                   done)
      });
    });
    describe('popular statuses', () => {
      it('created', () => {
        return expect(nodeFetch.fetchCreated()).to.be.created();
      });
      it('unAuthorized', () => {
        return expect(nodeFetch.fetchUnAuthorized()).to.be.unAuthorized();
      });
      it('serviceUnAvailable', () => {
        return expect(nodeFetch.fetchServiceUnavailable()).to.be.serviceUnAvailable();
      });
      it('notFound', () => {
        return expect(nodeFetch.fetchNotFound()).to.be.notFound();
      });
      it('serverError', () => {
        return expect(nodeFetch.fetchServerError()).to.be.serverError();
      });
    });

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
