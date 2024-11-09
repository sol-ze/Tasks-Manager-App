import React, { Fragment } from "react";
import Button from "./Button";

const TasksTable = ({ tasks, handleDelete }) => {
  return (
    <Fragment>
      <h5 className="mt-3">Upcoming Tasks</h5>
      <table className="table table-responsive table-hover border rounded">
        <thead className="thead-light">
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
                <Button
                  btnOption="danger"
                  key={Date.now()}
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default TasksTable;
