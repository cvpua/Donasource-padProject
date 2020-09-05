const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('../models/user');
const Blacklist = require('../models/blacklist');
const { reset } = require("nodemon");


exports.signup = (req,res) => {
   
    User.find({email : req.body.email})
    .exec()
    .then( user => {
        if(user.length >= 1){
            return res.status(409).json({
                message : "Email is already used"
            })
        }else{

            User.find({username : req.body.username})
            .exec()
            .then(user => {
                if(user.length >= 1){
                    return res.status(409).json({
                        message : "Email is already used"
                    })
                }else{
                    const salt = req.body.username;
            
                    bcrypt.genSalt(10,(err,salt) => {
                        bcrypt.hash(req.body.password,salt,(err,hash) => {
        
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
                                    contactNumber : req.body.contactNumber
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
    })
}

exports.login = (req,res) => {
    
    User.findOne({email : req.body.email})
    .select("_id name username email password")
    .populate("avatar")
    .exec()
    .then(user => {
        if (!user ){
            
            return res.status(401).json({
                message : "Email/password is does not exist"
            })
        }
        
        bcrypt.compare(req.body.password,user.password, (err,result) => {
            
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
                    user:user,
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


exports.logout = (req,res) => {
    
    const token = req.headers.authorization.split(" ")[1]
    const blacklist = new Blacklist({
        _id: new mongoose.Types.ObjectId(),
        token : token,
        createdAt : Date.now()
    })
    blacklist.save()
    .then(response => {
        res.json({message:"logged out!"})
    })
    .catch(err => {
        console.log(err)
        res.json({message:err})
    })
}


