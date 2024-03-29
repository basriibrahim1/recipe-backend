const express = require("express");
const router = express.Router();
const { inputRecipes, listRecipesQuery, showRecipesUpdated, showRecipesByName, showRecipesById, softDeleteRecipe, getRecipesData, showRecipesByPayloadId} = require("../controllers/recipesController");
const protect = require("../middleware/ProtectAuth");
const upload = require("../middleware/photo");


// insert ke database
router.post("/", protect, upload.single("photo"), inputRecipes);

// get dengan query
router.get("/name/:title", showRecipesByName);

router.get("/q", listRecipesQuery);
// get semua data
router.get("/", getRecipesData);

// get dengan nama

// get by id
router.get("/:id", showRecipesById);

// get khusus user
router.get("/user-recipes/recipes", protect, showRecipesByPayloadId);

// ganti khusus user
router.put("/:id", protect, upload.single("photo"), showRecipesUpdated);

// delete khusus user
router.delete("/:id", protect, softDeleteRecipe);


module.exports = router;
