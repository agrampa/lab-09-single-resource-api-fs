'use strict';

const Show = require('../model/live-show');
const expect = require('chai').expect;

describe('live-show module', function() {
  describe('when creating a new show object', function() {
    this.newShow = new Show('artist', 'album', true);
    it('should have a name of "artist"', done => {
      expect(this.newShow.artist).to.equal('artist');
      done();
    });
    it('should have a type of "album"', done => {
      expect(this.newShow.album).to.equal('album');
      done();
    });
    it('should have a song "true"', done => {
      expect(this.newShow.song).to.be.true;
      done();
    });
    it('should have an id of a unique uuid value', done => {
      let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
      expect(this.newShow.id).to.match(pattern);
      done();
    });
  });
});
