class CapturePoint extends Phaser.Sprite{

    constructor(x, y, key,group){

        super(game, x, y, key);

        this.anchor.setTo(0.5, 0.5);

        this.range = 100;

        let bg = game.add.graphics(0, 0);

        switch (this.key) {

            case 'capPoint1': 
                
                bg.beginFill(0x00ff00);
                bg.lineStyle(2, 0x000000, 1);
                bg.drawCircle(this.x, this.y, this.range * 2);
                bg.endFill();
            
            break;

            case 'capPoint2': 
            
                bg.beginFill(0xff0000);
                bg.lineStyle(2, 0x000000, 1);
                bg.drawCircle(this.x, this.y, this.range * 2);
                bg.endFill();
                
            break;

            case 'capPoint3': 
            
                bg.beginFill(0xffffff);
                bg.lineStyle(2, 0x000000, 1);
                bg.drawCircle(this.x, this.y, this.range * 2);
                bg.endFill();
                
            break;

            case 'capPoint4': 
            
                bg.beginFill(0xffff00);
                bg.lineStyle(2, 0x000000, 1);
                bg.drawCircle(this.x, this.y, this.range * 2);
                bg.endFill();
                
            break;

        }

        game.add.existing(this);
        group.add(this);
    }

    update() {

        if(game.math.distance(this.x, this.y, global.player.x, global.player.y) < this.range) {

            console.log('capping');

        }

    }


}