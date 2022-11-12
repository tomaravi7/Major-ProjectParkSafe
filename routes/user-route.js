const { isAuthenticatedUser } = require('../middlewares/auth');
const router = require('express').Router();
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { ObjectId } = require('mongodb');
const userModel = require('../models/user.model');

// For User --Public Route
router.get('/pv/:email', isAuthenticatedUser, catchAsyncErrors(async (req, res, next) => {
    const isAuthenticatedUser = req.isAuthenticatedUser;
    if (req.isAuthenticatedUser === false) {
        return res.redirect('/login');
    }
    console.log("User Name",req.params.email);
    const requestedUser = (req.user!==undefined)?req.user:null;
    const user = await userModel.findOne({ email: req.params.email }, { _id: 1, name: 1, email:1}); 
    console.log(user);
    res.render('pages/parkvehicle', { title: `${user.name}`, email: req.params.email,ownerUser:user ,isAuthenticatedUser, user:requestedUser});
}))
router.get('/rs/:email', isAuthenticatedUser, catchAsyncErrors(async (req, res, next) => {
    const isAuthenticatedUser = req.isAuthenticatedUser;
    if (req.isAuthenticatedUser === false) {
        return res.redirect('/login');
    }
    console.log("User Name",req.params.email);
    const requestedUser = (req.user!==undefined)?req.user:null;
    const user = await userModel.findOne({ email: req.params.email }, { _id: 1, name: 1, email:1}); 
    console.log(user);
    res.render('pages/rent', { title: `${user.name}`, email: req.params.email,ownerUser:user ,isAuthenticatedUser, user:requestedUser});
}))
router.get('/:email', isAuthenticatedUser, catchAsyncErrors(async (req, res, next) => {
    const isAuthenticatedUser = req.isAuthenticatedUser;
    if (req.isAuthenticatedUser === false) {
        return res.redirect('/login');
    }
    console.log("User Name",req.params.email);
    const requestedUser = (req.user!==undefined)?req.user:null;
    const user = await userModel.findOne({ email: req.params.email }, { _id: 1, name: 1, email:1}); 
    console.log(user);
    res.render('pages/index', { title: `${user.name}`, email: req.params.email,ownerUser:user ,isAuthenticatedUser, user:requestedUser, tagline:'Parking Made Easy'});
}))





module.exports = router;