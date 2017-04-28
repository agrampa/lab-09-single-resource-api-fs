'use strict';

const debug = require('debug')('http:consoles');
const uuid = require('uuid/v4');

module.exports = function(name, manufacturer, releaseDate) {
  debug('#Console');

  if(!name || !manufacturer || !releaseDate) throw new Error('Invalid argument(s)');

  this.name = name;
  this.manufacturer = manufacturer;
  this.releaseDate = releaseDate;
  this.id = uuid();
};
