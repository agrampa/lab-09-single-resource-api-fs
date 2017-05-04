'use strict';

// const Dragon = require('../model/killer-dragon');
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
    // let schemaName = storage[schema]; // = storage.dragon
    // if(!schemaName) return reject(new Error('schema not found'));
    //
    // let item = schemaName[id];
    // if(!item) return reject(new Error('item not found'));
    //
    // resolve(item);
};

// exports.fetchAll = (schema) => {
//   debug('#fetchAll');
//
//   if(!schema) return Promise.reject(new Error('schema required'));
//
//   return fs.
//     // let ids = Object.keys(storage[schema]);
//     // if(!ids) return reject(new Error('no items found'));
//     //
//     // resolve(ids);
//
// };

exports.deleteItem = function(schema, id) {
  debug('#deleteItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));

  return fs.unlinkProm(`${__dirname}/../data/${id}.json`)
  .then(() => {
    console.log('dragon deleted');
  })
  .catch(console.error)
    // let schemaName = storage[schema];
    // if(!schemaName) return reject(new Error('schema not found'));
    //
    // let item = schemaName[id];
    // if(!item) return reject(new Error('item not found'));
    //
    // delete(schemaName[id]);
    // resolve(item);
    //
};
