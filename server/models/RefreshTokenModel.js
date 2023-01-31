const { Schema, model, default: mongoose } = require("mongoose");

const RefreshTokenModel = new Schema(
    {
        userId: { type: Schema.Types.ObjectId },
        refreshtoken: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);

module.exports = model("RefreshTokenModel", RefreshTokenModel);
