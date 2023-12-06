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

    res.status(201).json({
        success:true,
        user,
    }) ;
})
