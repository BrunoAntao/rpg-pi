charState = {
    
        preload: function() {

            game.load.spritesheet('button', 'client/assets/buttons/btn.png', 128, 32);
            game.load.image('display', 'client/assets/buttons/dsp.png');
        

            game.load.spritesheet('warrior', 'client/assets/player/warrior.png', 79, 65);
            game.load.spritesheet('ranger', 'client/assets/player/ranger.png', 65, 65);
            game.load.spritesheet('mage', 'client/assets/player/mage.png', 78, 75);
            
        },
    
        create: function() {
    
            game.stage.backgroundColor = "#212121";
            game.stage.smoothed = false;
            game.stage.disableVisibilityChange = true;
            game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

            options = [{name:'Warrior', display:'warrior', down:function(){
                            socket.emit('fetch map'); 
                            socket.on('map', function (map) { 
                                game.state.start('Game', true, false, 0, map); 
                            }); }},

                       {name:'Ranger', display:'ranger', down:function(){
                            socket.emit('fetch map'); 
                            socket.on('map', function (map) { 
                                game.state.start('Game', true, false, 1, map); 
                            }) }},
                            
                       {name:'Mage', display:'mage', down:function(){
                            socket.emit('fetch map'); 
                            socket.on('map', function (map) { 
                                game.state.start('Game', true, false, 2, map); 
                            }) }}];

            new Menu(game.width/2, game.height/2, options, false);
            
        },  
    
        update: function() {
        },
    
        render: function() {
        },
    
    }
    ;
    