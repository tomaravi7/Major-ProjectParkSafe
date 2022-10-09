const router = require('express').Router();
const { registerUser, loginUser, logout, forgotPassword, resetPassword } = require('../controllers/authController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/reset/:token').put(resetPassword);

router.route('/logout').get(logout,
    (req, res) => {
        res.redirect('/');
    });

    
module.exports=  router;