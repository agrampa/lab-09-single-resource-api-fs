'use strict';

const http = require('http');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const Vehicles = require('./model/vehicles');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 8080;

const router = new Router();
const server = module.exports = http.createServer(router.route());

router.get('/api/car', function(req, res){
  debug('GET /api/car');
  if(req.url.query.id){
    storage.fetchCar('car', req.url.query.id)
    .then(car => {
      res.writeHead(200, {'Content-Type': 'application.json'});
      res.write(JSON.stringify(car));
      res.end();
    })
    .catch(err => {
      console.error(err);
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

router.post('/api/car', function(req, res){
  debug('POST /api/car');
  console.log(req.body);
  try {
    let car = new Vehicles(req.body.name, req.body.type);
    storage.createCar('car', car);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(car));
    res.end();
  } catch(e) {
    console.error(e);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

router.put('/api/car', function(req, res){
  debug('PUT /api/car');

  if(req.url.id){
    storage.fetchCar('car', req.url.query.id)
    .then(car => {
      if(req.body.name) car.name = req.body.name;
      if(req.body.type) car.type = req.body.type;
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(car));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('not found');
      res.end();
    });
  }
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('bad request');
  res.end();
});

router.delete('./api/car', function(req, res){
  debug('DELETE /api/car');
  if(req.url.id){
    storage.removeCar('car', req.url.id)
    .then(car => {
      res.writeHead(200, {'Content-Type': 'application.json'});
      res.write(JSON.stringify(car));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    });
  }
});

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
