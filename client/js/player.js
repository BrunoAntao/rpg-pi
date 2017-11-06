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
    
            var style = { font: "bold 18px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
            this.label = game.add.text(0, 0, '', style);
            this.label.setTextBounds(0, 0, 200, 54);
            this.label.smoothed = false;
            this.label.visible = false;
    
            this.addChild(this.label);
    
            game.add.existing(this);
    
            if (typeof group != 'undefined') {
    
                group.add(this);
    
            }
        }
    
        kill() {
    
            super.kill();
    
            if(typeof this.compass != 'undefined') {
    
                this.compass.forEach(function (pointer) {
    
                    pointer.destroy();
    
                })
    
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
    
        }
    
    }
    
class Enemy extends Player {

    constructor(x, y, key) {

        super(x, y, key);
        this.anchor.setTo(0.5, 1);

        switch(key) {

            case 'warrior': this.health = 15; this.maxhealth = 15; break;
            case 'ranger': this.health = 10; this.maxhealth = 10; break;
            case 'mage': this.health = 8; this.maxhealth = 8; break;

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

    }

}
class Warrior extends Player {

    constructor(x, y, group, ctrls) {

        super(x, y, 'warrior', group, ctrls);

        this.anchor.setTo(0.5, 1);

        this.group = group;
        this.flag = true;

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;

        this.fireRate = 200;
        this.nextFire = 0;
        this.range = 10;
        this.atkdamage = 3;

        this.health = 15;
        this.maxhealth = 15;

        this.resource = 0;
        this.resourcecd = 0;

        this.ignoreActive = false;
        this.skillTimer = 0;
        this.skillCost = 6;

        this.resColor = 0xcc3333;

        this.projs = game.add.group();
        this.projs.enableBody = true;
        this.projs.physicsBodyType = Phaser.Physics.P2JS;

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

                if(this.alive && game.math.distance(this.x, this.y, this.source.x, this.source.y) > 150) {

                    this.kill();

                }

            }

