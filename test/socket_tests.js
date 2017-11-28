let expect  = require('chai').expect;
let chai = require('chai');

let io = require('socket.io').listen(80);
let socketURL = 'http://localhost:80';

let options = {

    transports: ['websocket'],
    'force new connection': true
}

chai.use(require('chai-dom'));
chai.use(require('chai-http'));

describe('Socket', () =>{

    it('Connection', () =>{


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
