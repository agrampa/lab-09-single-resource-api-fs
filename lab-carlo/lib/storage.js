'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createCar = function(schemaName, note) {
  debug('#createNote');
  if(!schemaName) return Promise.reject(new Error('Schema required'));
  if(!note) return Promise.reject(new Error('Note required'));

  let jsonNote = JSON.stringify(note);
  fs.writeFileProm(`${__dirname}/../data/${schemaName}/${note.id}.json`, jsonNote)
  .then(() => note)
  .catch(err => Promise.reject(err));

  return Promise.resolve(note);
};


exports.fetchCar = function(schemaName, id) {
  debug('#fetchNote');

  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('Schema required'));
    if(!id) return reject(new Error('ID required'));

    return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then(data => {
      let carFetched = JSON.parse(data.toString());
      return resolve(carFetched);
    })
    .catch(err => Promise.reject(err));
  });
};

exports.fetchDelete = function(schemaName, id){
  debug('#fetchDelete');

  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('Schema required'));
    if(!id) return reject(new Error('ID required'));

    fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`);
    return resolve();
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
