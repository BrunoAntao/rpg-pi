module.exports = function (width, height) {

    this.width = width;
    this.height = height;

    this.biomes = [

        {color:0x009900, border:{x1: 0, y1: 0, x2: width/4, y2: height}, sprites: ['tree1', 'tree2', 'tree3'], capPoint: 'capPoint1'},
        {color:0xff0000, border:{x1: width*3/4, y1: 0, x2: width, y2: height}, sprites: ['magma1', 'volcano'], capPoint: 'capPoint2'},
        {color:0xffffff, border:{x1: width/4, y1: 0, x2: width*3/4, y2: height/2}, sprites: ['frozen1', 'snowMan'], capPoint: 'capPoint3'},
        {color:0xffff00, border:{x1: width/4, y1: height/2, x2: width*3/4, y2: height}, sprites: ['cactus1', 'cactus2', 'palm'], capPoint: 'capPoint4'},

    ]

    this.entities = [];
    this.capPoints = [];

    this.generateCapPoint = function(biome){
        
        let minX = Math.min(biome.border.x1, biome.border.x2) + 64 + 150;
        let maxX = Math.max(biome.border.x1, biome.border.x2) - 64 - 150;

        let minY = Math.min(biome.border.y1, biome.border.y2) + 64 + 150;
        let maxY = Math.max(biome.border.x1, biome.border.x2) - 64 - 150;

        let x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        let y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    
        this.capPoints.push({x:x, y:y, sprite: biome.capPoint, biome: biome});
        
    }

    this.genCords = function(biomes){
        
        let numOfSrites = Math.floor(3.90625e-6*this.width*this.height);

        const Density = 1.6;
                
        let minX = Math.min(biomes.border.x1, biomes.border.x2) + 64;
        let maxX = Math.max(biomes.border.x1, biomes.border.x2) - 64;
                
        let minY = Math.min(biomes.border.y1, biomes.border.y2) + 32; //+ spriteHeight;
        let maxY = Math.max(biomes.border.x1, biomes.border.x2) - 32;
                
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
                
            } else if(cords.length == 0){
        
                cords.push({x: x, y: y});
                        
                area += Math.pow(100, 2)*Math.PI;
        
                }
            }
        
        return cords;
        
    }

    this.applySprite = function(biome, cords){

        for(i = 0; i < cords.length; i++){

            let spriteIndex = Math.floor(Math.random() * biome.sprites.length);

            switch(biome.sprites[spriteIndex]) {
                
                case 'magma1':

                case 'frozen1':

                    this.entities.push({x: cords[i].x, y: cords[i].y, sprite: biome.sprites[spriteIndex], group: null})
                    break;

                default:

                    this.entities.push({x: cords[i].x, y: cords[i].y, sprite: biome.sprites[spriteIndex], group: 'eGroup'})
                    break;
                
                   
            }
        }

    }

    this.checkDistante = function(cords, finalCords){
        
        for(let i = 0; i < finalCords.length; i++){
                    
            let center = {a: finalCords[i].x, b: finalCords[i].y};
                    
            let result = Math.sqrt(Math.pow((cords.x - center.a), 2) + Math.pow((cords.y - center.b), 2));
                    
            if(result < 200) return false;
                    
        }
                    
        return true;
        
    }

    this.biomes.forEach(  function(biome) {
        
        let cords = this.genCords(biome);
        
        this.applySprite(biome, cords);
        
        this.generateCapPoint(biome);
        
    }, this);

}