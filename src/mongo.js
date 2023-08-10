const mongoose=require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.URL)
.then(()=>{
    console.log("connected")
})
.catch(()=>{
    console.log('Not connected')
})

const transaction= require('./models/transactions')
const users=require('./models/users')
module.exports={
    users:users,
    transactions:transaction
}