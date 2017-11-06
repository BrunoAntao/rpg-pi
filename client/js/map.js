class Map {

    constructor(width, height, eGroup) {

        game.world.resize(width, height);
        game.world.setBounds(0, 0, width, height);

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

        this.bg.add(forestBiome.bg);
        this.bg.add(fireBiome.bg);
        this.bg.add(iceBiome.bg);
        this.bg.add(desertBiome.bg);

        this.entities = [];
        this.capPoints = [];
        
        this.biomes.forEach( function(biome) {

            let cords = this.genCords(biome);
            
            this.applySprite(biome, cords);

            this.capPoints.push(this.generateCapPoint(biome));

        }, this);

    }

    genCords(biomes){

        let numOfSrites = Math.floor(3.90625e-6*this.width*this.height);
        
        let minX = Math.min(biomes.border.x1, biomes.border.x2) + 64;
        let maxX = Math.max(biomes.border.x1, biomes.border.x2) - 64;
        
        let minY = Math.min(biomes.border.y1, biomes.border.y2) + 32; //+ spriteHeight;
        let maxY = Math.max(biomes.border.y1, biomes.border.y2) - 32;
        
        let area = 0;
    
        let cords = [];
        
        while(area <= numOfSrites*Math.pow(100, 2)*Math.PI ){
        
            let x = Math.floor(Math.random()*(maxX - minX + 1)) + minX;
            let y = Math.floor(Math.random()*(maxY - minY + 1)) + minY;
        
            if( cords.length >= 1){

                if(this.checkDistante({x: x, y: y}, cords)){

                    cords.push({x: x, y: y});
                    
                    area += Math.pow(100, 2)*Math.PI;

                }
        
            }else if( cords.length == 0){

                cords.push({x: x, y: y});
                
                area += Math.pow(100, 2)*Math.PI;

            }
        }

        
        return cords;

    }

    applySprite(biome, cords){

        for(let i = 0; i < cords.length; i++){
            
            let spriteIndex = Math.floor(Math.random() * biome.sprites.length);

            switch(biome.sprites[spriteIndex]) {
                
                case 'magma1':
                case 'frozen1':
                    this.entities.push(new Entity(cords[i].x, cords[i].y, biome.sprites[spriteIndex]));
                    break;
                default:
                    this.entities.push(new Entity(cords[i].x, cords[i].y, biome.sprites[spriteIndex], this.eGroup));
                    break;
                
            }
        }
        
    }

    generateCapPoint(biome){

        let minX = Math.min(biome.border.x1, biome.border.x2) + 64 + 150;
        let maxX = Math.max(biome.border.x1, biome.border.x2) - 64 - 150;

        let minY = Math.min(biome.border.y1, biome.border.y2) + 64 + 150;
        let maxY = Math.max(biome.border.y1, biome.border.y2) - 64 - 150;

        let x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        let y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
 
        return new CapturePoint(x, y, biome.capPoint, biome, this.eGroup);
        
    }

    checkDistante(cords, finalCords){

        for(let i = 0; i < finalCords.length; i++){
            
            let center = {a: finalCords[i].x, b: finalCords[i].y};
            
            let result = Math.sqrt(Math.pow((cords.x - center.a), 2) + Math.pow((cords.y - center.b), 2));
            
            if(result < 200) return false;
            
        }
            
        return true;

    }

    
}