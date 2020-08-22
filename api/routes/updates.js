const express = require('express');
const router = express.Router();

const User = require('../models/user');
const { response } = require('express');


router.get('/api/update/userSchema', (req,res)=> {
    User.updateMany({"donationGiven" : undefined,"donationRequested" : undefined}, {"$set":{"donationGiven" : 0,"donationRequested" : 0}})
    .then(response =>{
        res.json({message: "db updated",response})
    })
    .catch(err =>{
        console.log(err)
    })
})

module.exports = router;