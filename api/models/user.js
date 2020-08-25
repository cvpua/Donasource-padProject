const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Image = require('./image');


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
        type: {type: String},
        firstName : {type: String, required : true},
        lastName : {type: String, required : true},
    },
    photo : {type : Image.schema, default : null},
    email : {
        type: String, 
        required : true,
        unique : true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    location : String,
    contactNumber : {type : String, required : true},
    bio : {type : String, default : null},
    avails : [{
        post :{type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
        status : { type : String , default : "Pending"}
    }],
    donationGiven : {type : Number,default : 0},
    donationRequested : {type : Number,default : 0},
    postCount : {type : Number, default : 0},
    donationPostCount : {type : Number, default : 0},
    requestPostCount: {type : Number, default : 0},
    posts : [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    likedPostsCount : {type : Number, default : 0},
    likedPosts : [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
})

module.exports = mongoose.model('User',user);

