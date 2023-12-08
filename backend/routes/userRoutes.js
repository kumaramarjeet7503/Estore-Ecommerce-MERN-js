const express = require("express") ;
const  {registerUser, loginUser, logout, forgotPassword, resetPassword, getUser, changePassword, updateProfile, getAllUsers, getSingleUser, updateRole, deleteUser}  = require("../controller/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
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
//  Get user details functionality
router.route("/user/details/").get(isAuthenticatedUser,getUser) ;
//  Change password functionality
router.route("/user/changepass/").post(isAuthenticatedUser,changePassword) ;
//  Update user functionality
router.route("/user/update/profile").put(isAuthenticatedUser,updateProfile) ;

//  Admin funcationality 
//  Get all list of user
router.route("/admin/users/all").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers) ;
//  Get single user details
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser) ;
//  Update user role
router.route("/admin/role/update/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateRole) ;
//  delete user
router.route("/admin/user/delete/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser) ;

module.exports = router ;