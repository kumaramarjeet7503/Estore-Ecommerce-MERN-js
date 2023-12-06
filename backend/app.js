// Export app module 

const express = require("express") ;
const app = express() ;
app.use(express.json()) ;
// Route imports
const product = require("./routes/productRoutes") ;
const user = require("./routes/userRoutes") ;
//  Import middleware
const errorMiddleware = require("./middleware/error") ;

app.use("/api/v1",product) ;
app.use(errorMiddleware) ;
app.use("/api/v1",user) ;

module.exports = app ;

