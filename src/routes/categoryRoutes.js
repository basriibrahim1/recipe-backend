const express = require("express");
const router = express.Router();
const { checkCategoryById, inputCategory, checkCategoryByQuery, changeCategory, deleteCategory, getAllCategory } = require("../controllers/categoryController");
const { checkAllCategory } = require("../middleware/categoryMiddleware");
const protect = require("../middleware/ProtectAuth");

router.get("/query", checkCategoryByQuery);
router.get("/", checkAllCategory, getAllCategory);
router.get("/:id", checkCategoryById);
router.post("/",protect, inputCategory);
router.put("/id/:id", protect, changeCategory);
router.delete("/:id", protect, deleteCategory);

module.exports = router;
