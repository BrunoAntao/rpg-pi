const expect  = require('chai').expect;
const chai = require('chai');
const assert = require('assert');
const fs = require('fs');
const io = require('socket.io-client');
const port = JSON.parse(fs.readFileSync('./server/settings.json')).port;
const socketURL = 'http://localhost:' + port;


const options = {

    transports: ['websocket'],
    'force new connection': true
}

chai.use(require('chai-dom'));
chai.use(require('chai-http'));

const Warrior = require('./js/warrior.js');
const Ranger = require('./js/ranger.js');
const Mage = require('./js/mage.js');

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

        let player1, player2;

        beforeEach( () =>{

            player2 = io.connect(socketURL, options);
            player1 = io.connect(socketURL, options);

            let data = { x: 200, y: 200, class: 0};

            player1.emit('new player', data);

        })

        afterEach( () =>{

            player1.disconnect();
            player2.disconnect();
        })

        it('#attack()', (done) => {

          player2.on('player attack', (attack) =>{

              chai.assert.isFunction(warrior.attack);
              expect(attack).to.haveOwnProperty('id');
              expect(attack).to.haveOwnProperty('angle').and.to.equal(Math.PI/4);

              done();

          })

          player1.emit('player attack', Math.PI/4);

        })

        it('#skill()', () => {

          player2.on('player skill', (attack) =>{

              chai.assert.isFunction(warrior.skill);
              expect(attack).to.haveOwnProperty('id')
              expect(attack).to.not.haveOwnProperty('angle')

              done();

          })

          player1.emit('player skill');

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

      let player1, player2;

      beforeEach( () =>{

          player2 = io.connect(socketURL, options);
          player1 = io.connect(socketURL, options);

          let data = { x: 200, y: 200, class: 1};

          player1.emit('new player', data);

      })

      afterEach( () =>{

          player1.disconnect();
          player2.disconnect();
      })

        it('#gainResource()', () =>{

            ranger.resource--;

            ranger.gainResource();

            expect(ranger.resource).to.equal(10);

            chai.assert.isFunction(ranger.gainResource);
        });

        it('#attack()', () =>{

          player2.on('player attack', (attack) =>{

              chai.assert.isFunction(ranger.attack);
              expect(attack).to.haveOwnProperty('id');
              expect(attack).to.haveOwnProperty('angle').and.to.equal(Math.PI/4);

              done();

          })

          player1.emit('player attack', Math.PI/4);

            chai.assert.isFunction(ranger.attack);
        });

        it('#skill()', () =>{

          expect(ranger).to.have.ownProperty('sfireRate').and.to.equal(500);

          expect(ranger).to.have.ownProperty('satkdamage').and.to.equal(3);

          player2.on('player skill', (attack) =>{

              chai.assert.isFunction(ranger.skill);
              expect(attack).to.haveOwnProperty('id')
              expect(attack).to.not.haveOwnProperty('angle')

              done();

          })

          player1.emit('player skill');

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

      let player1, player2;

      beforeEach( () =>{

          player2 = io.connect(socketURL, options);
          player1 = io.connect(socketURL, options);

          let data = { x: 200, y: 200, class: 0};

          player1.emit('new player', data);

      })

      afterEach( () =>{

          player1.disconnect();
          player2.disconnect();
      })

        it('#attack()', () =>{

            chai.assert.isFunction(mage.attack);
        });

        it('#skill', () =>{

            chai.assert.isFunction(mage.skill)
        });
    });
});
