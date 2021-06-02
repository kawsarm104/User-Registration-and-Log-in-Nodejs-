const mongoose = require("mongoose");

//Database Schema
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    user_name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
})

//Database Collection
const Register = new mongoose.model("Register",userSchema)
module.exports=Register;//now require it to server.js file