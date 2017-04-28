'use strict';

// const debug = require('debug')('http:planet');
const uuid = require('uuid/v4');

module.exports = function(name, universe) {
  if(!name || !universe) throw new Error('Invalid arguments');
  this.name = name;
  this.universe = universe;
  this.id = uuid();
};
