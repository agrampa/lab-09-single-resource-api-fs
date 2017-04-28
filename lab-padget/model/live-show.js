'use strict';

// eslint-disable-next-line
const debug = require('debug')('http:live-show');
const uuid = require('uuid/v4');

module.exports = function(artist, album, song=true) {
  if(!artist || !album) throw new Error('Invalid arguments');
  this.artist = artist; // name
  this.album = album; // type
  this.song = song; // hazard
  this.id = uuid();
};
