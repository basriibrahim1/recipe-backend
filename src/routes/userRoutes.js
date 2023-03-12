const express = require("express");
const router = express.Router();
const { getUser, updateDataUser, getUserByName, getUserByPayloadId, getUserQuery, deleteDataUser } = require("../controllers/userControllers");
const protect = require("../middleware/ProtectAuth");

//get semua user
router.get("/", getUser);
router.get("/users", protect, getUserByPayloadId);
router.get("/:fullname", getUserByName);
router.get("/search/query", getUserQuery);
router.put("/users", protect, updateDataUser);
router.delete("/users", protect, deleteDataUser);

module.exports = router;
