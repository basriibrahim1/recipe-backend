const jwt = require("jsonwebtoken");

let key = process.env.JWT_TOKEN;
let newKey = process.env.REFRESH_TOKEN

const generateToken = (payload) => {
    const verifyOptions = {
        expiresIn: "1d"
    };
    const token = jwt.sign(payload, key, verifyOptions);
    return token;
};



const refreshToken = (payload) => {
    const verifyOptions = {
        expiresIn: "7d"
    };
    const token = jwt.sign(payload, newKey, verifyOptions);
    return token;
};


module.exports = {generateToken, refreshToken} 