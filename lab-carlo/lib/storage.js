'use strict';

const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createCar = function(schemaName, note) {
  debug('#createNote');
  if(!schemaName) return Promise.reject(new Error('Schema required'));
  if(!note) return Promise.reject(new Error('Note required'));
  if(!storage[schemaName]) storage[schemaName] = {};

  storage[schemaName][note.id] = note;

  return Promise.resolve(note);
};

exports.fetchCar = function(schemaName, id) {
  debug('#fetchNote');

  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('Schema required'));

    if(!id) return reject(new Error('ID required'));

    let schema = storage[schemaName];
    if(!schema) return reject(new Error('Schema does not exist'));

    let note = schema[id];
    if(!note) return reject(new Error('note does not exist'));

    resolve(note);
  });
};

exports.fetchDelete = function(schemaName, id){
  debug('#fetchDelete');

  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('Schema required'));

    if(!id) return reject(new Error('ID required'));

    let schema = storage[schemaName];
    if(!schema) return reject(new Error('Schema does not exist'));

    let note = schema[id];
    if(!note) return reject(new Error('note does not exist'));
    delete schema[id];
    resolve();
  });
};

exports.fetchPut = function(schemaName, id, auto) {
  debug('#fetchPut');

  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('Schema required'));

    if(!id) return reject(new Error('ID required'));

    let schema = storage[schemaName];
    if(!schema) return reject(new Error('Schema does not exist'));

    let note = schema[id];
    if(!note) return reject(new Error('note does not exist'));

    if(auto.name) note.name = auto.name;
    if(auto.car) note.car = auto.car;

    resolve(note);
  });
};
