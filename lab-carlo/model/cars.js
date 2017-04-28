'use strict';

const uuid = require('uuid/v4');

module.exports = function(name, car) {
  if(!name || !car) throw new Error('Invalid arguments');
  this.name = name;
  this.car = car;
  this.id = uuid();
};
