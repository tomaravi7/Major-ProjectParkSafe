const crypto = require('crypto')

const User = require("../models/user.model")

const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");


//Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, phoneno, address, adhaar } = req.body;
    const user = await User.create({ name, email, password, phoneno, address, adhaar })

    // sendToken(user, 200, res)
    // // const token = user.getJWTToken()
    // res.status(201).json({
    //     success:true,
    //     token
    // })

})

// Login user => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    // console.log(req.body);
    // check if email and password is entered by user correct 
    // console.log('loginUser',{email,password})
    if (!email || !password) {
        return next(new ErrorHandler('Please Enter Email and Password', 400))
    }

    // FINDING USER IN DATABASE
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        return next(new ErrorHandler('Invaild Email or Password', 401))
    }

    // Check if Password is correct or not 
    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invaild Email or Password', 401))
    }

    sendToken(user, 200, res)

    // const token = user.getJWTToken()

    // res.status(200).json({
    //     success: true,
    //     token
    // })
})





// reset Password  => /api/v1/password/forgot
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    if (!req.body.password || !req.body.confirmPassword || (req.body.password !== req.body.confirmPassword)) {
        return next(new ErrorHandler('Password does not match or Invaild Request', 400))
    }

    // Hash URL token 
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken, resetPasswordExpire: { $gt: Date.now() }
    })
    console.log(JSON.stringify(user,null,2));

    if (!user) {
        return next(new ErrorHandler('Password reset token is invaild or has been expired', 400))
    }



    // Setup new Password
    user.password = req.body.password
    user.getResetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

})


// Forgot Password  => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        // You Should Always Send Email Send
        return next(new ErrorHandler('User not Found with this email', 404))
        // return next(new ErrorHandler('User not Found with this email', 404))
    }
    // Get Reset Token Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false })

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/reset_password/${resetToken}`


    const message = `Your password reset token is as follow \n\n${resetUrl}\n\nIf you have not requested this email,then ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Recovery',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to :${user.email}`
        })
    } catch (error) {
        user.getResetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save()

        return next(new ErrorHandler(error.message, 500))
    }


})


//  Logout user  => /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    next()
})

