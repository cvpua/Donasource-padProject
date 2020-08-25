const express = require('express');
const router = express.Router();

const User = require('../models/user');
const { response } = require('express');


// req.body === properties to be updated : initial value

router.get('/api/update/userSchema', (req,res)=> {
   
    const toUpdate = {}
    for(const property of req.body){
        toUpdate[property.propName] = ops.value;
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



module.exports = router;