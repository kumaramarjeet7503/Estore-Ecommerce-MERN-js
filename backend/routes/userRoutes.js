const express = require("express") ;
const  {registerUser, loginUser, logout, forgotPassword, resetPassword}  = require("../controller/userController");
const router = express.Router() ;

//  Route to login user
 router.route("/user/login").post(loginUser);
//  Route to create new user
router.route("/user/new").post(registerUser);
//  Logout user functionality
router.route("/user/logout").get(logout) ;
//  Forgot Password functionality
router.route("/user/forgotpass").post(forgotPassword) ;
//  Reset password functionality
router.route("/user/resetpass/:token").put(resetPassword) ;
module.exports = router ;