const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notification = new Schema({
		_id : mongoose.Schema.Types.ObjectId,
    type : {type: String, required : true},
    postId : {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title : {type : String , required : true},
    seen : {type: Boolean, default : false},
    date : {type: Date, default: Date.now()}
})

module.exports = mongoose.model('Notification',notification);