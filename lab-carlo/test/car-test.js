'use strict';
const auto = require('../model/cars');
const expect = require('chai').expect;

describe('Automobile module', function() {
  it('should create a new Automobile object with name: Mazda', done => {
    let newAuto = new auto('Mazda', 'RX-7');
    expect(newAuto.name).to.equal('Mazda');
    done();
  });
  it('should create a new Automobile object with car: RX-7', done => {
    let newAuto = new auto('Mazda', 'RX-7');
    expect(newAuto.car).to.equal('RX-7');
    done();
  });
  it('should have an id of a unique uuid value', done => {
    let newAuto = new auto('Mazda', 'RX-7');
    let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
    expect(newAuto.id).to.match(pattern);
    done();
  });
});
