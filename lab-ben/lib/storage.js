'use strict';

const debug = require('debug')('http:storage');
const storage = {};
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createItem = function(folder, item) {
  debug('#createItem');

  if(!folder) return Promise.reject(new Error('schema required'));
  if (!item) return Promise.reject(new Error('item required'));

  console.log(item);

  fs.writeFileProm(`./data/${folder}/${item.id}.txt`, JSON.stringify(item))
  .then(Promise.resolve(item));



  // console.log(item, 'storage log');

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

exports.deleteItem = function(folder, id) {
  debug('#deleteItem');

  return new Promise((resolve, reject) => {
    if(!folder) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    // let schemaName = storage[schema];
    // if(!schemaName) return reject(new Error('schema not found'));
    fs.accessProm(`./data/${folder}`)
    .then(fs.accessProm(`./data/${folder}/${id}.txt`))
    .then(fs.unlinkProm(`./data/${folder}/${id}.txt`))
    .catch(e => {
      console.error(e);
    });
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
