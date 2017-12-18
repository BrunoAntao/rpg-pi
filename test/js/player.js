module.exports = function(x, y, key, group, ctrls){

    this.smoothed = false;

    if (typeof ctrls != 'undefined') {

        this.ctrls = ctrls;

    }

        this.speed = 5;
        this.score = 0;

        this.maxhealth = 10;
        this.health = 10;

        this.maxresource = 10;
        this.resource = 10;

        var style = { font: "bold 18px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };


    this.kill = function() {

        if(typeof this.compass != 'undefined') {

            this.compass.forEach(function (pointer) {

                pointer.destroy();

            })
        }
    };

    this.update = function() {

        if (typeof this.ctrls != 'undefined' && this.alive) {

            if (this.ctrls.up.isDown) {

                this.y -= this.speed;

            }

            if (this.ctrls.down.isDown) {

                this.y += this.speed;

            }

            if (this.ctrls.left.isDown) {

                this.x -= this.speed;

            }

            if (this.ctrls.right.isDown) {

                this.x += this.speed;

            }

            if (this.ctrls.attack.isDown) {

                this.attack();

            }

            if (this.ctrls.skill.isDown) {

                this.skill();

            }

        }

    }
}
