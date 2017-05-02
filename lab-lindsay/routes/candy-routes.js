'use strict';

const storage = require(`${__dirname}/../lib/storage`);
const Candy = require(`${__dirname}/../model/candy`);
const debug = require('debug')('http:server');

module.exports = function(router) {

  router.get('/api/candy', function(req, res) {
    debug('GET /api/candy');
    if(req.url.query.id) {
      storage.fetchItem('candy', req.url.query.id)
      .then(candy => {
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(candy));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type' : 'text/plain'});
        res.write('not found');
        res.end();
      });
      return;
    }
    res.writeHead(400, {'Content-Type' : 'text/plain'});
    res.write('bad request');
    res.end();
  });

  router.post('/api/candy', function(req, res) {
    debug('POST /api/candy');

    try {
      let candyData = new Candy(req.body.name, req.body.type, req.body.texture);
      storage.createItem('candy', candyData);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(JSON.stringify(candyData));
      res.end();
    } catch(e) {
      console.error(e);
      res.writeHead(400, {'Content-Type' : 'text/plain'});
      res.write('bad request');
      res.end();
    }
  });

  router.delete('/api/candy', function(req, res) {
    debug('DELETE /api/candy');
    if(req.url.query.id) {
      storage.removeItem('candy', req.url.query.id)
      .then(() => {
        res.writeHead(404, {'Content-Type' : 'application/json'});
        res.write('candy deleted successfully');
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type' : 'application/json'});
        res.write('not found');
        res.end();
      });
      return;
    }
    res.writeHead(400, {'Content-Type' : 'text/plain'});
    res.write('bad request');
    res.end();
  });

  router.put('/api/candy', function(req, res) {
    debug('PUT /api/candy');
    let id = req.url.query.id;

    if(id) {
      storage.updateItem('candy', id)
      .then(candy => {
        if(req.body.name) candy.name = req.body.name;
        if(req.body.type) candy.type = req.body.type;
        if(req.body.texture) candy.texture = req.body.texture;
        res.writeHead(201, {'Content-Type' : 'application/json'});
        res.write(JSON.stringify(candy));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type' : 'text/plain'});
        res.write('update item not found');
        res.end();
      });
      return;
    }
    res.writeHead(400, {'Content-Type' : 'text/plain'});
    res.write('bad request');
    res.end();
  });
};
