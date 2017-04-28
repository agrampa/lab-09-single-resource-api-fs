'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('server module', function(){
  before(done => {
    server.listen(3000);
    done();
  });

  after(done => {
    server.close();
    done();
  });

  describe('GEt method', function(){
    let resource;
    before(done => {
      chai.request(server)
        .post('/api/planet')
        .send({name: 'Mars', universe: 'Ours'})
        .end((err,res) => {
          resource = JSON.parse(res.text.toString());
          done();
        });
    });
    after(done => {
      chai.request(server)
        .delete('/api/planet')
        .query({id: resource.id})
        .end(() => {
          done();
        });
    });
    describe('/api/planet route', function(){
      describe('a proper request', function(){
        it('should return a resource given correct id', done => {
          chai.request(server)
            .get(`/api/planet?id=${resource.id}`)
            .end((err,res) => {
              let expected = JSON.parse(res.text.toString());
              expect(resource).to.deep.equal(expected);
              done();
            });
        });
      });
    });
  });

});
