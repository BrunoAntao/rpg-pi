class soundManager extends Phaser.SoundManager{

   
    add (key, volume, loop, connect) {
     
        var sounds = []    
        
        if (typeof volume === 'undefined') {
            
            volume = 1;
        
        }
        if (typeof loop === 'undefined') { 
            
            loop = false; 
        
        }
        if (typeof connect === 'undefined') { 
            
            connect = this.connectToMaster; 
        
        }
        
        var sound = new Phaser.Sound(this.game, key, volume, loop, connect);
        
        this._sounds.push(sound);
        
        return sound;
        
}

    play  (key, volume, loop) {
    
        if (this.noAudio){

                return;
            }
    
        var sound = this.add(key, volume, loop);
    
        sound.play();
    
        return sound;
    
    }

    pauseAll () {
        
        for (var i = 0; i < this._sounds.length; i++) {

            if (this._sounds[i]) {
                        
                this._sounds[i].pause();
            }
        }
        
    }

    resumeAll () {
                
        for (var i = 0; i < this._sounds.length; i++) {
            
            if (this._sounds[i]) {
            
                this._sounds[i].resume();
            }
        }
                   
    }

    stopAll () {
        
        if (this.noAudio) {
            return;
        }
        
        for (var i = 0; i < this._sounds.length; i++) {
            
            if (this._sounds[i]) {
                
                this._sounds[i].stop();
            }
        }
        
    }
         
    addSprite (key) {
        
                var audioSprite = new Phaser.AudioSprite(this.game, key);
        
                return audioSprite;
        
    }      


    destroy () {
        
        this.stopAll();
            
        for (var i = 0; i < this._sounds.length; i++) {
            
            if (this._sounds[i]) {
                        
                this._sounds[i].destroy();
                    
            }
                
        }
            
            this._sounds = [];
        }
        

    update (){

        if (this.ctrls.mute.isDown && mute != true){

            this.pauseAll();
        }
        else {
            this.resumeAll();
        }

        if (global.player.x > forestBiomeBorders.x1 && global.player.x < forestBiomeBorders.x2
            && global.player.y > forestBiomeBorders.y1 && global.player.y < forestBiomeBorders) {

                this.play('forest');
        }
        
        else if (global.player.x > fireBiomeBorders.x1 && global.player.x < fireBiomeBorders.x2
            && global.player.y > fireBiomeBorders.y1 && global.player.y < fireBiomeBorders) {
    
                this.play('fire');
            }
        
        else if (global.player.x > desertBiomeBorders.x1 && global.player.x < desertBiomeBorders.x2
            && global.player.y > desertBiomeBorders.y1 && global.player.y < desertBiomeBorders) {
        
              this.play('desert');
        
        }
        
        else if (global.player.x > iceBiomeBorders.x1 && global.player.x < iceBiomeBorders.x2
            && global.player.y > iceBiomeBorders.y1 && global.player.y < iceBiomeBorders) {
            
                this.play('ice');
    }
            
    }

                
}

