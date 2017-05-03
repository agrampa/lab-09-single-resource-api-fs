'use strict';

const debug = require('debug')('http:consoles-routes');
const Hardware = require('../model/consoles.js');
const storage = require('../lib/storage.js');

module.exports = function(router) {
  router.get('/api/consoles', function(req, res) {
    debug('GET /api/consoles');

    if (req.url.query.id) {
      storage.fetchItem('consoles', req.url.query.id)
      .then(hardware => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(hardware));
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
  });

  router.post('/api/consoles', function(req, res) {
    debug('POST /api/consoles');

    // console.log(req);
    let hardware = new Hardware(req.body.name, req.body.manufacturer, req.body.releaseDate);
    try {
      // console.log(hardware, 'hardware log');
      storage.createItem('consoles', hardware);
      res.writeHead(201, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(hardware));
      res.end();
    } catch(e) {
      console.error(e, 'post try');
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    }
  });

  router.delete('/api/consoles', function(req, res) {
    debug('DELETE /api/consoles');

    if(req.url.query.id) {
      storage.deleteItem('consoles', req.url.query.id)
      .then(() => {
        res.writeHead(204, {'Content-Type': 'none'});
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('item not found');
        res.end();
      });
      return;
    }
  });

  router.put('/api/consoles', function(req, res) {
    debug('PUT api/consoles');

    if (req.body.id) {
      let hardware = new Hardware(req.body.name, req.body.manufacturer, req.body.releaseDate);
      storage.updateItem('consoles', req.body.id, hardware)
      .then(hardware => {
        res.writeHead(202, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(hardware));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(400, {'Content-Type': 'text/plain'});
      });
    }
  });
};
