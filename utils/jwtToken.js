// create and Send Token and Save in Cookie

const sendToken = (user, statusCode, res) => {

    // create Jwt sendToken
    const token = user.getJWTToken();

    // Options for cookir
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        )
    }

    res.status(statusCode).cookie('token',token ,options).json({
        success:true,
        token,
        user
    })

}

module.exports = sendToken