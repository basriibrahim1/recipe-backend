const express = require("express");
const router = express.Router();
const { getUser, insertDataUser, updateDataUser, deleteDataUser, getUserById, getUserQuery } = require("../controllers/userControllers");

router.get("/", getUser);
router.post("/", insertDataUser);
router.get("/query", getUserQuery);
router.get("/:id", getUserById);
router.put("/:id", updateDataUser);
router.put("/:id/delete", deleteDataUser);

module.exports = router;
