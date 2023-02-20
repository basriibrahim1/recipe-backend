const express = require("express");
const router = express.Router();
const { inputRecipes, listRecipesQuery, recipesUpdated, showRecipesByName, showRecipesById, softDeleteRecipe, getRecipesData } = require("../controllers/recipesController");

router.post("/", inputRecipes);
router.get("/query", listRecipesQuery);
router.get("/", getRecipesData);
router.get("/:title", showRecipesByName);
router.get("/id/:id", showRecipesById);
router.put("/id/:id", recipesUpdated);
router.put("/id/:id/delete", softDeleteRecipe);

module.exports = router;
