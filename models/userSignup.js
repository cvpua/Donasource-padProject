const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSignup = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username : {type: String, required : true},
    password : {type : String, required : true},
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    email : {type: String, required : true},
    password : {type : String, required : true},
    contactNumber : {type : String, required : true},
})

module.exports = mongoose.model('UserSignup',userSignup);