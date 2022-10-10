const router = require('express').Router();
const { registerUser, loginUser, logout} = require('../controllers/authController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/logout').get(logout,
    (req, res) => {
        res.redirect('/');
    });

    
module.exports=  router;