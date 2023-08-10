const mongoose=require('mongoose')
const express=require("express")
const db=require('./mongo')
const app=express()
const cors=require('cors')
const dotenv=require('dotenv');

const User = require('../src/models/users');

dotenv.config();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.get('/',cors(),async(req,res)=>{
    console.log(req.query)
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

app.post('/signUp', async (req, res) => {
    console.log(req.body.name, req.body.email, req.body.phoneNumber, req.body.password);
    const newUser = new User(req.body);

    try {
        newUser.save();
        console.log(`User saved: ${req.body.name}`);
    } catch (error) {
        error.log(`error in saving user: ${user}`);
    }
})

app.listen(8000,()=>{
    console.log("server started on port 8000")
})