class Player extends Phaser.Sprite {

    constructor(x, y, key, group, ctrls) {

        super(game, x, y, key);
        this.smoothed = false;

        if (typeof ctrls != 'undefined') {

            this.ctrls = ctrls;

        }

        this.speed = 5;
        this.score = 0;

        this.maxhealth = 10;
        this.health = 10;

        this.maxresource = 10;
        this.resource = 10;

        game.add.existing(this);

        if (typeof group != 'undefined') {

            group.add(this);

        }
    }

    kill() {

        super.kill();

        if (typeof this.compass != 'undefined') {

            this.compass.forEach(function (pointer) {

                pointer.destroy();

            })

        }

    }

    checkBounds() {

        let biome;

        if (!(this instanceof Enemy)) {

            if (this.x > 0 && this.y > 0 && this.x < 1600 && this.y < 3200) {

                this.biome = 0; //forest

            }

            else if (this.x > 4800 && this.y > 0 && this.x < 6400 && this.y < 3200) {

                this.biome = 1; //fire 


            }

            else if (this.x > 1600 && this.y > 0 && this.x < 4800 && this.y < 1600) {

                this.biome = 2; //ice

            }

            else if (this.x > 1600 && this.y > 1600 && this.x < 4800 && this.y < 3200) {

                this.biome = 3; //desert

            }


        }
    }

    UpdateMusic() {

        if (!(this instanceof Enemy)) {

            switch (this.biome) {

                case 0:

                    this.music.forest.mute = false;
                    this.music.fire.mute = true;
                    this.music.ice.mute = true;
                    this.music.desert.mute = true;
                    break;

                case 1:

                    this.music.forest.mute = true;
                    this.music.fire.mute = false;
                    this.music.ice.mute = true;
                    this.music.desert.mute = true;
                    break;

                case 2:

                    this.music.forest.mute = true;
                    this.music.fire.mute = true;
                    this.music.ice.mute = false;
                    this.music.desert.mute = true;
                    break;

                case 3:

                    this.music.forest.mute = true;
                    this.music.fire.mute = true;
                    this.music.ice.mute = true;
                    this.music.desert.mute = false;
                    break;

            }

        }

    }

    update() {

        if (typeof this.ctrls != 'undefined' && this.alive) {

            if (this.ctrls.up.isDown) {

                this.y -= this.speed;

            }

            if (this.ctrls.down.isDown) {

                this.y += this.speed;

            }

            if (this.ctrls.mute.isDown) {

                game.sound.mute = true;

            }

            if (this.ctrls.left.isDown) {

                this.x -= this.speed;

            }

            if (this.ctrls.right.isDown) {

                this.x += this.speed;

            }

            if (this.ctrls.attack.isDown) {

                this.attack();

            }

            if (this.ctrls.skill.isDown) {

                this.skill();

            }

        }

        if (!(this instanceof Enemy)) {

            socket.emit('move player', { x: this.x, y: this.y - this.height / 2 });
            this.checkBounds();
            this.UpdateMusic();

            if (game.physics.arcade.angleToPointer(this) * 180 / Math.PI > 90 || game.physics.arcade.angleToPointer(this) * 180 / Math.PI < -90) {

                this.frame = 1;

            } else {

                this.frame = 0;

            }

        }

    }

}
class Enemy extends Player {

