'use strict';

const debug = require('debug')('http:lure-routes');
const FishingLure = require('../model/fishingLure');
const storage = require('../lib/storage');

module.exports = function(router) {
  router.get('/api/lure', function(req, res) {
    debug('GET /api/lure');
    if(req.url.query.id) {
      storage.fetchItem('toy', req.url.query.id)
      .then(lure => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(lure));
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

  router.post('/api/lure', function(res, req) {
    debug('#POST /api/lure');
    try {
      let lure = new FishingLure(req.body.name, req.body.type, req.body.water);
      storage.createItem('lure', lure);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(JSON.stringify(lure));
      res.end();
    } catch(e) {
      console.error(e);
      res.writeHead(400, {'Content-Type': 'textplain'});
      res.write('bad request');
      res.end();
    }
    router.get('/api/lure', function(req, res) {
      debug('#GET /api/lure');
      if(req.url.query.id) {
        storage.fetchItem('lure', req.url.query.id)
        .then(lure => {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(lure));
          res.end();
        })
        .catch(e => {
          console.error(e);
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.write('bad request');
          res.end();
        });
        return;
      }

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    });
    router.put('/api/lure', function(req, res) {
      debug('#PUT /api/lure');
      console.log(req.body);

      if(req.url.query.id) {
        storage.fetchItem('lure', req.url.query.id)
    .then(item => {
      if(req.body.name) item.name = req.body.name;
      if(req.body.name) item.type = req.body.type;
      if(req.body.targets) item.targets = req.body.targets;
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('lure updated!');
      res.end();
    })
    .catch(e => {
      console.error(e);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('not found');
      res.end();
    });
        return;
      }
    });

    router.post('/api/lure', function(req, res) {
      debug('#POST /api/lure');
      console.log(req.body);
      try {
        let lure = new FishingLure(req.body.name, req.body.type, req.body.water);
        storage.createItem('lure', lure);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(JSON.stringify(lure));
        res.end();
      } catch(e) {
        console.error(e);
        res.writeHead(400, {'Content-Type': 'textplain'});
        res.write('bad request');
        res.end();
      }

      router.delete('/api/fishingLure', function(req, res) {
        debug('#DELETE /api/fishingLure');
        if (req.url.query.id) {
          storage.deleteItem('fishingLure', req.url.query.id)
        .then(() => {
          res.writeHead(204);
          res.end();
        })
        .catch (e => {
          console.error(e);
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.write('not found, cannot delete');
          res.end();
        });
          return;
        }
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('bad request');
        res.end();
      });
    });
  });
};
