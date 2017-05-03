'use strict';

//const debug = require('debug')('http:note-routes');
const storage = require('../lib/storage');
const DeathNote = require('../model/death-note');

module.exports = function(router) {
  router.get('/api/note', (req, res) => {
    if(req.url.query.id) {
      storage.fetchNote('note', req.url.query.id)
      .then(note => {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.write(JSON.stringify(note));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(400, {'Content-type': 'text/plain'});
        res.write('bad request');
        res.end();
      });
      return;
    }
    storage.fetchAll('note')
    .then(note => {
      res.writeHead(200, {'Content-type': 'application/json'});
      res.write(JSON.stringify(note));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(400, {'Content-type': 'text/plain'});
      res.write('bad request');
      res.end();
    });
  });

  router.post('/api/note', (req, res) => {
    try {
      let note = new DeathNote(req.body.owner, req.body.shinigami, req.body.deathCount);
      storage.createNote('note', note)
      .then(note => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(note));
        res.end();
      });
    } catch(e) {
      console.error(e);
      res.writeHead(400, {'Content-type': 'text/plain'});
      res.write('bad request');
      res.end();
    }
  });

  router.put('/api/note', (req, res) => {
    if(req.url.query.id) {
      storage.updateNote('note', req.url.query.id, req.body)
      .then((note) => {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.write(JSON.stringify(note));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(400, {'Content-type': 'text/plain'});
        res.write('router.put bad request');
        res.end();
      });
      return;
    }
    res.writeHead(400, {'Content-type': 'text/plain'});
    res.write('bad request; missing id?');
    res.end();
  });

  router.delete('/api/note', (req, res) => {
    if(req.url.query.id) {
      storage.deleteNote('note', req.url.query.id)
      .then( () => {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.write('deleted');
        res.end();
      })
      .catch(err => {
        console.error(err.message);
        res.writeHead(400, {'Content-type': 'text/plain'});
        res.write('bad request');
        res.end();
      });
    } else {
      storage.deleteDir('note')
      .then( () => {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end();
      })
      .catch(err => {
        console.error(err.message);
        res.writeHead(400, {'Content-type': 'text/plain'});
        res.write('bad request');
        res.end();
      });
    }
  });
};
