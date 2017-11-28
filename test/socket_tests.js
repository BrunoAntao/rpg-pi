let expect  = require('chai').expect;
let chai = require('chai');
let assert = require('assert');
let fs = require('fs');

let io = require('socket.io-client');
let socketURL = 'http://localhost:80';

let options = {

    transports: ['websocket'],
    'force new connection': true
}

chai.use(require('chai-dom'));
chai.use(require('chai-http'));

describe('Socket', () =>{

    let player1;

    beforeEach( () =>{

        player1 = io.connect(socketURL, options);

    })

    afterEach( () =>{

        player1.disconnect();
    })

    it('Map fetch', (done) =>{

        player1.on('map', (map) =>{
            
            let testMap = JSON.parse(fs.readFileSync('./server/map.json'));
            
            //assert(testMap === map);
            
            done();
        })
            
        player1.on('connect', () =>{
            
            player1.emit('fetch map');
            
            
        })

    })

    it('New Player', (done) =>{

        player1.on('new player', (player) =>{
            
            
            console.log(player);
            
            done();
        })

        player1.on('connect', () =>{

            let data = { x: 200, y: 200, class: 'mage'}

            player1.emit('new player', data);
        })


    })

    it('Player Fetch', (done) =>{


        player1.on('players', (players) =>{
        
            expect(players).to.have.lengthOf(0);
            
            done();
        })

        player1.on('connect', () =>{

            player1.emit('fetch players');
        })


    })

    it('Player Move', () =>{


    })

    it('Player attack', () =>{


    })

});
