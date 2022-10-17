const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
express = require("express");

const userSchema = new mongoose.Schema({
  select: {
    type: String,
  },
  vehicleno:{
    type: Number,
    required: [true, "Please Enter your Vehicle Number"],
    
  },
  vehiclecolour:{
    type:String ,
    required: [true, "Please Enter your Vehicle Colour"],
    
  },
  manufactureyear:{
    type:Number ,
    required: [true, "Please Enter your Vehicle Manufacture Year"],
    
  },
  address: {
    type: String,
    required: [true, "Please Enter Your Address"],
  },
  instructions: {
    type: String,
    required: [true, "Instructions is Required"],
    maxlength: [100, "Please Add Instructions in Description"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// return JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};
userSchema.methods.comparePassword = async function (enteredPassword) {
  if (enteredPassword === this.password) {
    console.log("password matched!");
    return true;
  } else {
    return false;
  }
};

module.exports = mongoose.model("User", userSchema);
