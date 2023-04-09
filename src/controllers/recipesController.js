const { findFoodRecipesById } = require("../middleware/verifyUser");
const { selectInsertRecipes, selectRecipesQuery, selectRecipesName, selectRecipesId, selectUpdateRecipes, selectDeleteRecipes, selectAllRecipes, selectRecipesPayloadId } = require("../models/recipesModels");
const cloudinary = require("../config/cloudinaryConfig");

const recipeController = {
  inputRecipes: async (req, res) => {
    // jika ingin menggunakan batch pada cloudinary

    // let images = req.files;
    // let urls = [];

    // // melakukan batch upload gambar ke Cloudinary
    // await Promise.all(
    // images.map(async (image) => {
    //     const result = await cloudinary.uploader.upload(image.path, { folder: 'food' });
    //     urls.push(result.secure_url);
    // })
    // );

    // if(!req.isFileValid){
    //     return res.status(400).json({
    //         message: 'Only .jpeg or .png files are accepted'
    //     })
    // }

    const imageUrl = await cloudinary.uploader.upload(req.file.path, { folders: "food" });

    if (!imageUrl) {
      res.status(401).json({
        message: "Failed to input data, please try again later",
      });
    }

    let data = {
      title: req.body.title,
      ingredients: req.body.ingredients,
      photo: imageUrl.secure_url,
      users_id: req.payload.id,
      category_id: parseInt(req.body.category_id),
    };

    console.log(data.photo);

    try {
      await selectInsertRecipes(data);

      res.status(200).json({
        message: "data recipes has been inputed",
      });
    } catch (error) {
      console.log(error.message);
      res.status(401).json({
        message: "data recipes not input",
      });
    }
  },

  getRecipesData: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1
      let sort = req.query.sort || 'ASC'
      let search = req.query.search || ''

      let result = await selectAllRecipes(sort, search);
      res.status(200).json({
        message: "List for recipes",
        data: result.rows,
        page: page
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  listRecipesQuery: async (req, res) => {
    let { sort, search, searchBy, sortBy, limit} = req.query;
    let data = {
      sort: sort || "ASC",
      search: search || "sambal",
      searchBy: searchBy || "title",
      sortBy: sortBy || "created_at",
      offset: offset || 0,
      limit: limit || 4
    };

    try {
      let results = await selectRecipesQuery(data);
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

  showRecipesByName: async (req, res) => {
    let title = req.params.title;

    try {
      const result = await selectRecipesName(title);

      res.status(200).json({
        message: `Result for ${title}`,
        data: result.rows,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  showRecipesById: async (req, res) => {
    const id = req.params.id;

    try {
      let result = await selectRecipesId(id);
      res.status(200).json({
        message: `Recipe with id ${id}`,
        data: result.rows,
      });
    } catch (error) {
      res.status(500).json({
        message: `Failed to get id ${id}`,
        error: error.message,
      });
    }
  },

  showRecipesByPayloadId: async (req, res) => {
    let id = req.payload.id;

    try {
      const result = await selectRecipesPayloadId(id);

      res.status(200).json({
        message: "Result :",
        data: result.rows,
      });
    } catch (error) {
      res.status(500).json({
        message: "id error",
        error: error.message,
      });
    }
  },

  showRecipesUpdated: async (req, res) => {
    try {
      let id = req.params.id;

      //   if (!req.isFileValid) {
      //     return res.status(400).json({
      //       message: "Only .jpeg or .png files are accepted",
      //     });
      //   }

      let selectDataById = await findFoodRecipesById(id);
      let currentRecipe = selectDataById.rows[0];

      // if (!req.file || !req.file.path) {
      //     res.status(400).json({
      //         message: "Missing file or file path",
      //     });
      // }

      if (req.file) {
        let imageUrl = await cloudinary.uploader.upload(req.file.path, {
          folders: "food",
        });

        if (!imageUrl) {
          res.status(401).json({
            message: "Failed to input data, please try again later",
          });
        }

        let data = {
          title: req.body.title || currentRecipe.title,
          ingredients: req.body.ingredients || currentRecipe.ingredients,
          category_id: req.body.category_id || currentRecipe.category_id,
          photo: imageUrl.secure_url || currentRecipe.photo,
          users_id: req.payload.id || currentRecipe.users_id,
        };

        if (data.users_id != currentRecipe.users_id || req.payload.id != currentRecipe.users_id) {
          res.status(403).json({
            message: "Access Denied",
          });
        } else {
          await selectUpdateRecipes(data, id);

          res.status(200).json({
            message: "Data has been updated",
          });
        }
      } else {
        let data = {
          title: req.body.title || currentRecipe.title,
          ingredients: req.body.ingredients || currentRecipe.ingredients,
          category_id: req.body.category_id || currentRecipe.category_id,
          photo: currentRecipe.photo,
          users_id: req.payload.id || currentRecipe.users_id,
        };

        if (data.users_id != currentRecipe.users_id || req.payload.id != currentRecipe.users_id) {
          res.status(403).json({
            message: "Access Denied",
          });
        } else {
          await selectUpdateRecipes(data, id);

          res.status(200).json({
            message: "Data has been updated",
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  softDeleteRecipe: async (req, res) => {
    let id = req.params.id;
    let users_id = req.payload.id;

    try {
      let selectDataById = await findFoodRecipesById(id);

      if (selectDataById.rows[0].users_id !== users_id) {
        res.status(403).json({
          message: "Access Denied",
        });
      } else {
        await selectDeleteRecipes(id, users_id);
        res.status(200).json({
          message: `Recipe with id ${id} has been deleted`,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: `Failed to delete recipe with id ${id}`,
        error: error.message,
      });
    }
  },
};

module.exports = recipeController;
