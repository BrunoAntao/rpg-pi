const expect  = require('chai').expect;
const assert = require('assert');
const request = require('request');
const chai = require('chai');
const fs = require('fs');
const serverFunctions = require('./js/server_functions');

chai.use(require('chai-dom'));
chai.use(require('chai-http'));

describe('Server', () => {

    it('Status', () => {

        request.get("http://localhost:80" , function(error, response, body) {

          expect(response.statusCode).to.equal(200);

        });
    });

    it('Map generation', () =>{

      let prevMap = fs.readFileSync('./server/map.json');

      let map = JSON.parse(prevMap);

      serverFunctions.generateMap();

      let newMap = fs.readFileSync('./server/map.json');

      fs.writeFileSync('./server/map.json', JSON.stringify(map));

      assert(prevMap !== newMap);

    })

});