    constructor(x, y, key, id, index, group) {

        super(x, y, key);
        this.anchor.setTo(0.5, 1);

        switch (key) {

            case 'warrior': this.health = 15; this.maxhealth = 15; this.atkdamage = 3; break;
            case 'ranger': this.health = 10; this.maxhealth = 10; this.atkdamage = 2; break;
            case 'mage': this.health = 8; this.maxhealth = 8; this.atkdamage = 2; break;

        }

        game.physics.enable(this, Phaser.Physics.P2JS);
        this.body.clearShapes();
        this.body.loadPolygon(key, key);
        this.body.setCollisionGroup(global.enemiesGroup);
        this.body.collides(global.projGroup);
        this.body.fixedRotation = true;
        this.body.static = true;
        this.body.angle = 180;
        this.class = key;
        this.id = id;
        this.group = group;
        this.index = index;
        this.index[id] = this;

        this.projs = game.add.group();
        this.projs.enableBody = true;
        this.projs.physicsBodyType = Phaser.Physics.P2JS;
        switch (this.class) {

            case 'warrior': this.projs.createMultiple(50, 'warrior_attack'); break;
            case 'ranger': this.projs.createMultiple(50, 'ranger_attack');
                this.projs.setAll('scale', { x: 2, y: 2 }); break;
            case 'mage': this.projs.createMultiple(50, 'mage_attack');
                this.projs.setAll('scale', { x: 2, y: 2 }); break;

        }
        this.projs.setAll('checkWorldBounds', true);
        this.projs.setAll('outOfBoundsKill', true);
        this.projs.setAll('anchor', { x: 0.5, y: 0.5 });
        this.projs.setAll('smoothed', false);

        this.projs.forEach(function (proj) {

            proj.body.clearShapes();

            switch (this.class) {

                case 'warrior': proj.body.loadPolygon('sword', 'sword'); break;
                case 'ranger': proj.body.loadPolygon('arrow', 'arrow'); break;
                case 'mage': proj.body.loadPolygon('magic', 'magic'); break;

            }

            proj.source = this;

            if (this.class == 'warrior') {

                proj.update = function () {

                    if (this.alive && game.math.distance(this.x, this.y, this.source.x, this.source.y) > 150) {

                        this.kill();

                    }

                }

            }

            proj.body.setCollisionGroup(global.enemiesProjGroup);
            proj.body.collides(global.playerGroup, this.hit, this);

        }, this)

        this.group.add(this.projs);
        this.group.add(this);

    }

    hit(a, b) {

        a.sprite.kill();

    }

    attack(angle) {

        var proj = this.projs.getFirstDead();

        proj.reset(this.x, this.y);

        let speed = 50000;

        proj.rotation = angle;
        proj.body.rotation = angle;

        proj.body.force.x = Math.cos(angle) * speed;
        proj.body.force.y = Math.sin(angle) * speed;


        switch (this.class) {

            case 'warrior': this.sound = game.add.audio('sword', 0.2); this.sound.play(); break;
            case 'ranger': this.sound = game.add.audio('arrow', 0.2); this.sound.play(); break;
            case 'mage': this.sound = game.add.audio('spell', 0.2); this.sound.play(); break;

        }

    }

}
class Warrior extends Player {

    constructor(x, y, group, ctrls) {

        super(x, y, 'warrior', group, ctrls);

        this.anchor.setTo(0.5, 1);

        this.group = group;
        this.flag = true;
        this.hitflag = true;
        this.pflag = true;

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;

        this.dummy = game.add.sprite(0, 0);
        game.physics.enable(this.dummy, Phaser.Physics.P2JS);
        this.dummy.body.clearShapes();
        this.dummy.body.addRectangle(this.width, this.height);
        this.dummy.body.setCollisionGroup(global.playerGroup);
        this.dummy.body.collides([global.enemiesGroup, global.enemiesProjGroup], this.hit, this);
        this.dummy.body.fixedRotation = true;
        this.dummy.source = this;

        this.fireRate = 200;
        this.nextFire = 0;
        this.range = 10;
        this.atkdamage = 3;

        this.health = 15;
        this.maxhealth = 15;

        this.resource = 0;
        this.resourcecd = 0;

        this.ignoreActive = false;
        this.skillTimer = 2000;
        this.skillCost = 6;

        this.resColor = 0xcc3333;

        this.projs = game.add.group();
        this.projs.enableBody = true;
        this.projs.physicsBodyType = Phaser.Physics.P2JS;

        this.music = {

            forest: game.add.audio('forest', 0.4, true),
            fire: game.add.audio('fire', 0.4, true),
            ice: game.add.audio('ice', 0.4, true),
            desert: game.add.audio('desert', 0.4, true),

        }

        this.music.forest.play();
        this.music.fire.play();
        this.music.ice.play();
        this.music.desert.play();

        this.projs.createMultiple(50, 'warrior_attack');
        this.projs.setAll('checkWorldBounds', true);
        this.projs.setAll('outOfBoundsKill', true);
        this.projs.setAll('anchor', { x: 0.5, y: 0.5 });
        this.projs.setAll('smoothed', false);

        this.projs.forEach(function (proj) {

            proj.body.clearShapes();
            proj.body.loadPolygon('sword', 'sword');

            proj.source = this;

            proj.update = function () {

                if (this.alive && game.math.distance(this.x, this.y, this.source.x, this.source.y) > 150) {

                    this.kill();

                }

            }

            proj.body.setCollisionGroup(global.projGroup);
            proj.body.collides(global.enemiesGroup, this.hitMob, this);

        }, this)

        this.group.add(this.projs);

        game.camera.follow(this);

    }

