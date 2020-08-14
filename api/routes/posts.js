const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const fs = require('fs-extra');

const checkAuth = require('../auth/check-auth');

const Post = require('../models/post');
const User = require('../models/user');
const Item = require('../models/item');
const Image = require('../models/image');
const Comment = require('../models/comment');
const { response } = require('express');




// uploading an image is not yet done due to path problems

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './uploads'); 
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
        fileSize: 1024 * 1024 * 3
    },
    fileFilter

}).array('photos',3);



//get all posts
router.get('/api/posts',(req,res) => {


    Post.find()
    .populate("likers", "username")
    .exec()
    .then(Posts => {
        const response = Posts.map(post => {
            return post
        })
        res.status(200).json({
            postCount: response.length,
            response})
    })
    

})

// get a post
router.get('/api/posts/:postId',(req,res) => {

    Post.findOne({_id : req.params.postId})
    .exec()
    .then(post=>{
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(400).json({message : "Post not found",err})
    })
})


//make a post
router.post('/api/posts',checkAuth,(req,res) => {

    fs.ensureDirSync('./uploads');

    upload(req,res,function(err){
        if(err){
            
            res.status(415).json({
                message:"Error in uploading images in the uploads folder (only 3 images are allowed per post)",
                response: err
            });
        }
        else{

            let title = req.body.title.replace(/\s/g, ''); //remove spaces on strings

            const dir = 'assets/' + req.body.author + '/posts/' + title + '_' + Date.now() + '/images/';

            let imageArray = null;
            if(req.files && req.files.length > 1){
                
                     imageArray = req.files.map(file =>{
                       
                         image = new Image({
                            _id: new mongoose.Types.ObjectId(),
                            total: req.body.total,
                            image: {
                                imageName : file.filename, 
                                url: 'http://localhost:5000/'+dir+file.filename 
                            }
                    });
                        return(image)
                })
                
            }
            
           
            const post = new Post({
                _id: new mongoose.Types.ObjectId(),
                avatar : req.body.avatar,
                title : req.body.title,
                author : req.body.author,
                type : req.body.type,
                status : req.body.status,
                description : req.body.description,
                items : [],
                location : req.body.location,
                tags : req.body.tags,
                datePosted : Date.now(),
                deadline: Date.now(),
                photos : imageArray,
                comments : []
            })   
            
            // There is images and needs to create folders and move images
            if(req.files.length > 0){ 
              
                fs.move('./uploads',dir,(error)=>{
                
                    if (error){
                
                        res.status(500).json({
                            message: "Error in moving images to the assets folder",
                            error
                            
                    });
                    }else{
                        User.findOne({email : req.userData.email}).exec()
                        .then(user => {
                            user.posts.push(post);

                            if(post.type === "request"){
                                user.requestCount = user.requestCount + 1 
                            }else{
                                user.donationCount = user.donationCount + 1;
                            }
                            user.postCount = user.postCount + 1;
                            user.save()
                            .then(
                                post.save()
                                .then(
                                    res.status(200).json({
                                        message:"Post created!",
                                        post
                                    })
                                )
                                .catch(err => {
                                    console.log(err)
                                    res.json(err)
                                })
                            )
                            .catch(err => {
                                console.log(err)
                                res.json(err)
                            })
                        })
                        .catch( err => {
                            
                            console.log(err)
                            res.status(500).json("Error occured")
                        })                   
                    }
                    
                })
            }
            // There are no images, no need to make folders
            else{
                User.findOne({email : req.userData.email}).exec()
                        .then(user => {
                            user.posts.push(post);
                            post.type === "request" ? user.requestCount = user.requestCount + 1 : user.donationCount = user.donationCount + 1
                            user.postCount = user.postCount + 1;
                            user.save()
                            .then(
                                post.save()
                                .then(
                                    res.status(200).json({
                                        message:"Post created!",
                                        post
                                    })
                                )
                                .catch(err => {
                                    console.log(err)
                                    res.json(err)
                                })
                            )
                            .catch(err => {
                                console.log(err)
                                res.json(err)
                            })
                        })
                        .catch( err => {
                            
                            console.log(err)
                            res.status(500).json("Error occured")
                        })                   
            }
        }
    });    
    
});

//make a comment
router.patch('/api/posts/:postId/comments',(req,res) => {
    
    Post.findOne({_id : req.params.postId})
    .exec()
    .then(
        post => {
            const comment = new Comment({
                _id: new mongoose.Types.ObjectId(),
                user: {
                    name : req.body.username,
                    avatar : req.body.avatar,
                },
                content : req.body.content,
                postId : post._id
            })
            let comments = post.comments;
            comments.push(comment)
            post.comments = comments;
            post.save()
            .then( response => {
                res.status(200).json({message : "Comment created!", post})
            })
            .catch(err =>{
                res.status(500).json({message : "Comment not created",err})
            })
    })
    .catch(err => {
        res.status(400).json({message : "Post not found!",err})
    })

    
});

//like a post
router.patch('/api/posts/:postId/likes',(req,res) => {
    
    
    User.findOne({_id : req.body.userId})
    .exec(function(err,foundUser){
        if(!err && foundUser){
            const alreadyLiked = foundUser.likedPosts.includes(req.params.postId);
            if(alreadyLiked){
                Post.findOne({_id : req.params.postId})
                .exec()
                .then(
                     post => {
                        let likes = post.likes;
                        likes = likes - 1;
                        post.likes = likes;
                        post.likers = post.likers.filter(userId => String(userId) !== req.body.userId)
                        post.save()
                        .then( response => {
                            foundUser.likedPosts = foundUser.likedPosts.filter(postId => String(postId) !== req.params.postId)
                            foundUser.likedPostsCount = foundUser.likedPostsCount - 1;
                            foundUser.save()
                                .then (response => {
                                     res.status(200).json({message : "Post unliked!", post})
                                })     
                            
                        })
                        .catch(err =>{
                            res.status(500).json({message : "Post not unliked!",err})
                        })
                    })
                    .catch(err => {
                        res.status(400).json({message : "Post not found!",err})
                    })    
            }else{
                Post.findOne({_id : req.params.postId})
                .exec()
                .then(
                     post => {
                        let likes = post.likes;
                        likes = likes + 1;
                        post.likes = likes;
                        post.likers.push(req.body.userId);
                        post.save()
                        .then( response => {
                            foundUser.likedPosts.push(post);
                            foundUser.likedPostsCount = foundUser.likedPostsCount + 1;
                            foundUser.save()
                                .then (response => {
                                     res.status(200).json({message : "Post liked!", post})
                                })     
                            
                        })
                        .catch(err =>{
                            res.status(500).json({message : "Post not liked!",err})
                        })
                    })
                    .catch(err => {
                        res.status(400).json({message : "Post not found!",err})
                    })
            }

            
        }else{
            res.status(500).json({message : "User not found", err})
        }
    })
    
    

    

});




module.exports = router;