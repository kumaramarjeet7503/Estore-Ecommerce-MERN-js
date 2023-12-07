const express = require("express") ;
const  {registerUser, loginUser, logout, forgotPassword}  = require("../controller/userController");
const router = express.Router() ;

//  Route to login user
 router.route("/user/login").post(loginUser);
//  Route to create new user
router.route("/user/new").post(registerUser);
//  Logout user functionality
router.route("/user/logout").get(logout) ;
//  Reset Password functionality
router.route("/user/resetpass").post(forgotPassword) ;

module.exports = router ;