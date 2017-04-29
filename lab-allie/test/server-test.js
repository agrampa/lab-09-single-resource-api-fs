'use strict';

const server = require('../server.js');
const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');

chai.use(http);

describe('Server module tests', function() {
  before(done => {
    server.listen(3000);
    done();
  });
  
  describe('POST method', function() {
    describe('create an item', function() {
      
    });
  });
});