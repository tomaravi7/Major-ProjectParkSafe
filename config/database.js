const mongoose = require('mongoose')

const connectDatabase = () =>{
    console.log("trying connection to mongodb database ")
    mongoose.set("strictQuery",false)
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        // useCreateIndex:true,
    }).then(con=>{
        console.log(`MongoDB is Connected with Host :${con.connection.host}`)
    })
}
module.exports = connectDatabase