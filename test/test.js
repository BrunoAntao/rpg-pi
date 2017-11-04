var expect  = require('chai').expect;
var request = require('request');
var chai = require('chai');

chai.use(require('chai-dom'));
chai.use(require('chai-http'));

Map = require('../server/map.js');


describe('Server', () => {

    it('Status', () => {
        
            request('http://localhost:80' , function(error, response, body) {

                expect(response.statusCode).to.equal(200);
                
        });
    });
})

describe('Game', () =>{

    it('Player', ()=> {
        

    }); 
    
    it('Map', () => {

        var map = new Map(3200, 1600);
        



    })
})






