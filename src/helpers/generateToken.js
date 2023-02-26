const jwt = require("jsonwebtoken");

let key = process.env.JWT_TOKEN;

const generateToken = (payload) => {
    const verifyOptions = {
        expiresIn: "10s"
    };
    const token = jwt.sign(payload, key, verifyOptions);
    return token;
};



const generateRefreshToken = (payload) => {
    const verifyOptions = {
        expiresIn: "1h"
    };
    const token = jwt.sign(payload, key, verifyOptions);
    return token;
};

module.exports = {generateToken, generateRefreshToken};