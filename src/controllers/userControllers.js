const { selectUser, insertUser, checkDataByName, updateUser, deleteUser, checkUserById, userQuery } = require("../models/userModels");

const userController = {
  getUser: async (req, res, next) => {
    try {
      let user = await selectUser();

      res.status(200).json({
        message: `getUser success`,
        data: user.rows,
      });
    } catch (error) {
      res.status(401).json({
        message: `data not found`,
      });
    }
  },

  getUserById: async (req, res, next) => {
    let id = req.params.id;

    try {
      let result = await checkUserById("id", id);

      res.status(200).json({
        message: "Getting User",
        data: result.rows,
      });
    } catch (error) {
      res.status(401).json({
        message: `data not found`,
      });
    }
  },

  getUserQuery: async (req, res, next) => {
    let { searchBy, search, sortBy, sort, offset, limit } = req.query;
    let data = {
      searchBy: searchBy || "name",
      search: search || "",
      sortBy: sortBy || "name",
      sort: sort || "DESC",
      offset: offset || 0,
      limit: limit || 100,
    };

    try {
      let result = await userQuery(data);

      res.status(200).json({
        message: "Getting User",
        data: result.rows,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },

  insertDataUser: async (req, res, next) => {
    let body = req.body;

    try {
      let input = await insertUser(body.name);

      if (!input) {
        res.status(400).json({
          message: `data not input`,
        });
      }

      let checking = await checkDataByName("name", body.name);

      if (!checking) {
        res.status(400).json({
          message: `data user not found`,
        });
      }

      res.status(200).json({
        message: `data input successfully`,
        data: checking.rows,
      });
    } catch (error) {
      res.status(401).json({
        message: `data input not success`,
      });
    }
  },

  updateDataUser: async (req, res, next) => {
    let id = req.params.id;
    let name = req.body.name;

    try {
      let result = await updateUser(id, name);

      if (!result) {
        res.status(404).json({
          message: `data user not found`,
        });
      }
      let checking = await checkDataByName("id", id);
      res.status(200).json({
        message: `data update successfully`,
        data: checking.rows,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  deleteDataUser: async (req, res, next) => {
    let id = req.params.id;

    try {
      let result = await deleteUser(id);

      res.status(200).json({
        message: `data delete successfully`,
        data: `id ${id} has been deleted`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

module.exports = userController;
