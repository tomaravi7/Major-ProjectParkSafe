const { isResetPasswordTokenVaild } = require("../controllers/authController");
const User = require("../models/user.model");
const crypto = require('crypto');
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = require("express").Router();
const fs=require('fs')

require('dotenv').config()

// Homepage
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

// Teams page
router.get("/team", function (req, res, next) {
    res.render("pages/team", {
      title: "ParkSafe:Team",
    });
});
  
TODO:
//  these two are to be removed after login system is created
// park vehicle page
router.get("/parkvehicle", function (req, res, next) {
    res.render("pages/parkvehicle", {
      title: "ParkSafe:Park Vehicle",
    });
});
  
// rentspace
router.get("/rentspace", function (req, res, next) {
     res.render("pages/rent", {
      title: "ParkSafe:Rent Space",
    });
});
  
// faq page
router.get("/faq", function (req, res, next) {
    const faqdata = fs.readFileSync(
      `${__dirname}/../dev-data/faqData.json`,
      "utf-8"
    );
    const dataobj = JSON.parse(faqdata);
    res.render("pages/faq", {
      title: "ParkSafe:FAQ",
      faqdata: dataobj,
    });
});
  
// contact us page
router.get("/contact", function (req, res, next) {
    res.render("pages/contact", {
      title: "ParkSafe:Contact Us",
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

//Login Page
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
// 404 page
router.get("*", function (req, res, next) {
    res.status(404).render("pages/error404", {
      title: "ParkSafe:Page Not Found",
    });
});

module.exports = router;
