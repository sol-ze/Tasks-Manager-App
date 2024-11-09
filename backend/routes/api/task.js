const express = require("express");
const router = express.Router();
const DateUtils = require("../../utils/DateUtils");
const taskModel = require("../../database/task.model");
const ResponseError = require("../../utils//RsponseError");
const taskValidation = require("../../validation/task.validation");

//GET/api/task/
router.get("/", async (req, res, next) => {
  try {
    const tasks = await taskModel.getTasks();

    const result = tasks.map((task) => ({
      id: task.id,
      task: task.task,
      status: task.status,
      creation_time: DateUtils.convertDate(task.creation_time),
    }));

    res.json(result);
  } catch (err) {
    console.log(err);
    next(ResponseError.generateExceptionError(err));
  }
});

//POST /api/task/
router.post("/", async (req, res, next) => {
  try {
    if (req.body.creation_time) {
      req.body.creation_time = DateUtils.formatDateToISO(
        req.body.creation_time
      );
    }
    const validateValues = await taskValidation.validateAddTaskSchema(req.body);

    await taskModel.insertTask(validateValues);

    res.status(200).json({ message: "Task has been added" });
  } catch (err) {
    console.log(err);
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
