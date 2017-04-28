'use strict';

const debug = require('debug')('#http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const storage = {};

module.exports = exports = {};

exports.createHawk = function(schema, hawk){
  debug('#createHawk');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!hawk) return Promise.reject(new Error('hawk required'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][hawk.id] = hawk;

  return Promise.resolve(hawk);
};

exports.fetchHawk = function(schema, id){
  debug('#fetchHawk');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if (!schemaName) return reject(new Error('schema does not exist'));

    let hawk = schemaName[id];
    if (!hawk) return reject(new Error('hawk does not exist'));

    return resolve(hawk);
  });
};

exports.deleteHawk = function(schema, id){
  debug('#deleteHawk');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema does not exist'));

    let hawk = schemaName[id];
    if(!hawk) return reject(new Error('hawk does not exist'));

    delete storage[schema][id];

    return(resolve(id));
  });
};
