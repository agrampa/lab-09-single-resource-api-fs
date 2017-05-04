'use strict';

const http = require('http');
const Router = require('./lib/router');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

require('./route/routes')(router);

server.listen(PORT, () => console.log(`Connected to port ${PORT}`))
