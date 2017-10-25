gameState = {

    init: function(nclass) {

        this.class = nclass;

    },

    preload: function() {

        game.load.image('tree1', 'client/assets/entities/tree1.png');
        game.load.image('tree2', 'client/assets/entities/tree2.png');
        game.load.image('tree3', 'client/assets/entities/tree3.png');
        game.load.image('cactus1', 'client/assets/entities/desert1.png');
        game.load.image('cactus2', 'client/assets/entities/desert2.png');
        game.load.image('palm', 'client/assets/entities/desert3.png');
        game.load.image('magma1', 'client/assets/entities/magma1.png');
        game.load.image('volcano', 'client/assets/entities/volcano.png');

        game.load.image('frozen1', 'client/assets/entities/frozen1.png');
        game.load.image('snowMan', 'client/assets/entities/snowMan.png');

        game.load.image('capPoint1', 'client/assets/capturePoints/cp1.png');
        game.load.image('capPoint2', 'client/assets/capturePoints/cp2.png');
        game.load.image('capPoint3', 'client/assets/capturePoints/cp3.png');
        game.load.image('capPoint4', 'client/assets/capturePoints/cp4.png');

        game.load.image('warrior', 'client/assets/player/warrior.png');
        game.load.physics('warrior', 'client/assets/physics/warrior.json');
        game.load.image('warrior_attack', 'client/assets/player/warrior_attack.png');
        game.load.physics('sword', 'client/assets/physics/sword.json');

        game.load.image('ranger', 'client/assets/player/ranger.png');
        game.load.physics('ranger', 'client/assets/physics/ranger.json');
        game.load.image('ranger_attack', 'client/assets/player/ranger_attack.png');
        game.load.physics('arrow', 'client/assets/physics/arrow.json');

        game.load.image('mage', 'client/assets/player/mage.png');
        game.load.physics('mage', 'client/assets/physics/mage.json');
        game.load.spritesheet('mage_attack', 'client/assets/player/mage_attack.png', 53, 16);
        game.load.physics('magic', 'client/assets/physics/magic.json');

        game.load.audio('desert', 'client/assets/sounds/desert.mp3');

    },

    create: function() {

        game.stage.backgroundColor = "#212121";
        game.stage.smoothed = false;
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

        //music = game.add.audio('desert');
        //music.play();

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        global.projGroup = game.physics.p2.createCollisionGroup();
        global.enemiesGroup = game.physics.p2.createCollisionGroup();

        ctrls = {

            up:game.input.keyboard.addKey(keys.up),
            down:game.input.keyboard.addKey(keys.down),
            left:game.input.keyboard.addKey(keys.left),
            right:game.input.keyboard.addKey(keys.right),
            attack:game.input.activePointer.leftButton

        }

        this.Mgroup = game.add.group();

        this.map = new Map(3200, 1600, this.Mgroup);

        global.player = {};

        switch (this.class) {

            case 0: global.player = new Warrior(100, 100, this.Mgroup, ctrls); break;
            case 1: global.player = new Ranger(100, 100, this.Mgroup, ctrls); break;
            case 2: global.player = new Mage(100, 100, this.Mgroup, ctrls); break;

        }

        new Enemy(300, 100, 'warrior');

        new Bar(true, global.player, 'health');

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