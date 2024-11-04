var express = require("express");
var path = require("path");
// var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var apiRouter = require("./routes/api");
var logger = require("morgan");
const errorHandler = require("./middleware/errorHandler");
const ResponseError = require("./utils/RsponseError");
const ErrorTypes = require("./utils/ErrorTypes");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.disable("x-powered-by");

app.use("/api", apiRouter);

app.use("*", (req, res, next) => {
  next(new ResponseError(ErrorTypes.ERR404));
});

app.use(errorHandler);

module.exports = app;
