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
    
    }

}


class Mage extends Player {

    constructor(x, y, group, ctrls) {

        super(x, y, 'mage', group, ctrls);

        this.anchor.setTo(0.5, 1);
        
        

    }

}
