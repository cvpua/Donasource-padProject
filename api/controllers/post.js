const mongoose = require("mongoose");
const multer = require('multer');
const fs = require('fs-extra');

const checkAuth = require('../auth/check-auth');

const Post = require('../models/post');
const User = require('../models/user');
const Notification = require('../models/notification');
const Item = require('../models/item');
const Image = require('../models/image');
const Comment = require('../models/comment');
const { response } = require("express");


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

}).array('images',3);


exports.getAllPosts = (req,res) => {

    Post.find()
    .exec()
    .then(Posts => {
        const response = Posts.map(post => {
           
            return post
        })
       response.sort((a,b) => {
            let dateA = new Date(a.datePosted);
            let dateB = new Date(b.datePosted);
            return dateB - dateA;
        });
        res.status(200).json({
            postCount: response.length,
            response})
    })
    

}

exports.getPost = (req,res) => {

    Post.findOne({_id : req.params.postId})
    .exec()
    .then(post=>{
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(400).json({message : "Post not found",err})
    })
}


exports.makePost = (req,res) => {

    
    fs.ensureDirSync('./uploads');

    upload(req,res,function(err){
        if(err){
            console.log(err)
            res.status(415).json({
                message:"Error in uploading images in the uploads folder (only 3 images are allowed per post)",
                response: err
            });
        }
        else{
          
            req.body.items = JSON.parse(req.body.items)
            
            let title = req.body.title.replace(/\s/g, ''); //remove spaces on strings

            const dir = 'assets/' + req.body.author + '/posts/' + title + '_' + Date.now() + '/images/';

            let imageArray = null;
            
            let items = null;    
            
            if(req.body.items && req.body.items.length > 0){
                items = req.body.items.map(item =>{
                    
                    const newItem = new Item({
                        name : item.name,
                        amount : item.amount,
                        total : item.total,
                        donor : [],
                        donee : []
                    });
                    return newItem;
                });
            }
            
            
            if(req.files && req.files.length >= 1){
                
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
                userId: req.body.userId,
                avatar : req.body.avatar,
                title : req.body.title,
                name : JSON.parse(req.body.name),
                username : req.body.username,
                type : req.body.type,
                status : req.body.status,
                description : req.body.description,
                items : items,
                location : req.body.location,
                tags : req.body.tags,
                datePosted : Date.now(),
                deadline: req.body.deadline,
                images : imageArray,
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
                                user.requestPostCount = user.requestPostCount + 1;
                            }else{
                                user.donationPostCount = user.donationPostCount + 1;
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
                            post.type === "request" ? user.requestPostCount = user.requestPostCount + 1 : user.donationPostCount = user.donationPostCount + 1
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
    
}





exports.makeComment = (req,res) => {
    
    Post.findOne({_id : req.params.postId})
    .exec()
    .then(
        post => {
            
            const comment = new Comment({
                _id: new mongoose.Types.ObjectId(),
                user: {
                    username : req.body.username,
                    name : {
                        firstName : req.body.firstName,
                        lastName : req.body.lastName
                    },
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
                  
                User.findById(post.userId)
                .exec()
                .then(user =>{
                    
                    const notification = new Notification({
                        postId : post._id,
                        userId : req.body.userId,
                        username : req.body.username,
                        name : {
                            firstName : req.body.firstName,
                            lastName : req.body.lastName
                        },
                        response : req.body.name.firstName + " " + req.body.name.lastName + " commented on your post"
                    })
                    user.notifications.push(notification)
                    user.save()
                    .then(response =>{
                        res.status(200).json({message : "Comment created!", post})
                    })
                })
                .catch(err =>{
                    console.log(err)
                })


                
            })
            .catch(err =>{
                res.status(500).json({message : "Comment not created",err:err.response})
            })
    })
    .catch(err => {
        res.status(400).json({message : "Post not found!",err})
    })

    
}

exports.likePost = (req,res) => {
    
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
                                    User.findById(post.userId)
                                    .exec()
                                    .then(targetUser => {
                                        const notification = new Notification({
                                            postId : post._id,
                                            userId : req.body.userId,
                                            username : req.body.username,
                                            name : {
                                                firstName : req.body.firstName,
                                                lastName : req.body.lastName
                                            },
                                            response : req.body.name.firstName + " " + req.body.name.lastName + " liked your post",
                                            date : Date.now()
                                        })
                                        targetUser.notifications.push(notification)
                                        targetUser.save()
                                        .then(response => {
                                            res.status(200).json({message : "Post liked!", post})
                                        })
                                        .catch(err =>{
                                            console.log(err)
                                        })
                                    })
                                    .catch(err =>{
                                        console.log(err)
                                    })
                                     
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
    
}




exports.donate = (req,res) => {
   
    
    Post.findById(req.params.postId)
    .exec()
    .then(post => {
        let items = null;
        if(req.body.items && req.body.items.length > 0){
            items = req.body.items.map(item =>{
                const newItem = new Item({
                    name : item.name,
                    amount : item.amount,
                    total : item.total,
                    donor : item.donor,
                    date : Date.now()
                });
                return newItem;
            });
        }
        post.items = items; 
        let isFulfilled = true;
        post.items.forEach(item => {
            if(item.amount !== item.total){
                isFulfilled = false;
            }
        });

        if (isFulfilled) post.status = "FULFILLED"
        
        post.save()
        .then( response => {

            User.findById(req.body.userId)
            .exec()
            .then(user => {
                user.donationGiven = user.donationGiven + 1;
                user.save()
                .then(response => {

                    User.findById(post.userId)
                    .exec()
                    .then(targetUser => {
                        const notification = new Notification({
                            postId : post._id,
                            userId : req.body.userId,
                            username : req.body.username,
                            name : {
                                firstName : req.body.firstName,
                                lastName : req.body.lastName
                            },
                            response : req.body.name.firstName + " " + req.body.name.lastName + " donated on your post",
                            date : Date.now()
                        })
                        targetUser.notifications.push(notification)
                        targetUser.save()
                        .then(response => {
                            res.status(200).json({message : "Item/s donated. Thank you!"})
                        })
                        .catch(err =>{
                            console.log(err)
                        })
                    })
                    .catch(err =>{
                        console.log(err)
                    })
                })
            })
            .catch(err =>{
                res.json({message: "User not found"})
            })
            
        })
        .catch( err => {
            res.status(500).json({message : "Item/s not donated", err})
        })
    })
    .catch( err => {
      
        res.status(500).json({message : "Post not found", err})
    })
}


exports.deletePost = (req,res) => {
    
    Post.findById(req.params.postId)
    .exec()
    .then(post => {
        
        if(post.images){
            post.images.map(image => {
                
                let imageDir = image.image.url.replace("http://localhost:5000/","");
                fs.unlink(imageDir,(err => {
                    if(err) throw err;
                    
                }))
            })
            console.log("Folder/s deleted");
        }
        Post.deleteOne({_id : req.params.postId})
        .exec()
        .then(post => {
        
            User.findOne({username : req.body.username})
            .exec()
            .then(user =>{
                user.posts = user.posts.filter(post => String(post._id) !== req.params.postId)
                user.postCount = user.postCount - 1;

                post.type === "request" ? post.requestPostCount = post.requestPostCount - 1 : post.donationPostCount = post.donationPostCount - 1;

                user.save()
                .then(response => {
                    res.status(200).json({message : "Post deleted!",post})
                })
                .catch( err =>
                    console.log(err)
                )
            })
            .catch( err =>
                console.log(err)
            )
        })
        .catch(err => {
            res.status(500).json({message: "Unable to delete post",
            err})
        
    })
    })
    .catch(err =>{
        console.log(err)
    })
    
    
    
}