'use strict';

const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

//POST
exports.createItem = function(schema, item) {
  debug('#createItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!item) return Promise.reject(new Error ('item required'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][item.id] = item;

  return Promise.resolve(item);
};

//GET
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

exports.deleteItem = function(schema, id){
  debug('#fetchItem');

  return new Promise((reslove, reject) => {
    if(!schema) return Promise.reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));

    delete storage[schema];
    reslove();
  });
};

/////////////////////////////////////////////////////////////////////


// const storage = {}
//
// module.exports = exports = {};
//
// //POST method
// exports.createNote = function(schemaName, note) { //controller function, create a route in the server for posting a new note. when a request is sent to that route with all correct data, the route will create a new instance of the note object and allow access to it elsewhere
//   //will only be stored while server is running, will clear out when the server resets each time
//   //can't use local storage, it is front-end
//   if(!schemaName) return Promise.reject(new Error('Schema required'));
//   if(!note) return Promise.reject(new Error('Note required'));
//
//   if(!storage[schemaName]) storage[schemaName] = {}//if that schema has not already been stored in storage object, create it and assign an empty object to it
//
//   storage[schemaName][note.id] = note;
//   //bracket notation for object, allows you to dynamically set a new property in the object
//   //assign note as key/id of key to the schema in the storage object
//   //creates:
//   // const storage = {
//   //   schemaOne: {
//   //     idOne: {},
//   //think of a schema as a category and the id as an item
//
//   //make the note elsewhere and hand it in when the createNote method is called, it is now thenable
//   return Promise.resolve(note);
// }
//
// //GET method
// exports.fetchNote = function(schmaName, id) { //will provide one instance of the note
//   return new Promise((resolve, reject) => { // need to return the Promise to be able to use reject below
//     //under the hood, the resolve and reject are built into the Promise and are not defined
//     if(!schemaName) return reject(new Error('SchemaName required'));
//     if(!id) return reject(new Error('Note id required'));
//
//     let schema = storage[schemaName]
//     if(!schema) return reject(new Error('Schema does not exist'));
//
//     let note = schema[id] //schema was assigned to storage[scemaName] above
//     if(!note) return reject(new Error('Note does not exist'));
//
//     resolve(note); //no need to return and stop
//   })
// }
//
// //explicit promise.resolve/promise.reject does not allow for async, to Promise needs to be returned first, then managed within the Promise code block
//
// goal:
// const storage = {
//   schemaOne: {
//     idOne: {},
//     idTwo: {}
//     ...
//   },
//
//   schemaTwo: {
//
//   }
//   ...
// }
//
// //think of each schema like the structure for the notes in note.js
// //within each schema is an object for each instance
