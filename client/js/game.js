gameState = {

    preload: function() {
    },

    create: function() {

        game.stage.backgroundColor = "#212121";
        game.stage.smoothed = false;
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

        ctrls = {

            up:game.input.keyboard.addKey(keys.up),
            down:game.input.keyboard.addKey(keys.down),
            left:game.input.keyboard.addKey(keys.left),
            right:game.input.keyboard.addKey(keys.right)

        }

        console.log();

        new Player(100, 100, ctrls);

    },  

    update: function() {
    },

    render: function() {
    },

}
;
