class Slime extends Phaser.Sprite {

    constructor(x, y, point) {

        super(game, x, y, 'slime');

        this.scale.setTo(0.5, 0.5);
        this.setScaleMinMax(0.4, 0.4, 1, 1);
        this.anchor.setTo(0.5, 1);

        game.physics.enable(this, Phaser.Physics.P2JS);
        this.body.setCollisionGroup(global.enemiesGroup);
        this.body.collides([global.projGroup, global.playerGroup]);
        this.body.fixedRotation = true;
        this.body.static = true;

        this.point = point;
        this.tint = this.point.biome.color;

        this.target = false;
        this.isTarget = false;
        this.isIdle = false;
        this.targetedBy = game.add.group();

        this.health = 1;
        this.growth = 1;
        this.growthMax = 6;

        game.add.existing(this);
    }

    idle() {
        
        let x = Math.random() * this.point.range * 2 - this.point.range;
        let r = Math.random() * this.point.range;
        let y = (Math.random() * 2 - 1) * (Math.sqrt(Math.abs(Math.pow(x, 2) - Math.pow(r, 2))));

        let dist = game.math.distance(this.x, this.y, this.point.x + x, this.point.y + y);

        this.idlemv = game.add.tween(this.body).to( { x:this.point.x + x, y:this.point.y + y }, dist * 100 , "Linear", true);
        this.idlemv.onComplete.add(function() {

            this.idle();

        }, this);

    }

    damage(damage) {

        this.growth -= damage;
        if(this.growth < 1) {

            this.kill();

        }

    }

    update() {

        if(!this.alive) {

            this.destroy();

        }

        if(this.growth > this.growthMax) {

            this.growth = this.growthMax;

        }

        this.scale.setTo(0.4 + this.growth * 0.1, 0.4 + this.growth * 0.1);

        if(this.target) {

                let dist = game.math.distance(this.x, this.y, this.target.x, this.target.y);
        
                let move = game.add.tween(this.body).to( { x:this.target.x, y:this.target.y }, dist * (1/100) * 1000, "Linear", true);
                move.onComplete.add(function() {

                    this.target.growth += this.growth;
                    this.target.health = this.target.growth;
                    this.destroy();

                }, this);
                
        }

        if(this.isTarget) {

            if(this.targetedBy.length == 0 && this.growth < this.growthMax) {

                this.isTarget = false;

            }

        }

        if(this.growth == this.growthMax && !this.isIdle) {
            
            this.isIdle = true;
            this.idle();
            
        }

    }

}