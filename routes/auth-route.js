const express = require('express');
const { registerUser, loginUser, logout} = require('../controllers/authController');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route("/logout").get(logout, (req, res) => {
  res.redirect("/loggedout");
});
module.exports=  router;