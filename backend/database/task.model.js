const knex = require("./DBConnection");

//get all tasks
const getTasks = () => {
  return knex.select("id", "task", "status", "creation_time").from("task");
};

const insertTask = (task) => {
  return knex("task").insert(task);
};

const deleteTask = (taskId) => {
  return knex("task").where("id", taskId).del();
};
module.exports = {
  getTasks,
  insertTask,
  deleteTask,
};
