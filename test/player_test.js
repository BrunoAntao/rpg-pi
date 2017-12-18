const expect  = require('chai').expect;
const chai = require('chai');
const sinon = require('sinon');
const request = require('request');

chai.use(require('chai-dom'));
chai.use(require('chai-http'));

let Player = require('./js/player.js');

describe('Player', () => {

    let player = new Player(100, 100);

    it('Properties', () =>{

        expect(player).to.have.property('speed').and.to.equal(5);

        expect(player).to.have.property('maxhealth').and.to.equal(10);

        expect(player).to.have.property('health').and.to.equal(10);

        expect(player).to.have.property('maxresource').and.to.equal(10);

        expect(player).to.have.property('resource').and.to.equal(10);


    });

    describe('Functions', () =>{

        it('#update()', ()=>{

          chai.assert.isFunction(player.update);
        })

        it('#kill()', () =>{

            chai.assert.isFunction(player.kill);
        })
    })

});
