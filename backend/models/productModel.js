const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true,"Name is mandatory."],
        trim:true
    },
    price:{
        type:Number,
        required : [true,"Price is mandatory."]
    },
    description:{
        type:String,
        required : [true,"Description is mandatory."]
    },
    rating:{
        type:Number,
        default : 0 
    },
    images :[{
        public_id:{
            type:String,
            required : true 
        },
        url:{
            type : String,
            required:true
        }
    }],
    category : {
        type : String,
        required:[true,"Category is mandatory"]
    },
    stock:{
        type:Number,
        required:[true,"Stock is mandatory"],
        maxlength:[4,"Should be less than 1000"],
        default : 1 
    },
    noofreview:
    {
        type:Number,
        default : 0
    },
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        },
        name:{
            type:String,
            required : true
        },
        rating:{
            type:Number,
            required:true
        },
        comments:{
            type:String
        }
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model("Product",productSchema) ;