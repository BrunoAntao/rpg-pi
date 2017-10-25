class Bar extends Phaser.Sprite {

    constructor(side, target, stat) {

        var graphics = game.add.graphics(100, 100);
        graphics.beginFill(0x000000, 1);
        graphics.lineStyle(2, 0xffffff, 1);
        graphics.drawRect(0, 0, game.width/5, game.height/15);
        graphics.endFill();

        if(side) {

            super(game, game.width/10 - game.width/20, game.height - game.height/15 - game.height/20, graphics.generateTexture());

        } else {

            super(game, game.width - game.width/5 - game.width/10 + game.width/20, game.height - game.height/15 - game.height/20, graphics.generateTexture());
        
        }

        graphics.destroy();

        this.graphics = graphics;
        this.target = target;
        this.stat = stat;

        this.fixedToCamera = true;
        
        game.add.existing(this);
    }

    update() {

        game.world.bringToTop(this);

        this.graphics = game.add.graphics(100, 100);
        this.graphics.beginFill(0x000000, 1);
        this.graphics.lineStyle(2, 0xffffff, 1);
        this.graphics.drawRect(0, 0, game.width/5, game.height/15);
        this.graphics.endFill();
        this.graphics.beginFill(0x33cc33, 1);
        this.graphics.drawRect(0, 0, this.target[this.stat] / this.target['max' + this.stat] * game.width/5, game.height/15);
        this.graphics.endFill();

        this.setTexture(this.graphics.generateTexture());

        this.graphics.destroy();

    }

}