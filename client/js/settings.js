settingsState = {
    
        preload: function() {

            game.load.spritesheet('button', 'client/assets/buttons/btn.png', 128, 32);

        },
    
        create: function() {
    
            game.stage.backgroundColor = "#212121";
            game.stage.smoothed = false;
            game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

            options = [];

            Object.keys(keys).forEach(function(key, id) {

                options.push({name:key + ' ' + codeToKey(Object.values(keys)[id]), down:function(button) {

                    button.label.text = key + ' _';

                    game.input.keyboard.onDownCallback = function(e) {

                        localStorage.setItem(key, e.keyCode);
                        keys[key] = localStorage.getItem(key);
                
                        button.label.text = key + ' ' + codeToKey(e.keyCode);

                        game.input.keyboard.onDownCallback = null;
        
                    }
                    
                }});

            })

            options.push({name:'Menu', down:function() { game.state.start('Menu')}})

            new Menu(game.width/2, game.height/2, options);

        },  
    
        update: function() {   

        },
    
        render: function() {
        },
    
    }
    ;
    