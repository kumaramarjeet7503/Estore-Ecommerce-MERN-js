//  Create a dummy response for get product
  const getAllProducts = ((req,res)=>{
    res.status(200).json({message:"This is the valid request"})
})

module.exports = getAllProducts ;