'use strict';

const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createItem = function(schema, food) {
  debug('#createItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!food) return Promise.reject(new Error('food required'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][food.id] = food;

  return Promise.resolve(food);
};

exports.fetchItem = function(schema, id) {
  debug('#fetchItem');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('shema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let food = schemaName[id];
    if(!food) return reject(new Error('food not found'));

    return(resolve(food));
  });
};

exports.deleteItem = function(schema, id) {
  debug('#deleteItem');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let food = schemaName[id];
    if(!food) return reject(new Error('food not found'));

    delete storage[schema][id];

    return(resolve(id));
  });
};
