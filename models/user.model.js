const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto')
express=require('express')
app=express()
app.use(express.json())


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Your Name'],
        maxlength: [30, 'Your name cannot Exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please Enter your email'],
        unique: true,
        validate: { validator: validator.isEmail, message: 'Please enter vaild Email Address', isAsync: false }
    },
    password: {
        type: String,
        required: [true, 'Please Enter Password'],
        minlength: [6, 'Password Must be longer than 6 characters'],
        select: false  //This Means when i want object User This Will not Be Display
    },
    phoneno: {
        type: String,
        required: [true,'Phone no is required'],
        maxlength: [10, 'Please Input Correct Phone Number']
    },
    address:{
        type: String,
        required: [true, 'Please Enter Your Address'],
    },
    adhaar: {
        type: Number,
        required: [true,'Adhaar No is required'],
        maxlength: [12,'Please Input your 12 digit adhaar Number']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})

// Encrypting Password Before Saving Password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10) //10 here is salt recommend Value
})

// return JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}


// Compare user Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}




//  Genrate password reset Token
userSchema.methods.getResetPasswordToken = function () {
    // Genrate Token reset
    const resetToken = crypto.randomBytes(20).toString('hex');

    // hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    console.log({ resetToken, resetPasswordToken: this.resetPasswordToken });
    // set Token Expire Time Token - 10 Min
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
    return resetToken
}



module.exports = mongoose.model('User', userSchema)