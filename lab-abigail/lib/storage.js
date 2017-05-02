'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createItem = function(schema, food) {
  debug('#createItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!food) return Promise.reject(new Error('food required'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][food.id] = food;

  fs.writeFileProm(`${__dirname}/../data/${food.id}.json`, JSON.stringify(food))
  .then( (food) => {
  })
  .catch(console.error);
};

exports.updateItem = function(schema, id, newFood) {
  debug('#updateItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));
  // if(!storage[schema]) storage[schema] = {};

  // let food = storage[schema][id];

  // let schemaName = storage[schema];
  // console.log(schemaName);
  // if (!schemaName) return Promise.reject(new Error('Schema not found'));
  //
  // let food = schemaName[id];
  // if (!food) return Promise.reject(new Error('Food not found'));
  // console.log(food.id);


  return fs.readFileProm(`${__dirname}/../data/${id}.json`)
  .then( food => {
    console.log('I made it!');
    let stringFood = JSON.parse(food.toString());
    if (newFood.name) stringFood.name = newFood.name;
    if (newFood.type) stringFood.type = newFood.type;
    if (newFood.cost) stringFood.cost = newFood.cost;
    fs.writeFileProm(`${__dirname}/../data/${id}.json`, JSON.stringify(stringFood))
    // .then( (food) => {
      // console.log(food);
    // })
    .catch(console.error);
  })
  .catch(console.error);
};

exports.fetchItem = function(schema, id) {
  debug('#fetchItem');
  if(!schema) return Promise.reject(new Error('shema required'));
  if(!id) return Promise.reject(new Error('id required'));

  return fs.readFileProm(`${__dirname}/../data/${id}.json`)
  .then(food => {
    return JSON.parse(food);
  })
  .catch(console.error);
};

exports.deleteItem = function(schema, id) {
  debug('#deleteItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));

  return fs.unlinkProm(`${__dirname}/../data/${id}.json`)
  .then(food => {
    console.log('Food deleted');
  })
  .catch(console.error);
};
