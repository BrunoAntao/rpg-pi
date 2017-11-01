module.exports = function (width, height) {

    this.numOfSrites = Math.floor(height*2/250);
    this.maxDistance = 250;

    this.biomes = [

        {bg:0x009900, border:{x1: 0, y1: 0, x2: width/4, y2: height}, sprites: ['tree1', 'tree2', 'tree3']},
        {bg:0xff0000, border:{x1: width*3/4, y1: 0, x2: width, y2: height}, sprites: ['magma1', 'volcano', 'tree3']},
        {bg:0xffff00, border:{x1: width/4, y1: 0, x2: width*3/4, y2: height/2}, sprites: ['cactus1', 'cactus2', 'palm']},
        {bg:0xffffff, border:{x1: width/4, y1: height/2, x2: width*3/4, y2: height}, sprites: ['frozen1', 'snowMan', 'cactus2']}
        
    ]

    this.entities = [];
    this.capPoints = [];


    this.generateSprite = function(biome, prevCoords){
        
        let x, y;

        let spriteNum = Math.floor(Math.random() * 3);

        var spriteHeight = 90;

        let minX = Math.min(biome.border.x1, biome.border.x2) + 64;
        let maxX = Math.max(biome.border.x1, biome.border.x2) - 64;

        let minY = Math.min(biome.border.y1, biome.border.y2) + 32 + spriteHeight;
        let maxY = Math.max(biome.border.y1, biome.border.y2) - 32;

        if(prevCoords.length >= 1){

            let coords = this.checkDistante(prevCoords, maxX, maxY, minX, minY);

            x = coords.x;
            y = coords.y;

        } else {

            x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
            y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
        }

        return {x:x, y:y};
        
    }

    this.generateCapPoint = function(biome){
        
        let minX = Math.min(biome.border.x1, biome.border.x2) + 64 + 150;
        let maxX = Math.max(biome.border.x1, biome.border.x2) - 64 - 150;

        let minY = Math.min(biome.border.y1, biome.border.y2) + 64 + 150;
        let maxY = Math.max(biome.border.y1, biome.border.y2) - 64 - 150;

        let x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        let y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    
        return {x:x, y:y};
        
    }

    this.checkDistante = function(prevCoords, maxX, maxY, minX, minY){

        let minDistance = 0; 
        let x, y;

        while(minDistance < 250){
            
            let distances = [];

            x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
            y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

            for(let i = 0; i < prevCoords.length; i++){

                let x1 = prevCoords[i].x;
                let y1 = prevCoords[i].y;

                let dist = Math.sqrt(Math.pow(x-x1, 2) + Math.pow(y-y1, 2));

                distances.push(dist);
                
            }

            minDistance = Math.min(distances);

        }

        return {x: x, y: y};

    }

    this.biomes.forEach( function(biome) {
        
        let prevCoords = [];

        for(let i = 0; i < this.numOfSrites; i++){

            let sprite = this.generateSprite(biome, prevCoords);

            this.entities.push(sprite);
            prevCoords.push(sprite);

        }

        this.capPoints.push(this.generateCapPoint(biome));

    }, this);

}