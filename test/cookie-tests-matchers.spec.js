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

  var cookieName = 'cName';
  var cookieValue = 'cValue';

  describe('cookie matcehrs', () => {
    describe('haveCookieByName(name)', () => {
      it('success', () => {
        return expect(nodeFetch.fetchWithCookie(cookieName, cookieValue))
          .to.haveCookieByName(cookieName);
      });
      it('fail', done => {
        err(expect(nodeFetch.fetchWithCookie(cookieName, cookieValue))
          .to.haveCookieByName('other-cookie'),
          'expected { \'0\': \'other-cookie\' } match cookies in http response',
          done);

      });
    });
    describe('haveCookie(name, value)', () => {
      it('success', () => {
        return expect(nodeFetch.fetchWithCookie(cookieName, cookieValue))
          .to.haveCookie(cookieName, cookieValue);
      });
      it('fail', done => {
        return err(expect(nodeFetch.fetchWithCookie(cookieName, cookieValue))
          .to.haveCookie('other-cookie', 'cookieValue'),
          'expected { \'0\': \'other-cookie\', \'1\': \'cookieValue\' } match cookies in http response',
          done);
      });
    });
    it('haveCookieThat(name, predicate(cookie))', () => {
      const cookieDomainExampleCom = cookie => cookie.domain === '.example.com';
      return expect(nodeFetch.fetchWithCookie(cookieName, cookieValue))
        .to.haveCookieThat(cookieName, cookieDomainExampleCom);
    });
  });
});
