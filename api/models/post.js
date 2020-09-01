const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Image = require('./image');


const post = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title : {type : String, required : true},
    type : {type : String, required : true},
    status : {type : String, required : true},
    description : {type : String, required : true},
    location : {type : String, required : true},
    items : [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    tags : [String],
    datePosted : {type: Date, required : true},
    deadline : {type: Date},
    likes : {type: Number, default : 0},
    likers : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comments : [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    images : [Image.schema]
})

module.exports = mongoose.model('Post',post);