menuState = {

    preload: function () {

        game.load.spritesheet('button', 'client/assets/buttons/btn.png', 128, 32);

    },

    create: function () {

        game.stage.backgroundColor = "#212121";
        game.stage.smoothed = false;
        game.stage.disableVisibilityChange = true;
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

        options = [{ name: 'Play', down: function () { game.state.start('Char'); } },
        { name: 'Controls', down: function () { game.state.start('Settings'); } }];

        new Menu(game.width / 2, game.height / 2, options);

    },

    update: function () {
    },

    render: function () {
    },

}
    ;
