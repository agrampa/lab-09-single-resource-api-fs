'use strict';

const Promise = require('bluebird');
const debug = require('debug')('http:storage');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const mkdirp = Promise.promisifyAll(require('mkdirp'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  debug('#createItem');

  if(!schemaName) return Promise.reject(new Error('schema required'));
  if(!item) return Promise.reject(new Error('item required'));
  //   if(!storage[schema]) storage[schema] = {};
  //
  //   storage[schema][item.id] = item;
  //
  //   return Promise.resolve(item);
  // };

  let json = JSON.stringify(item);

  return fs.accessProm(`${__dirname}/../data/${schemaName}`)
  .catch(err => {
    if(err.code === 'ENOENT') {
      return mkdirp.sync(`${__dirname}/../data/${schemaName}`);
    }
  })
  .then( () => fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json))
  .then( () => item)
  .catch( err => Promise.reject(err));
};
//
// exports.updateItem = function(schema, id) {
//   debug('#updateItem /api/lure');
//
//
//   return new Promise((resolve, reject) => {
//     if(!schema) return reject(new Error('schema required'));
//     if(!id) return reject(new Error('item required'));
//     if(!storage[schema]) return reject(new Error('no item to update, create it first!'));
//     let item = schema[id];
//
//
//     storage[schema][item.id] = item;
//
//     resolve(item);
//   });
// };

exports.fetchItem = function(schemaName, id) {
  debug('#fetchItem /api/lure');
  //
  //   return new Promise((resolve, reject) => {
  if(!schemaName) return Promise.reject(new Error('schemaName required'));
  if(!id) return Promise.reject(new Error('id required'));
  //
  //     let schemaName = storage[schema];
  //     if(!schemaName) return reject(new Error('schema not found'));
  //
  //     let item = schemaName[id];
  //     if(!item) return reject(new Error('item not found'));
  //
  //     resolve(item);
  //   });
  // };

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch(err) {
      return Promise.reject(err);
    }
  })
  .catch(err => Promise.reject(err));
};

exports.deleteItem = function(schemaName, id) {
  debug('#deleteItem /api/lure');
//
//   return new Promise((resolve, reject) => {
  if(!schemaName) return Promise.reject(new Error('schema require'));
  if(!id) return Promise.reject(new Error('item required'));
//
//     delete schemaName[id];{
  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then(() => {
      console.log(schemaName, id, 'has been deleted');
    })
    .catch(err => Promise.reject(err));
};
//     resolve(id);
//   });
// };
