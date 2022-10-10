const { isAuthenticatedUser } = require('../middlewares/auth');
const router = require('express').Router();
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const User = require('../models/user.model');
const { ObjectId } = require('mongodb');


router.get("/user", isAuthenticatedUser, async (req, res, next) => {
  const isAuthenticatedUser = req.isAuthenticatedUser;
  const user = await userModel.findOne({ email: req.params.email });
  res.render("pages/index", {
    title: `ParkSafe:${user.email}`,
    user: req.user,
    isAuthenticatedUser,
    tagline: "Parking Made Easy",
  });
});

module.exports = router;