let fs = require('fs');

var Map = require('../../server/map.js');

functions = {

    generateMap: function () {

        let map = new Map(6400, 3200);

        fs.writeFileSync('./server/map.json', JSON.stringify(map));

    },
}

module.exports = functions;
