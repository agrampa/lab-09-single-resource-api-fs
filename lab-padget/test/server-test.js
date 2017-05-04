'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('Server module', function() {
  before(done => {
    server.listen(3000);
    done();
  });

  describe('POST method', function() {
    describe('/api/music route', function() {
      it('should respond with a 200 "ok" response', done => {
        chai.request(server)
        .post('/api/music')
        .send({artist: 'Lala', album: 'GetReal', song: 'MakeBelieve'})
        .end(function(err, res) {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });

  describe('GET method', function() {
    let storage;
    before(done => {
      chai.request(server)
      .post('/api/music')
      .send({artist: 'Lala', album: 'GetReal', song: 'MakeBelieve'})
      .end((err, res) => {
        // console.log(res);
        storage = JSON.parse(res.text);
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/music')
      .query({id: storage.id})
      .end(() => {
        done();
      });
    });
    describe('/api/music route', function() {
      describe('properly formatted request', function() {
        it('should return a resource given properly id', done => {
          chai.request(server)
          .get(`/api/music?id=${storage.id}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
        });
      });
    });
    describe('improperly formatted request', function() {
      it('should return an error response 400 "bad request"', done => {
        chai.request(server)
        .get(`/api/music?foobar=${storage.id}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
      });
    });
  });
  describe('unregistered route', function() {
    it('should respond with a 404 "id not found"', done => {
      chai.request(server)
      .get('/api/music?id=thisiddoesntexist')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
    });
  });
  describe('PUT method', function() {
    describe('/api/music route', function() {
      let storage;
      before(done => {
        chai.request(server)
        .post('/api/music')
        .send({artist: 'ForReal', album: 'MoreBeta', song: 'Nutz'})
        .end((err, res) => {
          storage = JSON.parse(res.text);
          done();
        });
        // PUT TESTING!!! Working on this with JR.
        // it('should update an existing data entry', done => {
        //   chai.request(server)
        //   .put('/api/music')
        //   .send({artist: 'ForReal', album: 'MoreBeta', song: 'Nutz', id: storage.id})
        //   .end((err, res) => {
        //     storage = JSON.parse(res.text);
        //     done();
        //   });
        // });
      });
      after(done => {
        chai.request(server)
        .delete('/api/music')
        .query({id: storage.id})
        .end(() => {
          //console.error();
          done();
        });
      });
    });
  });
  describe('DELETE method', function() {
    describe('/api/music route', function() {
      let storage;
      before(done => {
        chai.request(server)
        .post('api/music')
        .send({artist: 'Lala', album: 'GetReal', song: 'MakeBelieve'})
        .end((err, res) => {
          storage = JSON.parse(res.text);
          done();
        });
      });
      after(done => {
        chai.request(server)
        .delete('/api/music')
        .query({id: storage.id})
        .end(() => {
          done();
        });
      });
    });
  });

  after(done => {
    server.close();
    done();
  });
});
