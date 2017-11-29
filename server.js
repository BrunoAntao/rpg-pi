let express = require('express');
let app = express();
let http = require('http').Server(app);
var io = require('socket.io')(http);

let readline = require('readline');
let fs = require('fs');

var commands = JSON.parse(fs.readFileSync('./server/commands.json'));

var Map = require('./server/map.js');
var Player = require('./server/player.js');
var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('');
let settings = JSON.parse(fs.readFileSync('./server/settings.json'));
let port = settings.port;

console.log('\033c');

var server = {

    console: {

        color: 7,
        verbose: false,

    }

};

app.set('view engine', 'ejs');
app.use('/client', express.static('client'));

console.log = function (str, color = server.console.color) {

    process.stdout.write('\x1b[3' + color + 'm' + str + '\n' + '\x1b[0m');
    rl.prompt();

}

console.verbose = function (str, color = server.console.color) {

    if (server.console.verbose) {

        process.stdout.write('\x1b[3' + color + 'm' + str + '\n' + '\x1b[0m');

    }

}

functions = {

    setConsoleColor: function (color = 7) {

        if (color > 1 && color < 7) {

            server.console.color = color;
            rl.setPrompt('\x1b[3' + server.console.color + 'mServer> \x1b[0m');
            console.log('Console color set');

        } else {

            server.console.color = 7;
            rl.setPrompt('\x1b[37mServer> \x1b[0m');
            console.log('Console color reset');

        }

    },

    setConsoleVerbose: function (flag) {

        server.console.verbose = !!flag;

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

    rl.setPrompt('\x1b[3' + server.console.color + 'mServer> \x1b[0m');
    rl.prompt();

    rl.on('line', function (line) {

        let c = line.trim().split(' ');

        if (typeof commands[c[0]] != 'undefined') {

            var com = commands[c[0]];
            var param;

            for (i = 1; i < c.length; i++) {

                if (!c[i].startsWith('-') && typeof com[c[i]] != 'undefined') {

                    com = com[c[i]];

                } else if (c[i].startsWith('-')) {

                    param = i;
                    break;

                } else {

                    break;

                }

            }

            if (typeof com != 'object' && typeof com != 'undefined' && typeof c[param] != 'undefined') {

                functions[com](c[param].replace('-', ''));

            } else if (typeof com != 'object' && typeof com != 'undefined') {

                functions[com]();

            } else {

                console.log('Invalid command');

            }

        } else {

            console.log('Invalid command');

        }

        rl.prompt();

    }).on('close', function () {

        process.exit(0);

    });

});

server.players = [];
classes = ['warrior', 'ranger', 'mage'];

io.on('connection', function (socket) {

    let color = Math.floor(Math.random() * 7 + 1);
    let player = new Player(socket.id);

    console.log('User ' + socket.id + ': connected', color);

    socket.on('fetch map', function () {

        console.log('User ' + socket.id + ': Fectched map', color);

        socket.emit('map', server.map);

    });

    socket.on('new player', function (data) {

        console.log('User ' + socket.id + ': Started playing', color);

        player.x = data.x;
        player.y = data.y;
        player.class = classes[data.class];

        server.players.push(player);

        socket.broadcast.emit('new player', player);

    });

    socket.on('fetch players', function () {

        console.log('User ' + socket.id + ': Fectched players', color);

        socket.emit('players', server.players);

    });

    socket.on('move player', function (data) {

        console.verbose('User ' + socket.id + ': moved to: ' + JSON.stringify(data), color);

        player.x = data.x;
        player.y = data.y;

        socket.broadcast.emit('move enemy', player);

    });

    socket.on('player attack', function (angle) {

        console.verbose('User ' + socket.id + ': attacked: ' + JSON.stringify(angle), color);

        socket.broadcast.emit('player attack', { id: socket.id, angle: angle });

    });

    socket.on('player skill', function (angle) {

        console.log('User ' + socket.id + ': used Skill: ' + JSON.stringify(angle), color);

        if(angle) {

            socket.broadcast.emit('player skill', { id: socket.id, angle: angle });

        } else {

            socket.broadcast.emit('player skill', { id:socket.id });

        }

    });

    socket.on('remove enemy', function () {

        socket.broadcast.emit('remove enemy', socket.id);

    })

    socket.on('disconnect', function () {

        console.log('User ' + socket.id + ': disconected', color);

        if (server.players.indexOf(player) > -1) {

            server.players.splice(server.players.indexOf(player), 1)
            socket.broadcast.emit('remove enemy', player);

        }

    });
});