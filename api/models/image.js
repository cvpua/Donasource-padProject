const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const image = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    imageName : {type : String},
    imagePath : {type : String},
    url : {type: String},
    publicId : {type : String},
    caption : {type: String, default:null}
})


module.exports = mongoose.model('Image',image);



