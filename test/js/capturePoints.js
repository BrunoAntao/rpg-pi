const Slime = require('./slime.js');

module.exports = function (x, y, key, biome, group) {

  this.range = 150;
  this.prog = 0;
  this.captured = false;
  this.group = group;
  this.biome = biome;

  this.spawnCount = 0;

  this.spawn = function () {

    if (this.spawnCount < 14) {

        this.spawned.add(new Slime());
        this.spawnCount++;

    }

  }

};
