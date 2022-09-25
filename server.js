// load the things we need
const { Console } = require("console");
var express = require("express");
var app = express();
const fs = require("fs");
// set the view engine to ejs
app.set("view engine", "ejs");

// public directory serving static files
app.use(express.static(__dirname + "/public"));

// use res.render to load up an ejs view file

// index page
app.get("/", function (req, res) {
  var tagline = "Parking Made Easy";
  res.render("pages/index", {
    title: "ParkSafe:Home",
    tagline: tagline,
  });
});

// about page
app.get("/about", function (req, res) {
  res.render("pages/about", {
    title: "ParkSafe:About",
  });
});

// Login page
app.get("/login", function (req, res) {
  res.render("pages/login", {
    title: "ParkSafe:login",
  });
});

// signup page
app.get("/signup", function (req, res) {
  var tagline = "Parking Made Easy";
  res.render("pages/signup", {
    title: "ParkSafe:SignUp",
    tagline: tagline,
  });
});


// Teams page
app.get("/team", function (req, res) {
  res.render("pages/team", {
    title: "ParkSafe:Team",
  });
});

// park vehicle page
app.get("/parkvehicle", function (req, res) {
  res.render("pages/parkvehicle", {
    title: "ParkSafe:Park Vehicle",
  });
});

// rentspace
app.get("/rentspace", function (req, res) {
  res.render("pages/rent", {
    title: "ParkSafe:Rent Space",
  });
});

// faq page
app.get("/faq", function (req, res) {
  const faqdata = fs.readFileSync(
    `${__dirname}/dev-data/faqData.json`,
    "utf-8"
  );
  const dataobj = JSON.parse(faqdata);
  res.render("pages/faq", {
    title: "ParkSafe:FAQ",
    faqdata: dataobj,
  });
});

// contactus page
app.get("/contact", function (req, res) {
  res.render("pages/contact", {
    title: "ParkSafe:Contact Us"
  });
});

// 404 page
app.get("*", function (req, res) {
  res.status(404).render("pages/error404", {
    title: "ParkSafe:Page Not Found",
  });
});

// listening port
app.listen(3000);
console.log('Listening on port 3000 http://localhost:3000');
