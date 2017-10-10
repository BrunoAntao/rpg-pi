gameState = {

    preload: function() {

        game.load.image('tree1', 'client/assets/entities/tree1.png');
        game.load.image('tree2', 'client/assets/entities/tree2.png');
        game.load.image('tree3', 'client/assets/entities/tree3.png');
        game.load.image('cactus1', 'client/assets/entities/desert1.png');
        game.load.image('cactus2', 'client/assets/entities/desert2.png');

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

        this.Mgroup = game.add.group();

        this.map = new Map(window.outerWidth, window.outerHeight, this.Mgroup);

        this.player = new Player(100, 100, this.Mgroup, ctrls);

    },  

    update: function() {       

        game.world.bringToTop(this.map.group);

        this.Mgroup.customSort(function(a, b) {

            return a.y - b.y;

        });

    },

    render: function() {
    },

}
;
