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


app.get('/',cors(),async(req,res)=>{
    // console.log(req.query)
    // try{
    //     const check=await db.users.find()
    //     console.log(check)
    //     if(check)
    //     {
    //         res.json(check)
    //     }
    //     else{
    //         res.json("notexist")
    //     }
    // }
    // catch(e){
    //     res.json("fail")
    // }
})

app.post('/',async(req,res)=>{
    console.log(req.body)
    try{
        const check=await db.users.find()
        console.log(check)
        if(check)
        {
            res.json(check)
        }
        else{
            res.json("notexist")
        }
    }
    catch(e){
        res.json("fail")
    }
    
})



app.listen(8000,()=>{
    console.log("server started on port 8000")
})