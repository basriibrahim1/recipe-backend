const express = require("express");
const router = express.Router();
const { checkCategoryById, inputCategory, checkCategoryByQuery, changeCategory, deleteCategory, getAllCategory } = require("../controllers/categoryController");
const { checkAllCategory } = require("../middleware/categoryMiddleware");

router.get("/query", checkCategoryByQuery);
router.get("/", checkAllCategory, getAllCategory);
router.get("/:id", checkCategoryById);
router.post("/", inputCategory);
router.put("/:id/delete", deleteCategory);
router.put("/id/:id", changeCategory);

module.exports = router;
