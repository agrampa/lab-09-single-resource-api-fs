'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('server module', function() {
  before(done => {
    server.listen(3000);
    done();
  });
  after(done => {
    server.close();
    done();
  });

  describe('GET method', function() {
    let resource;
    before(done => {
      chai.request(server)
      .post('/api/music')
      .send({name: 'music box', type: 'musical', hazard: true})
      .end((err, res) => {
        resource = JSON.parse(res.text.toString());
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/music')
      .query({id: resource.id})
      .end((err, res) => {
        console.error(res);
        done();
      });

    });
    describe('/api/music route', function() {
      describe('a properly formatted reqeust', function() {
        it('should return a resource given proper id', done => {
          chai.request(server)
          .get(`/api/music?id=${resource.id}`)
          .end((err, res) => {
            let expected = JSON.parse(res.text.toString());
            expect(resource).to.deep.equal(expected);
            done();
          });
        });
      });
      describe('an improperly formatted request', function() {

      });

    });

    describe('unregistered route', function() {

    });
  });

  describe('POST method', function() {
    describe('/api/music route', function() {

    });
  });

  describe('PUT method', function() {
    describe('/api/music route', function() {

    });
  });

  describe('DELETE method', function() {
    describe('/api/music route', function() {

    });
  });
});
