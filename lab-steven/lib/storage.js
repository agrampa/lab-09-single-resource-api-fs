'use strict';

const debug = require('debug')('#http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createHawk = function(schema, hawk){
  debug('#createHawk');
  return new Promise((resolve, reject) => {
    if(!schema) return Promise.reject(new Error('schema required'));
    if(!hawk) return Promise.reject(new Error('hawk required'));
    return fs.mkdirProm(`${__dirname}/../data/${schema}`)
      .then(fs.writeFileProm(`${__dirname}/../data/${schema}/${hawk.id}.json`, JSON.stringify(hawk))
          .then(data => resolve(data))
          .catch(err => reject(err)))
      .catch(err => reject(err));
  });
};

exports.fetchHawk = function(schema, id){
  debug('#fetchHawk');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
      .then(hawk => resolve(JSON.parse(hawk.toString())))
      .catch(err => reject(err));
  });
};

exports.updateHawk = function(schema, id, hawkChanges){
  debug('#updateHawk');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));
    if(!hawkChanges) return reject(new Error('schema required'));

    return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
      .then(hawk => {
        let hawkup = JSON.parse(hawk.toString());
        if(hawkChanges.name) hawkup.name = hawkChanges.name;
        if(hawkChanges.pos) hawkup.pos = hawkChanges.pos;
        if(hawkChanges.round) hawkup.round = hawkChanges.round;
        fs.writeFileProm(`${__dirname}/../data/${schema}/${id}.json`, JSON.stringify(hawkup))
          .then(() => resolve(hawkup))
          .catch(err => reject(err));
      }).catch(err => reject(err));

  });
};

exports.deleteHawk = function(schema, id){
  debug('#deleteHawk');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    return fs.unlinkProm(`${__dirname}/../data/${schema}/${id}.json`)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};