    hit(a, b) {

        if (this.hitflag && !this.ignoreActive && !(b.sprite.source instanceof Enemy)) {

            this.hitflag = false;

            a.sprite.source.damage(1);

            game.time.events.add(500, function () {

                this.hitflag = true;

            }, this);

        } else if (this.pflag) {

            this.pflag = false;

            game.time.events.add(10, function () {

                this.pflag = true;

            }, this);

            a.sprite.source.damage(b.sprite.source.atkdamage);

        }

        this.collision = game.add.audio('hurt', 0.3);
        this.collision.play();

    }

    hitMob(a, b) {

        if (this.flag) {

            this.flag = false;

            game.time.events.add(10, function () {

                this.flag = true;

            }, this);

            a.sprite.kill();
            if (b.sprite != null && b.sprite.alive) {
                this.resource += 2;
                this.resourcecd = 200;

                if (b.sprite.class == 'warrior' && !b.sprite.ignoreActive) {

                    b.sprite.damage(this.atkdamage, this);

                } else if (b.sprite.class != 'warrior') {

                    b.sprite.damage(this.atkdamage, this);

                }

            }

        }

    }

    attack() {

        if (game.time.now > this.nextFire && this.projs.countDead() > 0) {

            this.nextFire = game.time.now + this.fireRate;

            var proj = this.projs.getFirstDead();

            proj.reset(this.x, this.y - this.height / 2);

            let speed = 50000;

            proj.rotation = game.physics.arcade.angleToPointer(proj);
            proj.body.rotation = game.physics.arcade.angleToPointer(proj);

            proj.body.force.x = Math.cos(game.physics.arcade.angleToPointer(proj)) * speed;
            proj.body.force.y = Math.sin(game.physics.arcade.angleToPointer(proj)) * speed;

            socket.emit('player attack', game.physics.arcade.angleToPointer(proj));

            this.sword = game.add.audio('sword', 0.2);
            this.sword.play();

        }

    }

    skill() {

        if (this.resource >= this.skillCost) {

            this.loadTexture('warrior_skill');
            this.resource -= this.skillCost;
            this.ignoreActive = true;
            game.time.events.add(this.skillTimer, function () {

                this.ignoreActive = false;
                this.loadTexture('warrior');

            }, this)

        }

    }

    update() {

        super.update();

        if (this.resource >= this.maxresource) {

            this.resource = this.maxresource;

        }

        this.dummy.body.x = this.x;
        this.dummy.body.y = this.y - this.height / 2;

        if (this.resourcecd > 0) {

            this.resourcecd--;

        } else {

            this.resource = 0;

        }

    }

}
class Ranger extends Player {

