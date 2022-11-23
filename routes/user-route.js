const { isAuthenticatedUser } = require('../middlewares/auth');
const router = require('express').Router();
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { ObjectId } = require('mongodb');
const userModel = require('../models/user.model');
const Vehicle=require('../models/park-vehicle.model')
const Space=require('../models/rent-space.model');
const { count } = require('../models/user.model');

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
    newSpaceData.user = req.user._id
    // newSpaceData.coordinates=20192
    // console.log("coordinates in user route ",req.body)

    const newSpace=new Space(newSpaceData)
    const spaceDetail=await newSpace.save()
    res.redirect('back')
}))

router.post('/getVehicle/:email',isAuthenticatedUser,catchAsyncErrors(async(req,res,next)=>{
    console.log('get vehicle req.query : ',req.body.userId)
    userId=req.body.userId
    const vehicles=await Vehicle.find({user:req.body.userId})
    const vehicleCount=await Vehicle.find({user:req.body.userId}).count()
    const spacesAvailable=await Space.find({})
    const spacesAvailableCount=await Space.find({}).count()
    // console.log(vehicles)
    console.log(spacesAvailable)
    res.status(200).json({
        success:true,
        vehicles,
        vehicleCount,
        spacesAvailable,
        spacesAvailableCount,
        message:'cars'
    })
}))


router.post('/getSpace/:email',isAuthenticatedUser,catchAsyncErrors(async(req,res,next)=>{
    console.log('get Space req.query : ',req.body.userId)
    userId=req.body.userId
    const space=await Space.find({user:req.body.userId})
    const spaceCount=await Space.find({user:req.body.userId}).count()
    console.log(space)
    res.status(200).json({
        success:true,
        space,
        spaceCount,
        message:'space'
    })
}))

router.post('/deleteVehicle/:email',isAuthenticatedUser,catchAsyncErrors(async(req,res,next)=>{
    console.log('deleting vehicle : ',req.body.id)
    try{
        if(req.isAuthenticatedUser===false){
            return res.redirect('/login')
        }
        const vehicle=await Vehicle.findOne({_id:req.body.id})
        if(!vehicle){
            return res.status(404).json({
                message:'Vehicle Not Found'
            })
        }
        await vehicle.remove()
        res.status(200).json({
            success: true,
            message:`Vehicle ${req.body.id} deleted`
        })
    }
    catch(error){
        console.log(error)
    }

}))

router.post('/deleteSpace/:email',isAuthenticatedUser,catchAsyncErrors(async(req,res,next)=>{
    console.log('deleting space : ',req.body.id)
    try{
        if(req.isAuthenticatedUser===false){
            return res.redirect('/login')
        }
        const space=await Space.findOne({_id:req.body.id})
        if(!space){
            return res.status(404).json({
                message:'Project Not Found'
            })
        }
        await space.remove()
        res.status(200).json({
            success: true,
            message:`Project ${req.body.id} deleted`
        })
    }
    catch(error){
        console.log(error)
    }

}))

router.post('/bookSpace/:email',isAuthenticatedUser,catchAsyncErrors(async(req,res,next)=>{
    console.log('booking space : ',req.body.sid,' for vehicle ',req.body.vid)
    
    
    

}))

module.exports = router;