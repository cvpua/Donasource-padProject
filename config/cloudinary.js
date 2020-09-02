require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_NAME,
    // api_key: process.env.CLOUDINARY_API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: 'day8wditd',
    api_key: '613149642756688',
    api_secret: 'GTZT1r8TJ4H0fChU5bmorMKCQB8',
});




// exports.uploads = (file,folder) => {
//     return new Promise(resolve => {
//         cloudinary.uploader.upload(file, (result) => {
//             resolve ({
//                 url: result.url,
//                 id: result.public_id
//             })
//         }, {
//             resource_type : "auto",
//             folder
//         })
//     })
// }

module.exports = {cloudinary}