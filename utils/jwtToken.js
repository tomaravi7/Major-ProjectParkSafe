// create and Send Token and Save in Cookie

const sendToken = (user, statusCode, res) => {

    // create Jwt sendToken
    const token = user.getJWTToken();

    // Options for cookir
    const options = {
      expires: new Date(Date.now() + 1000*60*60*24*30),
    };

    res.status(statusCode).cookie('token',token ,options).json({
        success:true,
        token,
        user
    })

}

module.exports = sendToken