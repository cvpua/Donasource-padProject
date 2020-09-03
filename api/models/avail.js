const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const avail = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    post : {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    reason : {type : String , required : true},
    items : [{
        itemId : {type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
        amountRequested : {type : Number, required : true},
    }],
    status : {type : String, default : "PENDING"},
    date : {type : Date, default : Date.now()}
    
})

module.exports = mongoose.model('Avail',avail);