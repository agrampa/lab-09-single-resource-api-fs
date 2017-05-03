'use strict';

const debug = require('debug')('http:food');
const uuid = require('uuid/v4');

module.exports = function(name, type, cost) {
  if(!name || !type) throw new Error('Invalid arguments');
  this.name = name;
  this.type = type;
  this.cost = cost;
  this.id = uuid();
};
