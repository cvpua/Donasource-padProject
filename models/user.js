const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username : {type: String, required : true},
    password : {type : String, required : true},
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    email : {type: String, required : true},
    password : {type : String, required : true},
    contactNumber : {type : String, required : true},
    description : {type : String, required : true},
    requestCount : {type : Number, default : 0},
    requestPosts : [{type : Schema.Types.ObjectId, ref: "RequestPost"}]

})


module.exports = mongoose.model('User',user);