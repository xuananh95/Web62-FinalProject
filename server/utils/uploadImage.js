const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { MulterError } = require("multer");

const ACCEPTED_FILES = ["image/png", "image/jpg", "image/jpeg"];
const MAXIMUM_IMAGE_SIZE = 1024 * 1024 * 5;

// Generate unique filename
const generateFilename = (file) => {
    const hasFilename =
        crypto.createHash("md5").update(file.fieldname).digest("hex") +
        path.extname(file.originalname);
    return `${new Date().valueOf()}${hasFilename}`;
};

const storageInstance = multer.diskStorage({
    destination: (req, file, cb) => {
        const dirname = path.resolve("./");
        const dirFull = path.join(dirname, "uploads");
        if (!fs.existsSync(dirFull)) {
            fs.mkdir(dirFull, (err) => {
                if (!err) {
                    cb(null, dirFull);
                }
            });
        } else {
            cb(null, dirFull);
        }
    },
    filename: (req, file, cb) => {
        const uniqueFilename = generateFilename(file);
        cb(null, uniqueFilename);
    },
});

const fileFilterFunction = (req, file, cb) => {
    const fileType = file.mimetype;
    const isValidFile = ACCEPTED_FILES.includes(fileType);

    if (isValidFile) {
        cb(null, true);
    } else {
        cb(new MulterError("LIMIT_UNEXPECTED_FILE", "unsupported file"), false);
    }
};

const imageUploadService = multer({
    storage: storageInstance,
    fileFilter: fileFilterFunction,
    limits: {
        fileSize: MAXIMUM_IMAGE_SIZE,
    },
});

module.exports = imageUploadService;
