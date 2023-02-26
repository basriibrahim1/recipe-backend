const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const recipesRouter = require("./recipesRoutes");
const categoryRoutes = require("./categoryRoutes");
const authRoutes = require("../routes/authRoutes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/recipes", recipesRouter);
router.use("/category", categoryRoutes);

module.exports = router;
