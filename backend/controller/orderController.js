const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//  Create new order 
exports.createOrder = catchAsyncError(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        user,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        orderStatus
    } = req.body ;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        user,
        paymentInfo,
        paidAt:Date.now(),
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        orderStatus,
    })

    res.status(201).json({
        success:true,
        order
    })
})

//  Get single order with the order id
exports.getSingleOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email") ;
    if(!order) return next(new ErrorHandler(`Order is not availaible for id: ${req.params.id}`))
    res.status(200).json({
        success:true,
        order
    })
})

//  get order for logged in user
exports.getUserOrder = catchAsyncError(async(req,res,next)=>{
    console.log(req.user) ; 
    const order = await Order.find({user : req.user._id}) ;
    if(!order) return next(new ErrorHandler(`No order is availaible`)) ;
    res.status(200).json({
        success:true,
        order
    })
})

//  Get all order for admin user
exports.getAllOrders = catchAsyncError(async(req,res,next)=>{
    const order = await Order.find() ;
    if(!order) return next(new ErrorHandler(`No order is aviailable right now`)) ;
    res.status(201).json({
        success:true,
        order
    })
})