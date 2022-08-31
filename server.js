// load the things we need
var express = require('express');
var app = express();
const fs=require('fs');
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

// Login page
app.get('/login', function(req, res) {
    res.render('pages/login',{
        title:'ParkSafe:login',
    });
});

// Teams page
app.get('/team', function(req, res) {
    res.render('pages/team',{
        title:'ParkSafe:Team',
    });
});

const tempcard=fs.readFileSync(`${__dirname}/template-overview.html`,'utf-8')

// park vehicle page
app.get('/parkvehicle', function(req, res) {
    res.render('pages/parkvehicle',{
        title:'ParkSafe:Park Vehicle',
    });
});

// listening port
app.listen(3000);
console.log('Listening on port 3000 http://localhost:3000');
