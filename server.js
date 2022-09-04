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

function replaceTemplate(temp,vehicleDetail){
    let output=temp.replace(/{%VEHICLETYPE%}/g,vehicleDetail.vehicleType)
    output=output.replace(/{%ID%}/g,vehicleDetail.id)
    output=output.replace(/{%IMAGE%}/g,vehicleDetail.image)
    output=output.replace(/{%VEHICLEID%}/g,vehicleDetail.vehicleid)
    output=output.replace(/{%COST%}/g,vehicleDetail.price)
    return output
}

const tempcard=fs.readFileSync(`${__dirname}/views/partials/vehicleTemplate.ejs`,'utf-8')
const park_vehicle=fs.readFileSync(`${__dirname}/views/pages/parkvehicle.ejs`,'utf-8')
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
const dataobj=JSON.parse(data)


// park vehicle page
app.get('/parkvehicle', function(req, res) {
    // res.writeHead(200,{'Content-type':'text/html'})
    // const cardsHtml=dataobj.map(el => replaceTemplate(tempcard,el)).join('')
    // console.log(cardsHtml)
    // const output=park_vehicle.replace('{%VEHICLE_CARDS%}',cardsHtml)
    // console.log(output)
    // res.write(output)
    // res.end()
    res.render('pages/parkvehicle',{
        title:'ParkSafe:Park Vehicle',
        // VEHICLE_CARDS:cardsHtml
    });
});

// rentspace
app.get('/rentspace', function(req, res) {
    res.render('pages/rent',{
        title:'ParkSafe:Rent Space',
    });
});

// 404 page
app.get('*', function(req, res){
    res.status(404).render('pages/error404.ejs',{
        title:'ParkSafe:Page Not Found'
    });
});



// listening port
app.listen(3000);
console.log('Listening on port 3000 http://localhost:3000');