    constructor(x, y, group, ctrls) {

        super(x, y, 'ranger', group, ctrls);

        this.anchor.setTo(0.5, 1);

        this.group = group;
        this.flag = true;
        this.sflag = true;
        this.hitflag = true;
        this.pflag = true;

        this.music = {

            forest: game.add.audio('forest', 0.4, true),
            fire: game.add.audio('fire', 0.4, true),
            ice: game.add.audio('ice', 0.4, true),
            desert: game.add.audio('desert', 0.4, true),

        }

        this.music.forest.play();
        this.music.fire.play();
        this.music.ice.play();
        this.music.desert.play();

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;

        this.dummy = game.add.sprite(0, 0);
        game.physics.enable(this.dummy, Phaser.Physics.P2JS);
        this.dummy.body.clearShapes();
        this.dummy.body.addRectangle(this.width, this.height);
        this.dummy.body.setCollisionGroup(global.playerGroup);
        this.dummy.body.collides([global.enemiesGroup, global.enemiesProjGroup], this.hit, this);
        this.dummy.body.fixedRotation = true;
        this.dummy.source = this;

        this.fireRate = 200;
        this.nextFire = 0;
        this.atkdamage = 2;

        this.sfireRate = 500;
        this.snextFire = 0;
        this.satkdamage = 3;

        this.health = 10;
        this.maxhealth = 10;

        this.resColor = 0xcccc33;

        this.gainResource = function () {

            if (this.resource < this.maxresource) {

                this.resource++;

            }

        }

        this.timer = game.time.create(false);
        this.timer.loop(5000, this.gainResource, this);
        this.timer.start();

        this.projs = game.add.group();
        this.projs.enableBody = true;
        this.projs.physicsBodyType = Phaser.Physics.P2JS;

        this.projs.createMultiple(50, 'ranger_attack');
        this.projs.setAll('checkWorldBounds', true);
        this.projs.setAll('outOfBoundsKill', true);
        this.projs.setAll('anchor', { x: 0.5, y: 0.5 });
        this.projs.setAll('scale', { x: 2, y: 2 });
        this.projs.setAll('smoothed', false);

        this.projs.forEach(function (proj) {

            proj.body.clearShapes();
            proj.body.loadPolygon('arrow', 'arrow');
            proj.body.setCollisionGroup(global.projGroup);
            proj.body.collides(global.enemiesGroup, this.hitMob, this);
            proj.body.setMaterial(global.material);

        }, this)

        this.group.add(this.projs);

        this.daggers = game.add.group();
        this.daggers.enableBody = true;
        this.daggers.physicsBodyType = Phaser.Physics.P2JS;

        this.daggers.createMultiple(50, 'ranger_skill');
        this.daggers.setAll('checkWorldBounds', true);
        this.daggers.setAll('outOfBoundsKill', true);
        this.daggers.setAll('anchor', { x: 0.5, y: 0.5 });
        this.daggers.setAll('smoothed', false);

        this.daggers.forEach(function (dagger) {

            dagger.body.clearShapes();
            dagger.body.loadPolygon('arrow', 'dagger');

            dagger.source = this;

            dagger.update = function () {

                if (this.alive && game.math.distance(this.x, this.y, this.source.x, this.source.y) > 150) {

                    this.kill();

                }

            }

            dagger.body.setCollisionGroup(global.projGroup);
            dagger.body.collides(global.enemiesGroup, this.skillHitMob, this);
            dagger.body.setMaterial(global.material);

        }, this)

        this.group.add(this.daggers);

        game.camera.follow(this);

    }

    hit(a, b) {

        if (this.hitflag && !(b.sprite.source instanceof Enemy)) {

            this.hitflag = false;

            a.sprite.source.damage(1);

            game.time.events.add(500, function () {

                this.hitflag = true;

            }, this);

        } else if (this.pflag) {

            this.pflag = false;

            game.time.events.add(10, function () {

                this.pflag = true;

            }, this);

            a.sprite.source.damage(b.sprite.source.atkdamage);

        }

        this.collision = game.add.audio('hurt', 0.3);
        this.collision.play();

    }

    hitMob(a, b) {

        if (this.flag) {

            this.flag = false;

            game.time.events.add(10, function () {

                this.flag = true;

            }, this);


            a.sprite.kill();
            if (b.sprite != null && b.sprite.alive) {

                if (b.sprite.class == 'warrior' && !b.sprite.ignoreActive) {

                    b.sprite.damage(this.atkdamage, this);

                } else if (b.sprite.class != 'warrior') {

                    b.sprite.damage(this.atkdamage, this);

                }

            }

        }

    }

