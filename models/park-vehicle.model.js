const mongoose = require("mongoose");
express = require("express");

const vehicleSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    required:[true,"Vehicle Type is required"]
  },
  vehiclenumber: {
    type: String,
    required: [true, "Please Enter your Vehicle Number"],
  },
  modelName:{
    type:String,
    required:[true,"Vehicle Model is Required"]
  },
  vehiclecolour: {
    type: String,
    required: [true, "Please Enter your Vehicle Colour"],
  },
  manufactureyear: {
    type: Number,
    required: [true, "Please Enter your Vehicle Manufacture Year"],
  },
  address: {
    type: String,
    required: [true, "Please Enter Your Address"],
  },
  instructions: {
    type: String,
  },
  user: {
    type: String,
    required: true,
    ref: "User",
  },
  parked:{
    type: Boolean,
    default:false
  }
  ,
  parkedAt:{
    type: String,
    default: 'NA'
  },
  addressParking:{
    type: String,
    default: 'NA'
  },
  startTime:{
    type: String,
    default:'00:00'
  }
  ,
  checkOut:{
    type: String,
    default: '00:00'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
