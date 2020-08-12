const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./item');

const post = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    avatar : {type: String, required : true},
    title : {type : String, required : true},
    author : {type: String, required : true},
    type : {type : String, required : true},
    status : {type : String, required : true},
    description : {type : String, required : true},
    location : {type : String, required : true},
    items : [Item.schema],
    tags : [String],
    datePosted : {type: Date, required : true},
    deadline : {type: Date},
    comments : [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
})

module.exports = mongoose.model('Post',post);