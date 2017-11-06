class CapturePoint extends Phaser.Sprite{

    constructor(x, y, key, biome, group){

        super(game, x, y, key);

        this.anchor.setTo(0.5, 0.5);

        this.range = 150;
        this.prog = 0;
        this.captured = false;
        this.group = group;
        this.biome = biome;

        this.spawnCount = 0;

        this.bg = game.add.graphics(0, 0);
        this.loader = game.add.graphics(0, 0);

        this.bg.lineStyle(2, 0x000000, 1);
        this.bg.drawCircle(this.x, this.y, this.range * 2);

        this.timer = game.time.events.loop(500, this.spawn, this);
        this.spawned = game.add.group();

        console.log(this.biome)

        game.add.existing(this);
        group.add(this.spawned);
    }

    spawn() {

        if(this.spawnCount < 14) {

            this.spawned.add(new Slime(this.x + Math.random() * this.range - this.range/2, this.y + Math.random() * this.range - this.range/2, this));
            this.spawnCount++;

        }

    }

    update() {

        if(this.spawned.length > 1) {

            var notarget = [];

            this.spawned.forEach(function (slime) {

                if(!slime.target && !slime.isTarget){

                    notarget.push(slime);

                }

            })

            if(notarget.length > 1) {

                var tn = Math.floor(Math.random() * notarget.length);

                var target = notarget[tn];
                target.isTarget = true;
                notarget.splice(tn, 1);

                notarget.forEach(function (slime) {
                    
                    if(slime.alive) {

                        slime.target = target;
                        target.targetedBy.add(slime);

                    }
    
                })

            }

        }

        if(game.math.distance(this.x, this.y, global.player.x, global.player.y) < this.range) {

            if(this.prog < this.range) {

                this.loader.clear();

                this.prog++;
                
                this.loader.beginFill(0x000000, 0.5);
                this.loader.drawCircle(this.x, this.y, this.prog * 2);
                this.loader.endFill();

            } else {

                global.player.score ++;
                this.captured = true;

            }

        } else {

            this.loader.clear();
            this.prog = 0;
            this.captured = false;

        }

    }


}