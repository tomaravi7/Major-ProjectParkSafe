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

router.get('/viewProfile/:email', isAuthenticatedUser, catchAsyncErrors(async (req, res, next) => {
    const isAuthenticatedUser = req.isAuthenticatedUser;
    if (req.isAuthenticatedUser === false) {
        return res.redirect('/login');
    }
    console.log("User Name home : ",req.params.email);
    const requestedUser = (req.user!==undefined)?req.user:null;
    const user = await userModel.findOne({ email: req.params.email }, { _id: 1, name: 1, email:1}); 
    console.log(user);
    res.render('pages/profile', { title: `${user.name}`, email: req.params.email,ownerUser:user ,isAuthenticatedUser, user:requestedUser, tagline:'Parking Made Easy'});
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
                message:'Space Not Found'
            })
        }
        await space.remove()
        res.status(200).json({
            success: true,
            message:`Space ${req.body.id} deleted`
        })
    }
    catch(error){
        console.log(error)
    }

}))

router.post('/bookSpace/:email',isAuthenticatedUser,catchAsyncErrors(async(req,res,next)=>{
    console.log('booking space : ',req.body.sid,' for vehicle ',req.body.vid,'start time ',req.body.srt,' end time ',req.body.end)
    try{
        if(req.isAuthenticatedUser===false){
            return res.redirect('/login')
        }
        const space=await Space.findOne({_id:req.body.sid})
        if(!space){
            return res.status(404).json({
                message:'Space Not Found'
            })
        }
        await Space.updateOne({'_id':req.body.sid},{$set:{
            'occupied':true,
            'occupiedBy':req.body.vid
        }})
        await Vehicle.updateOne({'_id':req.body.vid},{$set:{
            'parked':true,
            'parkedAt':req.body.sid,
            'addressParking':space.address,
            'startTime':req.body.srt,
            'checkOut':req.body.end
        }})
        res.status(200).json({
            success: true,
            message:`Space ${req.body.sid} is now occupied by ${req.body.vid}`
        })
    }
    catch(error){
        console.log(error)
    }
}))

router.post('/checkOutVehicle/:email',isAuthenticatedUser,catchAsyncErrors(async(req,res,next)=>{
    console.log('checkingout vehicle : ',req.body.id)
    try{
        if(req.isAuthenticatedUser===false){
            return res.redirect('/login')
        }
        const vehicle=await Vehicle.findOne({_id:req.body.id})
        console.log("parked at",vehicle.parkedAt," address ", vehicle.addressParking)
        const sid=vehicle.parkedAt
        const space=await Space.findOne({_id:vehicle.parkedAt})
        if(!vehicle){
            return res.status(404).json({
                message:'vehicle Not Found'
            })
        }
        // calculating price
        var time_start = new Date();
        var time_end = new Date();
        var value_start = (vehicle.startTime).split(":");
        var value_end = (vehicle.checkOut).split(":");
        time_start.setHours(value_start[0], value_start[1], 0);
        time_end.setHours(value_end[0], value_end[1], 0);
        const total_time=(time_end-time_start)/3600000
        cost=space.price*total_time
        console.log("Cost for parking for ",total_time," is : ",cost)
        // console.log("vehicle owner",vehicle.user)
        // console.log("space owner",space.user)
        const userveh=await userModel.findOne({_id:vehicle.user})

        due=cost+parseInt(userveh.paymentDue)
        console.log("\ndue : ",due," paydue prev :",userveh.paymentDue)
        const userspa=await userModel.findOne({_id:space.user})
        balance=cost+userspa.balanceCredit
        console.log("\nbalance : ",balance)
        await userModel.updateOne({'_id':vehicle.user},{$set:{
            'paymentDue':due
        }})
        await userModel.updateOne({'_id':space.user},{$set:{
            'balanceCredit':balance
        }})
        await Vehicle.updateOne({'_id':req.body.id},{$set:{
            'parked':false,
            'parkedAt':'NA',
            'addressParking':'NA',
            'startTime':'00:00',
            'checkOut':'00:00'
        }})
        await Space.updateOne({'_id':sid},{$set:{
            'occupied':false,
            'occupiedBy':'NA'
        }})
        res.status(200).json({
            success: true,
            message:`Vehicle checked out`
        })
    }
    catch(error){
        console.log(error)
    }
}))

router.post('/changeSpaceAvailability/:email',isAuthenticatedUser,catchAsyncErrors(async(req,res,next)=>{
    console.log(req.body)
    // TODO:check if the space is booked or not and then allow
    try{
        if(req.isAuthenticatedUser===false){
            return res.redirect('/login')
        }
        const space=await Space.findOne({_id:req.body.id})
        if(!space){
            return res.status(404).json({
                message:'Space Not Found'
            })
        }
        if(space.occupied===true){
            return res.status(400).json({
                message:'Cannot change space is occupied'
            })
        }
        await Space.updateOne({_id:req.body.id},{$set:{
            available:req.body.checkedSpace
        }})
        res.status(200).json({
            success: true,
            message:`${req.body.id} Availability Changed to ${req.body.checkedSpace}`
        })
    }
    catch(error){
        console.log(error)
    }
}))
router.get('/updateUser/:email', isAuthenticatedUser, catchAsyncErrors(async (req, res, next) => {

    if (req.isAuthenticatedUser === false) {
        return res.redirect('/login');
    }
    console.log("updateuser")
    console.log("res.query is ",req.query);

    res.redirect('back')
}))
router.get('/payment/:email', isAuthenticatedUser, catchAsyncErrors(async (req, res, next) => {
    const isAuthenticatedUser = req.isAuthenticatedUser;
    if (req.isAuthenticatedUser === false) {
        return res.redirect('/login');
    }
    const requestedUser = (req.user!==undefined)?req.user:null;
    const user = await userModel.findOne({ email: req.params.email }, { _id: 1, name: 1, email:1}); 
    res.render('pages/parking-payment', { title: `${user.name}`,isAuthenticatedUser, user:requestedUser});
    
}))
router.get('/redeem/:email', isAuthenticatedUser, catchAsyncErrors(async (req, res, next) => {
    const isAuthenticatedUser = req.isAuthenticatedUser;
    if (req.isAuthenticatedUser === false) {
        return res.redirect('/login');
    }
    const requestedUser = (req.user!==undefined)?req.user:null;
    const user = await userModel.findOne({ email: req.params.email }, { _id: 1, name: 1, email:1}); 
    res.render('pages/space-payment', { title: `${user.name}`,isAuthenticatedUser, user:requestedUser});
    
}))
module.exports = router;