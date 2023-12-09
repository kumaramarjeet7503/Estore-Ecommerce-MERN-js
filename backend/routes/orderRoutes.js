const express = require("express") ;
const router = express.Router() ;
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {createOrder,getSingleOrder,getUserOrder,getAllOrders, deleteOrder, updateOrder} = require("../controller/orderController") ;

//  Route to create new order
router.route("/order/create").post(isAuthenticatedUser,createOrder);
//  Route to get orders for user
router.route("/order/user").get(isAuthenticatedUser,getUserOrder);
//  Route to get single order by id
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);
//  Route to get all orders
router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);
//  Route to update orders
router.route("/admin/order/update/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder);
//  Route to delete order
router.route("/admin/order/delete/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);
module.exports = router ;


