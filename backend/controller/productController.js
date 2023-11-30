const Product = require("../models/productModel");

//  Create new product
exports.createProduct =  async (req,res,next)=>{
  const product = await Product.create(req.body) ;
  res.status(201).json({
    success:true,
    product
  })
}


//  Create a dummy response for get product
//   const getAllProducts = ((req,res)=>{
//     res.status(200).json({message:"This is the valid request"})
// })

// module.exports = createProduct ;