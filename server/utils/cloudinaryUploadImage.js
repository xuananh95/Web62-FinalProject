const cloudinary = require("cloudinary").v2;

cloudinary.config({
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_SECRET_CLOUDINARY,
    cloud_name: process.env.API_FOLDER_CLOUDINARY,
    secure: true
})

const cloudinaryUploadImage = (file) => {

}

module.exports = {cloudinaryUploadImage}