const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");



exports.registerUser = catchAsyncErrors( async (req,res,next)=>{
    const {name,email,password} = req.body ;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: "This is the sample id",
            url : "www.example.com"
        }
    }) ;

    const token = user.getJWTToken() ;
     res.status(201).json({
        success:true,
        token,
    }) ;
})

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
    
    const token = user.getJWTToken() ;

    res.status(200).json({
        success:true,
        token,
    }) ;
})