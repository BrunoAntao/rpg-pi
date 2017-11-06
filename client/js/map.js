class Map {

    constructor(width, height, eGroup, map) {

        game.world.resize(width, height);
        game.world.setBounds(0, 0, width, height);
        
        this.width = width;
        this.height = height;
        this.bg = game.add.group();
        this.eGroup = eGroup;
       
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

        console.log(this.capPoints);

        for(let i = 0; i < capPoint.length; i++){

            new CapturePoint(capPoint[i].x, capPoint[i].y, capPoint[i].sprite, capPoint[i].biome, this.eGroup);

        }      
    }


}
 
