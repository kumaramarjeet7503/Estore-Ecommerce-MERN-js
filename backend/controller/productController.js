//  Create a dummy response for get product
  getAllProducts = ((req,res)=>{
    res.status(200).json({message:"This is the valid request"})
})

exports.getAllProducts = getAllProducts ;