var express = require("express");
var router = express.Router();
const errorHandler = require("../middleware/errorHandler");
const taskRouter = require("./api/task");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/task", taskRouter);

router.use(errorHandler);
module.exports = router;
