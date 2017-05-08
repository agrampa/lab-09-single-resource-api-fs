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

  let testP;
  describe('POST method', function() {
    describe('create an item', function() {
      it('should create a planet "Hoth"', done => {
        chai.request(server)
       .post('/api/planet')
         .send({'name': 'Hoth', 'universe': 'Starwars'})
         .end((err, res) => {
           if (err) throw err;
           expect(res.body.name).equal('Hoth');
           done();
         });
      });

      it('should create a planet with universe "Starwars"', done => {
        chai.request(server)
       .post('/api/planet')
         .send({'name': 'Hoth', 'universe': 'Starwars'})
         .end((err, res) => {
           if (err) throw err;
           expect(res.body.universe).equal('Starwars');
           done();
         });
      });

      it('should give a 200 if correct', done => {
        chai.request(server)
          .post('/api/planet')
          .send({'name': 'Hoth', 'universe': 'Starwars'})
          .end((err, res) => {
            if (err) throw err;
            expect(res.status).equal(200);
            done();
          });
      });

      it('should give a 404 if not found', done => {
        chai.request(server)
         .post('/')
         .send({})
         .end((res) => {
           expect(res.status).equal(404);
           done();
         });
      });
    });
  });

  describe('GET method', function() {
    before(done => {
      chai.request(server)
       .post('/api/planet')
       .send({'name': 'Hoth', 'universe': 'Starwars'})
       .end((err, res) => {
         testP = JSON.parse(res.text.toString());
         done();
       });
    });

    describe('A request should return an item', function() {
      it('should return the correct response if the id is passed in', done => {
        chai.request(server)
         .get(`/api/planet?id=${testP.id}`)
         .end((err, res) => {
           if (err) throw err;
           let expectedResult = JSON.parse(res.text.toString());
           expect(testP).deep.equal(expectedResult);
           done();
         });
      });

      it('should return a status of 200 on proper request', done => {
        chai.request(server)
         .get(`/api/planet?id=${testP.id}`)
         .end((err, res) => {
           if (err) throw err;
           expect(res.status).equal(200);
           done();
         });
      });

      it('should return a 404 on bad request', done => {
        chai.request(server)
         .get('/api/na')
         .end((res) => {
           expect(res.status).equal(404);
           done();
         });
      });

    });

    describe('Error if not found', function() {
      it('should respond with 404 if not found', done => {
        chai.request(server)
         .get('/')
         .end((res) => {
           expect(res.status).equal(404);
           done();
         });
      });
    });

    after(done => {
      chai.request(server)
       .delete('/api/planet')
       .query({id: testP.id})
       .end(() => {
         done();
       });
    });
  });

  describe('PUT method', function(){
    before(done => {
      chai.request(server)
       .post('/api/planet')
       .send({'name': 'Hoth', 'universe': 'Starwars'})
       .end((err, res) => {
         testP = JSON.parse(res.text.toString());
         done();
       });
    });

    describe('updating a planet', function() {
      it('should change the name of the planet', done => {
        chai.request(server)
         .post(`/api/planet?id=${testP.id}`)
         .send({name: 'Endor', universe: 'Starwars'})
         .end((err, res) => {
           if (err) console.error(err);
           expect(res.body.name).to.equal('Endor');
           done();
         });
      });

      it('should change the universe of the planet', done => {
        chai.request(server)
         .post(`/api/planet?id=${testP.id}`)
         .send({name: 'Hoth', universe: 'SW'})
         .end((err, res) => {
           if (err) console.error(err);
           expect(res.body.universe).to.equal('SW');
           done();
         });
      });

      it('should return a status of 200 on proper request', done => {
        chai.request(server)
         .get(`/api/planet?id=${testP.id}`)
         .end((err, res) => {
           if (err) console.error(err);
           expect(res.status).to.equal(200);
           done();
         });
      });
      it('should return a 400 on bad request', done => {
        chai.request(server)
         .get(`/api/planet`)
         .send({name: 'Earth', universe: 'here'})
         .end((err,res) => {
           expect(res.status).to.equal(400);
           done();
         });
      });

      it('should return a 404 if not found', done => {
        chai.request(server)
         .get('/api/na')
         .end((res) => {
           expect(res.status).to.equal(404);
           done();
         });
      });
    });

    after(done => {
      chai.request(server)
       .delete('api/planet')
       .query({id: testP.id})
       .end(() => {
         done();
       });
    });
  });

  describe('DELETE method', function() {
    before(done => {
      chai.request(server)
       .post('/api/planet')
       .send({'name': 'Hoth', 'universe': 'Starwars'})
       .end((err, res) => {
         if (err) console.error(err);
         testP = JSON.parse(res.text.toString());
       });
      done();
    });

    describe('it should delete the item', function() {
      it('should return a status of 204 after deleting the item', done => {
        chai.request(server)
         .del(`/api/planet?id=${testP.id}`)
         .end((err, res) => {
          //  if (err) console.error(err);
           expect(res.status).to.equal(204);
           done();
         });
      });

      it('should return a 400 on a bad request', done => {
        chai.request(server)
         .get('/api/planet')
         .end((err, res) => {
          //  if (err) console.error(err);
           expect(res.status).to.equal(400);
           done();
         });
      });
    });

    after(done => {
      chai.request(server)
       .delete('api/planet')
       .query({id: testP.id})
       .end(() => {
         done();
       });
    });
  });

  describe('undefined endpoint', function() {
    it('should respond with 404 if not found', done => {
      chai.request(server)
       .post('/na')
       .send({})
       .end((err, res) => {
         expect(res.status).to.equal(404);
         done();
       });
    });
  });

  after(done => {
    server.close();
    done();
  });
});
