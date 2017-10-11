class Entity extends Phaser.Sprite{

    constructor(x, y, key, group) {

        super(game, x, y, key)

        this.scale.setTo(2,2);
        this.anchor.setTo(0.5, 1);
        this.smoothed = false;

        game.add.existing(this);
        group.add(this);
    }


}