class Map {

    constructor(width, height, group, entities) {

        this.entities = entities;
        game.world.resize(width, height);

        this.numOfSrites = 10;

        this.width = width;
        this.height = height;
        this.group = group;
        this.biome = game.add.group();

        this.forestBiomeBorders = { x1: 0, y1: 0, x2: width/4, y2: height};
        this.fireBiomeBorders = {x1: width*3/4, y1: 0, x2: width, y2: height};
        this.iceBiomeBorders = {x1: width/4, y1: 0, x2: width*3/4, y2: height/2};
        this.desertBiomeBorders = {x1: width/4, y1: height/2, x2: width*3/4, y2: height};

        this.borders = [
            
          {biome: this.forestBiomeBorders, sprites: ['tree1', 'tree2', 'tree3']},
          {biome: this.fireBiomeBorders, sprites: ['tree1', 'tree2', 'tree3'] },
          {biome: this.desertBiomeBorders, sprites: ['cactus1', 'cactus2', 'cactus2']},
          {biome: this.iceBiomeBorders, sprites: ['cactus1', 'cactus2', 'cactus2']}
        
        ];

        this.entitiesToLoad = [];
        
        this.borders.forEach( function(biome) {

            for(var i = 0; i < this.numOfSrites; i++){

                this.entitiesToLoad.push(this.generateSprite(biome));

            }

        }, this);

        this.entitiesToLoad.forEach( function(entity) {

            new Entity(entity.x, entity.y, entity.key, this.group);

        }, this)

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

    generateSprite(border){
        
        let minX = Math.min(border.biome.x1, border.biome.x2) + 64;
        let maxX = Math.max(border.biome.x1, border.biome.x2) - 64;

        let minY = Math.min(border.biome.y1, border.biome.y2) + 64;
        let maxY = Math.max(border.biome.y1, border.biome.y2) - 64;

        let x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        let y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

        let spriteNum = Math.floor(Math.random() * 3);

        return {x: x, y: y, key: border.sprites[spriteNum]};
        
    }

}