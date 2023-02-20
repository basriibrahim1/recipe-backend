const { insertRecipes, getRecipesByQuery, getRecipesName, selectRecipesById, updateRecipes, deleteRecipes, getAllDataSorted } = require("../models/recipesModels");

const recipeController = {
  inputRecipes: async (req, res, next) => {
    let data = {};
    data.title = req.body.title;
    data.ingredients = req.body.ingredients;
    data.photo = req.body.photo;
    data.users_id = req.body.users_id;
    data.category_id = req.body.category_id;
    try {
      let result = await insertRecipes(data);

      res.status(200).json({
        message: `data recipes has been inputed`,
        data: result.users_id,
      });
    } catch (error) {
      res.status(404).json({
        message: `data recipes not input`,
      });
    }
  },

  getRecipesData: async (req, res, next) => {
    try {
      let result = await getAllDataSorted();
      res.status(200).json({
        message: `data recipes has been inputed`,
        data: result.rows,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  listRecipesQuery: async (req, res, next) => {
    let { sort, search, searchBy, sortBy, offset, limit } = req.query;
    let data = {
      sort: sort || "ASC",
      search: search || "",
      searchBy: searchBy || "title",
      sortBy: sortBy || "created_at",
      offset: offset || 0,
      limit: limit || 3,
    };

    try {
      let results = await getRecipesByQuery(data);
      res.status(200).json({
        message: "Get data complete",
        data: results.rows,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  showRecipesByName: async (req, res, next) => {
    let { title } = req.params;
    let data = {
      title: title || "",
    };

    try {
      const result = await getRecipesName(data);

      res.status(200).json({
        message: `Result for ${data.title}`,
        data: result.rows,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  showRecipesById: async (req, res, next) => {
    let id = req.params.id;

    try {
      const result = await selectRecipesById(id);

      if (!result) {
        message: "data user not found";
      }

      res.status(200).json({
        message: `Result for ${id}`,
        data: result.rows,
      });
    } catch (error) {
      res.status(500).json({
        message: "id error",
        error: error.message,
      });
    }
  },

  recipesUpdated: async (req, res, next) => {
    let id = req.params.id;

    try {
      let selectDataById = await selectRecipesById(id);
      let currentRecipe = selectDataById.rows[0];

      let data = {
        title: req.body.title || currentRecipe.title,
        ingredients: req.body.ingredients || currentRecipe.ingredients,
        category_id: req.body.category_id || currentRecipe.category_id,
        photo: req.body.photo || currentRecipe.photo,
      };

      let getRecipe = await updateRecipes(data, id);

      res.status(200).json({
        message: `Data has been updated`,
        data: selectDataById.rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  softDeleteRecipe: async (req, res, next) => {
    const id = req.params.id;

    try {
      let result = await deleteRecipes(id);
      res.status(200).json({
        message: `Recipe with id ${id} has been deleted`,
      });
    } catch (error) {
      res.status(500).json({
        message: `Failed to delete recipe with id ${id}`,
        error: error.message,
      });
    }
  },
};

module.exports = recipeController;
