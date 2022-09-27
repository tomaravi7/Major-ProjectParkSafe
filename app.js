// load the things we need
const express = require("express");
const app = express();
app.use(express.json())
// set the view engine to ejs
app.set("view engine", "ejs");
// const AppError = require("./utils/appError");

const index = require('./routes/index-route');
// const userRouter=require('./routes/userRoutes')

// Serving static files
app.use(express.static(`${__dirname}/public`));



// logging
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}
const route=require('./routes/index-route')
app.use('/',route)

module.exports=app