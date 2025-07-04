const ErrorHandler = require("../utils/errorHandler");



module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err ,     
            errMessage: err.message,
            stack: err.stack,     
        })
    }
    else if (process.env.NODE_ENV==='PRODUCTION') {
        let error = {...err}
        error.message = err.message || 'Internal Server Error'


        // Wrong Mongoose Object ID Error 
        if (err.name ==='CastError') {
            const message = `Resource bot found. Invaild : ${err.path} `
            error = new ErrorHandler(message, 400)
        }

        // Handling Mongoose Validation Error
        if (err.name ==='ValidationError'){
            const message = Object.values(err.errors).map(value =>value.message)
            error = new ErrorHandler(message,400)
        }

        // Handling Mongoose Duplicate key errors
        if(err.code ===11000){
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            error = new ErrorHandler(message, 400)
        }

        // Handling Wrong JWT error
        if(err.name ==='JsonWebTokenError'){
            const message = 'JSON Web Token is invaild. Try Again!!!'
            error = new ErrorHandler(message, 400)
        }

        // Handling Wrong JWT error
        if(err.name ==='TokenExpired'){
            const message = 'JSON Web Token is expired. Try Again!!!'
            error = new ErrorHandler(message, 400)
        }

        res.status(err.statusCode).json({
            success: false,
            message: error.message , 
            
        })
    }

    

    
}