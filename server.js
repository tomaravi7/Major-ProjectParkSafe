// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// public directory serving static files
app.use(express.static(__dirname + '/public'));

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    var tagline = "Parking Made Easy";
    res.render('pages/index', {
        title:'ParkSafe:Home',
        tagline: tagline
    });
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about',{
        title:'ParkSafe:About',
    });
});

// listening port
app.listen(3000);
console.log('Listening on port 3000 http://localhost:3000');
