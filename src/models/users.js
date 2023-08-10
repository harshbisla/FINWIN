const mongoose=require('mongoose')
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    netincome:{
        type:Number,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    interest:{
        type:String,
        required:true
    }
    // otherIncome:{
    //     type:Number
    // }
})

module.exports=mongoose.model("users",userSchema)