const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const donor = new Schema({
    userId : mongoose.Schema.Types.ObjectId,
    amountDonated :  Number,
    date : Date
})

module.exports = mongoose.model('Donor',donor);