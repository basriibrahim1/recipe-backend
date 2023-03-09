const { selectUser, updateUser, checkUserById, userQuery, deleteUser } = require("../models/userModels");


const userController = {
    getUser: async (req, res) => {
        try {
            let user = await selectUser();

            res.status(200).json({
                message: "getUser success",
                data: user.rows,
            });
        } catch (error) {
            res.status(401).json({
                message: "data not found",
            });
        }
    },

    getUserById: async(req,res) => {
        let id = req.params.id;

        try {
            let result = await checkUserById(id);

            res.status(200).json({
                message: "getUser success",
                data: result.rows,
            });
        } catch (error) {
            res.status(404).json({
                message: "data not found",
            });
        }
    },

    getUserByPayloadId: async (req, res) => {
        let id = req.payload.id;
      

        try {         
            let result = await checkUserById(id);

            res.status(200).json({
                message: "Getting User",
                data: result.rows,
            });
        } catch (error) {
            res.status(401).json({
                message: "data not found",
            });
        }
    },

    getUserQuery: async (req, res) => {
        let { searchBy, search, sortBy, sort, offset, limit } = req.query;
        let data = {
            searchBy: searchBy || "fullname",
            search: search || "",
            sortBy: sortBy || "fullname",
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

    updateDataUser: async (req, res) => {
        let id = req.payload.id;

        try {

            let checking = await checkUserById(id);
            let current = checking.rows[0];

            let data = {};
            data.email = req.body.email || current.email;
            data.password = req.body.password || current.password;
            data.fullname = req.body.fullname || current.fullname;
            data.photo = req.body.photo || current.photo;          

            if(checking.rows[0].id !== id ){
                res.status(404).json({
                    message: "data user not found",
                });
            } else {
                await updateUser(data, id);

                res.status(200).json({
                    message: "data update successfully",
                });
            }

        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    },

    deleteDataUser: async (req, res) => {
        let id = req.payload.id;

        try {
            await deleteUser(id);

            res.status(200).json({
                message: "data delete successfully",
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
