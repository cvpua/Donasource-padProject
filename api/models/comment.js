const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId : {type : String, default : null},
    content : {type : String, required : true},
    postId :  {type : String, required : true}
})


module.exports = mongoose.model('Comment',comment);