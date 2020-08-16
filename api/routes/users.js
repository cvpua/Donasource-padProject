const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

// const multer = require('multer');
// const upload = multer({dest : 'uploads/'});




const User = require('../models/user');

// get all user
router.get('/api/users',(req,res) => {
    User.find()
    .exec()
    .then((users) =>{
    
    const response =  
    users.map(user =>{
            return (
                {
                    userId: user._id,
                    email : user.email,
                    username : user.username,
                    name : user.name.firstName + " " + user.name.lastName,
                    posts : user.posts
                }
            )
        })
        res.status(200).json(response)
    })
})


// get one user
router.get('/api/users/:userId',(req,res) =>{
    User.findOne({_id : req.params.userId})
    .exec()
    .then( user => {
        if (!user){
            return res.status(401).json({
                message : "Username/password does not exist"
            })
        }else{
            return res.status(200).json({
                user
            })
        }
    })
    .catch(error => {
        res.status(400).json({
            message : "User not found",
            error : error.response
        })
    })
})



// get all post liked by a user
router.get('/api/users/:userId/likedPosts',(req,res) => {

    User.findOne({_id : req.params.userId})
    .populate("likedPosts")
    .exec()
    .then(user => {
       
        res.status(200).json(user.likedPosts)
    })
    .catch(err => {
        res.status(400).json({message: "User not found",err})
    })
    
})

module.exports = router;