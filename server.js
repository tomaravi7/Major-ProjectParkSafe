
const app = require('./app');
const connectDatabase = require('./config/database')
const dotenv = require('dotenv');

// Handle Uncaught exception
process.on('uncaughtException',err=>{
    console.log(`Error: ${err.message}`)
    console.log('Shutting Down due to uncaughtException');
    process.exit(1)
})

// Setting up Config File 
dotenv.config({
    path: 'config/config.env'
})

// Connecting to Database 
connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server Started on Port : http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle Unhandled Promise Rejection
process.on('unhandledRejection',(err)=>{
    console.log(`Error ${err.message}`);
    console.log('Shutting Down the Server due to Unhandled Promise Rejection');
    server.close(()=>{
        process.exit(1)
    })
})