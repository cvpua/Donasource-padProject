const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const item = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : {type: String, required : true},
    amount : {type: Number,required : true},
    total : {type: Number, required : true},
    donor : [{type: mongoose.Schema.Types.ObjectId, ref: 'Donor'}],
    donee :[{type: mongoose.Schema.Types.ObjectId, ref: 'Donee'}]
    
})

module.exports = mongoose.model('Item',item);