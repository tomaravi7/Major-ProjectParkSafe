const { isResetPasswordTokenVaild } = require("../controllers/authController");
const User = require("../models/user.model");
const crypto = require('crypto');
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = require("express").Router();

require('dotenv').config()

//Login Page
router.get('/',isAuthenticatedUser, async (req, res, next) => {
    const isAuthenticatedUser = req.isAuthenticatedUser;
    if (isAuthenticatedUser===true) {
        res.redirect('/');
    }
    res.render('pages/login', { title: 'Login' , user: req.user,isAuthenticatedUser});
})
router.get('/signup',isAuthenticatedUser, async (req, res, next) => {
    const isAuthenticatedUser = req.isAuthenticatedUser;
    if (isAuthenticatedUser===true) {
        res.redirect('/');
    }
    res.render('pages/signup', { title: 'SignUp' , user: req.user,isAuthenticatedUser,tagline:'Parking Made Easy'});
})

module.exports = router;
