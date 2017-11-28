let expect  = require('chai').expect;
let assert = require('assert');
let request = require('request');
let chai = require('chai');
let fs = require('fs');
let serverFunctions = require('./js/server_functions');

chai.use(require('chai-dom'));
chai.use(require('chai-http'));

describe('Server', () => {

    it('Status', () => {

        request("http://localhost:80" , function(error, response, body) {

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
