const mongoose = require("mongoose");
const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URI).then((data)=>{
        console.log(`Mongo db started at port`) ;
    }).catch((err)=>{
        console.log("Not able to connect") ;
    })
}

module.exports = connectDatabase ;