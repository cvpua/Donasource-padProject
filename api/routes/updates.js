const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Post = require('../models/post');
const { response } = require('express');


// req.body === properties to be updated : initial value

router.patch('/api/update/userSchema', (req,res)=> {
   
    const toUpdate = {}
    
    
    if(req.body && req.body.length >= 1){
        for(const property of req.body){
            toUpdate[property.propName] = ops.value;
        }
    }else{
        let  keys = Object.keys(req.body);
        toUpdate[keys] = req.body.keys;
    }


    User.updateMany({}, {$set : toUpdate})
    .exec()
    .then(response => {
        res.json({message : "Users updated!"})
    })
    .catch(err => {
        res.json({message: "Users not updated", err})
    })
})



// req.body === properties to be updated : initial value
router.get('/api/update/posts', (req,res)=> {
   
    const toUpdate = {}
    for(const property of req.body){
        toUpdate[property.propName] = ops.value;
    }
    User.updateMany({}, {$set : toUpdate})
    .exec()
    .then(response => {
        res.json({message : "Posts updated!"})
    })
    .catch(err => {
        res.json({message: "Posts not updated", err})
    })
})


router.get('/api/checkDeadlines', (req,res) =>{
    Post.find()
    .exec()
    .then(posts => {
        posts.map(post => {
            if (post.deadline - Date.now() <= 0 && post.status === "PENDING"){
                post.status = "UNFULFILLED";
                post.save()
                .then(response => console.log("Post updated!"))
                .catch(err => console.log(err))
            }
            
        })
        res.json({message : "Done checking"})
        console.log("Done checking!")
    })
    .catch(err => {
        console.log(err)
    })
})




module.exports = router;