    attack() {

        if (game.time.now > this.nextFire && this.projs.countDead() > 0) {
            this.nextFire = game.time.now + this.fireRate;

            var proj = this.projs.getFirstDead();

            proj.reset(this.x, this.y - this.height / 2);

            let speed = 50000;

            proj.rotation = game.physics.arcade.angleToPointer(proj);
            proj.body.rotation = game.physics.arcade.angleToPointer(proj);

            proj.body.force.x = Math.cos(game.physics.arcade.angleToPointer(proj)) * speed;
            proj.body.force.y = Math.sin(game.physics.arcade.angleToPointer(proj)) * speed;

            socket.emit('player attack', game.physics.arcade.angleToPointer(proj));

            this.arrow = game.add.audio('arrow', 0.2);
            this.arrow.play();

        }

    }

    skillHitMob(a, b) {

        if (this.sflag) {

            this.sflag = false;

            game.time.events.add(10, function () {

                this.sflag = true;

            }, this);

            a.sprite.kill();
            if (b.sprite != null && b.sprite.alive) {

                if (b.sprite.class == 'warrior' && !b.sprite.ignoreActive) {

                    b.sprite.damage(this.satkdamage, this);

                } else if (b.sprite.class != 'warrior') {

                    b.sprite.damage(this.satkdamage, this);

                }

            }

        }

    }

    skill() {

        if (game.time.now > this.snextFire && this.daggers.countDead() > 0 && this.resource >= 5) {
            this.snextFire = game.time.now + this.sfireRate;
            this.resource -= 5;

            var dagger = this.daggers.getFirstDead();

            dagger.reset(this.x, this.y - this.height / 2);

            let speed = 50000;

            dagger.rotation = game.physics.arcade.angleToPointer(dagger);
            dagger.body.rotation = game.physics.arcade.angleToPointer(dagger);

            dagger.body.force.x = Math.cos(game.physics.arcade.angleToPointer(dagger)) * speed;
            dagger.body.force.y = Math.sin(game.physics.arcade.angleToPointer(dagger)) * speed;

        }

    }

    update() {

        super.update();
        this.dummy.body.x = this.x;
        this.dummy.body.y = this.y - this.height / 2;

    }

}
class Mage extends Player {

    constructor(x, y, group, ctrls) {

        super(x, y, 'mage', group, ctrls);

        this.anchor.setTo(0.5, 1);

        this.group = group;
        this.flag = true;
        this.hitflag = true;
        this.pflag = true;

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;

        this.music = {

            forest: game.add.audio('forest', 0.4, true),
            fire: game.add.audio('fire', 0.4, true),
            ice: game.add.audio('ice', 0.4, true),
            desert: game.add.audio('desert', 0.4, true),

        }

        this.music.forest.play();
        this.music.fire.play();
        this.music.ice.play();
        this.music.desert.play();

        this.dummy = game.add.sprite(0, 0);
        game.physics.enable(this.dummy, Phaser.Physics.P2JS);
        this.dummy.body.clearShapes();
        this.dummy.body.addRectangle(this.width, this.height);
        this.dummy.body.setCollisionGroup(global.playerGroup);
        this.dummy.body.collides([global.enemiesGroup, global.enemiesProjGroup], this.hit, this);
        this.dummy.body.fixedRotation = true;
        this.dummy.source = this;

        this.fireRate = 200;
        this.nextFire = 0;
        this.atkdamage = 2;

        this.health = 8;
        this.maxhealth = 8;

        this.resColor = 0x3333cc;

        this.projs = game.add.group();
        this.projs.enableBody = true;
        this.projs.physicsBodyType = Phaser.Physics.P2JS;

        this.projs.createMultiple(50, 'mage_attack');
        this.projs.setAll('checkWorldBounds', true);
        this.projs.setAll('outOfBoundsKill', true);
        this.projs.setAll('anchor', { x: 0.5, y: 0.5 });
        this.projs.setAll('scale', { x: 2, y: 2 });
        this.projs.setAll('smoothed', false);

        this.projs.forEach(function (proj) {

            proj.body.clearShapes();
            proj.body.loadPolygon('magic', 'magic');

            let anim = proj.animations.add('attack', [0, 1, 2, 3], 10, true);
            anim.play();

            proj.body.setCollisionGroup(global.projGroup);
            proj.body.collides(global.enemiesGroup, this.hitMob, this);

        }, this)

        this.group.add(this.projs);

        game.camera.follow(this);

    }

