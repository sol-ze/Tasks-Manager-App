const express = require("express");
const router = express.Router();
const taskModel = require("../../database/task.model");
const ResponseError = require("../../utils//RsponseError");
const taskValidation = require("../../validation/task.validation");

//GET/api/task/
router.get("/", async (req, res, next) => {
  try {
    const tasks = await taskModel.getTasks();
    res.json(tasks);
  } catch (err) {
    console.log(err);
    next(ResponseError.generateExceptionError(err));
  }
});

//POST /api/task/
router.post("/", async (req, res, next) => {
  try {
    const validateValues = await taskValidation.validateAddTaskSchema(req.body);

    console.log(validateValues.task);
    const task = { task: validateValues.task };

    await taskModel.insertTask(task);

    res.status(200).json({ message: "Task has been added" });
  } catch (err) {
    next(ResponseError.generateExceptionError(err));
  }
});

//DELETE /api/task/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const validateValues = await taskValidation.validateTaskIdSchema(
      req.params
    );
    await taskModel.deleteTask(validateValues.id);

    res.status(200).json({ message: "Task has been deleted" });
  } catch (err) {
    next(ResponseError.generateExceptionError(err));
  }
});

module.exports = router;
