let expect  = require('chai').expect;
let chai = require('chai');

chai.use(require('chai-dom'));
chai.use(require('chai-http'));

Map = require('../server/map.js');

describe('Map', () =>{

    let mapSizes = [{width: Math.floor(Math.random()*(3200 - 1600 + 1) + 1600), height: Math.floor(Math.random()*(1600 - 800 + 1) + 800)},
                    {width: Math.floor(Math.random()*(6400 - 3200 + 1) + 3200), height: Math.floor(Math.random()*(3200 - 1600 + 1) + 1600)},
                    {width: Math.floor(Math.random()*(12800 - 6400 + 1) + 6400), height: Math.floor(Math.random()*(6400 - 3200 + 1) + 3200)}];

    let biomes = [{bg:0x009900, border:{x1: 0, y1: 0, x2: 3200/4, y2: 1600}, sprites: ['tree1', 'tree2', 'tree3']},
                    {bg:0xff0000, border:{x1: 3200*3/4, y1: 0, x2: 3200, y2: 1600}, sprites: ['magma1', 'volcano', 'tree3']},
                    {bg:0xffff00, border:{x1: 3200/4, y1: 0, x2: 3200*3/4, y2: 1600/2}, sprites: ['cactus1', 'cactus2', 'palm']},
                    {bg:0xffffff, border:{x1: 3200/4, y1: 1600/2, x2: 3200*3/4, y2: 1600}, sprites: ['frozen1', 'snowMan', 'cactus2']}]

    let map = new Map(3200, 1600);

    it('Properties', ()=> {

        expect(map).to.have.property('entities');
        expect(map).to.have.property('capPoints');

        chai.assert.isDefined(map.entities);
        chai.assert.isDefined(map.capPoints);

    });

    describe('Generation', () =>{

        mapSizes.forEach( (size) =>{

            it('Generation for width: '+ size.width +' height: ' + size.height, () => {

                let map1 = new Map(size.width, size.height);

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

            let resultTrue = map.checkDistante({x: 800, y: 800}, [{x:0 , y: 0}]);

            let resultFalse = map.checkDistante({x: 1, y: 1}, [{x: 0, y: 0}]);

            chai.assert.isFalse(resultFalse);
            chai.assert.isTrue(resultTrue);

        });
    });
});
