const express = require("express") ;
const  {registerUser, loginUser}  = require("../controller/userController");
const router = express.Router() ;

//  Route to login user
 router.route("/user/login").post(loginUser);
//  Route to create new user
router.route("/user/new").post(registerUser);

module.exports = router ;