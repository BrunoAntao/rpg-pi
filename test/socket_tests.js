let expect  = require('chai').expect;
let chai = require('chai');

let io = require('socket.io-client');
let socketURL = 'http://localhost:80';
let Player = require('../server/player');

let options = {

    transports: ['websocket'],
    'force new connection': true
}

chai.use(require('chai-dom'));
chai.use(require('chai-http'));

var player1;

describe('Socket', () =>{

    it('Connection', () =>{

        player1 = io.connect(socketURL, options);

        


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

    it('Disconnect', () =>{


    })

  
});
