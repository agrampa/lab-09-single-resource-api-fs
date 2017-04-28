'use strict';

const http = require('http');
const Album = require('./model/albums.js');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

require('./routes/album-routes.js')(router);

server.listen(PORT, () => console.log(`Listening on ${PORT}`));