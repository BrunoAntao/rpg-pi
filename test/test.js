var expect  = require('chai').expect;
var request = require('request');

describe('Server', () => {

    it('Status', () => {
        
            request('http://localhost:80' , function(error, response, body) {
                
                expect(res.statusCode).to.equal(200);
        });
    });
});



