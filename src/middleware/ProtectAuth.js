const jwt = require("jsonwebtoken");
const key = process.env.JWT_TOKEN;

const protect = (req, res, next) => {
    try {
        let token; 
        if(req.headers.authorization){
            let auth = req.headers.authorization;
            token = auth.split(" ")[1];
            let verify = jwt.verify(token, key);
            req.payload = verify;
            next();
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
            let refreshToken = req.cookies.refreshToken;
            if (refreshToken){
                jwt.verify(refreshToken, key, (err, payload) => {
                    if (err) {
                        return res.status(401).json({ message: "Access Token Expired, Please Get The New One" });
                    }

                    // Refresh token valid, buat access token baru
                    const accessToken = jwt.sign({ payload }, key);          
            
                    res.setHeader("Authorization", `Bearer ${accessToken}`);

                    // Lanjutkan eksekusi middleware
                    req.payload = jwt.verify(accessToken, key);
                    next();
                });
            } else {
                res.status(404).json({
                    message: "Please take some token with logging in"
                });
            }
        }
    }
};

module.exports = protect;