module.exports = function(app, map) {

    app.get('/', function(req, res) {

        res.render('index.ejs');

    });

};
