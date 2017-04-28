'use strict';

const http = require('http');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const FishingLure = require('./model/lure');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3030;

const router = new Router();
const server = module.exports = http.createServer(router.route());

require('./routes/lure')(router);

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
