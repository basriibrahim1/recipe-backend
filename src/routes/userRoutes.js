const express = require("express");
const router = express.Router();
const { getUser, updateDataUser, getUserById, getUserByPayloadId, getUserQuery, deleteDataUser } = require("../controllers/userControllers");
const protect = require("../middleware/ProtectAuth");


//get semua user
router.get("/", getUser);
router.get("/:id", getUserById);
router.get("/query", getUserQuery);
router.get("/users", protect, getUserByPayloadId);
router.put("/users", protect, updateDataUser);
router.delete("/users", protect, deleteDataUser);

module.exports = router;
