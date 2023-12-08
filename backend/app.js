// Export app module 

const express = require("express") ;
const app = express() ;
// Route imports
const product = require("./routes/productRoutes") ;
const user = require("./routes/userRoutes") ;
const order = require("./routes/orderRoutes") ;
//  Import middleware
const errorMiddleware = require("./middleware/error") ;
//  Import cookie parser
const cookieParse = require("cookie-parser") ;


app.use(express.json()) ;
app.use(cookieParse()) ;
app.use(errorMiddleware) ;

//  routing for Backend API's
app.use("/api/v1",product) ;
app.use("/api/v1",user) ;
app.use("/api/v1",order) ;

module.exports = app ;

