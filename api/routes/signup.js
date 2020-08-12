const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");



const UserSignup = require('../models/user');
const { response } = require('express');



router.post('/api/signup',(req,res) => {
   
    UserSignup.find({email : req.body.email})
    .exec()
    .then( user => {
        if(user.length >= 1){
            return res.status(409).json({
                message : "Email is already used"
            })
        }else{
                const newUser = new UserSignup({
                _id: new mongoose.Types.ObjectId(),
                username : req.body.username,
                password : req.body.password,  //saving of password is stills shit (no encryption)
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                contactNumber : req.body.contactNumber,
                description : " ",
                postCount : 0,
            })
          
            newUser.save()
            .then( user => {
                if (user){
                    res.status(200).json({
                        message : "User created!"
                    })
                }
            })
            .catch(error =>{
                const message = error.keyValue ? "Username is already used" : "Invalid email format"
                    res.status(401).json({
                        error
                    })
            })
        }
    })
}) 

module.exports = router;