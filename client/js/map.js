class Map {

    constructor(width, height, group, entities) {

        this.entities = entities;
        game.world.resize(width, height);

        this.width = width;
        this.height = height;
        this.group = group;

        new Entity(200, 200, 'tree1', this.group);

        let b1 = game.add.graphics(0, 0);
        b1.beginFill(0x00ff00);
        b1.lineStyle(2, 0xffffff, 1);
        b1.drawRect(0, 0, width/4, height);
        b1.endFill();

        let b2 = game.add.graphics(0, 0);
        b2.beginFill(0xff0000);
        b2.lineStyle(2, 0xffffff, 1);
        b2.drawRect(width* 3/4, 0, width/4, height);
        b2.endFill();

        let b3 = game.add.graphics(0, 0);
        b3.beginFill(0x000000);
        b3.lineStyle(2, 0xffffff, 1);
        b3.drawRect(width/4, height/2, width/2, height/2);
        b3.endFill();

        let b4 = game.add.graphics(0, 0);
        b4.beginFill(0x0000ff);
        b4.lineStyle(2, 0xffffff, 1);
        b4.drawRect(width/4, 0, width/2, height/2);
        b4.endFill();

    }

    load() {

        map.forEach(function(entity) {

            new Entity(entity.x, entity.y, this.group);

        })

    }

}