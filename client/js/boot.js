var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game');

var socket = {};

window.addEventListener('resize', function () {

    game.scale.setGameSize(window.innerWidth, window.innerHeight);

})

if(localStorage.getItem('up') === null){
    
    localStorage.setItem('up', Phaser.Keyboard.W);
    
}

if(localStorage.getItem('down') === null){
    
    localStorage.setItem('down', Phaser.Keyboard.S);
    
}

if(localStorage.getItem('left') === null){
    
    localStorage.setItem('left', Phaser.Keyboard.A);
    
}

if(localStorage.getItem('right') === null){
    
    localStorage.setItem('right', Phaser.Keyboard.D);
    
}
var keys = {

    up: localStorage.getItem('up'),
    down: localStorage.getItem('down'),
    left: localStorage.getItem('left'),
    right: localStorage.getItem('right')

};

function codeToKey(code) {

    for(i = 0;i < Object.values(Phaser.KeyCode).length;i++) {
        
        if(Object.values(Phaser.KeyCode)[i] == code) {

            return Object.keys(Phaser.KeyCode)[i];

        }

    }

}

var global = {

    mute:false,

};

game.state.add('Menu', menuState);
game.state.add('Char', charState);
game.state.add('Game', gameState);
game.state.add('Settings', settingsState);

//game.state.start('Game', true, false, 1);
game.state.start('Menu');