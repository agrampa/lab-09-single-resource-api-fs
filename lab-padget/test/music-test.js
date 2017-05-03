'use strict';
// was file name: live-show-test.js

const Music = require('../model/music');
// const Show = require('../model/live-show');
const expect = require('chai').expect;

describe('music module', function() {
  describe('when creating a new music object', function() {
    this.music = new Music('artist', 'album', true);
    // this.newShow = new Show('artist', 'album', true);
    it('should have a name of "artist"', done => {
      expect(this.music.artist).to.equal('artist');
      done();
    });
    it('should have a type of "album"', done => {
      expect(this.music.album).to.equal('album');
      done();
    });
    it('should have a song "true"', done => {
      expect(this.music.song).to.be.true;
      done();
    });
    it('should have an id of a unique uuid value', done => {
      let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
      expect(this.music.id).to.match(pattern);
      done();
    });
  });
});
