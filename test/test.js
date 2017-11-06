var expect  = require('chai').expect;
var request = require('request');
var chai = require('chai');

chai.use(require('chai-dom'));
chai.use(require('chai-http'));

var Player = require('./js/player.js');
var Warrior = require('./js/warrior.js');
var Ranger = require('./js/ranger.js');
var Mage = require('./js/mage.js');
var routes = require('../server/routes.js');

Map = require('../server/map.js');

describe('Server', () => {

    it('Status', () => {
        
            request('http://localhost:80' , function(error, response, body) {

                expect(response.statusCode).to.equal(200);

        });
    });

    it('Routes', () =>{

            //routes()
    });
});

describe('Socket', () =>{
});

describe('Map', () =>{

    let mapSizes = [{width: Math.floor(Math.random()*(3200 - 1600 + 1) + 1600), height: Math.floor(Math.random()*(1600 - 800 + 1) + 800)}, 
                    {width: Math.floor(Math.random()*(6400 - 3200 + 1) + 3200), height: Math.floor(Math.random()*(3200 - 1600 + 1) + 1600)},
                    {width: Math.floor(Math.random()*(12800 - 6400 + 1) + 6400), height: Math.floor(Math.random()*(6400 - 3200 + 1) + 3200)}];

    let biomes = [{bg:0x009900, border:{x1: 0, y1: 0, x2: 3200/4, y2: 1600}, sprites: ['tree1', 'tree2', 'tree3']},
                    {bg:0xff0000, border:{x1: 3200*3/4, y1: 0, x2: 3200, y2: 1600}, sprites: ['magma1', 'volcano', 'tree3']},
                    {bg:0xffff00, border:{x1: 3200/4, y1: 0, x2: 3200*3/4, y2: 1600/2}, sprites: ['cactus1', 'cactus2', 'palm']},
                    {bg:0xffffff, border:{x1: 3200/4, y1: 1600/2, x2: 3200*3/4, y2: 1600}, sprites: ['frozen1', 'snowMan', 'cactus2']}]

    var map = new Map(3200, 1600);

    it('Properties', ()=> {

        expect(map).to.have.property('entities');
        expect(map).to.have.property('capPoints');

        chai.assert.isDefined(map.entities);
        chai.assert.isDefined(map.capPoints);
        
    });

    describe('Generation', () =>{

        mapSizes.forEach( (size) =>{
            
            it('Generation for width: '+ size.width +' height: ' + size.height, () => {
            
                var map1 = new Map(size.width, size.height);
            
                let numOfSprites = Math.floor(3.90625e-6*map1.width*map1.height)*4;
                let interval = [numOfSprites - 5, numOfSprites + 5];
            
                expect(map1.entities.length).to.be.within(numOfSprites - 5, numOfSprites + 5);
                        
                expect(map1.capPoints).to.have.lengthOf(4);
            
            });
            
        });

    });

    describe('Functions', () =>{

        let cords;

        let biome = biomes[Math.floor(Math.random()*3)];

        beforeEach( () => {

            var map = new Map(3200, 1600);

        });

        it('#genCords()', () =>{

            chai.assert.isFunction(map.genCords);
            
            cords = map.genCords(biome);

            expect(cords).to.have.lengthOf(20);

        });

        it('#applySprites()', () =>{

            chai.assert.isFunction(map.applySprite);

            let sprites = map.applySprite(biome, cords);

            let random = Math.floor(Math.random()*map.entities.length);

            expect(map.entities[random]).to.have.property('sprite').and.to.be.oneOf(['tree1', 'tree2', 'tree3','magma1', 'volcano', 'cactus1', 'cactus2', 'palm', 'frozen1', 'snowMan']);
            expect(map.entities[random]).to.have.property('group').and.to.be.oneOf(['eGroup', null]);
        });

        it('#checkDistance()', () => {

            let resultTrue = map.checkDistante({x: Math.floor(Math.random()*(800 - 200 + 1) + 200), y: Math.floor(Math.random()*(800 - 200 + 1) + 200)}, 
                                                [{x:0 , y: 0}]);

            let resultFalse = map.checkDistante({x: Math.floor(Math.random()*(100 - 50 + 1) + 50), y: Math.floor(Math.random()*(100 - 50 + 1) + 50)}, 
                                                [{x: 0, y: 0}]);

            chai.assert.isFalse(resultFalse);
            chai.assert.isTrue(resultTrue);

        });
    });
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






