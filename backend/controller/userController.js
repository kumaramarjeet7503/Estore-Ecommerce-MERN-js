const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js")


//  Register user function
exports.registerUser = catchAsyncErrors( async (req,res,next)=>{
    const {name,email,password,role} = req.body ;
    const user = await User.create({
        name,
        email,
        password,
        role,
        avatar:{
            public_id: "This is the sample id",
            url : "www.example.com"
        }
    }) ;
    sendToken(user,201,res) ;
})

//  login user function
exports.loginUser = catchAsyncErrors( async (req,res,next)=>{

    const {email,password} = req.body ;

    if(!email || !password)
    {
        return next(new ErrorHandler("Please enter email and password",404))  ;
    }

     const user = await User.findOne({email}).select("+password") ;

    if(!user)
    {
        return next( new ErrorHandler("Invalid user and password",404) ) ;
    }
    const isPasswordMatched =  await user.compareWithPassword(password) ;
    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Invalid email and password",401)) ;
    }
    sendToken(user,200,res) ;
})

//  logout user function
exports.logout = catchAsyncErrors(async (req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message:"User has been successfully logged out", 
    })
})

//  Forget password functionality
exports.forgotPassword = catchAsyncErrors(async (req,res,next)=>{

    const user = await User.findOne({email:req.body.email}) ;
    if(!user){
        return next(new ErrorHandler("User not found",404)) ;
    }

    //  Get reset Token
    const resetToken =   user.getResetPasswordToken() ;
    await user.save({validateBeforeSave:false}) ;
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/user/resetpass/${resetToken}` ;
    const message = `Please reset your password at : \n\n ${resetPasswordUrl} \n If you have not requested it, Kindly ignore this email.` ;

    try {
       
        await sendEmail({
            email:user.email,
            subject:`Password reset factory`,
            message 
        })
        res.status(200).json({
            success:true,
            message:`Password reset email has been sent to user ${user.email}` 
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined ;
        user.resetPasswordExpire = undefined ;
        user.save({validateBeforeSave:false}) ;
        next(new ErrorHandler(`Error while password forget! Please try again.${error}`,500)) ;
    }

})
//  reset password functionality
exports.resetPassword = catchAsyncErrors(async (req,res,next)=>{

    const resetPasswordToken =  crypto.createHash("sha256").update(resetToken).digest("hex") ;
    const user = await User.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}})

    if(!user){
        return next(new ErrorHandler("Reset password token is invalid")) ;
    }

    if(req.body.password != req.body.confirmPasswor){
        return next(new ErrorHandler("Password does not match")) ;
    }

    user.password = req.body.password ;
    user.resetPasswordToken = undefined ;
    user.resetPasswordExpire = undefined ;

    await user.save({validateBeforeSave:false}) ;
    sendToken(user,200,res) ;

}) ;

//  Get user details functionality
exports.getUser = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user.id) ;
    if(!user){
       return next(new ErrorHandler("Please login with your credentials!",400)) ;
    }
    res.status(200).json({
        success:true,
        user
    })
})

//  Functionality to change password
exports.changePassword = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password") ;
    if(!user){
       return next(new ErrorHandler("Please login with your credentials!",400)) ;
    }
    //  Checked password bcrypt using function compare with password
    const matched = user.compareWithPassword(req.body.oldPassword) ;
    if(!matched)
    {
        return next(new ErrorHandler("Password does not match with existing password!",400)) ;
    }
    if( req.body.confirmPassword != req.body.newPassword)
    {
        return next(new ErrorHandler("Confirm password does not match with new password",400)) ;
    }
    user.password = req.body.newPassword ;
    user.save() ;
    sendToken(user,200,res) ;
})

//  Functionality to update profile
exports.updateProfile = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password") ;
    if(!user){
       return next(new ErrorHandler("Please login with your credentials!",400)) ;
    }

    const updateUser = {name:req.body.name,email:req.body.email} ;
    await User.findByIdAndUpdate(req.user.id,updateUser,{
        new:true,
        runValidators:true,
        useFindandModify:false
    })

   res.status(200).json({
        success:true,
        user
   })
})

//  Get list of all users --admin
exports.getAllUsers = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.find() ;

    res.status(200).json({
        success:true,
        user
    })
})

//  Get user details by id --admin
exports.getSingleUser = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.params.id) ;
    if(!user){
        return next(new ErrorHandler(`User not found with id: ${req.params.id} `,404)) ;
    }

    res.status(200).json({
        success:true,
        user
    })
})


//  Functionality to update role --admin
exports.updateRole = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.params.id) ;
    if(!user){
       return next(new ErrorHandler(`User not exists with this id ${req.params.id}`,400)) ;
    }

    const updateUser = {name:req.body.name,email:req.body.email,role:req.body.role} ;
    await User.findByIdAndUpdate(req.user.id,updateUser,{
        new:true,
        runValidators:true,
        useFindandModify:false
    })

   res.status(200).json({
        success:true,
        user
   })
})

//  Delete user by id --admin
exports.deleteUser = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.params.id) ;
    if(!user){
        return next(new ErrorHandler(`User not found with id: ${req.params.id} `,404)) ;
    }
    await user.deleteOne() ;
    res.status(200).json({
        success:true,
        message:"User deleted successfully"
    })
})