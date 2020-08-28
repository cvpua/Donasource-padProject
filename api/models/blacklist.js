const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blacklist = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    token : String,
    createdAt : {type: Date , expires : 3600 }   
})


module.exports = mongoose.model('Blacklist',blacklist);