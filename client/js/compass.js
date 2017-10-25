class Compass extends Array {
    
    constructor(map, target) {

        super();

        map.capPoints.forEach(function (point) {

            this.push(new Pointer(target, point));

        }, this)

    }
    
}

class Pointer extends Phaser.Sprite {

    constructor(source, target) {
        
        super(game, 0, 0, 'arrow');

        this.anchor.setTo(0, 0.5);
        this.scale.setTo(2, 2);

        this.source = source;
        this.target = target;
        this.visible = true;
        
        game.add.existing(this);
    }

    update() {

        game.world.bringToTop(this);

        if(!this.target.inCamera && this.target.captured) {

            this.tint = 0xff0000;

        }

        if(this.target.inCamera) {

            this.visible = false;

        } else {

            this.visible = true;

        }

        this.x = this.source.x;
        this.y = this.source.y - this.source.width/2;
        
        this.angle = 180/Math.PI *  game.math.angleBetween(this.x, this.y, this.target.x, this.target.y);
    }

}