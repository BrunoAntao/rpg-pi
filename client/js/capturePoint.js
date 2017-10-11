class CapturePoint extends Phaser.Sprite{

    constructor(x, y, key, group){

        super(game, x, y, key);

        game.add.existing(this);
        group.add(this);

    }


}