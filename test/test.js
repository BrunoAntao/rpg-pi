var expect  = require('chai').expect;
var request = require('request');
var chai = require('chai');
var should = require('chai').should;

chai.use(require('chai-dom'));
chai.use(require('chai-http'));

Map = require('../server/map.js');

describe('Server', () => {

    it('Status', () => {
        
            request('http://localhost:80' , function(error, response, body) {

                expect(response.statusCode).to.equal(200);
                
        });
    });
})

describe('Map', () =>{

    let mapSizes = [{width: 1600, height: 800}, {width: 3200, height: 1600}, {width: 12800, height: 6400}];

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
            
            chai.assert.equal(map1.entities.length, numOfSprites);
            
            expect(map.capPoints).to.have.lengthOf(4);

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

            expect(map.entities).to.include({sprite: 'tree1', group: 'eGroup'});

        })

        it('#checkDistance()', () => {


            
        })


    });
})






