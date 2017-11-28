let expect  = require('chai').expect;
let chai = require('chai');
let assert = require('assert');
let fs = require('fs');

let io = require('socket.io-client');
let socketURL = 'http://localhost:80';

let testMap = JSON.parse(fs.readFileSync('./server/map.json'));

let options = {

    transports: ['websocket'],
    'force new connection': true
}

chai.use(require('chai-dom'));
chai.use(require('chai-http'));

describe('Socket', () =>{

    let player1, player2;

    beforeEach( () =>{

        player1 = io.connect(socketURL, options);
        player2 = io.connect(socketURL, options);

    })

    afterEach( () =>{

        player1.disconnect();
        player2.disconnect();
    })

    it('Map fetch', (done) =>{

        player1.on('map', (map) =>{
                    
            //assert(testMap === map);
            
            done();
        })
            
        player1.on('connect', () =>{
            
            player1.emit('fetch map');
            
            
        })

    })

    it('New Player', (done) =>{

        player2.on('new player', (player) =>{
                    
            expect(player).to.haveOwnProperty('x').and.to.equal(200);
            expect(player).to.haveOwnProperty('y').and.to.equal(200);
            expect(player).to.haveOwnProperty('class').and.to.equal('warrior');
            
            done();
        })

        player1.on('connect', () =>{

            let data = { x: 200, y: 200, class: 0};

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

    it('Player Move', (done) =>{

        player2.on('new player', (player) =>{

            expect(player).to.haveOwnProperty('x').and.to.equal(300);
            expect(player).to.haveOwnProperty('y').and.to.equal(300);
            
            done();
        })

        player1.on('connect', () =>{

            let data = { x: 300, y: 300};

            player1.emit('new player', data);

        })
    })

    it('Player attack', (done) =>{

        player2.on('player attack', (attack) =>{
            
            expect(attack).to.haveOwnProperty('id')
            expect(attack).to.haveOwnProperty('angle').and.to.equal(Math.PI/4);
                        
            done();
        })
            
        player1.on('connect', () =>{
            
            player1.emit('player attack', Math.PI/4);
            
        })


    })

    it('Player skill', () =>{


    })

});
