const express = require("express") ;
const  {createProduct,getAllProducts,updateProduct, deleteProduct,getProductDetails, createProductReview, getProductReviews, deleteProductReview}  = require("../controller/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router() ;

//  Get product with success response
 router.route("/products").get(getAllProducts);
//  Route to create new product
router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"), createProduct);
//  Route to update product
router.route("/product/update/:id").post(isAuthenticatedUser,authorizeRoles("admin"), updateProduct);
//  Route to delete product
router.route("/product/delete/:id").delete(isAuthenticatedUser,authorizeRoles("admin"), deleteProduct);
//  Get Product details
router.route("/product/get/:id").get(isAuthenticatedUser,getProductDetails);
//  Route to create product reviews
router.route("/product/create/review").post(isAuthenticatedUser,createProductReview);
//  Route to get all review 
router.route("/product/review/").get(getProductReviews).delete(isAuthenticatedUser,deleteProductReview);

module.exports = router ;