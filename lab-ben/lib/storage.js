'use strict';

const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createItem = function(schema, item) {
  debug('#createItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if (!item) return Promise.reject(new Error('item required'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][item.id] = item;

  // console.log(item, 'storage log');

  Promise.resolve(item);
};

exports.fetchItem = function(schema, id) {
  debug('#fetchItem');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));

    resolve(item);
  });
};

exports.deleteItem = function(schema, id) {
  debug('#deleteItem');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));

    delete storage[schema][id];
    resolve();
  });
};

exports.updateItem = function(schema, id, newItem) {
  debug('#updateItem');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));
    if (!newItem) return reject(new Error('item required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('shchema not found'));

    let old = schemaName[id];
    if(!old) return reject(new Error('item not found'));
    newItem.id = id;

    storage[schema][id] = newItem;

    return resolve(newItem);
  });
};
