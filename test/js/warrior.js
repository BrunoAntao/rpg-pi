module.exports = function(x, y, group, crls){
    
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
    
            let range = this.range;
    
            proj.hp = range;
    
            proj.update = function () {
    
                if (this.alive && this.hp > 0) {
    
                    this.hp--;
    
                } else if (this.alive) {
    
                    this.hp = range;
                    this.kill();
    
                }
    
                }
    
            proj.body.setCollisionGroup(global.projGroup);
            proj.body.collides(global.enemiesGroup, this.hitMob, this);
    
        }, this)
    
        this.group.add(this.projs);
    
        game.camera.follow(this);
    
        }
    
    this.hitMob = function(a, b) {
    
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
    
    this.attack = function() {
    
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
    
    this.skill= function() {
    
        if (this.resource >= this.skillCost) {
    
            this.resource -= this.skillCost;
            this.ignoreActive = true;
            this.skillTimer = 100;
    
        }
    
    }
    
    this.update= function() {
    
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