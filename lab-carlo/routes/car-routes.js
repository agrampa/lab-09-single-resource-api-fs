'use strict';

const debug = require('debug')('http:server');
const storage = require('../lib/storage');
const Automobile = require('../model/cars');

module.exports = function(router) {
  router.get('/api/auto', function(req,res) {
    debug('GET /api/auto');

    if(req.url.query.id) {
      storage.fetchCar('auto', req.url.query.id)
      .then(auto => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(auto));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type':'text/plain'});
        res.write('not found');
        res.end();
      });
      return;
    }

    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  });

  router.post('/api/auto', function(req, res) {
    debug('POST /api/auto');
    console.log(req.body);
    try {
      let auto = new Automobile(req.body.name, req.body.car);
      storage.createCar('auto', auto)
      .then(auto => {
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(auto));
        res.end();
      });
    } catch(e) {
      console.error(e);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    }
  });

  router.delete('/api/auto', function(req,res) {
    debug('DELETE /api/auto');

    if(req.url.query.id) {
      storage.fetchDelete('auto', req.url.query.id)
      .then(() => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write('Car deleted');
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type':'text/plain'});
        res.write('not found');
        res.end();
      });
      return;
    }

    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  });

  router.put('/api/auto', function(req, res) {
    debug('PUT /api/auto');
    if(req.body.id){
      try {
        storage.fetchPut('auto',req.body.id, req.body)
        .then(auto => {
          console.log('inside put route auto', auto);
          res.writeHead(201, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(auto));
          res.end();
        });
      } catch(e) {
        console.error(e);
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('bad request');
        res.end();
      }
    }
  });
};
