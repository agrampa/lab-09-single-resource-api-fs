'use strict';
// 4. storage.

// LECTURE CODE EXAMPLE

// const Promise = require(‘bluebird’)
// // overwriting native implementation of a promise.
// const fs = Promise.promisifyAll(require(‘fs’), {suffix: ‘Prom’}
// // we’re bolting on a jet engine!
//
// // rather than…
// fs.readFile(‘somepath’, function(err, data) => {
//   // do some stuff
//   // if(err) console.error(err)
//   // console.log(data.toString(‘utf-8’, 0, 16)
// })
//
// // we’ll use the suffix prom from this point forward. we’ll async read that file, below that line use .then.
//
// // now do this…
// fs.readFileProm(‘./data/one.txt’)
// .then(data => {
//   console.log(data.toString(‘utf-8’, 0, 16) // were going to get a buffer.
// })

// // can pass callback name, if then fires, implicitly handed.
// // _function name is a helper method; a python thing; convention.
// fs.readFileProm(‘./data/one.txt’)
// .then(data => {
//   console.log(data.toString(‘utf-8’, 0, 16) // were going to get a buffer.
//   .then…
//   .catch…
// })

const debug = require('debug')('http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
// const storage = {};

module.exports = exports = {};

exports.createItem = function(schema, item) {
  debug('#createItem');
  if(!schema) return Promise.reject(new Error('schema required'));
  if(!item) return Promise.reject(new Error('item required'));
  // item = music properties from constructor.
  // data = returned promise From fs write.
  return fs.writeFileProm(`${__dirname}/../data/${item.id}.json`, JSON.stringify(item))
  .then(() => {
    //console.log(data);
    return item;
    // return JSON.parse(data);
  })
  .catch(err => {
    return Promise.reject(err);
    // return err;
  });
};

exports.fetchItem = function(schema, id) {
  debug('#fetchItem');
  // returning new promise will get us instance of an item.
  // return new Promise((resolve, reject) => {
    // error handling and schema checking.
  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));

  return fs.readFileProm(`${__dirname}/../data/${id}.json`)
  .then(data => {
    // this data is a buffer binary/hex
    // console.log('reading file in fetch item', data);
    return JSON.parse(data.toString());
  })
  .catch(err => Promise.reject(err));
};
// read file fs, validate it
// update by reassigning
// write file fs (nested inside of writefile .then)














// REMEMBER IF IT DOESN'T WORK, THEN TRY:
// req.url.query.id FOR ALL THE THINGS!!!

// exports.putItem = function(schema, id, music) {
//   debug('#putItem');
//
//   if(!schema) return Promise.reject(new Error('schema required'));
//   if(!id) return Promise.reject(new Error('item required'));
//
//   let schemaName = storage[schema];
//   console.log(schemaName, 'what is schemaName');
//
//   return fs.readFile(`${__dirname}/../data/id.`);
//
//   let item = schemaName[id];
//   if(!item) return Promise.reject(new Error('item not found'));
//   if(music.artist) item.artist = music.artist;
//   if(music.album) item.album = music.album;
//   if(music.song) item.song = music.song;
//   Promise.resolve(item);
// };
