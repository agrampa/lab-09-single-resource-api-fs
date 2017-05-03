'use strict';

const http = require('http');
const Router = require('./lib/router');
const storage = require('./lib/storage'); // eslint-disable-line
const Music = require('./model/music'); // eslint-disable-line
const debug = require('debug')('http:server'); // eslint-disable-line
const PORT = process.env.PORT || 3000;

// callback to start server, alias exports to server.
const router = new Router();
// bind to the router so we have the routes, call, return callback.
const server = module.exports = http.createServer(router.route());
// previously: router.get(‘/api/music’, (req, res) => {}

require('./routes/music-routes.js')(router);

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
