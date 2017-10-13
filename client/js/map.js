class Map {

    constructor(width, height, eGroup) {

        game.world.resize(width, height);

        this.numOfSrites = 10;

        this.width = width;
        this.height = height;
        this.bg = game.add.group();
        this.eGroup = eGroup;
        this.biomes = [];

        this.forestBiomeBorders = { x1: 0, y1: 0, x2: width/4, y2: height};
        this.fireBiomeBorders = {x1: width*3/4, y1: 0, x2: width, y2: height};
        this.iceBiomeBorders = {x1: width/4, y1: 0, x2: width*3/4, y2: height/2};
        this.desertBiomeBorders = {x1: width/4, y1: height/2, x2: width*3/4, y2: height};
       
        let forestBg = game.add.graphics(0, 0);
        forestBg.beginFill(0x00ff00);
        forestBg.lineStyle(2, 0xffffff, 1);
        forestBg.drawRect(0, 0, width/4, height);
        forestBg.endFill();

        let fireBg = game.add.graphics(0, 0);
        fireBg.beginFill(0xff0000);
        fireBg.lineStyle(2, 0xffffff, 1);
        fireBg.drawRect(width* 3/4, 0, width/4, height);
        fireBg.endFill();

        let iceBg = game.add.graphics(0, 0);
        iceBg.beginFill(0xffff00);
        iceBg.lineStyle(2, 0xffffff, 1);
        iceBg.drawRect(width/4, height/2, width/2, height/2);
        iceBg.endFill();

        let desertBg = game.add.graphics(0, 0);
        desertBg.beginFill(0x0000ff);
        desertBg.lineStyle(2, 0xffffff, 1);
        desertBg.drawRect(width/4, 0, width/2, height/2);
        desertBg.endFill();

        let forestBiome = {bg:forestBg, border:this.forestBiomeBorders, sprites: ['tree1', 'tree2', 'tree3']};
        let fireBiome = {bg:fireBg, border:this.fireBiomeBorders, sprites: ['tree1', 'tree2', 'tree3']};
        let desertBiome =  {bg:desertBg, border:this.desertBiomeBorders, sprites: ['cactus1', 'cactus2', 'cactus2']};
        let iceBiome = {bg:iceBg, border:this.iceBiomeBorders, sprites: ['cactus1', 'cactus2', 'cactus2']};

        this.biomes.push(forestBiome);
        this.biomes.push(fireBiome);
        this.biomes.push(iceBiome);
        this.biomes.push(desertBiome);

        this.bg.add(forestBiome.bg);
        this.bg.add(fireBiome.bg);
        this.bg.add(iceBiome.bg);
        this.bg.add(desertBiome.bg);

        this.entities = [];
        this.capPoints = [];
        
        this.biomes.forEach( function(biome) {

            for(var i = 0; i < this.numOfSrites; i++){

                this.entities.push(this.generateSprite(biome));
                //this.capPoints.push(this.generateCapPoint(biome));

            }

        }, this);

    }

    generateSprite(biome){
        
        let minX = Math.min(biome.border.x1, biome.border.x2) + 64;
        let maxX = Math.max(biome.border.x1, biome.border.x2) - 64;

        let minY = Math.min(biome.border.y1, biome.border.y2) + 64;
        let maxY = Math.max(biome.border.y1, biome.border.y2) - 64;

        let x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        let y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

        let spriteNum = Math.floor(Math.random() * 3);

        new Entity(x, y, biome.sprites[spriteNum], this.eGroup);
        
    }

    generateCapPoint(biome){

        //this.biome
        
        this.entities.forEach(function (entities) {



        })

        new CapturePoint(x, y, this.group);
        
    }

}