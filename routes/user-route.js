const { isAuthenticatedUser } = require('../middlewares/auth');
const router = require('express').Router();
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { ObjectId } = require('mongodb');
const userModel = require('../models/user.model');
const Vehicle=require('../models/park-vehicle.model')
const Space=require('../models/rent-space.model')

// For User --Public Route
router.get('/pv/:email', isAuthenticatedUser, catchAsyncErrors(async (req, res, next) => {
    const isAuthenticatedUser = req.isAuthenticatedUser;
    if (req.isAuthenticatedUser === false) {
        return res.redirect('/login');
    }
    console.log("User Name pv",req.params.email);
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
    console.log("User Name rs",req.params.email);
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
    console.log("User Name home : ",req.params.email);
    const requestedUser = (req.user!==undefined)?req.user:null;
    const user = await userModel.findOne({ email: req.params.email }, { _id: 1, name: 1, email:1}); 
    console.log(user);
    res.render('pages/index', { title: `${user.name}`, email: req.params.email,ownerUser:user ,isAuthenticatedUser, user:requestedUser, tagline:'Parking Made Easy'});
}))


router.get('/addVehicle/:email', isAuthenticatedUser, catchAsyncErrors(async (req, res, next) => {

    if (req.isAuthenticatedUser === false) {
        return res.redirect('/login');
    }
    console.log("in addvehicle user route")
    console.log("res.query is ",req.query);
    const newVehicleData=req.query
    newVehicleData.user = req.user._id

    const newVehicle=new Vehicle(newVehicleData)
    const vehicleDetail=await newVehicle.save()
    res.redirect('back')
}))

router.get('/addSpace/:email', isAuthenticatedUser, catchAsyncErrors(async (req, res, next) => {

    if (req.isAuthenticatedUser === false) {
        return res.redirect('/login');
    }
    console.log("in addspace user route")
    console.log("res.query is ",req.query);
    const newSpaceData=req.query

    const newSpace=new Space(newSpaceData)
    const spaceDetail=await newSpace.save()
    res.redirect('back')
}))

router.post('/getVehicle/:email',isAuthenticatedUser,catchAsyncErrors(async(req,res,next)=>{
    console.log('get vehicle req.query : ',req.body.userId)
    userId=req.body.userId
    const vehicles=await Vehicle.find({user:req.body.userId})
    const vehicleCount=await Vehicle.find({user:req.body.userId}).count()
    console.log(vehicles)
    res.status(200).json({
        success:true,
        vehicles,
        vehicleCount,
        message:'cars'
    })
}))




module.exports = router;