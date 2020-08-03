const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");



const User = require('../../models/user');
const users = []


router.get('/api/users',(req,res) => {
    res.json(users);
})

router.post('/api/users',(req,res) => {
   
    const user = new User({
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
    res.json(user)

}) 

module.exports = router;