const Product = require("../models/productModel");

//  Create new product 
exports.createProduct =  async (req,res,next)=>{
  const product = await Product.create(req.body) ;
  res.status(201).json({
    success:true,
    product
  })
}


//  Get all product
exports.getAllProducts = async(req,res)=>{
    const products = await Product.find() ;
    res.status(200).json({
      success:true,
      products
    })
}

//  Update product
exports.updateProduct = async(req,res)=>{
    let product = await Product.findById(req.params.id) ;
    if(!product)
    {
      res.status(500).json({
        success:false,
        message : "Error while getting product"
      })
    }

  product = await   Product.findByIdAndUpdate(req.params.id,req.body) ;

    res.status(200).json({
      succes:true,
      product
    })
}

//  delete product
exports.deleteProduct = async(req,res)=>{
  const product = await Product.findById(req.params.id) ;
  if(!product)
  {
   return  res.status(500).json({
      success:false,
      message : "Error while getting product"
    })
  }

   await product.deleteOne() ;
  return res.status(200).json({
    success:true,
    message : "Product deleted succesfully"
  })
}