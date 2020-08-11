const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment');


const requestPost = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author : {type: String}, //required : true},
    title : {type : String}, //required : true},
    description : {type : String},// required : true},
    status : {type : String},// required : true},
    location : {type : String},// required : true},
    comments : [Comment.schema],
    tags : [String],
    datePosted : {type: Date},
    requestImage : [String]
})


module.exports = mongoose.model('RequestPost',requestPost);