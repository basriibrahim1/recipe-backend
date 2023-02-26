const cors = require("cors");
const xss = require("xss-clean");
const bodyParser = require("body-parser");
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const mainRoutes = require("./src/routes/mainRoutes");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use(xss());
app.use(cors());

app.use(cookieParser());

app.use("/", mainRoutes);

app.use("/img", express.static("./tmp"));

app.get("/", (req, res) => {
    res.status(200).json({
        message: "server are ready to use",
    });
});

app.listen(port, () => {
    console.log(`You are connected to port: ${port}`);
});
