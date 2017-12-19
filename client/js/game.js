gameState = {

    init: function (nclass, map) {

        this.class = nclass;
        this.map = map;

    },


    preload: function () {

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

        game.load.spritesheet('warrior', 'client/assets/player/warrior.png', 79, 65);
        game.load.physics('warrior', 'client/assets/physics/warrior.json');
        game.load.image('warrior_attack', 'client/assets/player/warrior_attack.png');
        game.load.spritesheet('warrior_skill', 'client/assets/player/warrior_skill.png', 79, 65);
        game.load.physics('sword', 'client/assets/physics/sword.json');

        game.load.spritesheet('ranger', 'client/assets/player/ranger.png', 65, 65);
        game.load.physics('ranger', 'client/assets/physics/ranger.json');
        game.load.image('ranger_attack', 'client/assets/player/ranger_attack.png');
        game.load.image('ranger_skill', 'client/assets/player/ranger_skill.png');
        game.load.physics('arrow', 'client/assets/physics/arrow.json');

        game.load.spritesheet('mage', 'client/assets/player/mage.png', 78, 75);
        game.load.physics('mage', 'client/assets/physics/mage.json');
        game.load.spritesheet('mage_attack', 'client/assets/player/mage_attack.png', 53, 16);
        game.load.physics('magic', 'client/assets/physics/magic.json');

        game.load.spritesheet('slime', 'client/assets/enemies/slime.png', 100, 80);

        game.load.audio('spell', 'client/assets/sounds/spell.m4a');
        game.load.audio('hurtmag', 'client/assets/sounds/hurtmage.m4a');
        game.load.audio('hurt', 'client/assets/sounds/hurt.m4a');
        game.load.audio('hurtish', 'client/assets/sounds/hurt.m4a');
        game.load.audio('hurtran', 'client/assets/sounds/hurtwar.m4a');
        game.load.audio('arrow', 'client/assets/sounds/arrow.m4a');
        game.load.audio('sword', 'client/assets/sounds/sword.m4a');
        game.load.audio('desert', ['client/assets/sounds/desert.m4a', 'client/assets/sounds/desert.ogg']);
        game.load.audio('ice', ['client/assets/sounds/ice.m4a', 'client/assets/sounds/ice.ogg']);
        game.load.audio('fire', ['client/assets/sounds/fire.m4a', 'client/assets/sounds/fire.ogg']);
        game.load.audio('forest', ['client/assets/sounds/jungle.m4a', 'client/assets/sounds/jungle.ogg']);
        game.load.audio('slime', 'client/assets/sounds/slime.m4a');
        game.load.audio('knife', 'client/assets/sounds/knife.m4a');
        game.load.audio('rage', 'client/assets/sounds/rage.m4a'); 
        game.load.audio('skillspell', 'client/assets/sounds/skillspell.m4a');        
        
        
        
    },

    create: function () {

        game.stage.backgroundColor = "#212121";
        game.stage.smoothed = false;
        game.stage.disableVisibilityChange = true;
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        global.projGroup = game.physics.p2.createCollisionGroup();
        global.enemiesProjGroup = game.physics.p2.createCollisionGroup();
        global.playerGroup = game.physics.p2.createCollisionGroup();
        global.enemiesGroup = game.physics.p2.createCollisionGroup();

        ctrls = {

            up: game.input.keyboard.addKey(keys.up),
            down: game.input.keyboard.addKey(keys.down),
            left: game.input.keyboard.addKey(keys.left),
            right: game.input.keyboard.addKey(keys.right),
            attack: game.input.activePointer.leftButton,
            skill: game.input.activePointer.rightButton,
            mute: game.input.keyboard.addKey(Phaser.Keyboard.M),

        }

        game.sound.mute = global.mute;

        this.Mgroup = game.add.group();
        global.enemies = [];
        socket.emit('fetch players');

        socket.on('players', function (players) {

            global.map = new Map(gameState.map.width, gameState.map.height, gameState.Mgroup, gameState.map);

            switch (gameState.class) {

                case 0: global.player = new Warrior(100, 100, gameState.Mgroup, ctrls); break;
                case 1: global.player = new Ranger(100, 100, gameState.Mgroup, ctrls); break;
                case 2: global.player = new Mage(100, 100, gameState.Mgroup, ctrls); break;

            }

            socket.emit('new player', { x: global.player.x, y: global.player.y, class: gameState.class });

            new Compass(global.map, global.player);

            new Bar(true, global.player, 'health', 0x33cc33);
            new Label('Score: ', global.player, 'score', global.player.resColor);
            new Bar(false, global.player, 'resource', global.player.resColor);

            players.forEach(function (player) {

                new Enemy(player.x, player.y, player.class, player.id, global.enemies, gameState.Mgroup);

            }, this);

            socket.on('new player', function (player) {

                new Enemy(player.x, player.y, player.class, player.id, global.enemies, gameState.Mgroup);

            })

            socket.on('move enemy', function (player) {

                global.enemies[player.id].body.x = player.x;
                global.enemies[player.id].body.y = player.y;

            })

            socket.on('remove enemy', function (player) {

                global.enemies[player.id].destroy();

            })

            socket.on('player attack', function (data) {

                global.enemies[data.id].attack(data.angle);

            })

            socket.on('player skill', function (data) {

                global.enemies[data.id].skill(data.angle);

            })

        });

    },

    update: function () {

        game.world.bringToTop(this.Mgroup);

        this.Mgroup.customSort(function (a, b) {

            return a.y - b.y;

        });

    },

    render: function () {
    },

}