let expect  = require('chai').expect;
let chai = require('chai');

chai.use(require('chai-dom'));
chai.use(require('chai-http'));

let Warrior = require('./js/warrior.js');
let Ranger = require('./js/ranger.js');
let Mage = require('./js/mage.js');

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
