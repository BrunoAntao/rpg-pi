class Player extends Phaser.Sprite {

    constructor(x, y, group, ctrls) {

        let g = game.add.graphics(0, 0);
        g.beginFill(0x000000);
        g.lineStyle(2, 0xffffff, 1);
        g.drawRect(0, 0, 64, 64);
        g.endFill();

        super(game, x, y, g.generateTexture());

        this.anchor.setTo(0.5, 0.5);

        g.destroy();

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
    
    }

}


