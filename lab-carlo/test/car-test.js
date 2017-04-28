'use strict';
const auto = require('../model/cars');
const expect = require('chai').expect;
const server = require('../server.js');
const chai = require('chai');
const http = require('chai-http');

describe('Automobile module', function() {
  it('should create a new Automobile object with name: Mazda', done => {
    let newAuto = new auto('Mazda', 'RX-7');
    expect(newAuto.name).to.equal('Mazda');
    done();
  });
  it('should create a new Automobile object with car: RX-7', done => {
    let newAuto = new auto('Mazda', 'RX-7');
    expect(newAuto.car).to.equal('RX-7');
    done();
  });
  it('should have an id of a unique uuid value', done => {
    let newAuto = new auto('Mazda', 'RX-7');
    let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
    expect(newAuto.id).to.match(pattern);
    done();
  });
});

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
    describe('/api/auto route', function() {
      let resource;
      before(done => {
        chai.request(server)
        .post('/api/auto')
        .send({name: 'Mazda', car: 'RX-7'})
        .end((err, res) => {
          resource = JSON.parse(res.text.toString());
          done();
        });
      });
      after(done => {
        chai.request(server)
        .delete('/api/auto')
        .query({id: resource.id})
        .end((err, res) => {
          done();
        });
      });
    });
  });
});

// describe('GET method', function() {
//     let resource
//     before(done => {
//       chai.request(server)
//       .post('/api/toy')
//       .send({name: 'music box', type: 'musical', hazard: true})
//       .end((err, res) => {
//         resource = JSON.parse(res.text.toString())
//         done()
//       })
//     })
//     after(done => {
//       chai.request(server)
//       .delete('/api/toy')
//       .query({id: resource.id})
//       .end((err, res) => {
//         done()
//       })
//
//     })
