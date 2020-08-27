const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Notification = require('../models/notification');
const Post = require('../models/post');
const { response } = require("express");

exports.getAllUsers = (req,res) => {
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
}

exports.getUser = (req,res) =>{
    User.findOne({_id : req.params.userId})
    .populate('posts')
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
    .exec()
    .then(user => {
        res.status(200).json(
            {
                username : user.username,
                name : user.name.firstName + " " + user.name.lastName,
                notifications : user.notifications
            }
        )
    })
    .catch(err => {
        console.log(err)
    })
}

exports.getNotification = (req,res) => {
    
    User.findById(req.params.userId)
    .exec()
    .then(user => {
        
        const notifIndex = user.notifications.findIndex((notif,index) => {
            return String(notif._id) === req.params.notifId;
        })
        
        Post.findById(user.notifications[notifIndex].postId)
        .exec()
        .then(post => {
            user.notifications[notifIndex].isRead = true;
            user.save()
            .then(response => {
                res.status(200).json(post);
            })
            .catch()
        })
        .catch()
        
    })
    .catch()
}



