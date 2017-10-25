class CapturePoint extends Phaser.Sprite{

    constructor(x, y, key, group){

        super(game, x, y, key);

        this.anchor.setTo(0.5, 0.5);

        this.range = 150;
        this.prog = 0;
        this.captured = false;

        this.bg = game.add.graphics(0, 0);
        this.loader = game.add.graphics(0, 0);

        this.bg.lineStyle(2, 0x000000, 1);
        this.bg.drawCircle(this.x, this.y, this.range * 2);

        game.add.existing(this);
        group.add(this);
    }

    update() {

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