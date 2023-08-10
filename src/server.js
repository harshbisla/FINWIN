const mongoose=require('mongoose')
const express=require("express")
const db=require('./mongo')
const app=express()
const cors=require('cors')
const dotenv=require('dotenv');

dotenv.config();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.get('/',async(req,res)=>{

    try{
        const check=await db.users.find()
        console.log(check)
        if(check)
        {
            res.json("exist")
        }
        else{
            res.json("notexist")
        }
    }
    catch(e){
        res.json("fail")
    }
    // db.insertMany([{
    //     email:'nav@gmail.com',
    //     amount:'5000',
    //     transNum:'1'
    // }])
    // res.send('hello')
})



app.listen(8000,()=>{
    console.log("server started on port 8000")
})