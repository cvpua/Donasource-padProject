const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');

const RequestPost = require('../models/requestPost');
const { response } = require('express');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './uploads'); //+ '/' + req.body.author + '/' + req.body.title  );
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



router.get('/api/posts',(req,res) => {
    RequestPost.find()
    .select("title author requestImage")
    .exec()
    .then((posts) =>{
    
    const response =  
    posts.map(post =>{
            return (
                {
                    title : post.title,
                    author : post.author,
                    images : post.requestImage
                }
            )
        })
        res.status(200).json(response)
    })
    
})


router.post('/api/posts',(req,res) => {

    upload(req,res,function(err){
        if(err){
            res.status(415).json("Error");
        }
        else{
            console.log("files uploaded");
            
            const date = new Date();
            const imageName = req.files.map(file =>{
                return file.filename;
            })

            const post = new RequestPost({
                _id: new mongoose.Types.ObjectId(),
                author : req.body.author,
                title : req.body.title,
                description : req.body.description,
                status : req.body.status,
                location : req.body.location,
                comments : [...req.body.comments],
                tags : [...req.body.tags],
                datePosted : Date.now(),
                requestImage : imageName
            })
            // res.json(post)
            
            post.save()
            .then(result =>{
                res.status(200).json("Product saved")
            })
            .catch(err => {
                res.status(500).json("Product not saved")
            })
        }
    });    
    
}) 

module.exports = router;