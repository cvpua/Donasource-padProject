const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const donee = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    amountRequested :  Number,
    reason : String,
    date : {type : Date , default : Date.now()}
})

module.exports = mongoose.model('Donee',donee);