const express = require("express") ;
const  {createProduct,getAllProducts,updateProduct, deleteProduct,getProductDetails}  = require("../controller/productController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router() ;

//  Get product with success response
 router.route("/products").get(getAllProducts);
//  Route to create new product
router.route("/product/new").post(isAuthenticatedUser,createProduct);
//  Route to update product
router.route("/product/update/:id").post(isAuthenticatedUser,updateProduct);
//  Route to delete product
router.route("/product/delete/:id").delete(isAuthenticatedUser,deleteProduct);
//  Get Product details
router.route("/product/get/:id").get(isAuthenticatedUser,getProductDetails);
module.exports = router ;