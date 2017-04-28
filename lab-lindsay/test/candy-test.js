'use strict';

const Candy = require('../model/candy');
const expect = require('chai').expect;

describe('candy module', function() {
  it('should create a new candy object', done => {
    let newCandy = new Candy('twix', 'bar', 'crunchy');
    expect(newCandy.name).to.equal('twix');
  });
  it('should have an id of a unique uuid value', done => {
    // xxxxxxxxx-xxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
    expect(this.newCandy.id).to.match(pattern);
    done();
  });
});
