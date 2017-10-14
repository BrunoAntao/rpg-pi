gameState = {

    preload: function() {

        game.load.image('tree1', 'client/assets/entities/tree1.png');
        game.load.image('tree2', 'client/assets/entities/tree2.png');
        game.load.image('tree3', 'client/assets/entities/tree3.png');
        game.load.image('cactus1', 'client/assets/entities/desert1.png');
        game.load.image('cactus2', 'client/assets/entities/desert2.png');
        game.load.image('palm', 'client/assets/entities/desert3.png');
        game.load.image('magma1', 'client/assets/entities/magma1.png');
        game.load.image('volcano', 'client/assets/entities/volcano.png')

        //game.load.image('capPoint', 'client/assets/entities/capPoint.png');
      
        game.load.image('ranger', 'client/assets/player/ranger.png');
        game.load.image('ranger_attack', 'client/assets/player/ranger_attack.png');

        game.load.image('mage', 'client/assets/player/mage.png');
        game.load.spritesheet('mage_attack', 'client/assets/player/mage_attack.png', 53, 16);

        game.load.audio('desert', 'client/assets/sounds/desert.mp3');

        game.load.physics('physics', 'client/assets/physics/physics.json');

    },

    create: function() {

        game.stage.backgroundColor = "#212121";
        game.stage.smoothed = false;
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

        //music = game.add.audio('desert');
        //music.play();

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        //global.material = game.physics.p2.createMaterial('material');
        //global.projGroup = game.physics.p2.createCollisionGroup();
        //game.physics.p2.updateBoundsCollisionGroup();

        ctrls = {

            up:game.input.keyboard.addKey(keys.up),
            down:game.input.keyboard.addKey(keys.down),
            left:game.input.keyboard.addKey(keys.left),
            right:game.input.keyboard.addKey(keys.right),
            attack:game.input.activePointer.leftButton

        }

        this.Mgroup = game.add.group();

        this.map = new Map(3200, 1600, this.Mgroup);

        this.player = new Ranger(100, 100, this.Mgroup, ctrls);

    },  

    update: function() {       

        //game.world.bringToTop(this.map.bg);
        game.world.bringToTop(this.Mgroup);

        this.Mgroup.customSort(function(a, b) {

            return a.y - b.y;

        });

    },

    render: function() {
    },

}