gameState = {

    init: function(nclass) {

        this.class = nclass;
        //console.log(map);

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
        game.load.image('arrow', 'client/assets/player/arrow.png');

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
        game.load.image('ranger_skill', 'client/assets/player/ranger_skill.png');
        game.load.physics('arrow', 'client/assets/physics/arrow.json');

        game.load.image('mage', 'client/assets/player/mage.png');
        game.load.physics('mage', 'client/assets/physics/mage.json');
        game.load.spritesheet('mage_attack', 'client/assets/player/mage_attack.png', 53, 16);
        game.load.physics('magic', 'client/assets/physics/magic.json');

        game.load.spritesheet('slime', 'client/assets/enemies/slime.png',100, 80);

        //game.load.audio('desert', 'client/assets/sounds/desert.mp3, client/assets/sounds/desert.ogg', true);
        //game.load.audio('ice', 'client/assets/sounds/ice.mp3, client/assets/sounds/ice.ogg', true);
        //game.load.audio('fire', 'client/assets/sounds/fire.mp3, client/assets/sounds/fire.ogg', true);
        //game.load.audio('forest', client/assets/sounds/forest.mp3, client/assets/sounds/forest.ogg', true)
    },

    create: function() {

        game.stage.backgroundColor = "#212121";
        game.stage.smoothed = false;
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        global.projGroup = game.physics.p2.createCollisionGroup();
        global.enemiesGroup = game.physics.p2.createCollisionGroup();

        ctrls = {

            up:game.input.keyboard.addKey(keys.up),
            down:game.input.keyboard.addKey(keys.down),
            left:game.input.keyboard.addKey(keys.left),
            right:game.input.keyboard.addKey(keys.right),
            attack:game.input.activePointer.leftButton,
            skill:game.input.activePointer.rightButton,
            mute:game.input.keyboard.addKey(Phaser.Keyboard.M),

        }

        this.Mgroup = game.add.group();

        global.map = new Map(6400, 3200, this.Mgroup);

        global.player = {};

        switch (this.class) {

            case 0: global.player = new Warrior(100, 100, this.Mgroup, ctrls); break;
            case 1: global.player = new Ranger(100, 100, this.Mgroup, ctrls); break;
            case 2: global.player = new Mage(100, 100, this.Mgroup, ctrls); break;

        }

        global.enemy = new Enemy(300, 100, 'warrior');

        new Compass(global.map, global.player);

        new Bar(true, global.player, 'health', 0x33cc33);
        new Label('Score: ', global.player, 'score', global.player.resColor);
        new Bar(false, global.player, 'resource', global.player.resColor);
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