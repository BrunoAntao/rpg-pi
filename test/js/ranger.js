module.exports = function(x, y, group, ctrls){
    
        this.group = group;
        this.flag = true;
        this.sflag = true;
    
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
    
            
    this.hitMob = function(a, b) {
    
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
    
    this.skillHitMob = function(a, b) {
            
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
    
    this.skill = function() {
    
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