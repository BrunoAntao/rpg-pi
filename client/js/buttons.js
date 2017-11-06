class Menu extends Array{

    constructor(x, y, options, vertical) {

        super();

        if(typeof vertical == 'undefined') {

            this.vertical = true;

        } else {

            this.vertical = vertical;

        }

        options.forEach(function (option, id) {

            let b = new Button(id, this, option);
            this.push(b);

        },this)

    }
}

class Button extends Phaser.Sprite{

    constructor(id, list, option) {

        super(game, 0, 0, 'button');

        if(typeof option.width == 'undefined') {
            
            this.width = 200;
                        
        } else {

            this.width = option.width;

        }

        if(typeof option.height == 'undefined') {

            this.height = 50;

        } else {

            this.height = option.height;

        }

        if(typeof option.display == 'undefined') {
            
            this.display = false;
                        
        } else {

            this.display = option.display;

        }

        this.smoothed = false;

        this.anchor.setTo(0.5, 0.5);

        this.id = id;
        this.name = option.name;
        this.list = list;
        this.over = false;

        var style = { font: "bold 18px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.label = game.add.text(0 - this.anchor.x * this.width, 0 - this.anchor.y * this.height, this.name, style);
        this.label.setTextBounds(0, 0, 200, 54);
        this.label.smoothed = false;

        this.addChild(this.label);

        this.inputEnabled = true;

        if(typeof option.down != 'undefined') {

            this.events.onInputDown.add(option.down, this);

        } else {

            this.events.onInputDown.add(function(button) {

                console.log(button.name);

            }, this)
        
        }

        this.events.onInputOver.add(function(button) {

            if(!this.over) {

                this.over = true;
                this.frame = 1;
                this.label.fontSize ='16px';
        
            }

        }, this)

        this.events.onInputOut.add(function(button) {

            if(this.over) {

                this.over = false;
                this.frame = 0;
                this.label.fontSize ='18px';
                
            }

        }, this)

        if(this.display && !this.list.vertical) {

            this.dsp = new Display(this.id, this);

        }

        game.add.existing(this);
    }

    update() {

        game.world.bringToTop(this.label);
        this.x = game.width/2 + (this.width + 10) * (this.id * (1 - this.list.vertical)) - ((this.width + 10) * ((this.list.length - 1)/ 2)) * (1 - this.list.vertical);
        this.y = game.height/2 + (this.height + 5) * (this.id * this.list.vertical) + (game.height/2) * (1 - this.list.vertical) - (this.height * ((this.list.length - 1)/ 2)) * this.list.vertical - game.height/4 * (1 - this.list.vertical);

    }

}

class Display extends Phaser.Sprite{
    
        constructor(id, button) {
    
            super(game, 0, 0, 'display');

            this.width = button.width;
            
            this.anchor.setTo(0.5, 0.5);
            this.smoothed = false;
            this.height = game.height/2;
    
            this.id = id;
            this.button = button;
            this.image = new Phaser.Sprite(game, this.x, this.y, button.display);
            this.imageG = game.add.group();
            this.imageG.add(this.image);

            this.image.anchor.setTo(0.5, 0.5);
            this.image.smoothed = false;

            game.add.existing(this);
        }
    
        update() {

            game.world.bringToTop(this.imageG);

            this.image.x = this.x;
            this.image.y = this.y;

            this.x = this.button.x;
            this.y = this.button.y - game.height/3;
            
        }
    
    }