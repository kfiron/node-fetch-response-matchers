'use strict';
const expect = require('chai').expect,
  collaborator = require('./collaborator');

module.exports.err = (promise, err, done) => {
  promise.catch(e => {
    expect(e.message).to.equal(err);
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