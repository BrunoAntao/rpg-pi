var expect  = require('chai').expect;
var request = require('request');

var player = new Player(100, 100);

describe('Server', () => {

    it('Status', () => {
        
            request('http://localhost:80' , function(error, response, body) {
                
                expect(res.statusCode).to.equal(200);
        });
    });
});

describe('Player', () =>{

    describe('Movement', () =>{

        it('movement up', () => {

            player.y -= 5;
            player.y.should.equal(95);

        });

        it('movement down', () => {

            player.y += 5;
            player.y.should.equal(105);

        });

        it('movement right', () =>{


            player.x += 5;
            player.x.should.equal(105);

        });

        it('movement left', () =>{

            player.x -= 5;
            player.x.should.equal(95);

        });
    })
})
