const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const fs = require('fs-extra');

const checkAuth = require('../auth/check-auth');

const Post = require('../models/post');
const User = require('../models/user');
const Item = require('../models/item');
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

    User.find()
    .select("posts")
    .then( Users =>{ 
        const response = Users.map(user => {
            
            if(user.posts.length >= 1){
               
                return (user.posts)
                }
            })

            let singleResponse = [];    //convert the 2d array into a single array
            response.forEach( userPosts => {
                if(userPosts){
                    singleResponse = singleResponse.concat(userPosts);
                }
            })
            
            res.status(200).json(singleResponse)
        })
})


//tester route



//make a post
router.post('/api/posts',checkAuth,(req,res) => {

    fs.ensureDirSync('./uploads');

    upload(req,res,function(err){
        if(err){
            
            res.status(415).json({
                message:"Error in uploading images in the uploads folder",
                response: err
            });
        }
        else{

            let title = req.body.title.replace(/\s/g, '');

            const dir = 'assets/' + req.body.author + '/posts/' + title + '_' + Date.now() + '/images/';

            let imageArray = null;
            if(req.files && req.files.length > 1){
                
                     imageArray = req.files.map(file =>{
                       
                         image = new Item({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            amount: req.body.amount,
                            total: req.body.total,
                            image: {
                                imageName : file.filename, 
                                url: 'http://localhost:5000/'+dir+file.filename 
                        }});
                        return(image)
                })
                
            }
            
           
            const post = new Post({
                _id: new mongoose.Types.ObjectId(),
                author : req.body.author,
                title : req.body.title,
                description : req.body.description,
                status : req.body.status,
                location : req.body.location,
                tags : req.body.tags,
                datePosted : Date.now(),
                photos : imageArray
            })   
            

            

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
    });    
    
});

// get a post
router.get('/api/posts/:postId',(req,res) => {

    User.findOne({username : req.body.username})
    .exec()
    .then (user =>{
        if(user.postCount > 0){
            user.posts.map(post => {
                if(post._id == req.params.postId){
                    res.status(200).json(post);
                }                  
            })
        }
    })
    .catch(err =>{
        res.status(500).json(err)
    })
})



// delete a user
router.delete('/api/post/:postId',checkAuth,(req,res) => {

    
});

module.exports = router;