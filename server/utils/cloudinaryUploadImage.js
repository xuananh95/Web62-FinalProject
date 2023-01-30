const cloudinary = require("cloudinary").v2;

cloudinary.config({
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_SECRET_CLOUDINARY,
    cloud_name: process.env.API_CLOUD_NAME_CLOUDINARY,
    secure: true,
});

const cloudinaryUploadImage = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            file,
            {
                folder: process.env.API_FOLDER_CLOUDINARY,
            },
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

module.exports = { cloudinaryUploadImage };
