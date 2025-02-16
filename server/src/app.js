const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const bodyParser = require("body-parser");
const appRouter = require("./routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(appRouter)

module.exports = app;
