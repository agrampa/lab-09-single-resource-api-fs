'use strict';

const Music = require('../model/music');
const chai = require('chai');
const http = require('chai-http');
const expect = require('chai').expect;

chai.use(http);

describe('music module', function() {
  describe('when creating a new music object', function() {
    this.newMusic = new Music('artist', 'album', true);

    it('should have a name of "artist"', done => {
      expect(this.newMusic.artist).to.equal('artist');
      done();
    });
    it('should have a type of "album"', done => {
      expect(this.newMusic.album).to.equal('album');
      done();
    });
    it('should have a song "true"', done => {
      expect(this.newMusic.song).to.be.true;
      done();
    });
    it('should have an id of a unique uuid value', done => {
      let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
      expect(this.newMusic.id).to.match(pattern);
      done();
    });
  });
});
