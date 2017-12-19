module.exports = function () {

  this.target = false;
  this.isTarget = false;
  this.isIdle = false;

  this.health = 1;
  this.growth = 1;
  this.growthMax = 6;

  this.damage = function(damage, source){

    this.growth -= damage;

    if(this.growth < 1) {


        source.score += 500;

    }
  }

};
