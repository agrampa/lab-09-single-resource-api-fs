'use strict';

const debug = require('debug')('http:storage');
const storage = {};
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createAlbum = function(schema, album) {
  debug('#storage createAlbum');
  if(!schema) return (new Error('Schema required'));
  if(!album) return (new Error('Album required'));
  
  if(!storage[schema]) storage[schema] = {};
  
  storage[schema][album.id] = album;
  
  fs.writeFileProm(`./data/${album.id}.txt`, JSON.stringify(album))
  .then(data => {
    console.log('Called fs.writeFileProm', data );
    // return JSON.parse(data);
  })
  .catch(console.error('Error in createAlbum route'));
};

exports.fetchAlbum = function(schemaName, id) {
  debug('#storage fetchAlbum');

  if(!schemaName) return (new Error('Schema name required'));
  if(!id) return (new Error('Album id required'));
  
  let schema = storage[schemaName];
  if(!schema) return (new Error('Schema does not exist'));
  
  let album = schema[id];
  if (!album) return (new Error('Album does not exist'));
  
  return fs.readFileProm(`./data/${id}.txt`)
  .then(data => {
    console.log('Called fs.readFileProm');
    console.log('json.parse data', JSON.parse(data));
    return JSON.parse(data);
  })
  .catch(console.error('error in fs.readFileProm'));
};

exports.updateAlbum = function(schemaName, album) {
  debug('#storage updateAlbum');

  if(!schemaName) return (new Error('Schema required'));
  if(!album) return (new Error('Album required'));
  
  let schema = storage[schemaName];
  if(!schema) return (new Error('Schema does not exist'));
  
  if (!schema[album.id]) return (new Error('Album does not exist'));
  
  // if(album.artist) {
  //   album.artist = album.body.artist;
  // }
  // 
  // if(album.title) {
  //   album.title = album.body.title;
  // }
  // 
  // if(album.year) {
  //   album.year = album.body.year;
  // }
  // storage[schemaName][album.id] = album;
  
  fs.writeFileProm(`./data/${album.id}.txt`, JSON.stringify(album))
  .then(data => {
    // if(err) throw err;
    console.log('Called fs.writeFileProm');
    return JSON.parse(data);
  });

};

exports.fetchAll = function(schemaName) {
  debug('#storage fetchAll');
  
  if(!schemaName) return (new Error('Schema required'));
  
  let ids = Object.keys(storage[schemaName]);
  if(!ids) return (new Error('No items found'));
    

};

exports.removeAlbum = function(schemaName, id) {
  debug('#storage removeAlbum');
  if(!schemaName) return (new Error('Schema required'));
  if(!id) return (new Error('ID required'));
  
  // delete storage[schemaName];
  return fs.unlinkProm(`.data/${id}.txt`)
  .then(data => {
    console.log('Called fs.unlinkProm', data);
  }).catch(console.error('error in fs.unlinkProm'));
};