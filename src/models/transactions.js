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
        required:false
    },
    date:{
        type:Date,
        required:false
    }   
})

module.exports=mongoose.model("transactions",tranSchema)