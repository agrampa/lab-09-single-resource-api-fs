'use strict';

const debug = require('debug')('http:storage');
const storage = {};
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createAlbum = function(schemaName, album) {
  debug('#storage createAlbum');
  if(!schemaName) return Promise.reject(new Error('Schema required'));
  if(!album) return Promise.reject(new Error('Album required'));
  
  if(!storage[schemaName]) storage[schemaName] = {};
  
  storage[schemaName][album.id] = album;
  
  fs.writeFileProm(`./data/${album.id}.txt`)
  .then(data => {
    return data;
  });
};

exports.fetchAlbum = function(schemaName, id) {
  debug('#storage fetchAlbum');

  if(!schemaName) return (new Error('Schema name required'));
  if(!id) return (new Error('Album id required'));
  
  let schema = storage[schemaName];
  if(!schema) return (new Error('Schema does not exist'));
  
  let album = schema[id];
  if (!album) return (new Error('Album does not exist'));
  
  fs.readFileProm()

};

exports.updateAlbum = function(schemaName, album) {
  debug('#storage updateAlbum');
  return new Promise((resolve, reject) => {
    if(!schemaName) return Promise.reject(new Error('Schema required'));
    if(!album) return Promise.reject(new Error('Album required'));
    
    let schema = storage[schemaName];
    if(!schema) return reject(new Error('Schema does not exist'));
    
    if (!schema[album.id]) return reject(new Error('Album does not exist'));
    
    if(album.artist) {
      album.artist = album.body.artist;
    }
    
    if(album.title) {
      album.title = album.body.title;
    }
    
    if(album.year) {
      album.year = album.body.year;
    }
    storage[schemaName][album.id] = album;

    resolve(album);
  });
};

exports.fetchAll = function(schemaName) {
  debug('#storage fetchAll');
  
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('Schema required'));
    
    let ids = Object.keys(storage[schemaName]);
    if(!ids) return reject(new Error('No items found'));
    
    resolve(ids);
  });
};

exports.removeAlbum = function(schemaName, id) {
  debug('#storage removeAlbum');
  if(!schemaName) return Promise.reject(new Error('Schema required'));
  if(!id) return Promise.reject(new Error('ID required'));
  
  delete storage[schemaName];
  return Promise.resolve();
};