const app = require('./app');
const mongoose = require('mongoose')
const dotenv = require('dotenv');

 
// Setting up Config File 
dotenv.config({
    path: 'config/config.env'
})

// Connecting to Database 
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true,
}).then(con=>{
    console.log(`MongoDB is Connected with Host :${con.connection.host}`)
})
const port=process.env.PORT;
const server = app.listen(port,()=>{
    console.log(`Server Started on Port : ${port} ...http://localhost:${port} in ${process.env.NODE_ENV} mode.`)
})

// Handle Unhandled Promise Rejection
process.on('unhandledRejection',(err)=>{
    console.log(`Error ${err.message}`);
    console.log('Unhandled Promise Rejection');
})