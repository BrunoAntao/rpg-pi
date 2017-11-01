var expect  = require('chai').expect;
var request = require('request');
var chai = require('chai');

chai.use(require('chai-dom'));
chai.use(require('chai-http'));


describe('Server', () => {

    it('Status', () => {
        
            request('http://localhost:80' , function(error, response, body) {

                expect(response.statusCode).to.equal(200);
                
        });
    });
})

describe('Game', () =>{

    it('Player', ()=> {
        
        chai.request('http://localhost:80').get('/').end( function(err, res){
        
                
        }) 
    }); 
    
    it('Map', () => {


    })
})






