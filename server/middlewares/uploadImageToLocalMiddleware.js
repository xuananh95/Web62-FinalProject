const { MulterError } = require("multer");
const imageUploadService = require("../utils/uploadImage");

const imageUploadLocal = (req, res, next) => {
    const uploader = imageUploadService.single("image");
    uploader(req, res, (err) => {
        if (err instanceof MulterError) {
            res.status(400);
            next(err);
        } else if (err) {
            res.status(500);
            next(err);
        } else {
            next();
        }
    });
};

module.exports = { imageUploadLocal };
