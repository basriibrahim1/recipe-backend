const express = require("express");
const router = express.Router();
const { getUser, updateDataUser, getUserById, getUserByPayloadId, getUserQuery, deleteDataUser } = require("../controllers/userControllers");
// const protect = require("../middleware/ProtectAuth");


//get semua user
router.get("/", getUser);
router.get("/:id", getUserById);
router.get("/query", getUserQuery);
router.get("/users", getUserByPayloadId);
router.put("/users", updateDataUser);
router.delete("/users", deleteDataUser);

module.exports = router;
