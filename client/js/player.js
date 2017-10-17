class Player extends Phaser.Sprite {

    constructor(x, y, key, group, ctrls) {

        super(game, x, y, key);
        this.smoothed = false;

        this.ctrls = ctrls;
        this.speed = 5;
        this.score = 0;

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
        
                super(x, y, 'warrior', group, ctrls);
        
                this.anchor.setTo(0.5, 1);
                
                this.group = group;
        
                game.physics.enable(this, Phaser.Physics.ARCADE);
                this.body.collideWorldBounds = true;
                
                this.fireRate = 200;
                this.nextFire = 0;
                this.range = 10;
        
                this.projs = game.add.group();
                this.projs.enableBody = true;
                this.projs.physicsBodyType = Phaser.Physics.P2JS;
        
                this.projs.createMultiple(50, 'warrior_attack');
                this.projs.setAll('checkWorldBounds', true);
                this.projs.setAll('outOfBoundsKill', true);
                this.projs.setAll('anchor', {x:0.5, y:0.5});
                this.projs.setAll('smoothed', false);
        
                this.projs.forEach(function(proj) {
                    
                    proj.body.clearShapes();
                    //proj.body.loadPolygon('physics', 'proj');
                    proj.body.fixedRotation = true;

                    let range = this.range;

                    proj.hp = range;

                    proj.update = function () {

                        if(this.alive && this.hp > 0) {
                        
                            this.hp --;

                        } else if(this.alive) {

                            this.hp = range;
                            this.kill();

                        }

                    }
        
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
        
                    proj.reset(this.x + this.width/2, this.y - this.height/2);
        
                    let speed = 50000;
        
                    proj.rotation = game.physics.arcade.angleToPointer(proj);
                    //proj.body.rotation = game.physics.arcade.angleToPointer(proj) + Math.PI /2 + Math.PI;
        
                    proj.body.force.x = Math.cos(game.physics.arcade.angleToPointer(proj)) * speed;
                    proj.body.force.y = Math.sin(game.physics.arcade.angleToPointer(proj)) * speed;
        
                }
        
            }
    
    }
class Ranger extends Player {
    
        constructor(x, y, group, ctrls) {
    
            super(x, y, 'ranger', group, ctrls);
    
            this.anchor.setTo(0.5, 1);
            
            this.group = group;
    
            game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.collideWorldBounds = true;
            
            this.fireRate = 200;
            this.nextFire = 0;
    
            this.projs = game.add.group();
            this.projs.enableBody = true;
            this.projs.physicsBodyType = Phaser.Physics.P2JS;
    
            this.projs.createMultiple(50, 'ranger_attack');
            this.projs.setAll('checkWorldBounds', true);
            this.projs.setAll('outOfBoundsKill', true);
            this.projs.setAll('anchor', {x:0.5, y:0.5});
            this.projs.setAll('scale', {x:2, y:2});
            this.projs.setAll('smoothed', false);
    
            this.projs.forEach(function(proj) {
                
                proj.body.clearShapes();
                //proj.body.loadPolygon('physics', 'proj');
                proj.body.fixedRotation = true;
    
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
    
                proj.reset(this.x + this.width/2, this.y - this.height/2);
    
                let speed = 50000;
    
                proj.rotation = game.physics.arcade.angleToPointer(proj);
                //proj.body.rotation = game.physics.arcade.angleToPointer(proj) + Math.PI /2 + Math.PI;
    
                proj.body.force.x = Math.cos(game.physics.arcade.angleToPointer(proj)) * speed;
                proj.body.force.y = Math.sin(game.physics.arcade.angleToPointer(proj)) * speed;
    
            }
    
        }
    
    }

class Mage extends Player {

    constructor(x, y, group, ctrls) {

        super(x, y, 'mage', group, ctrls);

        this.anchor.setTo(0.5, 1);

        this.group = group;

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        
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
        this.projs.setAll('smoothed', false);

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

}

