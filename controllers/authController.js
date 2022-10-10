const crypto = require('crypto')

const User = require("../models/user.model")

const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");


//Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, phoneno, address, adhaar } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    phoneno,
    address,
    adhaar,
  });
});

// Login user => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
//   console.log(req.body);
  // check if email and password is entered by user correct
  // console.log('loginUser',{email,password})
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }

  // FINDING USER IN DATABASE
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invaild Email or Password", 401));
  }
  else{
    console.log("User found")
  }

  // Check if Password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invaild Password", 401));
  }
});


//  Logout user  => /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    next()
})

