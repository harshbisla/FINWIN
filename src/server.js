const mongoose=require('mongoose')
const express=require("express")
const db=require('./mongo')

const cors=require('cors')
const dotenv=require('dotenv');

const User = require('../src/models/users');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session=require('express-session');


dotenv.config();

const app=express()
app.use(express.json())

// app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: ['http://localhost:3000'], // Your React app's URL
    methods: ['GET', 'POST'],
    credentials: true, // Enable credentials (cookies, etc.)
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.URL, collectionName: 'sessions'}),
    cookie: {
        maxAge: 1000*60*60*24 // 1 day
    }
}));

app.post('/getUser' ,async(req,res)=> {
    console.log(req.body)
    try {
        const check = await db.users.find({email: req.body.email})
        console.log(check)
        if (check) {
            res.json(check)
        } else {
            res.json("notexist")
        }
    } catch (e) {
        res.send({message: "fail"})
    }
});

// app.get('/' ,async(req,res)=>{
//     // console.log(req.session.user);
// })

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

// app.post('/save',async(req,res)=>{
//     console.log(req.body)
//     const data={
//         email:req.body.email,
//         age:req.body.age,
//       interest: req.body.interest,
//       name:req.body.name,
//       netincome:req.body.netincome,
//       password:req.body.password
//     }
//     try{
//         const check=await db.users.insertMany([data])
//         // console.log(check)
//         if(check)
//         {
//             res.json(check)
//         }
//         else{
//             res.json("notexist")
//         }
//     }
//     catch(e){
//         res.json("fail")
//     }
//
// })


app.post('/signUp', async (req, res) => {
    // console.log(req.body.name, req.body.email, req.body.phoneNumber, req.body.password);
    const newUser = new User(req.body);

    try {
        await newUser.save();
        console.log(`User saved: ${req.body.name}`);
        res.send({
            status: 200,
            data: {
                message: "User saved successfully!",
            },
        });
    } catch (error) {
        console.log(`error in saving user: ${error}`);
        res.send({
            status: 409,
            data: {
                message: "User not saved successfully!",
            },
        });
    }
})

app.post('/signIn', (req, res) => {
    User.findOne({ email: req.body.email }).exec()
        .then(user => {
            if (user) {
                if (user.password == req.body.password) {
                    console.log('valid ');
                    req.session.user = user;
                    // console.log(req.session.user);
                    res.send({
                        status: 200,
                        message: "user found",
                        user
                    })
                } else {
                    console.log(' not valid');
                    res.send({
                        status: 404,
                        message: "Wrong password",
                        user
                    })
                }
            } else {
                // console.log('verifycallback !user');
                res.send({
                    status: 404,
                    message: "user not found",
                    user
                })
            }
        })
        .catch(error => {
            console.error('Error:', error);

        });
});

app.get('/signIn', (req, res) => {
    if(req.session.user) {
        res.send({logginIn: true, user: req.session.user})
    } else {
        res.send({logginIn: false})
    }
})

app.listen(8000,()=>{
    console.log("server started on port 8000")
})