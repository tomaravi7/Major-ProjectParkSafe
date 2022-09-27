const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsyncErrors = require("../controllers/catchAsyncErrors");
const authController = require("../controllers/authControllers.js");

require("dotenv").config();

// index page
router.get("/", async (req, res, next) => {
  var tagline = "Parking Made Easy";
  res.render("pages/index", {
    title: "ParkSafe:Home",
    tagline: tagline,
  });
});

// about page
router.get("/about", function (req, res, next) {
  res.render("pages/about", {
    title: "ParkSafe:About",
  });
});

// Login page
router.get("/login", function (req, res, next) {
  res.render("pages/login", {
    title: "ParkSafe:login",
  });
});

// signup page
router.get("/signup", function (req, res, next) {
  var tagline = "Parking Made Easy";
  res.render("pages/signup", {
    title: "ParkSafe:SignUp",
    tagline: tagline,
  });
});

router.post(
  "/signup",
  authController.tryPost,
  function (req, res, next){
    console.log("getting data from signup")
  }
  
);

// Teams page
router.get("/team", function (req, res, next) {
  res.render("pages/team", {
    title: "ParkSafe:Team",
  });
});

// park vehicle page
router.get("/parkvehicle", function (req, res, next) {
  res.render("pages/parkvehicle", {
    title: "ParkSafe:Park Vehicle",
  });
});

// rentspace
router.get("/rentspace", function (req, res, next) {
  res.render("pages/rent", {
    title: "ParkSafe:Rent Space",
  });
});

// faq page
router.get("/faq", function (req, res, next) {
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
router.get("/contact", function (req, res, next) {
  res.render("pages/contact", {
    title: "ParkSafe:Contact Us",
  });
});

// 404 page
router.get("*", function (req, res, next) {
  res.status(404).render("pages/error404", {
    title: "ParkSafe:Page Not Found",
  });
});

module.exports = router;
