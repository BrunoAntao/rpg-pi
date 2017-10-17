charState = {
    
        preload: function() {

            game.load.spritesheet('button', 'client/assets/buttons/btn.png', 128, 32);
            game.load.image('display', 'client/assets/buttons/dsp.png');
        
            game.load.image('warrior', 'client/assets/player/warrior.png');
            game.load.image('ranger', 'client/assets/player/ranger.png');
            game.load.image('mage', 'client/assets/player/mage.png');

        },
    
        create: function() {
    
            game.stage.backgroundColor = "#212121";
            game.stage.smoothed = false;
            game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

            options = [{name:'Warrior', display:'warrior', down:function(){ game.state.start('Game', true, false, 0); }},
                       {name:'Ranger', display:'ranger', down:function(){ game.state.start('Game', true, false, 1); }},
                       {name:'Mage', display:'mage', down:function(){ game.state.start('Game', true, false, 2); }}];

            new Menu(game.width/2, game.height/2, options, false);

        },  
    
        update: function() {
        },
    
        render: function() {
        },
    
    }
    ;
    