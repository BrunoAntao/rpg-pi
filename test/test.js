var expect  = require('chai').expect;
var request = require('request');

it('Status', function() {

    request('http://localhost:80' , function(error, response, body) {
        
        expect(res.statusCode).to.equal(200);
    });
});