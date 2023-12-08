const express = require("express") ;
const router = express.Router() ;
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {createOrder,getSingleOrder,getUserOrder,getAllOrders} = require("../controller/orderController") ;

//  Route to create new order
router.route("/order/create").post(isAuthenticatedUser,createOrder);
//  Route to get orders for user
router.route("/order/user").get(isAuthenticatedUser,getUserOrder);
//  Route to get single order by id
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);
//  Route to get all orders
router.route("/orders").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);

module.exports = router ;