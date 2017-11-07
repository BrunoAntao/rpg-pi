module.exports = function(io, rl) {

    io.on('connection', function(socket){

        console.log('A user connected');

        socket.on('fetch map', function(){
            
            console.log('map fetch');

            socket.emit('map', map);

        });

        socket.on('disconnect', function(){

            console.log('A user disconected');

        });

    });

}