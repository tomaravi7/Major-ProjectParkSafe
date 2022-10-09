
// Check if user is Authenticated or not
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");



exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log("token", token);
    if (!token) {
        req.isAuthenticatedUser = false;
        return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log("decoded", decoded);
    req.isAuthenticatedUser = true;
    req.user = await User.findById(decoded.id);
    next()

})

// Handing users roles 
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler('Not Sufficent Permissions', 403))
        }
        next();
    }
}
