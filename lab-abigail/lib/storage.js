'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createItem = function(schema, food) {
  debug('#createItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!food) return Promise.reject(new Error('food required'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][food.id] = food;

  fs.writeFileProm(`./data/${food.id}.txt`, JSON.stringify(food))
  .then( (food) => {
  })
  .catch(console.error);
};

exports.updateItem = function(schema, id) {
  debug('#updateItem');

  if(!schema) return reject(new Error('shema required'));
  if(!id) return reject(new Error('id required'));

  return fs.readFileProm(`./data/${id}.txt`)
  .then( food => {
    fs.writeFileProm(`./data/${id}.txt`, JSON.stringify(food))
    .then( (food) => {
    })
    .catch(console.error);
  })
  .catch(console.error);
};

exports.fetchItem = function(schema, id) {
  debug('#fetchItem');
  if(!schema) return reject(new Error('shema required'));
  if(!id) return reject(new Error('id required'));

  return fs.readFileProm(`./data/${id}.txt`)
  .then(food => {
    return JSON.parse(food);
  })
  .catch(console.error);
};

exports.deleteItem = function(schema, id) {
  debug('#deleteItem');

  if(!schema) return reject(new Error('schema required'));
  if(!id) return reject(new Error('id required'));

  return fs.unlinkProm(`./data/${id}.txt`)
  .then(food => {
    console.log('Food deleted');
  })
  .catch(console.error);
};
