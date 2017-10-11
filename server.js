let express = require('express');
let app = express();
let http = require('http').Server(app);
let port = 80;

app.set('view engine', 'ejs');
app.use('/client', express.static('client'));

require('./server/routes.js')(app);

http.listen(port, function() {
  console.log('listening on: ' + port);
});
  