    hit(a, b) {

        if (this.hitflag && !(b.sprite.source instanceof Enemy)) {

            this.hitflag = false;

            a.sprite.source.damage(1);

            game.time.events.add(500, function () {

                this.hitflag = true;

            }, this);

        } else if (this.pflag) {

            this.pflag = false;

            game.time.events.add(10, function () {

                this.pflag = true;

            }, this);

            a.sprite.source.damage(b.sprite.source.atkdamage);

        }

        this.collision = game.add.audio('hurt', 0.3);
        this.collision.play();

    }

    hitMob(a, b) {

        if (this.flag) {

            this.flag = false;

            game.time.events.add(10, function () {

                this.flag = true;

            }, this);

            a.sprite.kill();
            if (b.sprite != null && b.sprite.alive) {

                if (b.sprite.class == 'warrior' && !b.sprite.ignoreActive) {

                    b.sprite.damage(this.atkdamage, this);

                } else if (b.sprite.class != 'warrior') {

                    b.sprite.damage(this.atkdamage, this);

                }

            }

        }

    }

    attack() {

        if (game.time.now > this.nextFire && this.projs.countDead() > 0) {
            this.nextFire = game.time.now + this.fireRate;

            var proj = this.projs.getFirstDead();

            proj.reset(this.x, this.y - this.height / 2);

            let speed = 50000;

            proj.rotation = game.physics.arcade.angleToPointer(proj);
            proj.body.rotation = game.physics.arcade.angleToPointer(proj);

            proj.body.force.x = Math.cos(game.physics.arcade.angleToPointer(proj)) * speed;
            proj.body.force.y = Math.sin(game.physics.arcade.angleToPointer(proj)) * speed;

            socket.emit('player attack', game.physics.arcade.angleToPointer(proj));

            this.spell = game.add.audio('spell', 0.2);
            this.spell.play();

        }

    }

    skill() {

        if (game.time.now > this.nextFire && this.projs.countDead() > 0 && this.resource >= 3) {
            this.nextFire = game.time.now + this.fireRate;
            this.resource -= 3;

            var proj = this.projs.getFirstDead();

            proj.reset(this.x, this.y - this.height / 2);

            var proj2 = this.projs.getFirstDead();

            proj2.reset(this.x, this.y - this.height / 2);

            var proj3 = this.projs.getFirstDead();

            proj3.reset(this.x, this.y - this.height / 2);

            let speed = 50000;

            proj.rotation = game.physics.arcade.angleToPointer(proj);
            proj.body.rotation = game.physics.arcade.angleToPointer(proj);

            proj.body.force.x = Math.cos(game.physics.arcade.angleToPointer(proj)) * speed;
            proj.body.force.y = Math.sin(game.physics.arcade.angleToPointer(proj)) * speed;

            proj2.rotation = game.physics.arcade.angleToPointer(proj2) - 45 * Math.PI / 180;
            proj2.body.rotation = game.physics.arcade.angleToPointer(proj2) - 45 * Math.PI / 180;

            proj2.body.force.x = Math.cos(game.physics.arcade.angleToPointer(proj2) - 45 * Math.PI / 180) * speed;
            proj2.body.force.y = Math.sin(game.physics.arcade.angleToPointer(proj2) - 45 * Math.PI / 180) * speed;

            proj3.rotation = game.physics.arcade.angleToPointer(proj3) + 45 * Math.PI / 180;
            proj3.body.rotation = game.physics.arcade.angleToPointer(proj3) + 45 * Math.PI / 180;

            proj3.body.force.x = Math.cos(game.physics.arcade.angleToPointer(proj3) + 45 * Math.PI / 180) * speed;
            proj3.body.force.y = Math.sin(game.physics.arcade.angleToPointer(proj3) + 45 * Math.PI / 180) * speed;

        }

    }


    update() {

        super.update();
        this.dummy.body.x = this.x;
        this.dummy.body.y = this.y - this.height / 2;

    }

}