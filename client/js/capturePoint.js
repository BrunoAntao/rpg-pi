class CapturePoint extends Phaser.Sprite{

    constructor(x, y, group){

        let placeHolder = game.add.graphics(0, 0);
        placeHolder.beginFill(0xff0000);
        placeHolder.lineStyle(2, 0xffffff, 1);
        placeHolder.drawRect(0, 0, 128, 128);
        placeHolder.endFill();

        super(game, x, y, placeHolder.generateTexture());

        game.add.existing(this);
        group.add(this);

    }


}