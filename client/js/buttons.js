class Menu extends Array{

    constructor(x, y, options) {

        super();

        options.forEach(function (option, id) {

            let b = new Button(x, y + 54 * id, id, option.name, option.down);
            this.push(b);

        },this)

    }

}

class Button extends Phaser.Sprite{

    constructor(x, y, id, name, down) {

        super(game, x, y, 'button');
        this.width = 200;
        this.height = 50;
        this.smoothed = false;

        this.anchor.setTo(0.5, 0.5);

        this.id = id;
        this.name = name;
        this.over = false;

        var style = { font: "bold 18px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.label = game.add.text(0 - this.anchor.x * this.width, 0 - this.anchor.y * this.height, this.name, style);
        this.label.setTextBounds(0, 0, 200, 54);
        this.label.smoothed = false;

        this.addChild(this.label);

        this.inputEnabled = true;

        if(typeof down != 'undefined') {

            this.events.onInputDown.add(down, this);

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

        game.add.existing(this);
    }

    update() {

        game.world.bringToTop(this.label);

        this.x = game.width/2;
        this.y = game.height/2 + this.id * 54;

    }

}