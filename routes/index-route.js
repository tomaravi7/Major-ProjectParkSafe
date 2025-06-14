const { isResetPasswordTokenVaild } = require("../controllers/authController");
const User = require("../models/user.model");
const crypto = require('crypto');
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = require("express").Router();
const fs=require('fs')

require('dotenv').config()

//Login Page
router.get(['/','/login'],isAuthenticatedUser, async (req, res, next) => {
    const isAuthenticatedUser = req.isAuthenticatedUser;
    if (isAuthenticatedUser===true) {
        res.redirect(`/user/${req.user.email}`);
    }
    res.render('pages/login', { title: 'ParkSafe : Login' , user: req.user,isAuthenticatedUser,tagline:'Parking Made Easy'});
})
// registration page
router.get('/signup',isAuthenticatedUser, async (req, res, next) => {
    const isAuthenticatedUser = req.isAuthenticatedUser;
    if (isAuthenticatedUser===true) {
        res.redirect(`/user/${req.user.email}`);
    }
    res.render('pages/signup', { title: 'ParkSafe : SignUp' , user: req.user,isAuthenticatedUser,tagline:'Parking Made Easy'});
})
// about page
router.get('/about',isAuthenticatedUser, async (req, res, next) => {
    const isAuthenticatedUser = req.isAuthenticatedUser;
    res.render('pages/about', { title: 'ParkSafe : About',user: req.user,isAuthenticatedUser,tagline:'Parking Made Easy'});
})
// faq page
router.get("/faq", isAuthenticatedUser, async (req, res, next)=> {
    const isAuthenticatedUser = req.isAuthenticatedUser;
    const faqdata = fs.readFileSync(
      `${__dirname}/../dev-data/faqData.json`,
      "utf-8"
    );
    const dataobj = JSON.parse(faqdata);
    res.render("pages/faq", {
      title: "ParkSafe : FAQ",
      faqdata: dataobj,
      user: req.user,
      isAuthenticatedUser
    });
});
// teams page
router.get('/developers',isAuthenticatedUser, async (req, res, next) => {
    const isAuthenticatedUser = req.isAuthenticatedUser;
    res.render('pages/team', { title: 'ParkSafe : Team',user: req.user,isAuthenticatedUser,tagline:'Parking Made Easy'});
})
// logout page
router.get('/loggedout',isAuthenticatedUser,async(req,res,next)=>{
    const isAuthenticatedUser=req.isAuthenticatedUser;
    if(isAuthenticatedUser===true){
        res.send(404)
    }
    res.render('pages/loggedout.ejs',{title:'Logged Out',isAuthenticatedUser})
})
// contact page
router.get('/contactUs',isAuthenticatedUser, async (req, res, next) => {
    const isAuthenticatedUser = req.isAuthenticatedUser;
    res.render('pages/contact', { title: 'ParkSafe : Contact Us',user: req.user,isAuthenticatedUser,tagline:'Parking Made Easy'});
})

module.exports = router;