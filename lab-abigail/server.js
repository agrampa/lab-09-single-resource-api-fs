'use strict';

const http = require('http');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const FoodItem = require('./model/food.js');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

require('./route/food-routes')(router);


server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
