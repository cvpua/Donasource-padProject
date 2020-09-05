const jwt = require('jsonwebtoken');
const blacklist = require('../models/blacklist');
const { response } = require('express');


module.exports = (req,res,next) => {
    console.log('Authorization: ', req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1]
    blacklist.findOne({token : token})
    .exec()
    .then(foundToken => {

        if(!foundToken){
                   
            try{
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                req.userData = decoded 
                res.json({
                    decoded,
                    isvalidToken:true
                })
            }
            catch(err){
                return res.status(401).json({
                    message : "Please login first",
                    isvalidToken : false
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
        return res.status(401).json({
            message : "Please login first"
        })
    })

    
};