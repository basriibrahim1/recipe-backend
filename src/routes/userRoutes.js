const express = require("express");
const router = express.Router();
const { getUser, updateDataUser, getUserById, getUserByPayloadId, getUserQuery, deleteDataUser } = require("../controllers/userControllers");
const protect = require("../middleware/ProtectAuth");
const redisMiddleware = require("../middleware/redisMiddleware");


//get semua user
router.get("/", getUser);
router.get("/:id", redisMiddleware, getUserById);
router.get("/query", getUserQuery);
router.get("/users", protect, getUserByPayloadId);
router.put("/users", protect, updateDataUser);
router.delete("/users", protect, deleteDataUser);

module.exports = router;
