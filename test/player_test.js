let expect  = require('chai').expect;
let request = require('request');
let chai = require('chai');

chai.use(require('chai-dom'));
chai.use(require('chai-http'));

let Player = require('./js/player.js');
let Warrior = require('./js/warrior.js');
let Ranger = require('./js/ranger.js');
let Mage = require('./js/mage.js');
let routes = require('../server/routes.js');

describe('Server', () => {

    it('Status', () => {

            request("http://localhost:80" , function(error, response, body) {

                expect(response.statusCode).to.equal(200);

        });
    });

});

describe('Socket', () =>{
});


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

describe('Warrior', () =>{

    var warrior = new Warrior(100, 100);

    it('Properties', () => {

        expect(warrior).to.have.property('maxhealth').and.to.equal(15);

        expect(warrior).to.have.property('health').and.to.equal(15);

        expect(warrior).to.have.property('resource').and.to.equal(0);

        expect(warrior).to.have.property('resourcecd').and.to.equal(0);

        expect(warrior).to.have.property('fireRate').and.to.equal(200);

        expect(warrior).to.have.property('range').and.to.equal(10);

        expect(warrior).to.have.property('atkdamage').and.to.equal(3);

        expect(warrior).to.have.property('skillCost').and.to.equal(6);
    })

    describe('Functions', () =>{

        it('#hitmob()', () =>{

            chai.assert.isFunction(warrior.hitMob);


        })

        it('#attack()', () => {

            chai.assert.isFunction(warrior.attack);

        })

        it('#skill()', () => {

            chai.assert.isFunction(warrior.skill);

        })

        it('#update()', () =>{

            chai.assert.isFunction(warrior.update);

        })

    })

});

describe('Ranger', () => {

    var ranger = new Ranger(100, 100);

    it('Properties', () =>{

        expect(ranger).to.have.property('maxhealth').and.to.equal(10);

        expect(ranger).to.have.property('health').and.to.equal(10);

        expect(ranger).to.have.property('fireRate').and.to.equal(200);

        expect(ranger).to.have.property('atkdamage').and.to.equal(2);

    });

    describe('Functions', () =>{

        it('#gainResource()', () =>{

            chai.assert.isFunction(ranger.gainResource);
        });

        it('#hitmob()', () => {

            chai.assert.isFunction(ranger.hitMob);
        });

        it('#attack()', () =>{

            chai.assert.isFunction(ranger.attack);
        });

        it('#skillHitMob()', () =>{

            chai.assert.isFunction(ranger.skillHitMob);
        });

        it('#skill()', () =>{

            expect(ranger).to.have.ownProperty('sfireRate').and.to.equal(500);

            expect(ranger).to.have.ownProperty('satkdamage').and.to.equal(3);

            chai.assert.isFunction(ranger.skill);
        });
    });
});

describe('Mage', () =>{

    var mage = new Mage(100, 100);

    it('Properties', () =>{

        expect(mage).to.have.property('maxhealth').and.to.equal(8);

        expect(mage).to.have.property('health').and.to.equal(8);

        expect(mage).to.have.property('fireRate').and.to.equal(200);

        expect(mage).to.have.property('atkdamage').and.to.equal(3);


    });

    describe('Functions', () =>{

        it('#hitMob()', () =>{

            chai.assert.isFunction(mage.hitMob);
        });

        it('#attack()', () =>{

            chai.assert.isFunction(mage.attack);
        });

        it('#skill', () =>{

            chai.assert.isFunction(mage.skill)
        });
    });
});
