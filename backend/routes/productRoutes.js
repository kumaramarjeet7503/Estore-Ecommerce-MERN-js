const express = require("express") ;
const  {createProduct}  = require("../controller/productController");
const router = express.Router() ;

//  Create a route with success response
// router.route("/products").get(getAllProducts);
//  Route to create new product
router.route("/product/new").post(createProduct);

module.exports = router ;