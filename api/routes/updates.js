const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Post = require('../models/post');
const { response } = require('express');

const checkSession = require('../auth/check-session');

// req.body === properties to be updated : initial value

router.get('/api/update/userSchema', (req,res)=> {
   
    const toUpdate = {avatar : null}
    
    
    // if(req.body && req.body.length >= 1){
    //     for(const property of req.body){
    //         toUpdate[property.propName] = ops.value;
    //     }
    // }else{
    //     let  keys = Object.keys(req.body);
    //     toUpdate[keys] = req.body.keys;
    // }


    User.updateMany({}, {$set : toUpdate})
    .exec()
    .then(response => {
        res.json({message : "Users updated!"})
    })
    .catch(err => {
        res.json({message: "Users not updated", err})
    })

    // User.findOne({username : "mkb"})
    // .exec()
    // .then(user => {
    //     user.notifications = [];
    //     user.save()
    //     .then(response => {
    //         res.json({message : "Users updated!"})
    //     })
    // })
})



// req.body === properties to be updated : initial value
router.get('/api/update/postSchema', (req,res)=> {
   
    // const toUpdate = {userId: "",avatar : "", name : "",username : ""};
    // // for(const property of req.body){
    // //     toUpdate[property.propName] = ops.value;
    // // }
    // Post.updateMany({}, {$unset : toUpdate })
    // .exec()
    // .then(response => {
    //     res.json({message : "Posts updated!"})
    // })
    // .catch(err => {
    //     res.json({message: "Posts not updated", err})
    // })

    Post.find()
    .exec()
    .then(posts => {
        posts.map(post => {
            // post.userId = undefined;
            // post.username = undefined;
            // post.name = undefined;
            // post.avatar = undefined;
            console.log(post._doc.userId)
            post.user = post._doc.userId;
            post.save()
            .then(response => console.log("Post updated!"))
        })
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

router.get('/api/checkSession',checkSession);


module.exports = router;