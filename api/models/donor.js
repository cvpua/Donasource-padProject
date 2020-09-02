const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const donor = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    amountDonated :  Number,
    date : {type : Date , default : Date.now()}
})

module.exports = mongoose.model('Donor',donor);