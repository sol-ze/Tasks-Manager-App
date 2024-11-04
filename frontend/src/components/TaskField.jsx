import PropTypes from "prop-types";
import { useState } from "react";
import Button from "./Button";

const TextField = ({ children, onClick }) => {
  const [task, setTask] = useState("");

  const handleButtonClick = () => {
    if (task.trim()) {
      onClick(task); // Pass the task to the onClick handler
      setTask(""); // Clear the input field after submitting
    }
  };

  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Insert a task"
        aria-describedby="basic-addon2"
        value={task}
        onChange={(e) => setTask(e.target.value)} // Handle input change
      />
      <div className="input-group-append">
        <Button btnOption="primary" onClick={handleButtonClick}>
          {children}
        </Button>
      </div>
    </div>
  );
};

TextField.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TextField;
