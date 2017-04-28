'use strict';

const http = require('http');
const Router = require('./lib/router');
const storage = require('./lib/storage');
console.log(storage);
const LiveShow = require('./model/live-show');
console.log(LiveShow);
const debug = require('debug')('http:server');
console.log(debug);
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

require('./routes/live-show.js')(router);

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
