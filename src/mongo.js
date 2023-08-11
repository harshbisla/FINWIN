const mongoose=require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.URL)
.then(()=>{
    console.log("connected")
})
.catch((e)=>{
    console.log(`Not connected ${e}`)
})

const transaction= require('./models/transactions')
const users=require('./models/users')
module.exports={
    users:users,
    transactions:transaction
}