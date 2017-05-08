'use strict';

const Planet = require('../model/planet');
const expect = require('chai').expect;

describe('planet module', function(){
  describe('When creating a new object', function(){
    let newPlanet = new Planet('Hoth', 'starwars');
    it('should creat a new planet object with name: "Hoth"', done => {
      expect(newPlanet.name).to.equal('Hoth');
      done();
    });
    it('should have an id of a unique uuid value', done =>{
      let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
      expect(newPlanet.id).to.match(pattern);
      done();
    });
  });
});
