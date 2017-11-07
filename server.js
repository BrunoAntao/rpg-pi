let express = require('express');
let app = express();
let http = require('http').Server(app);
var io = require('socket.io')(http);
let readline = require('readline');
let fs = require('fs');
var commands = JSON.parse(fs.readFileSync('./server/commands.json'));
var Map = require('./server/map.js');
var rl = readline.createInterface(process.stdin, process.stdout);
let port = 80;

console.log('\033c');

var server = {

    console: {

        color: 7

    }

};

app.set('view engine', 'ejs');
app.use('/client', express.static('client'));

console.log = function (str, color = server.console.color) {

    process.stdout.write('\x1b[3' + color + 'm' + str + '\n' + '\x1b[0m');
    rl.prompt();

}

functions = {

    setConsoleColor: function (color = 7) {

        if(color > 1 && color < 7) {

            server.console.color = color;
            console.log('Console color set');

        } else {

            server.console.color = 7;
            console.log('Console color reset');

        }

    },

    generateMap: function () {

        console.log('Creating Map file');

        let map = new Map(6400, 3200);

        console.log('Generating Map');

        fs.writeFileSync('./server/map.json', JSON.stringify(map));

        console.log('Map file created');

        server.map = JSON.parse(fs.readFileSync('./server/map.json'));

    },

    clear: function () {

        console.log('\033c');

    }

}

let svFolder = fs.readdirSync('./server');
if (svFolder.indexOf('map.json') > -1) {

    console.log('Map file exists');
    server.map = JSON.parse(fs.readFileSync('./server/map.json'));

} else {

    console.log('Map file doesnt exist');
    generateMap();

}

require('./server/routes.js')(app);

http.listen(port, function () {
    console.log('listening on: ' + port);

    rl.setPrompt('Server> ');
    rl.prompt();

    rl.on('line', function (line) {

        let c = line.trim().split(' ');

        if (typeof commands[c[0]] != 'undefined') {

            var com = commands[c[0]];
            var param;

            for(i = 1; i < c.length; i++) {

                if(!c[i].startsWith('-') && typeof com[c[i]] != 'undefined') {

                    com = com[c[i]];

                } else if (c[i].startsWith('-')){

                    param = i;
                    break;

                } else {

                    break;

                }

            }

            if(typeof com != 'object' && typeof com != 'undefined' && typeof c[param] != 'undefined') {

                functions[com](c[param].replace('-', ''));

            } else {

                console.log('Invalid command');

            }

        } else {

            console.log('Invalid command');

        }

        // switch (c[0]) {

        //     case 'map':
        //         switch (c[1]) {

        //             case 'generate': generateMap(); break;
        //             default: console.log('Invalid command'); break;

        //         }
        //         break;

        //     case 'console'

        //     case 'cls': console.log('\033c'); break;

        //     default: console.log('Invalid command'); break;
        // }
        rl.prompt();
    }).on('close', function () {

        process.exit(0);
    });

});

io.on('connection', function (socket) {

    let color = Math.floor(Math.random() * 7 + 1);

    console.log('User ' + socket.id + ' connected', color);

    socket.on('fetch map', function () {

        console.log('User ' + socket.id + ': Fectched map', color);

        socket.emit('map', server.map);

    });

    socket.on('disconnect', function () {

        console.log('User ' + socket.id + ' disconected', color);

    });

});