            proj.body.setCollisionGroup(global.projGroup);
            proj.body.collides(global.enemiesGroup, this.hitMob, this);

        }, this)

        this.group.add(this.projs);

        game.camera.follow(this);

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

                    b.sprite.damage(this.atkdamage);

                } else if (b.sprite.class != 'warrior') {

                    b.sprite.damage(this.atkdamage);

                }

            }

        }

    }

    attack() {

        if (game.time.now > this.nextFire && this.projs.countDead() > 0) {
            this.nextFire = game.time.now + this.fireRate;

            var proj = this.projs.getFirstDead();

            proj.reset(this.x + this.width / 2, this.y - this.height / 2);

            let speed = 50000;

            proj.rotation = game.physics.arcade.angleToPointer(proj);
            proj.body.rotation = game.physics.arcade.angleToPointer(proj);

            proj.body.force.x = Math.cos(game.physics.arcade.angleToPointer(proj)) * speed;
            proj.body.force.y = Math.sin(game.physics.arcade.angleToPointer(proj)) * speed;

        }

    }

    skill() {

        if (this.resource >= this.skillCost) {

            this.resource -= this.skillCost;
            this.ignoreActive = true;
            this.skillTimer = 100;

        }

    }

    update() {

        super.update();

        if (this.ignoreActive && this.skillTimer > 0) {

            this.skillTimer--;
            console.log(this.skillTimer)

        } else {

            this.ignoreActive = false;

        }

        if(this.resourcecd > 0) {
            
            this.resourcecd--;
            console.log(this.resourcecd);

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

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;

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

            if(this.resource < this.maxresource) {

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

                if(this.alive && game.math.distance(this.x, this.y, this.source.x, this.source.y) > 150) {

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

    hitMob(a, b) {

        if (this.flag) {

            this.flag = false;

            game.time.events.add(10, function () {

                this.flag = true;

            }, this);

            a.sprite.kill();
            if (b.sprite != null && b.sprite.alive) {

                if (b.sprite.class == 'warrior' && !b.sprite.ignoreActive) {

                    b.sprite.damage(this.atkdamage);

                } else if (b.sprite.class != 'warrior') {

                    b.sprite.damage(this.atkdamage);

                }

            }

        }

    }

    attack() {

        if (game.time.now > this.nextFire && this.projs.countDead() > 0) {
            this.nextFire = game.time.now + this.fireRate;

            var proj = this.projs.getFirstDead();

            proj.reset(this.x + this.width / 2, this.y - this.height / 2);

            let speed = 50000;

            proj.rotation = game.physics.arcade.angleToPointer(proj);
            proj.body.rotation = game.physics.arcade.angleToPointer(proj);

            proj.body.force.x = Math.cos(game.physics.arcade.angleToPointer(proj)) * speed;
            proj.body.force.y = Math.sin(game.physics.arcade.angleToPointer(proj)) * speed;

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

                    b.sprite.damage(this.satkdamage);

                } else if (b.sprite.class != 'warrior') {

                    b.sprite.damage(this.satkdamage);

                }

            }

        }
        
            }

    skill() {

        if (game.time.now > this.snextFire && this.daggers.countDead() > 0 && this.resource >= 5) {
            this.snextFire = game.time.now + this.sfireRate;
            this.resource -= 5;

            var dagger = this.daggers.getFirstDead();

            dagger.reset(this.x + this.width / 2, this.y - this.height / 2);

            let speed = 50000;

            dagger.rotation = game.physics.arcade.angleToPointer(dagger);
            dagger.body.rotation = game.physics.arcade.angleToPointer(dagger);

            dagger.body.force.x = Math.cos(game.physics.arcade.angleToPointer(dagger)) * speed;
            dagger.body.force.y = Math.sin(game.physics.arcade.angleToPointer(dagger)) * speed;

        }

    }

}
class Mage extends Player {

    constructor(x, y, group, ctrls) {

        super(x, y, 'mage', group, ctrls);

        this.anchor.setTo(0.5, 1);

        this.group = group;
        this.flag = true;

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;

        this.fireRate = 200;
        this.nextFire = 0;
        this.atkdamage = 3;

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

    hitMob(a, b) {

        if (this.flag) {

            this.flag = false;

            game.time.events.add(10, function () {

                this.flag = true;

            }, this);

            a.sprite.kill();
            if (b.sprite != null && b.sprite.alive) {

                if (b.sprite.class == 'warrior' && !b.sprite.ignoreActive) {

                    b.sprite.damage(this.atkdamage);

                } else if (b.sprite.class != 'warrior') {

                    b.sprite.damage(this.atkdamage);

                }

            }

        }

    }

    attack() {

        if (game.time.now > this.nextFire && this.projs.countDead() > 0) {
            this.nextFire = game.time.now + this.fireRate;

            var proj = this.projs.getFirstDead();

            proj.reset(this.x + this.width / 2, this.y - this.height + (this.height / (this.height / 16)));

            let speed = 50000;

            proj.rotation = game.physics.arcade.angleToPointer(proj);
            proj.body.rotation = game.physics.arcade.angleToPointer(proj);

            proj.body.force.x = Math.cos(game.physics.arcade.angleToPointer(proj)) * speed;
            proj.body.force.y = Math.sin(game.physics.arcade.angleToPointer(proj)) * speed;

        }

    }

    skill() {

        if (game.time.now > this.nextFire && this.projs.countDead() > 0 && this.resource >= 3) {
            this.nextFire = game.time.now + this.fireRate;
            this.resource -= 3;

            var proj = this.projs.getFirstDead();

            proj.reset(this.x + this.width / 2, this.y - this.height + (this.height / (this.height / 16)));

            var proj2 = this.projs.getFirstDead();

            proj2.reset(this.x + this.width / 2, this.y - this.height + (this.height / (this.height / 16)));

            var proj3 = this.projs.getFirstDead();

            proj3.reset(this.x + this.width / 2, this.y - this.height + (this.height / (this.height / 16)));

            let speed = 50000;

            proj.rotation = game.physics.arcade.angleToPointer(proj);
            proj.body.rotation = game.physics.arcade.angleToPointer(proj);

            proj.body.force.x = Math.cos(game.physics.arcade.angleToPointer(proj)) * speed;
            proj.body.force.y = Math.sin(game.physics.arcade.angleToPointer(proj)) * speed;

            proj2.rotation = game.physics.arcade.angleToPointer(proj2) - 45*Math.PI/180;
            proj2.body.rotation = game.physics.arcade.angleToPointer(proj2) - 45*Math.PI/180;

            proj2.body.force.x = Math.cos(game.physics.arcade.angleToPointer(proj2) - 45*Math.PI/180) * speed;
            proj2.body.force.y = Math.sin(game.physics.arcade.angleToPointer(proj2) - 45*Math.PI/180) * speed;

            proj3.rotation = game.physics.arcade.angleToPointer(proj3) + 45*Math.PI/180;
            proj3.body.rotation = game.physics.arcade.angleToPointer(proj3) + 45*Math.PI/180;

            proj3.body.force.x = Math.cos(game.physics.arcade.angleToPointer(proj3) + 45*Math.PI/180) * speed;
            proj3.body.force.y = Math.sin(game.physics.arcade.angleToPointer(proj3) + 45*Math.PI/180) * speed;

        }

    }

}