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


app.post('/getUser',cors(),async(req,res)=>{
    console.log(req.body)
    try{
        const check=await db.users.find({email:req.body.email})
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

app.post('/getTrans',async(req,res)=>{
    try{
        const result=await db.transactions.find({email:req.body.email}).sort({$natural:1})
        console.log(result)
        if(result)
        {
            res.json(result)
        }
        else{
            res.json("notexist")
        }
    }
    catch(e){
        res.json('fail')
    }
})

app.post('/save',async(req,res)=>{
    console.log(req.body)
    const data={
        email:req.body.email,
        age:req.body.age,
      interest: req.body.interest,
      name:req.body.name,
      netincome:req.body.netincome,
      password:req.body.password
    }
    try{
        const check=await db.users.insertMany([data])
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