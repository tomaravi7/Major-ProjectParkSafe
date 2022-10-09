const { isResetPasswordTokenVaild } = require("../controllers/authController");
const User = require("../models/user.model");
const crypto = require('crypto');
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = require("express").Router();

require('dotenv').config()

// Homepage   --Public Route
router.get('/',isAuthenticatedUser , async (req, res, next) => {
    const isAuthenticatedUser = req.isAuthenticatedUser;
    res.render('pages/index', { title: 'ParkSafe' , user: req.user,isAuthenticatedUser, tagline: 'Parking Made Easy',});
});

// about page
router.get("/about", function (req, res, next) {
    res.render("pages/about", {
      title: "ParkSafe:About",
    });
});

// signup page
router.get("/signup", function (req, res, next) {
    var tagline = "Parking Made Easy";
    res.render("pages/signup", {
      title: "ParkSafe:SignUp",
      tagline: tagline,
    });
});

//Login Page   --Public Route
router.get('/login',isAuthenticatedUser, async (req, res, next) => {
    const isAuthenticatedUser = req.isAuthenticatedUser;
    if (isAuthenticatedUser===true) {
        res.redirect('/');
    }
    res.render('pages/login', { title: 'Login' , user: req.user,isAuthenticatedUser});
})

router.get('pages/parkvehicle/:id',isAuthenticatedUser,catchAsyncErrors(async (req, res, next) => {
    const isAuthenticatedUser = req.isAuthenticatedUser;
    const project = await projectModel.findOne({ _id: req.params.id }).populate('user', 'name');
    // console.log(project);
    res.render('pages/parkvehicle', { title: project.projectName, project, user: req.user, isAuthenticatedUser});
}))

router.get('/reset_password/:id', catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.id).digest('hex')
    // console.log(resetPasswordToken);
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: new Date() }
    })
    // console.log(JSON.stringify(user, null, 2));
    if (user) {
        // return false
        return res.render('resetpassword', { token : req.params.id })
    }
    // console.log(user)
    // handle when Token is Expired
    return res.redirect('/')
}))

module.exports = router;
