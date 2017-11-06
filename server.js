let express = require('express');
let app = express();
let http = require('http').Server(app);
let port = 9090;

Map = require('./server/map.js');
var map = new Map(3200, 1600);

app.set('view engine', 'ejs');
app.use('/client', express.static('client'));

require('./server/routes.js')(app, map);

http.listen(port, function() {
  console.log('listening on: ' + port);
});
  