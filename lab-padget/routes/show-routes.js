'use strict';

const debug = require('debug')('http:show-routes');
const newShow = require('../model/live-show');
const storage = require('../lib/storage');

module.exports = function(router) {
  router.get('/api/music', function(req, res) {
    debug('GET /api/music');
    if(req.url.query.id) {
      storage.fetchItem('music', req.url.query.id)
      .then(music => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(music));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('not found');
        res.end();
      });
      return;
    }

    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  });

  router.post('/api/music', function(req, res) {
    debug('POST /api/music');
    try {
      let show = new newShow(req.body.artist, req.body.album, req.body.song);
      storage.createItem('show', show)
      .then(newShow => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(newShow));
        res.end();
      });
    } catch(e) {
      console.error(e);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    }
  });
};
