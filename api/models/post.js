const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Image = require('./image');

const post = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author : {type: String}, //required : true},
    title : {type : String}, //required : true},
    description : {type : String},// required : true},
    status : {type : String},// required : true},
    location : {type : String},// required : true},
    comments : [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    tags : [String],
    datePosted : {type: Date},
    photos : [Image.schema]
})


module.exports = mongoose.model('Post',post);