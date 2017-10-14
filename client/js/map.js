class Map {

    constructor(width, height, eGroup) {

        game.world.resize(width, height);

        this.numOfSrites = Math.floor(height*2/250);
        this.maxDistance = 250;

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
        let fireBiome = {bg:fireBg, border:this.fireBiomeBorders, sprites: ['magma1', 'volcano', 'tree3']};
        let desertBiome =  {bg:desertBg, border:this.desertBiomeBorders, sprites: ['cactus1', 'cactus2', 'palm']};
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

            var prevCoords = [];

            for(var i = 0; i < this.numOfSrites; i++){

                var returnedValues = this.generateSprite(biome, prevCoords);

                this.entities.push(returnedValues.entity);
                prevCoords.push(returnedValues.prevCoords);

                //this.capPoints.push(this.generateCapPoint(biome));
                
            }


        }, this);

        

    }

    generateSprite(biome, prevCoords){

        var x;
        var y;

        let spriteNum = Math.floor(Math.random() * 3);

        let spriteHeight = game.cache.getImage(biome.sprites[spriteNum]).height * 2;

        let minX = Math.min(biome.border.x1, biome.border.x2) + 64;
        let maxX = Math.max(biome.border.x1, biome.border.x2) - 64;

        let minY = Math.min(biome.border.y1, biome.border.y2) + 32 + spriteHeight;
        let maxY = Math.max(biome.border.y1, biome.border.y2) - 32;

        if(prevCoords.length >= 1){

            let newCoords = this.checkDistante(prevCoords, maxX, maxY, minX, minY);

            x = newCoords.x;
            y = newCoords.y;

        } else {

             x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
             y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
        }

        return { entity: new Entity(x, y, biome.sprites[spriteNum], this.eGroup), prevCoords: {x: x, y: y}};

        //new Entity(x, y, biome.sprites[spriteNum], this.eGroup);
        
    }

    generateCapPoint(biome){

        //this.biome
        
        /*this.entities.forEach(function (entities) {



        })*/

       return new CapturePoint(200, 200, this.eGroup);
        
    }

    checkDistante(prevCoords, maxX, maxY, minX, minY){

        var minDistance = 0; 
        //var maxDistance 

        var xCoord;
        var yCoord;

        while(minDistance < this.maxDistance){
            
            var distances = [];

            xCoord = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
            yCoord = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

            for(let i = 0; i < prevCoords.length; i++){

                let x1 = prevCoords[i].x
                let y1 = prevCoords[i].y;

                let dist = Math.sqrt((xCoord-x1)**2 + (yCoord-y1)**2);

                distances.push(dist);
                
            }

            minDistance = Math.min(...distances);

       }

       return {x: xCoord, y: yCoord};

    }
}