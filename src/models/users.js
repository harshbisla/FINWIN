const mongoose=require('mongoose')
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    },
    name:{
        type:String,
        required:false
    },
    netincome:{
        type:Number,
        required:false
    },
    age:{
        type:Number,
        required:false
    },
    interest:{
        type:String,
        required:false
    },
    phoneNumber: {
        type:Number,
        required: false
    }
    // otherIncome:{
    //     type:Number
    // }
})

module.exports=mongoose.model("users",userSchema)