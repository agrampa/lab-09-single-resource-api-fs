'use strict';

const Show = require('../model/live-show');
const expect = require('chai').expect;

describe('live-show module', function() {
  describe('when creating a new music object', function() {
    this.newShow = new Show('music box', 'musical', true);
    it('should have a name of "music box"', done => {
      expect(this.newShow.name).to.equal('music box');
      done();
    });
    it('should have a type of "musical"', done => {
      expect(this.newShow.type).to.equal('musical');
      done();
    });
    it('should have a hazard of "true"', done => {
      expect(this.newShow.hazard).to.be.true;
      done();
    });
    it('should have an id of a unique uuid value', done => {
      let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
      expect(this.newShow.id).to.match(pattern);
      done();
    });
  });
});
