'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const Hardware = require('./model/consoles.js');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

require('./routes/consoles-routes.js')(router);

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
