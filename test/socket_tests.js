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

    let player1, player2, player3;

    before( () =>{

        player3 = io.connect(socketURL, options);

        player3.on('connect', () =>{
            
            let data = { x: 200, y: 200, class: 1};
            
            player3.emit('new player', data);
        })

    })

    after( () =>{

        player3.disconnect();
    })

    beforeEach( () =>{

        player1 = io.connect(socketURL, options);
        player2 = io.connect(socketURL, options);
        

    })

    afterEach( () =>{

        player1.disconnect();
        player2.disconnect();
    })

    it('Map fetch', () =>{

        player1.on('map', (map) =>{

            expect(map).to.haveOwnProperty('width').and.to.equal(6400);
            expect(map).to.haveOwnProperty('height').and.to.equal(3200);
            expect(map).to.haveOwnProperty('biomes');
            expect(map).to.haveOwnProperty('entities');
            expect(map).to.haveOwnProperty('capPoints');

        })
            
        player1.on('connect', () =>{
            
            player1.emit('fetch map');
            
        })

    })

    it('New Player', () =>{

        player2.on('new player', (player) =>{
                    
            expect(player).to.haveOwnProperty('x').and.to.equal(200);
            expect(player).to.haveOwnProperty('y').and.to.equal(200);
            expect(player).to.haveOwnProperty('class').and.to.equal('warrior');
            
        })

        player1.on('connect', () =>{

            let data = { x: 200, y: 200, class: 0};

            player1.emit('new player', data);
        })

    })

    it('Player Fetch', () =>{

        player1.on('players', (players) =>{
        
            expect(players).to.have.lengthOf(1);
            
        })

        player1.on('connect', () =>{

            player1.emit('fetch players');
        })

    })

    it('Player Move', () =>{

        player2.on('move enemy', (player) =>{
                      
            expect(player).to.haveOwnProperty('x').and.to.equal(300);
            expect(player).to.haveOwnProperty('y').and.to.equal(400);
         
        })

        player1.on('connect', () =>{

            let data = { x: 300, y: 400};

            player1.emit('move player', data);
        })

    })

    it('Player attack', () =>{

        player2.on('player attack', (attack) =>{
            
            expect(attack).to.haveOwnProperty('id');
            expect(attack).to.haveOwnProperty('angle').and.to.equal(Math.PI/4);
            
            
        })
             
        player1.on('connect', () =>{
                     
            player1.emit('player attack', Math.PI/4);
            
        })


    })

    describe('Player skill', () =>{
        
        it('Skill with angle', () =>{
        
            player2.on('player skill', (attack) =>{
        
                expect(attack).to.haveOwnProperty('id');
                expect(attack).to.haveOwnProperty('angle').and.to.equal(Math.PI/6);
        
            })
         
            player1.on('connect', () =>{
                 
                player1.emit('player skill', Math.PI/6);
        
            })
        })
        
        it('Skill with no angle', () =>{
        
            player2.on('player skill', (attack) =>{      
        
                expect(attack).to.haveOwnProperty('id')
                expect(attack).to.not.haveOwnProperty('angle')
        
        
            })
        
            player1.on('connect', () =>{
        
                player1.emit('player skill');
                  
            })
        
        })
         
    })

    it('Remove Player', () =>{

        let id;

        player2.on('remove enemy', (enemy) =>{   
            
            expect(enemy).to.equal(id);
            
          
        });
            
        player1.on('connect', () =>{

            id = player1.id;
            
            player1.emit('remove enemy');
                 
        });

    })

});
