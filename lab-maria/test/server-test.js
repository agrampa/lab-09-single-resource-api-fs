'use strict';
//included to make sure I didn't break that worked in lab 8

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

  let resource;
  let resource2;
  before(done => {
    chai.request(server)
    .post('/api/note')
    .send({owner: 'Light', shinigami: 'Ryuuk', deathCount: 9000})
    .end((err, res) => {
      if(err) console.error(err.message);
      resource = JSON.parse(res.text.toString());
    }); //close end
    chai.request(server)
    .post('/api/note')
    .send({owner: 'Misa Misa', shinigami: 'Rem', deathCount: 20})
    .end((err, res) => {
      if(err) console.error(err.message);
      resource2 = JSON.parse(res.text.toString());
      done();
    });
  }); //close before(done)

  describe('GET/POST method', function() {
    describe('/api/note route', function() {
      describe('a properly formatted request', function() {
        it('should return a resource given proper id', done => {
          chai.request(server)
          .get(`/api/note?id=${resource.id}`)
          .end((err, res) => {
            let expected = JSON.parse(res.text.toString());
            expect(resource).to.deep.equal(expected);
            done();
          }); // close end
        }); // close it
        it('should return a 200 status code', done => {
          chai.request(server)
          .get(`/api/note?id=${resource.id}`)
          .end((err, res) => {
            if(err) console.error(err);
            expect(res.status).to.equal(200);
            done();
          }); // close end
        }); //close it
        it('should return an array of all notes when not given an id', done => {
          chai.request(server)
          .get('/api/note')
          .end((err, res) => {
            if(err) console.error(err);
            let expected = JSON.parse(res.text.toString());

            function objectLength(object) {
              var length = 0;
              for( var key in object ) {
                if( object.hasOwnProperty(key) ) {
                  length++;
                }
              }
              return length;
            }
            //expect(res.status).to.equal(200);
            expect(objectLength(expected)).to.equal(2);
            done();
          }); // close end
        });
      }); // close proper format

      describe('an improperly formatted request', function() {
        it('should return 400/bad request', done => {
          chai.request(server)
          .get('/api/note?id=1')
          .end((err, res) => {
            if(err) console.error(err.message);
            expect(res.status).to.equal(400);
            done();
          }); //close end
        }); //close it
      }); //close improp format

      describe('unregistered route', function() {
        it('should write 404 to the response head in router.js', done => {
          chai.request(server)
          .get('/api/not')
          .end((err, res) => {
            if(err) console.error(err.message);
            expect(res.status).to.equal(404);
            done();
          }); //close end
        }); // close it
      }); // close unregistered
    }); // close describe /api/note route
  });// close describe GET method

  describe('PUT method', function() {
    describe('/api/note route', function() {
      it('should update a resource', done => {
        chai.request(server)
        .put(`/api/note?id=${resource.id}`)
        .send({id: `${resource.id}`, owner: 'Misa Misa', shinigami: 'Ryuuk', deathCount: 9001})
        .end((err) => {
          if(err) console.error(err);
        }); // close end
        chai.request(server)
        .get(`/api/note?id=${resource.id}`)
        .end((err, res) => {
          if(err) console.error(err.message);
          let expected = JSON.parse(res.text.toString());
          expect(resource).to.deep.equal(expected);
          done();
        });
      }); // close it
    }); // close describe route
    describe('bad request', function() {
      it('should respond with 400/bad request', done => {
        chai.request(server)
        .put(`/api/note?id=${resource.id}`)
        .send({owner: 'Misa Misa', shinigami: 'Ryuuk', deathCount: 9001})
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(400);
          expect(err.message).to.include('Bad Request');
          done();
        }); // close end
      }); // close it
    });// close describe bad route
  }); //close put method


  describe('DELETE method', function() {
    describe('/api/note route', function() {
      it('should delete resource', done => {
        chai.request(server)
        .delete(`/api/note?id=${resource.id}`)
        .end((err, res) => {
          if(err) console.error('wtfsa' + err.message);
          expect(res.status).to.equal(200);
        }); // close end
        chai.request(server)
        .get(`/api/note?id=${resource.id}`)
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(400);
          done();
        }); // close end
      }); // close it

      it('should delete resource2', done => {
        chai.request(server)
        .delete(`/api/note?id=${resource2.id}`)
        .send(`${resource2.id}`)
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(200);
        }); // close end
        chai.request(server)
        .get(`/api/note?id=${resource2.id}`)
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(400);
          done();
        }); // close end
      }); // close it
      it('should delete the sub-directory when not given an id', done => {
        chai.request(server)
        .delete('/api/note')
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(200);
          done();
        }); // close end
      }); // close it
    }); // close describe route
  }); //close delete method

  after(done => {
    server.close();
    done();
  }); // close after
}); // close describe server module
