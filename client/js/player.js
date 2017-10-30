class Player extends Phaser.Sprite {

    constructor(x, y, key, group, ctrls) {

        super(game, x, y, key);
        this.smoothed = false;

        if(typeof ctrls != 'undefined') {

            this.ctrls = ctrls;

        }

        this.speed = 5;
        this.score = 0;
        this.maxhealth = 10;
        this.health = 10;

        var style = { font: "bold 18px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.label = game.add.text(0, 0, '', style);
        this.label.setTextBounds(0, 0, 200, 54);
        this.label.smoothed = false;
        this.label.visible = false;

        this.addChild(this.label);

        game.add.existing(this);
        
        if(typeof group != 'undefined') {

            group.add(this);

        }
    }

    update() {

        if(typeof this.ctrls != 'undefined') {

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

}

class Enemy extends Player {

    constructor(x, y, key) {

        super(x, y, key);
        this.anchor.setTo(0.5, 1);

        game.physics.enable(this, Phaser.Physics.P2JS);
        this.body.clearShapes();
        this.body.loadPolygon(key, key);
        this.body.setCollisionGroup(global.enemiesGroup);
        this.body.collides(global.projGroup);
        this.body.fixedRotation = true;
        this.body.static = true;
        this.body.angle = 180;
        

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
                    proj.body.loadPolygon('sword', 'sword');

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
        
                    proj.body.setCollisionGroup(global.projGroup);
                    proj.body.collides(global.enemiesGroup , this.hitMob, this);
        
                }, this)
        
                this.group.add(this.projs);

                game.camera.follow(this);
                
            }

            hitMob(a, b) {
                
                if(this.flag) {
                    
                    this.flag = false;
    
                    game.time.events.add(10, function() {
    
                        this.flag = true;
    
                    }, this);
    
                    a.sprite.kill();
                    if(b.sprite != null && b.sprite.alive) {
    
                        b.sprite.damage(1);
    
                    }
    
                }
    
            }
    
            attack() {
                
                if (game.time.now > this.nextFire && this.projs.countDead() > 0) {
                    this.nextFire = game.time.now + this.fireRate;
            
                    var proj = this.projs.getFirstDead();
        
                    proj.reset(this.x + this.width/2, this.y - this.height/2);
        
                    let speed = 50000;
        
                    proj.rotation = game.physics.arcade.angleToPointer(proj);
                    proj.body.rotation = game.physics.arcade.angleToPointer(proj);
        
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
            this.flag = true;
    
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
                proj.body.loadPolygon('arrow', 'arrow');
                proj.body.setCollisionGroup(global.projGroup);
                proj.body.collides(global.enemiesGroup , this.hitMob, this);
                proj.body.setMaterial(global.material);
    
            }, this)
    
            this.group.add(this.projs);

            game.camera.follow(this);
            
        }

        hitMob(a, b) {
            
            if(this.flag) {
                
                this.flag = false;

                game.time.events.add(10, function() {

                    this.flag = true;

                }, this);

                a.sprite.kill();
                if(b.sprite != null && b.sprite.alive) {

                    b.sprite.damage(1);

                }

            }

        }

        attack() {
            
            if (game.time.now > this.nextFire && this.projs.countDead() > 0) {
                this.nextFire = game.time.now + this.fireRate;
        
                var proj = this.projs.getFirstDead();
    
                proj.reset(this.x + this.width/2, this.y - this.height/2);
    
                let speed = 50000;
    
                proj.rotation = game.physics.arcade.angleToPointer(proj);
                proj.body.rotation = game.physics.arcade.angleToPointer(proj);
    
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
        this.flag = true;

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
            proj.body.loadPolygon('magic', 'magic');

            let anim = proj.animations.add('attack', [0, 1, 2, 3], 10, true);
            anim.play();

            proj.body.setCollisionGroup(global.projGroup);
            proj.body.collides(global.enemiesGroup , this.hitMob, this);

        }, this)

        this.group.add(this.projs);

        game.camera.follow(this);

    }

    hitMob(a, b) {
        
        if(this.flag) {
            
            this.flag = false;

            game.time.events.add(10, function() {

                this.flag = true;

            }, this);

            a.sprite.kill();
            if(b.sprite != null && b.sprite.alive) {

                b.sprite.damage(1);

            }

        }

    }

    attack() {

        if (game.time.now > this.nextFire && this.projs.countDead() > 0) {
            this.nextFire = game.time.now + this.fireRate;
    
            var proj = this.projs.getFirstDead();

            proj.reset(this.x + this.width/2, this.y - this.height + (this.height / (this.height/16)));

            let speed = 50000;

            proj.rotation = game.physics.arcade.angleToPointer(proj);
            proj.body.rotation = game.physics.arcade.angleToPointer(proj);

            proj.body.force.x = Math.cos(game.physics.arcade.angleToPointer(proj)) * speed;
            proj.body.force.y = Math.sin(game.physics.arcade.angleToPointer(proj)) * speed;

        }

    }

}



