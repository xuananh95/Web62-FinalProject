const multer = require("multer");
const { unlink } = require("fs");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
    cloud_name: "doa5p4v4z",
    api_key: "713324216691184",
    api_secret: "UiCKSCwd-jKb_Bt8TvDbXnKf4Q8",
    secure: true,
});

const Image = {
    upload: async (req, res) => {
        await new Promise((resolve) => {
            const mw = multer({ storage: multer.diskStorage({}) }).any();
            mw(req, res, resolve);
        });

        const uploadImage = async (files) => {
            let response;
            if (files.length === 1) {
                const res = await cloudinary.uploader.upload(files[0].path, {
                    upload_preset: "miki-shop",
                });
                response = { url: res.url, public_id: res.public_id };
            }
            files.forEach((file) => {
                unlink(file.path, (err) => {
                    if (err) console.log(`failed to deleted file ${err}`);
                });
            });
            console.log(response);
            return response;
        };

        return res.status(201).json({
            code: 201,
            message: "tạo thành công",
            data: await uploadImage(req.files),
        });
    },
};

module.exports = Image;
