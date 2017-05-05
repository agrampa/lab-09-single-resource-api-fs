'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:storage');

const storage = {};


module.exports = exports = {};


exports.createCar = function(schema, car) {
  debug('#createCar');
  if(!schema) return (new Error('schema required'));
  if(!car) return (new Error('car required'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][car.id] = car;

  fs.writeFileProm(`${__dirname}/../data/${car.id}.json`, JSON.stringify(car))
  .then()
  .catch(err => {
    console.error('Error in createCar route', err.message);
  });
};

exports.fetchCar = function(schema, id){
  debug('#fetchCar');

  return new Promise((resolve, reject) => {
    if(!schema) return reject (new Error('schema required'));
    if(!id) return reject (new Error('id require'));

    return fs.readFileProm(`${__dirname}/../data/${id}.txt`)
    .then(data => {
      resolve(JSON.parse(data.toString()));
    })
    .catch(err => {
      reject(err);
    });
  });

};

exports.updateCar = function(schema, id, car){
  debug('#updateCar');

  if(!schema) return (new Error('Schema required'));
  if(!car) return (new Error('Car Required'));
  let jsonStorage;

  return fs.readFileProm(`${__dirname}/../data/${id}.txt`)
  .then(data => {
    let carStorage = JSON.parse(data.toString());
    if(carStorage.name)carStorage.name = car.name;
    if(carStorage.type)carStorage.type = car.type;

    jsonStorage = JSON.stringify(carStorage);

    fs.writeFileProm(`${__dirname}/../data/${id}.json`, jsonStorage)
    .then(() => jsonStorage);
    // .catch(err => Promise.reject(err.message));
  })
  .then(() => jsonStorage)
  .catch(err => console.error(err));
  //});
};

exports.removeCar = function(schema, id){
  debug('#removeCar');
  if(!schema) return (new Error('Schema required'));
  if(!id) return (new Error('ID required'));

  return fs.unlinkProm(`${__dirname}/../data/${id}.json`)
  .then(data => data)
  .catch(console.error('error in fs.unlinkProm'));
};
