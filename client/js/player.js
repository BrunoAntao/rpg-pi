class Player extends Phaser.Sprite {

    constructor(x, y, key, group, ctrls) {

        super(game, x, y, key);
        this.smoothed = false;

        this.ctrls = ctrls;

        game.add.existing(this);
        game.camera.follow(this);
        group.add(this);
    }

    update() {

        if(this.ctrls.up.isDown) {

            this.y -= 5;

        }

        if(this.ctrls.down.isDown) {

            this.y += 5;

        }

        if(this.ctrls.left.isDown) {

            this.x -= 5;

        }

        if(this.ctrls.right.isDown) {

            this.x += 5;

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
        
        this.fireRate = 200;
        this.nextFire = 0;

        this.projs = game.add.group();
        this.projs.enableBody = true;
        this.projs.physicsBodyType = Phaser.Physics.P2JS;

        this.projs.createMultiple(50, this.key);
        this.projs.setAll('checkWorldBounds', true);
        this.projs.setAll('outOfBoundsKill', true);
        this.projs.setAll('anchor', {x:0.5, y:0.5});

        this.projs.forEach(function(proj) {
            
            proj.body.clearShapes();
            //proj.body.loadPolygon('physics', 'mage');
            proj.body.fixedRotation = true;

            //proj.body.setCollisionGroup(global.projGroup);
            //proj.body.collides(global.enemies , hitMob, this);
            //proj.body.setMaterial(global.material);

        }, this)

        this.projs.item = this;

    }

    attack() {

        if (game.time.now > this.nextFire && this.projs.countDead() > 0) {
            this.nextFire = game.time.now + this.fireRate;
    
            var proj = this.projs.getFirstDead();

            proj.reset(this.parent.x + this.x * this.parent.scale.x, this.parent.y + this.y * this.parent.scale.y);

            let speed = 50000;
            var angle = game.math.angleBetween(this.parent.x + this.x * this.parent.scale.x, this.parent.y + this.y * this.parent.scale.y, game.input.activePointer.x, game.input.activePointer.y);

            proj.rotation = angle + Math.PI /2;
            proj.body.rotation = angle + Math.PI /2 + Math.PI;

            proj.body.force.x = Math.cos(angle) * speed;
            proj.body.force.y = Math.sin(angle) * speed;

        }

    }

}

