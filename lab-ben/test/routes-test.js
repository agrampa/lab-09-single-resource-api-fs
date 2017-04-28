'use strict';

const chai = require('chai');
const expect = chai.expect;
const server = require('./../server.js');
const http = require('chai-http');

chai.use(http);

describe('Server module', function() {
  before(done => {
    server.listen(3000);
    done();
  });
  let testFile;

  describe('POST method', function() {
    describe('/api/console endpoint', function() {
      it('should respond with 201 on proper request', done => {
        chai.request(server)
        .post('/api/consoles')
        .send({
          name: 'Wii',
          manufacturer: 'Nintendo',
          releaseDate: 2006,
        })
        .end((err, res) => {
          expect(res).status(201);
          expect(res.body.name).to.equal('Wii');
          done();
        });
      });
      // it('should respond with a 400 on bad request', () => {
      //   chai.request(server)
      //   .post('/api/consoles')
      //   .send({})
      //   .end((err, res) => {
      //     expect(res).status(400);
      //     expect(res.body).to.include('bad request');
      //   });
      // });
    });
  });

  // describe('GET method', function() {
  //   describe('/api/consoles', function() {
  //     it('should respond with a status of 200 on proper request', () => {
  //       chai.request(server)
  //       .get('/api/consoles')
  //       .query({id: '22067432-5b98-47d7-ab07-634e75b3f064'})
  //       .end((err, res) => {
  //         // console.log(res);
  //         expect(res).status(200);
  //         expect(res.body.name).to.equal('N64');
  //       });
  //     });
  //   });
  // });
  //
  // describe('PUT method', function() {
  //   describe('/api/consoles', function() {
  //     before(done => {
  //       chai.request(server)
  //       .post('/api/consoles')
  //       .send({
  //         name: 'Dolphin',
  //         manufacturer: 'Nintendo',
  //         releaseDate: 2001,
  //       })
  //       .end((err, res) => {
  //         this.result = res;
  //         done();
  //       });
  //     });
  //
  //     it('should respond with a status of 202 on proper request', done => {
  //       chai.request(server)
  //       .put('/api/consoles')
  //       .send({
  //         name: 'GameCube',
  //         manufacturer: 'Nintendo',
  //         releaseDate: 2001,
  //         id: this.result.body.id,
  //       })
  //       .end((err, res) => {
  //         console.log(res.status);
  //         expect(res).status(202);
  //         expect(res.body.name).to.equal('GameCube');
  //         expect(res.body.id).to.equal(this.result.body.id);
  //         done();
  //       });
  //     });
  //   });
  // });
  //
  describe('DELETE method', function() {
    describe('/api/consoles', function() {
      it('should respond with a 204 on proper request', done => {
        chai.request(server)
        .delete('/api/consoles')
        .query({id: 'd3638800-b5e2-4bfa-9058-7e0f9399e042'})
        .end((err, res) => {
          expect(res).status(204);
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
