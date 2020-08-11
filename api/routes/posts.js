const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const fs = require('fs-extra');

const checkAuth = require('../auth/check-auth');

const RequestPost = require('../models/requestPost');
const User = require('../models/user');


// uploading an image is not yet done due to path problems

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './uploads'); 
    },
    filename : function(req,file,cb){
        cb(null,new Date().toISOString() + file.originalname);
    }
});

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

}).array('requestImage',2);



//get all posts
router.get('/api/posts',(req,res) => {

    User.find()
    .select("requestPosts")
    .then( Users =>{ 
        const response = Users.map(user => {
            
            if(user.requestPosts.length >= 1){
               
                return (user.requestPosts)
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


//make a post
router.post('/api/posts',checkAuth,(req,res) => {

    upload(req,res,function(err){
        if(err){
            res.status(415).json("Error in uploading images");
        }
        else{
            const date = new Date();
            let imageName = null;
            if(req.files && req.files.length > 1){
                     imageName = req.files.map(file =>{
                        return file.filename;
                })
            }
            const post = new RequestPost({
                _id: new mongoose.Types.ObjectId(),
                author : req.body.author,
                title : req.body.title,
                description : req.body.description,
                status : req.body.status,
                location : req.body.location,
                tags : req.body.tags,
                datePosted : Date.now(),
                requestImage : imageName || ""
            })   
            

            var dir = 'assets/' + req.body.author + '/requestPosts/' + req.body.title + '/images/';

            fs.move('./uploads',dir,(err)=>{
                if (err){
                    console.log(err.response)
                    res.status(500).json({message: "Error in uploading images"});
                }else{
                    User.findOne({email : req.userData.email}).exec()
                    .then(user => {
                        user.requestPosts.push(post);
                        user.requestCount = user.requestCount + 1;
                        user.save()
                        .then(
                            res.status(200).json("Post created!")
                        )
                        .catch(err)
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



router.delete('/api/post/:postId',checkAuth,(req,res) => {

    
});

module.exports = router;