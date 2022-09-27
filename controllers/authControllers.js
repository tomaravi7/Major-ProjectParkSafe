const User = require("../models/user")
const catchAsyncErrors = require("../controllers/catchAsyncErrors");

//Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, userName, phoneNumber, organisationName } = req.body;
    const user = await User.create({ name, email, password, userName, phoneNumber, organisationName })

    sendToken(user, 200, res)

})

tryPost=function(req,res){
    console.log("post from authcontrolller for signup")
    res.json({
        status:'success',
        message:'signup post successful'
    })
}
module.exports={tryPost}