const mongoose=require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.URL)
.then(()=>{
    console.log("connected")
})
.catch(()=>{
    console.log('Not connected')
})

const tranSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    }   
})

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    otherIncome:{
        type:Number
    }
})


const transaction= mongoose.model("Transactions",tranSchema)

const users=mongoose.model("Users",userSchema)

module.exports={
    users:users,
    transactions:transaction
}