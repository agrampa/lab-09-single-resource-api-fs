'use strict';

const debug = require('debug')('http:live-show'); // was >> http:kid-toy
console.log(debug);
const uuid = require('uuid/v4');

// http POST :3000/api/music artist=“Lala” album=”GetReal” song=“MakeBelieve”
module.exports = function(artist, album, song=true) {
  if(!artist || !album) throw new Error('Invalid arguments');
  // Hazard property will be true. In this case of song.
  this.artist = artist; // was >> name
  this.album = album; // was >> type
  this.song = song; // was >> hazard
  this.id = uuid();
};

// const debug = require('debug')('http:live-show');
// const uuid = require('uuid/v4');
//
// module.exports = function(name, type, hazard=true) {
//   if(!name || !type) throw new Error('Invalid arguments');
//   this.name = name;
//   this.type = type;
//   this.hazard = hazard;
//   this.id = uuid();
// };
