const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
    user : {
        type : {type : String},
        name : {type: String, required : true},
        avatar : {type: String, required : true},
    },
    content : {type : String, required : true},
    postId :  {type : String, required : true}
})


module.exports = mongoose.model('Comment',comment);