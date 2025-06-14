const mongoose = require("mongoose");
express = require("express");

const rentSpaceSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    required: [true, "Please select vehical type"],
    maxlength: [2, "Your have selected an invalid type"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter price"],
    maxlength: [3, "Your have entered an invalid price"],
  },
  shade: {
    type: String,
    required: [true, "Pick any one from shaded and non shaded"],
    
  },
  fence: {
    type: String,
    required: [true, "Pick any one from fenced and non fenced"],
  },
  address: {
    type: String,
    required: [true, "Please Enter Your Address"],
  },
  startTime: {
    type: String,
    required: [true, "Starting Time is required"],
  },
  endTime: {
    type: String,
    required: [true, "Ending Time is required"],
  },
  user: {
    type: String,
    required: true,
    ref: "User",
  },
  coordinates:{
    type: String,
    required:[true, "You are missing space coordinates"]
  },
  available:{
    type: Boolean,
    default: true,
    required: true
  },
  occupied:{
    type: Boolean,
    default: false,
    required:[true]
  },
  occupiedBy:{
    type: String,
    default: 'NA'
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("rentSpace", rentSpaceSchema);
