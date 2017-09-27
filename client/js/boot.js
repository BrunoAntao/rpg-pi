var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'game');

window.addEventListener('resize', function () {

    game.scale.setGameSize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);

})

game.state.add('Game', gameState);

game.state.start('Game');