const mongoose = require('mongoose');
const Schema = mongoose.Schema;




mongoose.set('useCreateIndex', true);

const user = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username : {
        type: String, 
        required : true,
        unique : true
    },
    password : {type : String, required : true},
    name : {
        firstName : {type: String, required : true},
        lastName : {type: String, required : true},
    },
    photo : {type : String, default : null},
    email : {
        type: String, 
        required : true,
        unique : true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    location : String,
    contactNumber : {type : String, required : true},
    bio : {type : String, default : null},
    postCount : {type : Number, default : 0},
    donationCount : {type : Number, default : 0},
    requestCount: {type : Number, default : 0},
    posts : [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    likedPostsCount : {type : Number, default : 0},
    likedPosts : [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
})

module.exports = mongoose.model('User',user);