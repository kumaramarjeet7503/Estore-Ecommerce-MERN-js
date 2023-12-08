const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

//  Create new product 
exports.createProduct =  catchAsyncErrors( async (req,res,next)=>{

  req.body.user = req.user.id ;

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

//  Get product details
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

//  Create product review
exports.createProductReview =  catchAsyncErrors(async(req,res,next)=>{
  const {rating,productId,comments} = req.body ;
  console.log(comments) ; 
  const review =  {
    user:req.user.id,
    name:req.user.name,
    rating:Number(rating),
    comments:comments
  }

  const product = await Product.findById(productId) ;
  
  const isReviewed = product.reviews.find((rev)=> rev.user.toString() === req.user.id.toString()) ;
  if(isReviewed){
      product.reviews.forEach((rev)=>{
          if(rev.user.toString() === req.user.id.toString()){
              rev.rating = req.body.rating ;
              rev.comments = req.body.comments ;
          }
      })
  }else{
      product.reviews.push(review) ;
      product.noofreview = product.reviews.length ;
  }
  
  let avg=0 ;
  product.reviews.forEach((rev)=>{
    avg += rev.rating;
  });

  product.rating =  avg  / product.reviews.length  ;
  await product.save({validateBeforeSave: false})
  res.status(200).json({
    succes:true,
    message:"Review submitted succesfully"
  })

})

//  Get product reviews
exports.getProductReviews =  catchAsyncErrors(async(req,res,next)=>{

    const product = await Product.findById(req.query.id) ;
    if(!product){
      return  next(new ErrorHandler("Product Not Found", 404 )) ;
    }
    const reviews = product.reviews ;
    res.status(200).json({
      success:true,
      reviews
    })

 })

//   Delete product review
exports.deleteProductReview =  catchAsyncErrors(async(req,res,next)=>{

  const product = await Product.findById(req.query.productId) ;
  if(!product){
    return  next(new ErrorHandler("Product Not Found", 404 )) ;
  }
  const reviews = product.reviews.filter((rev)=> {
    return rev._id.toString() !== req.query.id.toString()
  })
  
  let avg = 0 ;
  reviews.forEach((rev)=>{
      avg += rev.rating ;
  });
  avg = reviews.length === 0 ? 0 : avg/reviews.length ;
  const rating  =  avg ;

  const noofreview = reviews.length ;

  await Product.findByIdAndUpdate(req.query.productId,{
    reviews,
    rating,
    noofreview
  }, {
    new:true,
    runValidators : true,
    useFindAndModify : false 
  })

  res.status(200).json({
    success:true,
    reviews
  })

})