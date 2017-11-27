let expect  = require('chai').expect;
let request = require('request');
let chai = require('chai');

chai.use(require('chai-dom'));
chai.use(require('chai-http'));

let Player = require('./js/player.js');

describe('Player', () => {

    var player = new Player(100, 100);

    it('Properties', () =>{

        expect(player).to.have.property('speed').and.to.equal(5);

        expect(player).to.have.property('maxhealth').and.to.equal(10);

        expect(player).to.have.property('health').and.to.equal(10);

        expect(player).to.have.property('maxresource').and.to.equal(10);

        expect(player).to.have.property('resource').and.to.equal(10);


    });

    describe('Functions', () =>{

        it('#update()', ()=>{

            chai.assert.isFunction(player.kill)
        })

        it('#kill()', () =>{

            chai.assert.isFunction(player.update);
        })
    })

});
