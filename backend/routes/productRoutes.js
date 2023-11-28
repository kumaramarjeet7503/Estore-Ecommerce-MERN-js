const express = require("express") ;
const  getAllProducts  = require("../controller/productController");
const router = express.Router() ;

//  Create a route with success response
router.route("/products").get(getAllProducts);

module.exports = router ;