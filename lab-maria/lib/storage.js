'use strict';

const debug = require('debug')('http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const storage = {};

module.exports = exports = {};

function checkDir(directory, callback) {
  fs.stat(directory, function(err) {
    console.log('wtfsa' + err);
    console.log('wtfsa' + err.errno);
    if(err && err.errno == '-2') {
      console.log('wtfsa dir does not exist yet');
      fs.mkdir(directory, callback);
    } else {
      callback(err);
    }
  });
}

exports.createNote = function(schemaName, note) {
  debug('#create note');
  if(!schemaName) return Promise.reject(new Error('mising schema'));
  if(!note) return Promise.reject(new Error('missing note'));

  if(!storage[schemaName]) storage[schemaName] = {};

  storage[schemaName][note.id] = note;

  checkDir(`${__dirname}/../data/${schemaName}/`, function(err) {
    if(err) console.error(err.message);
    fs.writeFileProm(`${__dirname}/../data/${schemaName}/${note.id}.json`, JSON.stringify(note), function(err){
      if(err) console.error(err.message);
      console.log('Ceated Successfully');
    });
  });
  return Promise.resolve(note);
};

exports.fetchNote = function(schemaName, id) {
  debug('#fetch note');
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('mising schema'));
    if(!id) return reject(new Error('missing note-id'));

    let schema = storage[schemaName];
    if(!schema) return reject(new Error('schema does not exist'));

    let note = schema[id];
    if(!note) return reject(new Error('note does not exist'));

    resolve(fs.readFileProm(`${__dirname}/../data/${schemaName}/${note.id}.json`)
      .then(data => {
        try {
          return JSON.parse(data.toString());
        } catch (err) {
          return reject(err);
        }
      })
      .catch(err => reject(err))
    ); //close resolve
  }); // close return new promise
}; // close fetchNote

exports.fetchAll = function(schemaName) {
  debug('#fetch all');
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('mising schema'));

    let schema = storage[schemaName];
    if(!schema) return reject(new Error('schema does not exist'));

    let notes = [];

    function objectLength(object) {
      var length = 0;
      for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
          notes.push(object);
        }
      }
      return length;
    }
    objectLength(schema);
    resolve(notes);
  });
};

exports.updateNote = function(schemaName, id, updatedNote) {
  debug('#update note');
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('mising schema'));
    if(!id) return reject(new Error('cannot put; missing note-id'));

    let schema = storage[schemaName];
    if(!schema) return reject(new Error('schema does not exist'));

    let note = schema[id];
    if(!note) return reject(new Error('cannot put; note does not exist'));
/*
    if(updatedNote.owner) note.owner = updatedNote.owner;
    if(updatedNote.shinigami) note.shinigami = updatedNote.shinigami;
    if(updatedNote.deathCount) note.deathCount = updatedNote.deathCount;
*/
    resolve(fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
      .then(data => {
        let jsonified = JSON.parse(data.toString());
        if(updatedNote.owner) jsonified.owner = updatedNote.owner;
        if(updatedNote.shinigami) jsonified.shinigami = updatedNote.shinigami;
        if(updatedNote.deathCount) jsonified.deathCount = updatedNote.deathCount;
        jsonified = JSON.stringify(jsonified);
        fs.writeFileProm(`${__dirname}/../data/${schemaName}/${note.id}.json`, jsonified);
      })
    .catch(err => reject(err))
  );
  });
};

exports.deleteNote = function(schemaName, id) {
  debug('#delete note');
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('mising schema'));
    if(!id) return reject(new Error('missing note-id'));

    delete storage[schemaName][id];

    fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
      .then( () => {
        console.log('deleted Successfully');
      })
      .catch(err => console.error(err.message));
  });
};

exports.deleteDir = function(schemaName) {
  debug('#delete dir');
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('mising schema'));

    delete storage[schemaName];

    fs.stat(`${__dirname}/../data/${schemaName}`, function(err) {
      if(err && err.errno == '-2') {
        console.log('wtfsa dir does not exist yet');
        return reject(new Error('dir does not exist'));
      } else {
        fs.rmdir(`${__dirname}/../data/${schemaName}`, err => {
          if(err) return reject(err);
          resolve();
        });
      } // close else
    }); //close fs.stat
  }); // close promise
}; //cose deleteDir
