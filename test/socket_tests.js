let expect  = require('chai').expect;
let chai = require('chai');
let assert = require('assert');
let fs = require('fs');

let io = require('socket.io-client');
let socketURL = 'http://localhost:80';
let Player = require('../server/player');

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

    it('Connection', (done) =>{


        player1.on('map', (map) =>{

            let testMap = JSON.parse(fs.readFileSync('./server/map.json'));

            //assert(testMap === map);

            done();
        })

        player1.on('connect', () =>{

            player1.emit('fetch map');


        })


    })

    it('Map fetch', () =>{


    })

    it('New Player', () =>{


    })

    it('Player Fetch', () =>{


    })

    it('Player Move', () =>{


    })

    it('Player attack', () =>{


    })

});
