gameState = {

    preload: function() {

        game.load.image('tree1', 'client/assets/entities/tree1.png');
        game.load.image('tree2', 'client/assets/entities/tree2.png');
        game.load.image('tree3', 'client/assets/entities/tree3.png');
        game.load.image('cactus1', 'client/assets/entities/desert1.png');
        game.load.image('cactus2', 'client/assets/entities/desert2.png');
      
        game.load.image('mage', 'client/assets/player/mage.png');
        game.load.spritesheet('mage_attack', 'client/assets/player/mage_attack.png', 53, 16);

        game.load.audio('desert', 'client/assets/sounds/desert.mp3');

    },

    create: function() {

        game.stage.backgroundColor = "#212121";
        game.stage.smoothed = false;
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

        music = game.add.audio('desert');
        music.play();

        game.physics.startSystem(Phaser.Physics.P2JS);

        ctrls = {

            up:game.input.keyboard.addKey(keys.up),
            down:game.input.keyboard.addKey(keys.down),
            left:game.input.keyboard.addKey(keys.left),
            right:game.input.keyboard.addKey(keys.right),
            attack:game.input.activePointer.leftButton

        }

        //music = game.add.audio('desert');
        //music.play();

        this.Mgroup = game.add.group();

        this.map = new Map(window.outerWidth, window.outerHeight, this.Mgroup);

        this.player = new Mage(100, 100, this.Mgroup, ctrls);

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
