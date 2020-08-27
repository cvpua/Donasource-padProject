const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./item');
const Image = require('./image');
const Comment = require('./comment');

const post = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId : {type: String, required : true},
    avatar : {type: String, required : true},
    title : {type : String, required : true},
    author : {type: String, required : true},
    username : {type: String, required : true},
    type : {type : String, required : true},
    status : {type : String, required : true},
    description : {type : String, required : true},
    location : {type : String, required : true},
    items : [Item.schema],
    tags : [String],
    datePosted : {type: Date, required : true},
    deadline : {type: Date},
    likes : {type: Number, default : 0},
    likers : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comments : [Comment.schema],
    images : [Image.schema]
})

module.exports = mongoose.model('Post',post);