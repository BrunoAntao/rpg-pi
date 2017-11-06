var expect  = require('chai').expect;
var request = require('request');
var chai = require('chai');
var Player = require('./js/player.js');
var Warrior = require('./js/warrior.js');
var routes = require('../server/routes.js');

chai.use(require('chai-dom'));
chai.use(require('chai-http'));

Map = require('../server/map.js');

describe('Server', () => {

    it('Status', () => {
        
            request('http://localhost:80' , function(error, response, body) {

                expect(response.statusCode).to.equal(200);
                
        });
    });

    it('Routes', () =>{

            //routes()
    })
})

describe('Socket', () =>{
})

describe('Map', () =>{

    let mapSizes = [{width: Math.floor(Math.random()*(3200 - 1600 + 1) + 1600), height: Math.floor(Math.random()*(1600 - 800 + 1) + 800)}, 
                    {width: Math.floor(Math.random()*(6400 - 3200 + 1) + 3200), height: Math.floor(Math.random()*(3200 - 1600 + 1) + 1600)},
                    {width: Math.floor(Math.random()*(12800 - 6400 + 1) + 6400), height: Math.floor(Math.random()*(6400 - 3200 + 1) + 3200)}];

    var map = new Map(3200, 1600);

    it('Properties', ()=> {

        expect(map).to.have.property('entities');
        expect(map).to.have.property('capPoints');

        chai.assert.isDefined(map.entities);
        chai.assert.isDefined(map.capPoints);
        
    }); 
    
    mapSizes.forEach( (size) =>{

        it('Generation for width: '+ size.width +' height: ' + size.height, () => {

            var map1 = new Map(size.width, size.height);

            let numOfSprites = Math.floor(3.90625e-6*map1.width*map1.height)*4;
            let interval = [numOfSprites - 5, numOfSprites + 5];

            expect(map1.entities.length).to.be.within(numOfSprites - 5, numOfSprites + 5);
            
            expect(map1.capPoints).to.have.lengthOf(4);

        })

    })

    describe('Functions', () =>{

        let cords;

        let biome = {bg:0x009900, border:{x1: 0, y1: 0, x2: 800, y2: 1600}, sprites: ['tree1', 'tree2', 'tree3']};

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

})

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

})






