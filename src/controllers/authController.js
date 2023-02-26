const {createUser, verifyUser} = require("../models/userModels");
const {v4:uuidv4} = require("uuid");
const argon2 = require("argon2");
const {generateToken, generateRefreshToken} = require("../helpers/generateToken");
const {findUser, findUserById} = require('../middleware/verifyUser')
const email = require("../middleware/email")


const authController = {
    registerUser: async(req, res) => {

        if(!req.body.email || !req.body.fullname ||!req.body.password ){
            return res.status(400).json({
                message: "Incorrect email or password"
            });
        }

        let otp = Math.floor(100000 + Math.random() * 900000)

        let {rows:[users]} = await findUser(req.body.email);

        if(users){
            return res.status(400).json({
                message: "Email has been used, please register with another email"
            });
        }

        let id = uuidv4()

        let data = {
            id,
            email: req.body.email,
            fullname: req.body.fullname,
            password: await argon2.hash(req.body.password),
            otp,
            // roles: 'customer'
        };

        let register = await createUser(data);

        if(!register){
            return res.status(400).json({
                message: "You need to Register first"
            });
        }

        try {

            let url = `http://${process.env.BASE_URL}:${process.env.PORT}/auth/${id}/${otp}`
            let sendEmail = email(req.body.email, otp, url, req.body.name)

            if(sendEmail === 'Email not sent'){
                return res.status(400).json({
                    message: "Email failed to send"
                });
            }
            

            return res.status(200).json({
                message: "Register Success, Please check your email"
            });
        } catch (error) {
            return res.status(200).json({
                message: "Register Failed"
            });
        }

        
    },



    loginUser: async(req, res) => {
        if(!req.body.email || !req.body.password ){
            return res.status(400).json({
                message: "Incorrect email or password"
            });
        }

        let {rows:[users]} = await findUser(req.body.email);


        if(!users){
            return res.status(400).json({
                message: "Invalid Email Address"
            });
        }


        if (users.verif === null) {
            return res.status(400).json({
                message: "Please verify your account"
            });
        }


        let verifyPassword = await argon2.verify(users.password, req.body.password);

        if(!verifyPassword){
            return res.status(400).json({
                message: "Invalid Password"
            });
        }
       

        if(verifyPassword){
            const accessToken = generateToken(users)
            const refreshToken = generateRefreshToken(users)

            users.token = accessToken
            users.refreshToken = refreshToken;
            delete users.created_at;
            delete users.password;
            delete users.otp;
            delete users.verif;

            return res.status(200).cookie("refreshToken", refreshToken, {httpOnly: true, sameSite: "none", secure: false}).json({
                message: "Login success", 
                data: users
            });
        }

        return res.status(404).json({
            message: "Login failed"
        });
    },

    otp: async(req,res,next) => {
        let userId = req.params.id
        let otpUser = req.params.code

        if(!userId || !otpUser ){
            return res.status(400).json({
                message: "Incorrect OTP"
            });
        }
        
        let {rows:[users]} = await findUserById(userId);

        if(!users){
            return res.status(400).json({
                message: "Users not found"
            });
        }

        if(users.otp === otpUser){
            let verif = await verifyUser(userId)
            if(verif){
                return res.status(200).json({
                    message: "Verified"
                });
            } else {
                return res.status(400).json({
                    message: "Something went wrong"
                });
            } 
            
        } else {
            return res.status(400).json({
                message: "Wrong OTP Code"
            });
        }
    }
};






module.exports = authController;