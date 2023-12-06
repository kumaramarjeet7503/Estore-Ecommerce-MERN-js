const mongoose = require("mongoose") ;
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true,"Please enter the name"],
        maxlength:[30,"Name should not be more than 30 characters"],
        minlength:[4,"Name should be more than 4 characters"],
        trim:true
    },
    email:{
        type:String,
        required : [true,"Please enter the email"],
        unique:true ,
        validator:[validator.isEmail,"Please enter a valid email"],
        trim:true
    },
    password:{
        type:String,
        required : [true,"Please enter the password"],
        minlength:[8,"Password should be more than 8 characters"],
        select:false,
        trim:true
    },
    avatar:{
        public_id:{
            type:String,
            required : true 
        },
        url:{
            type : String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken: String,
    resetPasswordExpire : Date
}) ;

module.exports = mongoose.model("User",userSchema) ;