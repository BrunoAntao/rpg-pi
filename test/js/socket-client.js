module.exports = function(io){

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
        
                socket.broadcast.emit('player attack', {id:socket.id, angle:angle});
        
            });
        
            socket.on('disconnect', function () {
        
                console.log('User ' + socket.id + ': disconected', color);
        
                if (server.players.indexOf(player) > -1) {
        
                    server.players.splice(server.players.indexOf(player), 1)
                    socket.broadcast.emit('remove enemy', player);
        
                }
        
            });
        });
}