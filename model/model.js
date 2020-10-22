const mongoose = require("mongoose")

const validator = require("mongoose-unique-validator")

const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        min:11,
        max:20,
        trim:true
    },
    created_At:{
        type:Date,
        default:Date.now

    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        min:1,
        max:10,
        trim:true

    }
    
})

const user_detail = mongoose.model("users",userSchema)



var blogSchema = new mongoose.Schema({
    username:String,
    created_At:{  type : Date, default: Date.now },
    updated_At:{type:Date, default:Date.now},
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    }
})
blogSchema.plugin(validator,{message:"Title is already exists Please give another title"});
const usersBlog = mongoose.model("usersBlog" , blogSchema)


module.exports = {user_detail , usersBlog}