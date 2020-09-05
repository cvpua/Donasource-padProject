const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs-extra');
const bcrypt = require('bcrypt');

const Image = require('../models/image');
const User = require('../models/user');
const Notification = require('../models/notification');
const Post = require('../models/post');
const { response } = require("express");
const Avail = require("../models/avail");
const Donee = require("../models/donee");


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './profilePictures'); 
    },
    filename : function(req,file,cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

// File type checker
const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null,true);
    }else{
        cb(new Error("Wrong file format"),false);
    }
}

const upload = multer({
    storage, 
    limits: {
        fileSize: 1024 * 1024 * 1
    },
    fileFilter

}).single('avatar');




exports.getAllUsers = (req,res) => {
    User.find()
    .exec()
    .then((users) =>{
        res.status(200).json(users)
    })
}

exports.getUser = (req,res) =>{
    User.findOne({username : req.params.username})
    .populate({
        path: 'posts',
        populate: {
            path: 'user',
            select: 'username avatar name'
        }})
    .populate({
        path: 'posts',
        populate: {
            path: 'items',
            populate : {
                path :' donor',
                select: 'amountDonated',
                populate : {
                    path: 'user',
                    select : 'name username avatar'
                }
            }
        }
    })
    .populate({
        path: 'posts',
        populate: {
            path: 'items',
            populate : {
                path :' donee',
                select: 'amountRequested',
                populate : {
                    path: 'user',
                    select : 'name username avatar'
                }
            }
        }
    })
    .populate({
        path: 'posts',
        populate: {
            path: 'likers',
            select: 'name username avatar'
        }
    })
    .populate({
        path: 'posts',
        populate: {
            path: 'images'
        }})
    .exec()
    .then( user => {
        if (!user){
            return res.status(401).json({
                message : "Username/password does not exist"
            })
        }else{

            user.posts.sort((a,b) => {
                let dateA = new Date(a.datePosted);
                let dateB = new Date(b.datePosted);
                return dateB - dateA;
            });

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
}


exports.getLikedPosts = (req,res) => {

    User.findOne({_id : req.params.userId})
    .populate("likedPosts")
    .exec()
    .then(user => {
        res.status(200).json(user.likedPosts)
    })
    .catch(err => {
        res.status(400).json({message: "User not found",err})
    })
    
}

exports.getAllNotifications = (req,res) => {

    User.findById(req.params.userId)
    .populate({path: 'notifications',
    options : {sort : {date : -1}},
    populate : {
        path: 'user',
        select : 'name avatar username'
    }
    })
    .exec()
    .then(user => {
            
        res.status(200).json(
            {
                notificationCount : user.notifications.length,
                notifications : user.notifications
            }
        )
    })
    .catch(err => {
        console.log(err)
    })
}

exports.seeNotification = (req,res) => {
    
    Notification.findById(req.params.notifId)
    .exec()
    .then( notification => {
        notification.seen = true;
        notification.save()
        .then(response => {
            res.json({message : "Notif seen"})
        })
    })
    .catch()
}

exports.editUser = async(req,res) => {
    console.log('Body: ', req.body)
    console.log('Files: ', req.files)
    const toUpdate = {}
    for(const property of Object.entries(req.body)){
        if( toUpdate[property[0]] === "name"){
            toUpdate[property[0]] = JSON.parse(property[1])
        }else{
        toUpdate[property[0]] = property[1];
        }
    }    

    if(req.files && req.files.length > 0){
        const image = new Image ({
            _id : mongoose.Types.ObjectId(),
            imageName : req.files[0].filename,
            imagePath : req.files[0].filepath,
        })
        toUpdate[avatar] = image;

        try{
            const path = image.imagePath;
            const uploadedResponse = await cloudinary.uploader.upload(path);
            image.url = uploadedResponse.url;
            image.publicId = uploadedResponse.public_id;
            image.save()
            .then(console.log("Image saved!"))
        } catch(err){
                console.log(err)
        } 
    }

    User.updateOne({_id : req.params.userId},{$set : toUpdate})
    .exec()
    .then(response => {
        User.findById(req.params.userId)
        .exec()
        .then(user => { 
            res.json({message : "User updated!", user});
        })
    })
    .catch(err => {
        res.json({message: "User not updated", err})
    })
}

exports.changePassword = (req,res) => {
    User.findById(req.params.userId)
    .exec()
    .then(user => {

        if(req.body.newPassword !== req.body.newPasswordCopy){
            res.status(400).json({message : "New password doesn't match"})
        }

        else{
            bcrypt.compare(req.body.oldPassword,user.password, (err,result)=> {

                if (!result || err){   
                    
                    return res.status(401).json({
                        message: "Incorrect password",err
                    });
                }
                if(result){
                    bcrypt.genSalt(10,(err,salt) => {
                        bcrypt.hash(req.body.newPassword,salt,(err,hash) => {
                            if(err){
                                res.status(500).json({err});
                                return;
                            }else{
                                
                                user.password = hash;
                                user.save()
                                .then( user => {
                                    if (user){
                                        res.status(200).json({
                                            message : "Password updated!"
                                        })
                                    }
                                })
                                .catch(error =>{
                                    // const message = error.keyValue ? "Username is already used" : "Invalid email format"
                                        res.status(401).json({
                                            error
                                        })
                                })
                            }


                        })
                    })

                }
            })
        }
    })
    .catch(err =>{
        console.log(err)
    })
}

exports.getAvails = (req,res) => {
    User.findById(req.params.userId)
    .select('username avatar name avails')
    .populate({path: 'avails', 
        populate : {path: 'user',
        select : 'username name avatar'
        }
    })
    .populate({path: 'avails',
        options : {sort : {date : -1}},
        populate : {path: 'post',
        select : 'title',}
    })
    .populate({path: 'avails',
        options : {sort : {date : -1}},
        populate : {path: 'items',
        populate: {path: 'itemId',
        select: 'name'}
        }
    })
    .exec()
    .then(user => {
        res.json(user)
    })
    .catch(error => {
        res.json({message:err})
        console.log(err)
    })
}

exports.respondToAvails = (req,res) => {
    
    if(req.body.response === "ACCEPT"){
        User.findById(req.params.userId)
        .select('username name avatar avails')
        .populate({path: 'avails', 
        populate : {path: 'user',
        select : 'username name avatar'
            }
        })
        .populate({path: 'avails',
            options : {sort : {date : -1}},
            populate : {path: 'post',
            select : 'title'}
        })
        .populate({path: 'avails',
            options : {sort : {date : -1}},
            populate : {path: 'items',
            populate: {path: 'itemId',
            select: 'name'}
            }
        })
        .exec()
        .then(user => {
        
            Avail.findById(req.params.availId)
            .populate({path: 'post',select : 'items title status',
                populate : { path : 'items',
                }
            })
            .populate({path: 'user',select: 'avatar username name notifications donationRequested avails'})
            .exec()
            .then(avail => {
                
            let message, status;
            let validRequest = true;

            if(avail.post.status != "FULFILLED"){
                const request = avail.items.map(item => item.itemId)
                const availableItems =  avail.post.items.map(item => item._id)

                for(let i = 0; i < request.length; i ++){
                    const itemIndex = availableItems.indexOf(request[i]);
                    if(avail.post.items[itemIndex].amount - avail.items[i].amountRequested < 0){
                        validRequest = false;
                        break;
                    }
                }
                if(validRequest){
                    request.forEach((item,index) => {
                        const itemIndex = availableItems.indexOf(item);
                        const donee = new Donee({
                            _id : mongoose.Types.ObjectId(),
                            user : avail.user,
                            reason : avail.reason,
                            amountRequested : avail.items[index].amountRequested
                        })
                        avail.post.items[itemIndex].amount = avail.post.items[itemIndex].amount - avail.items[index].amountRequested; 
                        avail.post.items[itemIndex].donee.push(donee)
                        avail.post.items[itemIndex].save()
                        .then(
                            donee.save()
                            .then(console.log("Donee saved!"))
                        )
                        message = "Item/s were given to the donee"
                        status = "SUCCESS"
                    })
                    
    
                    let isFulfilled = true;
                    avail.post.items.forEach(item => {
                        if(item.amount !== 0){
                            isFulfilled = false;
                        }
                    });
                    if (isFulfilled){
                        avail.post.status = "FULFILLED"
                        avail.post.save()
                        .then(console.log("Post fulfilled!"))
                    }
    
                    const notification = new Notification({
                        _id: mongoose.Types.ObjectId(),
                        type : "accept",
                        postId : avail.post._id,
                        user : req.params.userId,
                        title : avail.post.title,
                        date : Date.now()
                    })
                    notification.save(err => {
                        if(err) throw err;
                    })
                    avail.user.notifications.push(notification)
                    avail.user.donationRequested = avail.user.donationRequested + 1
                    avail.user.save()
                    .then(console.log("Notif sent to the donee"))
    
                    avail.status = "ACCEPTED"
                    avail.save()
                    .then(console.log(`Avail ${avail._id} updated`))
                }

                
            }
            else{
                message = "No items remaining, post were already fulfilled"
                status = "FAILED"
            }
            if(!validRequest){
               
                
                res.json({message: "Cannot accept request. Insufficient items",status: "PENDING",avails : user.avails})
            }else{
                user.avails = user.avails.filter(request => request._id != String(avail._id) )
                user.save(err => {
                    if(err) throw err;
                })
                
                res.json({message,status,avails : user.avails})
            }
                
            })

        })



        
    }
    if(req.body.response === "REJECT"){

        User.findById(req.params.userId)
        .select('username name avatar avails')
        .populate({path: 'avails', 
        populate : {path: 'user',
        select : 'username name avatar'
            }
        })
        .populate({path: 'avails',
            options : {sort : {date : -1}},
            populate : {path: 'post',
            select : 'title'}
        })
        .populate({path: 'avails',
            options : {sort : {date : -1}},
            populate : {path: 'items',
            populate: {path: 'itemId',
            select: 'name'}
            }
        })
        .exec()
        .then(user => {
            Avail.findById(req.params.availId)
            .populate({path: 'post',select : 'items title',
                populate : { path : 'items',
                }
            })
            .populate({path: 'user',select: 'avatar username name notifications avails'})
            .exec()
            .then(avail => {
                const notification = new Notification({
                    _id: mongoose.Types.ObjectId(),
                    type : "reject",
                    postId : avail.post._id,
                    user : req.params.userId,
                    title : avail.post.title,
                    date : Date.now()
                })
                notification.save(err => {
                    if(err) throw err;
                })

                avail.user.notifications.push(notification)
                avail.user.save()
                .then(console.log("Notif sent to the donee"))

                user.avails = user.avails.filter(request => request._id != String(avail._id) )
                user.save(err => {
                    if(err) throw err;
                })
                res.json({message : "Avail rejected!",status:"REJECTED",avails : user.avails})
            })
        })

        

    }
}