const Slime = require('./slime.js');

module.exports = function (x, y, biome) {

  this.range = 150;
  this.prog = 0;
  this.captured = false;
  this.biome = biome;

  this.spawnCount = 0;

  this.spawn = function () {

    if (this.spawnCount < 14) {

        this.spawnCount++;

    }

  }

};
