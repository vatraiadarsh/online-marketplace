require("dotenv").config({
  path: `./env-files/${process.env.NODE_ENV || "development"}.env`,
});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");

const router = require("./router");
const server = require("./server");
const { requestLogger } = require("./middleware/logger");
const errorHandler = require("./middleware/errors");

app.use(requestLogger);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());


require("./database")(app);
server(app);
router(app);

app.use(errorHandler);

module.exports = app;
