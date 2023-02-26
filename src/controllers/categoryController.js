const { getCategoryById, postCategory, categoryQuery, updateCategory, softDeleteCategory } = require("../models/categoryModels");

const categoryController = {
    getAllCategory: async (req, res) => {
        res.status(200).json({
            message: "category",
            data: res.locals.category,
        });
    },

    checkCategoryById: async (req, res) => {
        let { id } = req.params;

        try {
            let result = await getCategoryById(id);

            res.status(200).json({
                message: "category",
                data: result.rows,
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    },

    inputCategory: async (req, res) => {
        let { title } = req.body;

        try {
            await postCategory(title);

            res.status(200).json({
                message: "insert category complete",
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    },

    checkCategoryByQuery: async (req, res) => {
        let { searchBy = "title", search = "", sortBy = "title", sort = "desc", offset = 0, limit = 10 } = req.query;
        let data = { searchBy, search, sortBy, sort, offset, limit };

        try {
            let result = await categoryQuery(data);

            res.status(200).json({
                message: "get data complete",
                data: result.rows,
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    },

    changeCategory: async (req, res) => {
        let id = req.params.id;
        let title = req.body;

        try {
            await updateCategory(title, id);

            res.status(200).json({
                message: "change category complete",
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    },

    deleteCategory: async (req, res) => {
        let id = req.params.id;

        try {
            await softDeleteCategory(id);

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

module.exports = categoryController;
