const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notification = new Schema({

    postId : {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    username : {type : String , required : true},
    name : {
        type: {type: String},
        firstName : {type: String, required : true},
        lastName : {type: String, required : true},
    },
    isRead : {type: Boolean, default : false},
    response : {type : String , required : true},
    date : Date

})

module.exports = mongoose.model('Notification',notification);