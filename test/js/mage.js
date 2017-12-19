module.exports = function(x, y, group, ctrls){
    this.group = group;
    this.flag = true;

    this.fireRate = 200;
    this.nextFire = 0;
    this.atkdamage = 3;

    this.health = 8;
    this.maxhealth = 8;

    this.resColor = 0x3333cc;
    this.score = 0;

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

        proj.reset(this.x + this.width / 2, this.y - this.height + (this.height / (this.height / 16)));

        let speed = 50000;

        proj.rotation = game.physics.arcade.angleToPointer(proj);
        proj.body.rotation = game.physics.arcade.angleToPointer(proj);

        proj.body.force.x = Math.cos(game.physics.arcade.angleToPointer(proj)) * speed;
        proj.body.force.y = Math.sin(game.physics.arcade.angleToPointer(proj)) * speed;

    }

}

this.skill = function() {

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
