'use strict';
const expect = require('chai').expect,
  collaborator = require('./collaborator');

module.exports.err = (promise, err, done) => {
  promise.then().catch(e => {
    try {
      expect(e.message).to.equal(err);
    } catch (e1) {
      console.error(e1.message);
      throw e1;
    }
    done();
  })
};

module.exports.beforeAndAfter = ()=> {
  before(() => {
    collaborator.before();
  });
  after(() => {
    collaborator.after();
  });
};