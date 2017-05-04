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

exports.putItem = function(schema, id, item) {
  debug('#putItem');
  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));
  if(!item) return Promise.reject(new Error('item required'));
  // read file fs, validate it
  // ... (`${__dirname}/../data/${item.id}.json`, JSON.stringify(item))
  // TypeError: First argument must be a string or Buffer
  // at ServerResponse.OutgoingMessage.write (_http_outgoing.js:458:11)
  return fs.readFileProm(`${__dirname}/../data/${id}.json`)
  .then(data => {
    // console.log(data); // is a buffer
    // let previous = JSON.parse(data);
    // console.log(data.toString()); // is an object.
    // let previous = data;
    // let previous = data.toString();
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
    // If file doesn't exist you get this:
    // "{ Error: ENOENT: no such file or directory, open '/Users/..."
  });
};

exports.deleteItem = function(schema, id) {
  debug('#deleteItem');
  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));

  // read the file to be deleted.
  return fs.unlinkProm(`${__dirname}/../data/${id}.json`)
  // return fs.readFileProm(`${__dirname}/../data/${id}.json`)
  // .then((data) => {
  //   console.log('deleteNote', data);
  //   // (data) gives buffer.
  //   console.log('1. This is data in deleteItem ', schema);
  //   // (schema) = music, music is constructor.
  //   console.log('2. This is schema in deleteItem ', schema);
  //   // (id) = the id and file name.
  //   console.log('3. This is id in deleteItem ', id);
  //   return data;
  // })
  .catch(err => {
    return Promise.reject(err);
    // If file doesn't exist you get this:
    // "{ Error: ENOENT: no such file or directory, open '/Users/..."
  });
};







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
