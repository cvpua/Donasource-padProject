const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({dest : 'uploads/'});



const User = require('../models/user');


router.get('/api/users',(req,res) => {
    res.json(users);
})


router.post('/api/login',(req,res) => {
    User.find({username : req.body.username})
    .exec()
    .then(user => {
        if (user.length < 1){
            return res.status(401).json({
                message : "Username/password does not exist"
            })
        }
        if (user[0].password === req.body.password){
            const token = 
            jwt.sign({
                email : user[0].email,
                userId : user[0]._id 
            },
            process.env.JWT_KEY,
            {
                expiresIn : "1h"
            })


            return res.status(200).json({
                message : "Logged in",
                token : token
            })
        }else{
            return res.status(401).json({
                message : "Username/password does not exist"
            })
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error : err})
    })
})


router.post('/api/users',(req,res) => {
   
    const user = new UserProfile({
        _id: new mongoose.Types.ObjectId(),
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        contactNumber : req.body.contactNumber,
        description : req.body.description,
        requestCount : req.body.requestCount,
        requestPosts : [...req.body.requestPosts]
    })
    res.json(user.requestPosts[0])

}) 

module.exports = router;