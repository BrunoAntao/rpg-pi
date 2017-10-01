var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'game');

window.addEventListener('resize', function () {

    game.scale.setGameSize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);

})

var keys = {};

if(localStorage.getItem('up') === null){
    
    localStorage.setItem('up', Phaser.Keyboard.W);
    
} else {

    keys.up = localStorage.getItem('up');

}

if(localStorage.getItem('down') === null){
    
    localStorage.setItem('down', Phaser.Keyboard.S);
    
} else {

    keys.down = localStorage.getItem('down');

}

if(localStorage.getItem('left') === null){
    
    localStorage.setItem('left', Phaser.Keyboard.A);
    
} else {
    
    keys.left = localStorage.getItem('left');
    
}

if(localStorage.getItem('right') === null){
    
    localStorage.setItem('right', Phaser.Keyboard.D);
    
} else {
    
    keys.right = localStorage.getItem('right');
    
}

function codeToKey(code) {

    for(i = 0;i < Object.values(Phaser.KeyCode).length;i++) {
        
        if(Object.values(Phaser.KeyCode)[i] == code) {

            return Object.keys(Phaser.KeyCode)[i];

        }

    }

}

var listenKey = false;

game.state.add('Menu', menuState);
game.state.add('Game', gameState);
game.state.add('Settings', settingsState);

game.state.start('Menu');