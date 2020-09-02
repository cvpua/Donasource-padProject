const mongoose = require("mongoose");
const multer = require('multer');
const fs = require('fs-extra');

const checkAuth = require('../auth/check-auth');
const {cloudinary} = require('../../config/cloudinary');

const Post = require('../models/post');
const User = require('../models/user');
const Notification = require('../models/notification');
const Item = require('../models/item');
const Image = require('../models/image');
const Comment = require('../models/comment');
const Donor = require ('../models/donor');
const Avail = require('../models/avail')
const { response } = require("express");
const image = require("../models/image");


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
    .sort({datePosted : -1})
    .populate("user","avatar name username")
    .populate("comments")
    .populate({path: 'items',
        populate : {
            path :' donor',
            populate : {
                path: 'user',
                select : 'name avatar'
            }
        }
    })
    .exec()
    .then(posts => {
        res.status(200).json({
            postCount: posts.length,
            response : posts
        })
    })
    

}

exports.getPost = (req,res) => {

    Post.findOne({_id : req.params.postId})
    .populate("user","avatar name username")
    .populate("comments")
    .populate({path: 'items',
        populate : {
            path :' donor',
            populate : {
                path: 'user',
                select : 'name avatar'
            }
        }
    })
    .exec()
    .then(post=>{
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(400).json({message : "Post not found",err})
    })
}

