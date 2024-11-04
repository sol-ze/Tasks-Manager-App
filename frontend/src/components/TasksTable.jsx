import React from "react";
import Button from "./Button";

const TasksTable = ({ tasks, handleDelete }) => {
  return (
    <table className="table table-responsive table-hover mt-5">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Task</th>
          <th scope="col">Creation time</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <th scope="row">{task.id}</th>
            <td>{task.task}</td>
            <td>{task.creation_time}</td>
            <td>
              <Button btnOption="danger" onClick={() => handleDelete(task.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TasksTable;
