'use strict';

const debug = require('debug')('http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createItem = function(schema, item) {
  debug('#createItem');
  if(!schema) return Promise.reject(new Error('schema required'));
  if(!item) return Promise.reject(new Error('item required'));
  // item = music properties from constructor.
  // data = returned promise From fs write.
  return fs.writeFileProm(`${__dirname}/../data/${item.id}.json`, JSON.stringify(item))
  .then(() => {
    return item;
  })
  .catch(err => {
    return Promise.reject(err);
    // return err;
  });
};

exports.fetchItem = function(schema, id) {
  debug('#fetchItem');
  // returning new promise will get us instance of an item.
  // return new Promise((resolve, reject)
  // error handling and schema checking.
  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));

  return fs.readFileProm(`${__dirname}/../data/${id}.json`)
  .then(data => {
    // this data is a buffer.
    return JSON.parse(data.toString());
  })
  .catch(err => Promise.reject(err));
};

exports.putItem = function(schema, id, item) {
  debug('#putItem');
  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));
  if(!item) return Promise.reject(new Error('item required'));
  // read file fs, validate it.
  return fs.readFileProm(`${__dirname}/../data/${id}.json`)
  .then(data => {
    // data is a buffer. data.toString is an object.
    let previous = JSON.parse(data.toString());
    if(previous.artist) previous.artist = item.artist;
    if(previous.album) previous.artist = item.album;
    if(previous.song) previous.artist = item.song;

    let updated = JSON.stringify(previous);
    fs.writeFileProm(`${__dirname}/../data/${item.id}.json`, updated);
    return Promise.resolve(previous);
  })
  .catch(err => {
    return Promise.reject(err);
  });
};

exports.deleteItem = function(schema, id) {
  debug('#deleteItem');
  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));

  // read the file to be deleted.
  return fs.unlinkProm(`${__dirname}/../data/${id}.json`)
  .catch(err => {
    return Promise.reject(err);
  });
};
