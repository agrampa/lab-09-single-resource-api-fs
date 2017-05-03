'use strict';
// 4. storage.

// require debug module function and call it.
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:storage');
// all the instances of schema when we create an item.
// {schemaOne: {idOne: {}}, {idTwo: {}}, schemaTwo: {}}
const storage = {};

// instantiated empty object is an exports alias.
module.exports = exports = {};

// create an item and set it into storage.
exports.createItem = function(schema, item) {
  debug('#createItem');
  // if no schema, return reject with error.
  if(!schema) return Promise.reject(new Error('schema required'));
  if(!item) return Promise.reject(new Error('item required'));

  // dynamically set a new property on an object.
  // storage['kidToy'] = {} storage.schema = {}
  // take the value of schema, make or get that property.
  // looking for a property with name .schema, not .kidToy.
  // if(!storage[schema]) storage[schema] = {};
  return fs.writeFileProm(`${__dirname}/../data/${item.id}.json`, JSON.stringify(item))
  .then(data => {
    console.log(JSON.parse(data));
    return JSON.parse(data);
  })
  .catch(err => {
    return err;
  });
  // assigned item to primary key.
  // when we create an item it will already have an id.
  // storage[schema][item.id] = item;



  // resolve that item and return a promise.
  return Promise.resolve(item);
};

// need schema name and id so we can look up an instance.
exports.fetchItem = function(schema, id) {
  debug('#fetchItem');

  // returning new promise will get us instance of an item.
  return new Promise((resolve, reject) => {
    // error handling and schema checking.
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    // schema name exists.
    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    // assign to item.
    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));

    // we know it exists, so send it back, returned a promise.
    resolve(item);
  });
};

// router takes an endpoint and a callback.
// this.routes.PUT[endpoint] = callback;
exports.putItem = function(schema, id, music) {
  // debug('#putItem');
  // if(!schema) return Promise.reject(new Error('schema required'));
  // if(!id) return Promise.reject(new Error('item required'));
  //
  // let schemaName = storage[schema];
  // console.log(schemaName, 'what is schemaName');
  // // if(!schemaName) return Promise.reject(new Error('schema not found'));
  //
  // return fs.readFile(`${__dirname}/../data/id.`)
  //
  // let item = schemaName[id];
  // if(!item) return Promise.reject(new Error('item not found'));
  // if(music.artist) item.artist = music.artist;
  // if(music.album) item.album = music.album;
  // if(music.song) item.song = music.song;
  // Promise.resolve(item);
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

    delete(schemaName[id]); // delete object
    resolve(item); // or nothing
  });
};
