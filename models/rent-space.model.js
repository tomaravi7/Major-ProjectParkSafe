const mongoose = require("mongoose");
express = require("express");

const rentSpaceSchema = new mongoose.Schema({
  Vtype: {
    type: String,
    required: [true, "Please select vehical type"],
    maxlength: [2, "Your have selected an invalid type"],
  },
  price: {
    type: number,
    required: [true, "Please Enter price"],
    maxlength: [3, "Your have entered an invalid price"],
  },
  shadded: {
    type: Boolean,
    required: [true, "Pick any one from shaded and non shaded"],
    
  },
  Fencing: {
    type: Boolean,
    required: [true, "Pick any one from fenced and non fenced"],
  },
  address: {
    type: String,
    required: [true, "Please Enter Your Address"],
  },
  startTime: {
    type: Time,
    required: [true, "Starting Time is required"],
  },
  endTime: {
    type: Time,
    required: [true, "Ending Time is required"],
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("rentSpace", rentSpaceSchema);
