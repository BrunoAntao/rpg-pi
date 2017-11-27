let expect  = require('chai').expect;
let request = require('request');
let chai = require('chai');

chai.use(require('chai-dom'));
chai.use(require('chai-http'));

describe('Server', () => {

    it('Status', () => {

            request("http://localhost:80" , function(error, response, body) {

                expect(response.statusCode).to.equal(200);

        });
    });

});
