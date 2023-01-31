const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const EXPIRE_IN = process.env.JWT_EXPIRE_IN;
const JWT_REFRESHTOKEN = process.env.JWT_REFRESHTOKEN;

function signJWt(payload) {
    const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: EXPIRE_IN,
    });

    return token;
}

function refreshToken(payload) {
    return jwt.sign(payload, JWT_REFRESHTOKEN, {
        expiresIn: "365d",
    });
}

function verifyToken(token) {
    const decode = jwt.verify(token, SECRET_KEY);
    return decode;
}

module.exports = { signJWt, verifyToken, refreshToken };
