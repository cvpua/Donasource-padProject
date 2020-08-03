const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");


const posts = require('../../LocalDB/Posts');
const RequestPost = require('../../models/requestPost');



router.get('/api/posts',(req,res) => {
    res.json(posts);
})

router.post('/api/posts',(req,res) => {
    const date = new Date()
    const post = new RequestPost({
        _id: new mongoose.Types.ObjectId(),
        author : req.body.author,
        title : req.body.title,
        description : req.body.description,
        status : req.body.status,
        location : req.body.location,
        comments : [...req.body.comments],
        tags : [...req.body.tags],
        datePosted : Date.now()
    })
    res.json(post)

}) 

module.exports = router;