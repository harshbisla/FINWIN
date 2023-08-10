const mongoose=require("mongoose")
const tranSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    label:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }   
})

module.exports=mongoose.model("transactions",tranSchema)