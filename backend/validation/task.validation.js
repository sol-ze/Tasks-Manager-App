const Joi = require("joi");
const validate = require("./validation");

const taskSchema = Joi.object({
  task: Joi.string().min(5).max(250).required(),
});

const taskIdSchema = Joi.object({
  id: Joi.number().min(1).max(1000000).required(),
});

const validateAddTaskSchema = (productInput) =>
  validate(productInput, taskSchema);

const validateTaskIdSchema = (productInput) =>
  validate(productInput, taskIdSchema);

module.exports = {
  validateTaskIdSchema,
  validateAddTaskSchema,
};
