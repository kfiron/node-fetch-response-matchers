'use strict';
const expect = require('chai').expect;

module.exports.err = (promise, err, done) => {
  promise.catch(e => {
    expect(e.message).to.equal(err);
    done();
  })
};