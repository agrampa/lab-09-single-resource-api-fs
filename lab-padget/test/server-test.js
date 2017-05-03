'use strict';

const server = require('../server'); // eslint-disable-line
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect; // eslint-disable-line

chai.use(http);

// expect(req).to.have.header('<header>');
// expect(req).to.be.a('object');
// expect(req).to.have.param('<param>');
// expect(req).to.have.status(404);``
// expect(err).to.be.null;

// describe('server module', function() {
//   before(done => {
//     server.listen(3000);
//     done();
//   });
//   after(done => {
//     server.close();
//     done();
//   });

  // describe('GET method', function() {
  //   let resource;
  //   before(done => {
  //     chai.request(server)
  //     .post('/api/music')
  //     .send({name: 'artist', type: 'album', hazard: true})
  //     .end((err, res) => {
  //       resource = JSON.parse(res.text.toString());
  //       done();
  //     });
  //   });
  //   after(done => {
  //     chai.request(server)
  //     .delete('/api/music')
  //     .query({id: resource.id})
  //     .end((err, res) => {
  //       console.error(res);
  //       done();
  //     });
  //
  //   });
  //   describe('/api/music route', function() {
  //     describe('a properly formatted reqeust', function() {
  //       it('should return a resource given proper id', done => {
  //         chai.request(server)
  //         .get(`/api/music?id=${resource.id}`)
  //         .end((err, res) => {
  //           let expected = JSON.parse(res.text.toString());
  //           expect(resource).to.deep.equal(expected);
  //           done();
  //         });
  //       });
  //     });
  //     describe('an improperly formatted request', function() {
  //     });
  //
  //   });
  //
  //   describe('unregistered route', function() {
  //   });

  // });

  // describe('POST method', function() {
  //   describe('/api/music route', function() {
  //   });
  // });
  //
  // describe('PUT method', function() {
  //   describe('/api/music route', function() {
  //   });
  // });
  //
  // describe('DELETE method', function() {
  //   describe('/api/music route', function() {
  //   });
  // });

// });
