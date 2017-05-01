'use strict';

const debug = require('debug')('http:server');
const Album = require('../model/albums.js');
const storage = require('../lib/storage');

module.exports = function(router) {
  router.post('/api/album', function(req, res) {
    debug('POST api/album');
    console.log(req.body);
    try{
      let album = new Album(req.body.artist, req.body.title, req.body.year);
      storage.createAlbum('album', album);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(album));
      res.end();
    } catch(e) {
      console.error(e);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad request');
      res.end();
    }
  });
  
  router.get('/api/album', (req, res) => {
    debug('GET /api/album');
    console.log(req.url.query);
    if(req.url.query.id) {
      storage.fetchAlbum('album', req.url.query.id)
      .then(data => {
        storage.fetchAlbum('album', req.url.query.id);
        res.writeHead(200, {'Content-Type': 'application/json'});
        // console.log('req', JSON.parse(req));
        res.write(JSON.stringify(data));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Not found, router.get');
        res.end();
      });
      return;
      
      
      
      // try {
      //   storage.fetchAlbum('album', req.url.query.id);
      //   res.writeHead(200, {'Content-Type': 'application/json'});
      //   console.log('req', JSON.parse(req));
      //   res.write(JSON.stringify(album));
      //   res.end();
      // } catch(e) {
      //   console.error(e);
      //   res.writeHead(404, {'Content-Type': 'text/plain'});
      //   res.write('Not found, router.get');
      //   res.end();
      // }
    

    }
    
    // if(!req.url.query.id) {
    //   storage.fetchAll('albums', req.url.body)
    //   .then(albums => {
    //     res.writeHead(200, {'Content-Type': 'application/json'});
    //     res.write(JSON.stringify(albums));
    //     res.end();
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     res.writeHead(404, {'Content-Type': 'text/plain'});
    //     res.write('Not found, storage.fetchAll');
    //     res.end();
    //   });
    //   return;
    // }
    
    // res.writeHead(400, {'Content-Type': 'text/plain'});
    // res.write('Bad request');
    // res.end();
  });
  
  router.put('/api/album', (req,res) => {
    debug('PUT /api/album');
    console.log(req.body);
    storage.updateAlbum('album', req.body);
    try {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(req.body));
      res.end();
    } catch(e) {
      console.error(e);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad request');
      res.end();
    }
  });
  
  router.delete('api/album', function(req, res) {
    debug('DELETE /api/album');
    console.log(req.body);
    if(req.url.query.id) {
      storage.removeAlbum('album', req.url.query.id)
      .then(album => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(album));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Not found, router.delete');
        res.end();
      });
      return;
    }
  });
  
};