var express = require("express");
var path = require("path");
var logger = require("morgan");
var cors = require("cors");
var apiRouter = require("./routes/api");
const errorHandler = require("./middleware/errorHandler");
const ResponseError = require("./utils/RsponseError");
const ErrorTypes = require("./utils/ErrorTypes");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.disable("x-powered-by");

app.use("/api", apiRouter);

app.use("*", (req, res, next) => {
  next(new ResponseError(ErrorTypes.ERR404));
});

app.use(errorHandler);

module.exports = app;
