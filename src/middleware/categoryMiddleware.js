const { getCategory } = require("../models/categoryModels");

const checkAllCategory = async (req, res, next) => {
    try {
        let result = await getCategory();
        res.locals.category = result.rows;
        next();
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

module.exports = { checkAllCategory };
