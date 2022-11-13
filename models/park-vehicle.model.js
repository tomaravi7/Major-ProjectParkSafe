const mongoose = require("mongoose");
express = require("express");

const vehicleSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
  },
  vehiclenumber:{
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
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
