const express = require("express") ;
const  {registerUser}  = require("../controller/userController");
const router = express.Router() ;

//  Get product with success response
//  router.route("/products").get(getAllProducts);
//  Route to create new product
router.route("/user/new").post(registerUser);
// //  Route to update product
// router.route("/product/update/:id").post(updateProduct);
// //  Route to delete product
// router.route("/product/delete/:id").delete(deleteProduct);
// //  Get Product details
// router.route("/product/get/:id").get(getProductDetails);
module.exports = router ;