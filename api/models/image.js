const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const image = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
    image : {
        type : {type : String},
        imageName : {type: String},
        url : {type: String},
    },
    caption : {type: String, default:null}
})


module.exports = mongoose.model('Image',image);



