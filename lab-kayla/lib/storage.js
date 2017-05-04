'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createItem = function(schema, dragon) {
  debug('#createItem')

  if(!schema) return Promise.reject(new Error('schema required'))
  if(!dragon) return Promise.reject(new Error('item required'))
  if(!storage[schema]) storage[schema] = {};

  storage[schema][dragon.id] = dragon;

  fs.writeFileProm(`${__dirname}/../data/${dragon.id}.json`, JSON.strigify(dragon))
  .then((dragon) => console.log(dragon))
  .catch(err => Promise.reject(err))
};

exports.fetchItem = function(schema, id) {
  debug('#fetchItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));

  return fs.readFileProm(`${__dirname}/../data/${id}.json`)
  .then((dragon) => {
    return JSON.parse(dragon)
  })
  .catch(console.error)
};

exports.updateItem = (schema, id, newDragon) => {
  debug('#updateItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));

  return fs.readFileProm(`${__dirname}/../data/${id}.json`)
  .then( dragon => {
    let stringDragon = JSON.parse(dragon.toString());
    if(newDragon.name) stringDragon.name = newDragon.name;
    if(newDragon.type) stringDragon.type = newDragon.type;
    if(newDragon.killer) stringDragon.killer = newDragon.killer;
    fs.writeFileProm(`${__dirname}/../data/${id}.json`, JSON.stringify(stringDragon));
  })
  .catch(console.error)
};

exports.deleteItem = function(schema, id) {
  debug('#deleteItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));

  return fs.unlinkProm(`${__dirname}/../data/${id}.json`)
  .then(() => {
    console.log('dragon deleted');
  })
  .catch(console.error)
};
