// Import dependencies.
var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require('./models');
var mysql = require('mysql');
var connection;

if(process.env.JAWSDB_URL) {
    connection = mysql.createConnection
    (process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '2019!March',
        database: 'movies_db'
    })
}
// Initialize app.
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, 'public')));

var PORT = process.env.PORT || 3000;

// Set handlebars as view engine.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Favicon
app.use(favicon(path.join(__dirname, 'public/assets/images', 'favicon.png')));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Method override.
app.use(methodOverride('_method'));

// Import routes and give the server access to them.
var routes = require('./controllers/movie_controller.js');
app.use('/', routes);

// Start listening.
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log('listening on port ' + PORT);
    });
});