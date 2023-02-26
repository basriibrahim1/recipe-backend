const jwt = require("jsonwebtoken");
const key = process.env.JWT_TOKEN;

const protect = (req, res, next) => {
    try {
        let token 
        if(req.headers.authorization){
            let auth = req.headers.authorization
            token = auth.split(' ')[1]
            let verify = jwt.verify(token, key)
            req.payload = verify
            next()
        }

        if(!token){
            res.status(404).json({
                message: "Access Denied!"
            });
        }
        
    } catch (error) {
        if(error && error.name == "JsonWebTokenError"){
            res.status(404).json({
                message: "Invalid Token"
            });
        } else if(error && error.name == "TokenExpiredError") {
            res.status(404).json({
                message: "Token has Expired, Please Log in to get the New Token"
            });
        } else {
            res.status(404).json({
                message: "Please take some token with logging in"
            });
        }
    }
};

module.exports = protect;