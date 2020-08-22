const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Donor = require('./donor');

const item = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : {type: String, required : true},
    amount : {type: Number,required : true},
    total : {type: Number, required : true},
    donor : [Donor.schema],
    donee :[String]
    
})

module.exports = mongoose.model('Item',item);