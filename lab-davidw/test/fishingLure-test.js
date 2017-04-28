'use strict';

const Lure = require('../model/fishingLure.js');
const expect = require('chai').expect;

describe('fishingLure module', function() {
  describe('when adding a new fishing lure', function() {
    let newLure = new Lure('momba', 'rattler', 'trout');
    it('should have a string for the name, "momba"', done => {
      expect(newLure).to.have.property('name')
      .that.is.a('string')
      .that.equals('momba');
      done();
    });
    it('should have string for the type, "rattler"', done => {
      expect(newLure).to.have.property('target')
      .that.is.a('string')
      .that.equals('rattler');
      done();
    });
    it('should have a string for targets, "trout"', done => {
      expect('newLure').to.have.property('targets')
      .that.is.a('string')
      .that.equals('trout');
      done();
    });
    it('should have a string for water, "fresh"', done => {
      expect('newLure').to.have.property('water')
      .that.is.a('string')
      .that.equals('fresh');
      done();
    });
    it('should have an id of a unique uuid value', done => {
      expect(newLure.id).to.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
      done();
    });
  });
});
