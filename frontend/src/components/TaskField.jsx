import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import Button from "./Button";

const TextField = ({ children, onClick }) => {
  const [task, setTask] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleButtonClick = () => {
    if (task.trim().length < 5) {
      setErrorMessage("Text must be at least 5 characters long!");
      return;
    }
    if (task.trim().length > 250) {
      setErrorMessage("Text must not exceed 250 characters!");
      return;
    }

    setErrorMessage("");
    onClick(task); // Pass the task to the onClick handler
    setTask(""); // Clear the input field after submitting
  };

  return (
    <Fragment>
      <div className="row">
        <h5>Create A new task</h5>
      </div>
      <div className="row">
        <div className="col-4">
          <input
            type="text"
            className="form-control "
            placeholder="Insert a task"
            aria-describedby="basic-addon2"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div className="col-2">
          <Button btnOption="primary" onClick={handleButtonClick}>
            {children}
          </Button>
        </div>
      </div>
      {errorMessage && (
        <div className="row">
          <div className="col-4">
            <small className="text-danger">{errorMessage}</small>
          </div>
        </div>
      )}
    </Fragment>
  );
};

TextField.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TextField;
