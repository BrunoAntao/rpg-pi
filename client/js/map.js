class Map {

    constructor(width, height, eGroup, map) {

        game.world.resize(width, height);
        game.world.setBounds(0, 0, width, height);

        this.map = map;
        
        this.width = width;
        this.height = height;
        this.bg = game.add.group();
        this.eGroup = eGroup;
        this.biomes = [];

        //this.forestBiomeBorders = { x1: 0, y1: 0, x2: width/4, y2: height};
        //this.fireBiomeBorders = {x1: width*3/4, y1: 0, x2: width, y2: height};
        //this.iceBiomeBorders = {x1: width/4, y1: 0, x2: width*3/4, y2: height/2};
        //this.desertBiomeBorders = {x1: width/4, y1: height/2, x2: width*3/4, y2: height};
       
        let forestBg = game.add.graphics(0, 0);
        forestBg.beginFill(0x009900);
        forestBg.lineStyle(2, 0x009900, 1);
        forestBg.drawRect(0, 0, width/4, height);
        forestBg.endFill();

        let fireBg = game.add.graphics(0, 0);
        fireBg.beginFill(0xff0000);
        fireBg.lineStyle(2, 0xff0000, 1);
        fireBg.drawRect(width* 3/4, 0, width/4, height);
        fireBg.endFill();

        let desertBg = game.add.graphics(0, 0);
        desertBg.beginFill(0xffff00);
        desertBg.lineStyle(2, 0xffff00, 1);
        desertBg.drawRect(width/4, height/2, width/2, height/2);
        desertBg.endFill();

        let iceBg = game.add.graphics(0, 0);
        iceBg.beginFill(0xffffff);
        iceBg.lineStyle(2, 0xffffff, 1);
        iceBg.drawRect(width/4, 0, width/2, height/2);
        iceBg.endFill();

        let forestBiome = {bg: forestBg, color:0x009900, border:this.forestBiomeBorders, sprites: ['tree1', 'tree2', 'tree3'], capPoint: 'capPoint1'};
        let fireBiome = {bg: fireBg, color:0xff0000, border:this.fireBiomeBorders, sprites: ['magma1', 'volcano'], capPoint: 'capPoint2'};
        let desertBiome =  {bg: desertBg, color:0xffff00, border:this.desertBiomeBorders, sprites: ['cactus1', 'cactus2', 'palm'], capPoint: 'capPoint4'};
        let iceBiome = {bg: iceBg, color:0xffffff, border:this.iceBiomeBorders, sprites: ['frozen1', 'snowMan'], capPoint: 'capPoint3'};

        this.biomes.push(forestBiome);
        this.biomes.push(fireBiome);
        this.biomes.push(iceBiome);
        this.biomes.push(desertBiome);

        /*this.bg.add(forestBiome.bg);
        this.bg.add(fireBiome.bg);
        this.bg.add(iceBiome.bg);
        this.bg.add(desertBiome.bg);*/

        this.entities = map.entities;
        this.capPoints = map.capPoints;
            
        this.loadSprite(this.entities);

        this.loadCapPoints(this.capPoints);
    
}

    loadSprite(entities){

        for(let i = 0; i < entities.length; i++){

            switch(entities[i].group) {
                
                case 'eGroup':
                    new Entity(entities[i].x, entities[i].y, entities[i].sprite, this.eGroup);
                    break;
                default:
                    new Entity(entities[i].x, entities[i].y, entities[i].sprite);
                    break;
                
            }
        }
        
    }

    loadCapPoints(capPoint){

        //console.log(this.capPoints);

        for(let i = 0; i < capPoint.length; i++){

            console.log(capPoint[i].biome)

            new CapturePoint(capPoint[i].x, capPoint[i].x, capPoint[i].sprite, capPoint[i].biome, this.eGroup);

        }
        //return new CapturePoint(x, y, biome.capPoint, biome, this.eGroup);
        
    }


}
 
