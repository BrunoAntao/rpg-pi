class Player extends Phaser.Sprite {

    constructor(x, y, key, group, ctrls) {

        super(game, x, y, key);
        this.smoothed = false;

        this.ctrls = ctrls;
        this.speed = 5;

        game.add.existing(this);
        game.camera.follow(this);
        group.add(this);
    }

    update() {

        if(this.ctrls.up.isDown) {

            this.y -= this.speed;

        }

        if(this.ctrls.down.isDown) {

            this.y += this.speed;

        }

        if(this.ctrls.left.isDown) {

            this.x -= this.speed;

        }

        if(this.ctrls.right.isDown) {

            this.x += this.speed;

        }

        if(this.ctrls.attack.isDown) {
            
            this.attack();

        }
    
    }

}

class Warrior extends Player {
    
        constructor(x, y, group, ctrls) {
    
            super(x, y, 'mage', group, ctrls);
    
            this.anchor.setTo(0.5, 1);
            
            
    
        }
    
    }
class Ranger extends Player {
    
        constructor(x, y, group, ctrls) {
    
            super(x, y, 'mage', group, ctrls);
    
            this.anchor.setTo(0.5, 1);
            
            
    
        }
    
    }

class Mage extends Player {

    constructor(x, y, group, ctrls) {

        super(x, y, 'mage', group, ctrls);

        this.anchor.setTo(0.5, 1);

        this.group = group;

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;

        this.body.debug = true;
        
        this.fireRate = 200;
        this.nextFire = 0;

        this.projs = game.add.group();
        this.projs.enableBody = true;
        this.projs.physicsBodyType = Phaser.Physics.P2JS;

        this.projs.createMultiple(50, 'mage_attack');
        this.projs.setAll('checkWorldBounds', true);
        this.projs.setAll('outOfBoundsKill', true);
        this.projs.setAll('anchor', {x:0.5, y:0.5});
        this.projs.setAll('scale', {x:2, y:2});

        this.projs.forEach(function(proj) {
            
            proj.body.clearShapes();
            //proj.body.loadPolygon('physics', 'proj');
            proj.body.fixedRotation = true;

            let anim = proj.animations.add('attack', [0, 1, 2, 3], 10, true);
            anim.play();

            //proj.body.setCollisionGroup(global.projGroup);
            //proj.body.collides(global.enemies , hitMob, this);
            //proj.body.setMaterial(global.material);

        }, this)

        this.group.add(this.projs);

    }

    attack() {

        if (game.time.now > this.nextFire && this.projs.countDead() > 0) {
            this.nextFire = game.time.now + this.fireRate;
    
            var proj = this.projs.getFirstDead();

            proj.reset(this.x + this.width/2, this.y - this.height + (this.height / (this.height/16)));

            let speed = 50000;

            proj.rotation = game.physics.arcade.angleToPointer(proj);
            //proj.body.rotation = game.physics.arcade.angleToPointer(proj) + Math.PI /2 + Math.PI;

            proj.body.force.x = Math.cos(game.physics.arcade.angleToPointer(proj)) * speed;
            proj.body.force.y = Math.sin(game.physics.arcade.angleToPointer(proj)) * speed;

        }

    }

    update() {

        super.update();

        game.world.bringToTop(this.projs);

    }

}

