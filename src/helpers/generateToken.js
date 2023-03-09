const jwt = require("jsonwebtoken");

let key = process.env.JWT_TOKEN;

const generateToken = (payload) => {
    const verifyOptions = {
        expiresIn: "3s"
    };
    const token = jwt.sign(payload, key, verifyOptions);
    return token;
};



const generateRefreshToken = (payload) => {
    const verifyOptions = {
        expiresIn: "365d"
    };
    const token = jwt.sign(payload, key, verifyOptions);
    return token;
};

module.exports = {generateToken, generateRefreshToken};