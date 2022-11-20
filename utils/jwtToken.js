// create and Send Token and Save in Cookie

const sendToken = (user, statusCode, res) => {

    // create Jwt sendToken
    const token = user.getJWTToken();

    // Options for cookir
    const options = {
      expiresIn: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000),
    };

    res.status(statusCode).cookie('token',token ,options).json({
        success:true,
        token,
        user
    })

}

module.exports = sendToken