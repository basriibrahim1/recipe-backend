const express = require("express");
const router = express.Router();
const { getUser, updateDataUser, getUserById, getUserQuery, deleteDataUser } = require("../controllers/userControllers");
const protect = require('../middleware/ProtectAuth')


//get semua user
router.get("/", getUser);
router.get("/query", getUserQuery);
router.get("/users", protect, getUserById);
router.put("/users", protect, updateDataUser);
router.delete("/users", protect, deleteDataUser)

module.exports = router;
