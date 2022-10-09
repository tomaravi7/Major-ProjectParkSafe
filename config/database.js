const mongoose = require('mongoose')

const connectDatabase = () =>{
    mongoose.connect(process.env.DATABASE,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        // useCreateIndex:true,
    }).then(con=>{
        console.log(`MongoDB is Connected with Host :${con.connection.host}`)
    })
}
module.exports = connectDatabase