const jwt = require('jsonwebtoken');
const blacklist = require('../models/blacklist');
const { response } = require('express');


module.exports = (req,res,next) => {
    
    const token = req.headers.authorization.split(" ")[1]
    blacklist.findOne({token : token})
    .exec()
    .then(foundToken => {

        if(!foundToken){
                   
            try{
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                req.userData = decoded 
                next()
            }
            catch(err){
                return res.status(401).json({
                    message : "Please login first"
                })
            }
        }
        else{
            return res.status(401).json({
                message : "Please login first"
            })
        }
    })
    .catch(err => {
        console.log(err)
    })

    
};