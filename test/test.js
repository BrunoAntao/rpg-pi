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

describe('Map', () =>{

    var map = new Map(3200, 1600);

    it('Properties', ()=> {

        expect(map).to.have.property('entities');
        expect(map).to.have.property('capPoints');

        chai.assert.isDefined(map.entities);
        chai.assert.isDefined(map.capPoints);
        
    }); 
    
    it('Generation', () => {

        let numOfSprites = Math.floor(3.90625e-6*map.width*map.height)*4;
        
        chai.assert.equal(map.entities.length, numOfSprites);
        chai.assert.equal(map.capPoints.length, 4);

    })
})






