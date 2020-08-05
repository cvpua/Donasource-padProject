const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");



const UserProfile = require('../../models/userProfile');
const UserSignup = require('../../models/userSignup');
const localdb = require('../../LocalDB/Posts');



router.get('/api/signup',(req,res) => {
    res.send("Hello")
})

router.post('/api/signup',(req,res) => {
   
    const newUser = new UserSignup({
        _id: new mongoose.Types.ObjectId(),
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        contactNumber : req.body.contactNumber
    })
    


    const user = new UserProfile({
        _id: new mongoose.Types.ObjectId(),
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        contactNumber : req.body.contactNumber,
        description : "",
        requestCount : 0,
        requestPosts : []
    })
    
    localdb.push(newUser);
    localdb.push(user);

    res.json(localdb);
}) 

module.exports = router;