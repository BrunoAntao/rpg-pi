class Map {

    constructor(width, height, group, entities) {

        this.entities = entities;
        game.world.resize(width, height);

        this.width = width;
        this.height = height;
        this.group = group;
        this.biome = game.add.group();

        this.forestBiomeBorders = { x1: 0, y1: 0, x2: width/4, y2: height};
        this.fireBiomeBorders = {x1: width*3/4, y1: 0, x2: width/4, y2: height};
        this.iceBiomeBorders = {x1: width/4, y1: height/2, x2: width/2, y2: height/2};
        this.desertBiomeBorders = {x1: width/4, y1: 0, x2: width/2, y2: height/2};

        //new Entity(200, 200, 'tree1', this.group);
        //new Entity(300, 300, 'cactus1', this.group);
        //new Entity(400, 400, 'cactus2', this.group);

        let forestBiome = game.add.graphics(0, 0);
        forestBiome.beginFill(0x00ff00);
        forestBiome.lineStyle(2, 0xffffff, 1);
        forestBiome.drawRect(0, 0, width/4, height);
        forestBiome.endFill();

        let fireBiome = game.add.graphics(0, 0);
        fireBiome.beginFill(0xff0000);
        fireBiome.lineStyle(2, 0xffffff, 1);
        fireBiome.drawRect(width* 3/4, 0, width/4, height);
        fireBiome.endFill();

        let iceBiome = game.add.graphics(0, 0);
        iceBiome.beginFill(0xffff00);
        iceBiome.lineStyle(2, 0xffffff, 1);
        iceBiome.drawRect(width/4, height/2, width/2, height/2);
        iceBiome.endFill();

        let desertBiome = game.add.graphics(0, 0);
        desertBiome.beginFill(0x0000ff);
        desertBiome.lineStyle(2, 0xffffff, 1);
        desertBiome.drawRect(width/4, 0, width/2, height/2);
        desertBiome.endFill();

        this.biome.add(forestBiome);
        this.biome.add(fireBiome);
        this.biome.add(iceBiome);
        this.biome.add(desertBiome);

    }

    load() {

        map.forEach(function(entity) {

            new Entity(entity.x, entity.y, this.group);

        })

    }

}