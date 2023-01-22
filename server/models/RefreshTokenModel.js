const { Schema, model } = require("mongoose");

const RefreshTokenModel = new Schema(
    {
        refreshtoken: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);

module.exports = model("RefreshTokenModel", RefreshTokenModel);
