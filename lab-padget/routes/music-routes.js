'use strict';

const debug = require('debug')('http:music-routes');
const Music = require('../model/music');
const storage = require('../lib/storage');

// pass ?id=<uuid> in the query string to retrieve a specific resource as json. registering an endpoint and callback.

// GET

module.exports = function(router) {
  // router is the instance, get is the method.
  router.get('/api/music', function(req, res) {
    debug('GET /api/music');
    // checking if get request has an id key and value.
    if(req.url.query.id) {
      // pass schema name and id.
      storage.fetchItem('music', req.url.query.id)
      // return value is a promise.
      // item returned from fetch item.
      .then(item => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        // sending json as the content type.
        res.write(JSON.stringify(item));
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
    // if no id property, then bad request, no id was sent.
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  });

  // POST

  // pass data as stringifed json in the body of a post request to create a resource.
  router.post('/api/music', function(req, res) {
    debug('POST /api/music');

    // instantiate new object, assign to music, pass schema name and object. try/catch will immediately execute.
    try {
      let music = new Music(req.body.artist, req.body.album, req.body.song);
      // see promise in storage.js
      //console.log(music); // log shows object with our music info.
      storage.createItem('music', music)
      // then/catch is waiting for promise to resolve/reject.
      .then(newMusic => {
        console.log(newMusic);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(newMusic));
        res.end();
      });
      // this works with no .then() statement.
      // res.writeHead(200, {'Content-Type': 'application/json'});
      // res.write(JSON.stringify(music));
      // res.end();
    } catch(e) {
      console.error(e);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    }
  });

  // PUT

  // pass data as stringified json in the body of a put request to update a resource.
  router.put('/api/music', function(req, res) {
    debug('PUT /api/music');
    // let music = Music(req.body.artist, req.body.album, req.body.song);

    // Won't work without music here:
    storage.putItem('music', req.body.id, req.body)
    // grab the object with the properties
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
  });

  // DELETE

  router.delete('/api/music', function(req, res) {
    debug('DELETE /api/music');
    if(req.url.query.id) {
      storage.deleteItem('music', req.url.query.id)
      .then(() => {
        res.writeHead(204, {'Content-Type': 'application/json'});
        res.write('delete successful');
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

}; // close router function.
