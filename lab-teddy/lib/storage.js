'use strict';

const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createCar = function(schema, car) {
  debug('#createCar');
  if(!schema) return Promise.reject(new Error('schema required'));
  if(!car) return Promise.reject(new Error('car required'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][car.id] = car;

  return Promise.resolve(car);
};

exports.fetchCar = function(schema, id){
  debug('#fetchCar');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id require'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let car = schemaName[id];
    if(!car) return reject(new Error('car not found'));

    resolve(car);
  });
};
//
// exports.updateCar = function(schema, car){
//   debug('#updateCar');
//   if(!schema) return Promise.reject(new Error('Schema required'));
//   if(!car) return Promise.reject(new Error('Car Required'));
//
//   storage[schema] = {};
//   storage[schema][car.id];
//
//   return Promise.resolve(car);
// };

exports.removeCar = function(schema, id){
  debug('#removeCar');
  if(!schema) return Promise.reject(new Error('Schema required'));
  if(!id) return Promise.reject(new Error('ID required'));

  delete storage[schema];
  return Promise.resolve();
};
