'use strict';

const debug = require('debug')('http:fishingLure');
const uuid = require('uuid/v4');

module.exports = function(name, type, targets, water='fresh') {
  debug('#fishingLure constructor');
  if(!name || !type) throw new Error('invalid arguments');
  this.name = name;
  this.type = type;
  this.targets = targets;
  this.water = water;
  this.id = uuid();
};
