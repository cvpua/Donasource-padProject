const mongoose = require("mongoose");
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('../models/user');


exports.signup = (req,res) => {
   
    User.find({email : req.body.email})
    .exec()
    .then( user => {
        if(user.length >= 1){
            return res.status(409).json({
                message : "Email is already used"
            })
        }else{
            
            const salt = req.body.username;
            
            brcypt.genSalt(10,(err,salt) => {
                brcypt.hash(req.body.password,salt,(err,hash) => {

                    if(err){
                        res.status(500).json({err});
                        return;
                    }else{
                        const newUser = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username : req.body.username,
                            password : hash,  
                            name : {
                                firstName : req.body.firstName,
                                lastName : req.body.lastName
                            },
                            email : req.body.email,
                            location : req.body.location,
                            contactNumber : req.body.contactNumber,
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
                });
            });
            
            
        }
    })
}

exports.login = (req,res) => {
    
    User.findOne({email : req.body.email})
    .exec()
    .then(user => {
        if (!user ){
            
            return res.status(401).json({
                message : "Email/password is does not exist"
            })
        }
        
        brcypt.compare(req.body.password,user.password, (err,result) => {
            
            if (!result || err){   
                
                return res.status(401).json({
                    message: "Email/password is does not exist",err
                  });
            }
            if (result){
                const token = 
            jwt.sign({
                email : user.email,
                userId : user._id, 
                
            },
            process.env.JWT_KEY,
            {
                expiresIn : "1h"
            })
                return res.status(200).json({
                    message : "Logged in",
                    username : user.username,
                    email : user.email,
                    isLoggedIn : true,
                    
                    token : token
                    
                });
            }
        });
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}


