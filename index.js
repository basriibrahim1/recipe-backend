const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const mainRoutes = require("./src/routes/mainRoutes");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.use("/", mainRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server are ready to use",
  });
});

app.listen(port, () => {
  console.log(`You are connected to port: ${port}`);
});
