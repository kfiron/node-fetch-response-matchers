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

  describe('node fetch matchers', () => {
    describe('successful', () => {
      it('successful', () => {
        return expect(nodeFetch.fetchSuccess()).to.be.successful();
      });
      it('successful not success', done => {
        err(expect(nodeFetch.fetchNotSuccess()).to.be.successful(),
          'expected http status 400 to equal 200',
          done)
      });
    });
    describe('popular statuses', () => {
      it('created', () => {
        return expect(nodeFetch.fetchCreated()).to.be.created();
      });
      it('created not success', done => {
        err(expect(nodeFetch.fetchUnauthorized()).to.be.created(),
          'expected http status 401 to equal 201',
          done)
      });
      it('unauthorized', () => {
        return expect(nodeFetch.fetchUnauthorized()).to.be.unauthorized();
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

    describe('haveStatus', () => {
      it('haveStatus', () => {
        const status = 150;
        return expect(nodeFetch.fetchWithStatus(status)).to.haveStatus(status);
      });
      it('haveStatus not success', done => {
        return err(expect(nodeFetch.fetchUnauthorized()).to.be.haveStatus(155),
          'expected http status 401 to equal 155',
          done);
      });
    });

  });


});
