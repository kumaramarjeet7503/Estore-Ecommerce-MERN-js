const app = require("./app") ;
const express = require("express") ;
//  Create dotenv 
const dotEnv = require("dotenv") ;
dotEnv.config({path:"backend/config/config.env"}) ;


app.listen(process.env.PORT,()=>{
    console.log("Server started on : http://localhost:"+process.env.PORT) ;
})