exports.makePost =  (req,res) => {



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
            
            User.findById(req.body.userId)
            .exec()
            .then(user => {
            req.body.items = JSON.parse(req.body.items)
            
            let imageArray = null;
            
            let items = null;    
            
            // if(req.body.items && req.body.items.length > 0){
            //     items = req.body.items.map(item =>{
                    
            //         const newItem = new Item({
            //             _id : new mongoose.Types.ObjectId(),
            //             name : item.name,
            //             amount : item.amount,
            //             total : item.total,
            //             donor : [],
            //             donee : []
            //         });
            //         newItem.save()
            //         .then(response => {
            //             console.log("Item saved!")
            //         })
            //         return newItem;
            //     });
            // }
            // const uploader = (path) => {
            //     cloudinary.uploads(file.path,"Images")
            //     .then(result => console.log(result))
            // }
            
            if(req.files && req.files.length >= 1){
                
                     imageArray = req.files.map(file =>{
                     
                         const image = new Image({
                            _id: new mongoose.Types.ObjectId(),
                            total: req.body.total,
                            image: {
                                imageName : file.filename, 
                                
                            }
                    });
                    
                    cloudinary.uploader.upload(file.path)
                    .then(response => {
                        image.url = response.url;
                        image.publicId = response.public_id;
                        image.save()
                        .then(response => {console.log("Image saved!")})
                    })
                    .catch(err =>{
                        console.log(err)
                    })
                    return(image)
                })
                
            }
            console.log(imageArray)
            const post = new Post({
                _id: new mongoose.Types.ObjectId(),
                user: req.body.userId,
                title : req.body.title,
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
                // let title = post.title.replace(/\s/g, ''); //remove spaces on strings
                // const dir = 'assets/' + post.user + '/posts/' + title + '_' + Date.now() + '/images/';

                // fs.move('./uploads',dir,(error)=>{
                //     if (error){
                //         res.status(500).json({
                //             message: "Error in moving images to the assets folder",
                //             error
                //     });
                //     }else{
                //         user.posts.push(post);

                //         if(post.type === "request"){
                //             user.requestPostCount = user.requestPostCount + 1;
                //         }else{
                //             user.donationPostCount = user.donationPostCount + 1;
                //         }
                //         user.postCount = user.postCount + 1;
                //         user.save()
                //         .then(
                //             post.save()
                //             .then(
                             
                //                 res.status(200).json({
                //                     message:"Post created!",
                //                     post,
                //                     user : {name : user.name, avatar : user.avatar, username :user.username}
                //                 })
    
                //             )
                //             .catch(err => {
                //                 console.log(err)
                //                 res.json(err)
                //             })
                //         )
                //         .catch(err => {
                //             console.log(err)
                //             res.json(err)
                //         })              
                //     }
                    
                // })
            }
            // There are no images, no need to make folders
            else{
               
                user.posts.push(post);
                post.type === "request" ? user.requestPostCount = user.requestPostCount + 1 : user.donationPostCount = user.donationPostCount + 1
                user.postCount = user.postCount + 1;
                user.save()
                .then(
                    post.save()
                    .then(
                        res.status(200).json({
                            message:"Post created!",
                            post,
                            user : {name : user.name, avatar : user.avatar, username :user.username}
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
                       
                                        
            }
        })
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
                userId : req.body.userId,
                content : req.body.content,
                postId : post._id
            })
            post.comments.push(comment) 
            post.save()
            .then( response => {    
                User.findById(post._doc.user)
                .populate('posts')
                .exec()
                .then(user =>{
                    if(user._id != req.body.userId){
                        const notification = new Notification({
                            type : "comment",
                            postId : post._id,
                            title : post.title,
                            user : req.body.userId,
                            date : Date.now(),
                        })
                        user.notifications.push(notification)
                        notification.save()
                        .then(response => console.log("Notif sent"))
                    }
                    user.save()
                    .then(response =>{
                        User.findById(req.body.userId)
                        .exec()
                        .then(userComment => {
                            userComment.postsCommented.push(post)
                            userComment.save()
                            .then( secondResponse =>{
                                comment.save()
                                .then(thirdResponse => {
                                    res.status(200).json({message : "Comment created!", comment})
                                })
                                
                            })
                        })
                        .catch(err => console.log({err,message: "Comment not created (1)"}))

                        
                    })
                })
                .catch(err =>{
                    console.log(err)
                })
            })
            .catch(err =>{
                res.status(500).json({message : "Comment not created (2)",err:err.response})
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
                                    User.findById(post.user)
                                    .exec()
                                    .then(targetUser => {
                                        if(post.user != req.body.userId){
                                            const notification = new Notification({
                                                type : "like",
                                                postId : post._id,
                                                title : post.title,
                                                user : req.body.userId,
                                                date : Date.now(),
                                            })
                                            targetUser.notifications.push(notification)
                                            notification.save()
                                            .then(response => {
                                                console.log("Notif sent!")
                                            })
                                        }
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
    .populate('items')
    .exec()
    .then(post => {
        
        if (post.status === "FULFILLED" || post.status === "UNFULFILLED"){
            res.status(406).json({
                message : "Post is already either FULFILLED or UNFULFILLED"
            })
        }
        else{
            let items = null;
            if(req.body.items && req.body.items.length > 0){
                items = req.body.items.map(item =>{
                    const newItem = new Item({
                        name : item.name,
                        amount : item.amount,
                        total : item.total,
                        donor : item.donor,
                       
                    });
                    return newItem;
                });
            }
            
            const newItems = req.body.items.map( item => {
                return item.name
            })
            
            const oldItems = post.items.map(item => {
                return item.name
            })
            
            newItems.forEach((item,index) => {
                const itemIndex = oldItems.indexOf(item)
                if(itemIndex >= 0){
                   
                    post.items[itemIndex].name = req.body.items[index].name;
                    post.items[itemIndex].amount = req.body.items[index].amount;
                    post.items[itemIndex].total = req.body.items[index].total;
                   
                    const donor = new Donor({
                        _id : mongoose.Types.ObjectId(),
                        user : req.body.items[index].donor.user,
                        amountDonated : req.body.items[index].donor.amountDonated,
                        date : Date.now()
                    })

                    
                    post.items[itemIndex].donor.push(donor)
                    post.items[itemIndex].save()
                    .then(response => {
                        donor.save()
                        .then(response => {
                            console.log("Items updated!")
                        })  
                    })
                    .catch(err => {
                        console.log(err);
                    })
              }
                                
            })
    
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

                        User.findById(post.user)
                        .exec()
                        .then(targetUser => {
                            const notification = new Notification({
                                type : "donate",
                                postId : post._id,
                                user : req.body.userId,
                                title : post.title,
                                date : Date.now()
                            })
                            targetUser.notifications.push(notification)
                            targetUser.save()
                            .then(response => {
                                notification.save()
                                .then( response => {
                                    res.status(200).json({message : "Item/s donated. Thank you!"})
                                })
                                
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
        }
    })
    .catch( err => {
      
        res.status(500).json({message : "Post not found", err : err.response})
    })
}

exports.request = (req,res) => {

    Post.findById(req.params.postId)
    .populate(
        {path: 'user',
         select: 'avails'
    })
    .exec()
    .then(post => {
        User.findById(req.body.userId)
        .select("username name avatar")
        .exec()
        .then(user => {
            const avail = new Avail({
                _id : mongoose.Types.ObjectId(),
                user : user,
                post : post,
                reason : req.body.reason,
                title : post.title,
                items : req.body.items,
                status : "PENDING"
            })

            post.user.avails.push(avail)
            avail.save()
            .then(response =>{
                post.user.save()
                .then(response => {
                    res.json({
                        message : "Request sent to the OP"
                    })
                })
            })
        })
    })
}


exports.deletePost = (req,res) => {
    
    Post.findById(req.params.postId)
    .exec()
    .then(post => {
       
        if(post && post.images && post.images.length > 0){
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
        .then(response => {
            User.findOne({_id : post.user})
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