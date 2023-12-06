const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

//  Create new product 
exports.createProduct =  catchAsyncErrors( async (req,res,next)=>{
  const product = await Product.create(req.body) ;
  res.status(201).json({
    success:true,
    product
  }) ;
}) ;


//  Get all product
exports.getAllProducts =  catchAsyncErrors( async(req,res)=>{

  const resultPerPage = 5 ;
  const productCount = await Product.countDocuments() ;

  const apiFeatures = new ApiFeatures(Product.find(),req.query)
  .search()
  .filter()
  .pagination(resultPerPage) ;
    const products = await apiFeatures.query ;
    res.status(200).json({
      success:true,
      products,
      productCount
    }) ;
});

//  Update product
exports.updateProduct =   catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id) ;
    if(!product)
    {
      return  next(new ErrorHandler("Product Not Found", 404 )) ;
    }

  product = await   Product.findByIdAndUpdate(req.params.id,req.body) ;

    res.status(200).json({
      succes:true,
      product
    })
});

//  delete product
exports.deleteProduct =  catchAsyncErrors( async(req,res,next)=>{
  const product = await Product.findById(req.params.id) ;
  if(!product)
  {
    return  next(new ErrorHandler("Product Not Found", 404 )) ;
  }

   await product.deleteOne() ;
  return res.status(200).json({
    success:true,
    message : "Product deleted succesfully"
  })
}) ;

exports.getProductDetails =  catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.findById(req.params.id) ;
  if(!product)
  {
    return  next(new ErrorHandler("Product Not Found", 404 )) ;
  }
  return res.status(200).json({
    success:true,
   product
  })
});