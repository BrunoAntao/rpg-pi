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
        this.side = side;
        this.minwidth = 800/5;
        this.minheight = 600/15;

        this.fixedToCamera = true;
        
        game.add.existing(this);
    }

    update() {

        game.world.bringToTop(this);

        if(this.side) {

            this.cameraOffset.x = game.width/10 - game.width/20;

        } else {

            this.cameraOffset.x = game.width - game.width/5 - game.width/10 + game.width/20;

        }

        this.cameraOffset.y = game.height - game.height/15 - game.height/20;

        if(game.width/5 > this.minwidth && game.height/15 > this.minheight) {

            this.graphics = game.add.graphics(100, 100);
            this.graphics.beginFill(0x000000, 1);
            this.graphics.lineStyle(2, 0xffffff, 1);
            this.graphics.drawRect(0, 0, game.width/5, game.height/15);
            this.graphics.endFill();
            this.graphics.beginFill(0x33cc33, 1);
            this.graphics.drawRect(0, 0, this.target[this.stat] / this.target['max' + this.stat] * game.width/5, game.height/15);
            this.graphics.endFill();

        } else {

            this.graphics = game.add.graphics(100, 100);
            this.graphics.beginFill(0x000000, 1);
            this.graphics.lineStyle(2, 0xffffff, 1);
            this.graphics.drawRect(0, 0, this.minwidth, this.minheight);
            this.graphics.endFill();
            this.graphics.beginFill(0x33cc33, 1);
            this.graphics.drawRect(0, 0, this.target[this.stat] / this.target['max' + this.stat] * this.minwidth, this.minheight);
            this.graphics.endFill();

        }

        this.setTexture(this.graphics.generateTexture());

        this.graphics.destroy();

    }

}

class Label extends Phaser.Sprite {
    
        constructor(text, target, stat) {
    
            var graphics = game.add.graphics(100, 100);
            graphics.beginFill(0x000000, 1);
            graphics.lineStyle(2, 0xffffff, 1);
            graphics.drawRect(0, 0, game.width/5, game.height/15);
            graphics.endFill();
    
            super(game, game.width/2 - game.width/5/2, game.height - game.height/15 - game.height/20, graphics.generateTexture());
    
            graphics.destroy();

            var style = { font: "bold 18px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
            this.label = game.add.text(0, 0, text, style);
            this.label.x = game.width/5/10;
            this.label.y = game.height/15/4;
            this.label.smoothed = false;
            this.addChild(this.label);
    
            this.graphics = graphics;
            this.text = text;
            this.target = target;
            this.stat = stat;
            this.minwidth = 800/5;
            this.minheight = 600/15;
    
            this.fixedToCamera = true;
            
            game.add.existing(this);
        }
    
        update() {
    
            game.world.bringToTop(this);

            this.label.text = this.text + this.target[this.stat];
                
            this.cameraOffset.x = game.width/2 - game.width/5/2;
    
            this.cameraOffset.y = game.height - game.height/15 - game.height/20;

            this.label.x = game.width/5/10;
            this.label.y = game.height/15/2 - this.label.height/2;

            if(game.width/5 > this.minwidth && game.height/15 > this.minheight) {

                this.graphics = game.add.graphics(100, 100);
                this.graphics.beginFill(0x000000, 1);
                this.graphics.lineStyle(2, 0xffffff, 1);
                this.graphics.drawRect(0, 0, game.width/5, game.height/15);
                this.graphics.endFill();

            } else {

                this.graphics = game.add.graphics(100, 100);
                this.graphics.beginFill(0x000000, 1);
                this.graphics.lineStyle(2, 0xffffff, 1);
                this.graphics.drawRect(0, 0, this.minwidth, this.minheight);
                this.graphics.endFill();          

            }

            this.setTexture(this.graphics.generateTexture());

            this.graphics.destroy();
    
        }
    
    }