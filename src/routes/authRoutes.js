const express = require("express");
const router = express.Router();
const {registerUser, loginUser, otp} = require("../controllers/authController");
const protect = require("../middleware/ProtectAuth");



router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/otp/:id/:code", otp);

router.get("/refresh", protect, (req, res) => {
    res.status(200).json({
        message: 'Success To Refresh'
    })
})

module.exports = router;