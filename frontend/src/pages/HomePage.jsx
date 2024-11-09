import { Fragment, useEffect } from "react";
import { setTasks, addTask, deleteTask } from "../store/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import TaskField from "../components/TaskField";
import TasksTable from "../components/TasksTable";

const HomePage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const fetchTasks = () => {
    axios
      .get("/api/task/")
      .then(({ data }) => {
        // Update Redux state with fetched tasks
        dispatch(setTasks(data));
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
      });
  };

  // useEffect to fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    // Find task to restore if undo is clicked
    const deletedTask = tasks.find((task) => task.id === taskId);

    try {
      // Optimistically delete task from Redux state
      dispatch(deleteTask(taskId));

      const UndoToast = () => (
        <div>
          Task deleted
          <button
            className="btn btn-link text-primary ms-2"
            onClick={async () => {
              dispatch(addTask(deletedTask));
              // await axios.post("/api/task/", deletedTask);
              toast.dismiss();
            }}
          >
            Undo
          </button>
        </div>
      );

      // Show toast with Undo option
      toast.error(<UndoToast />, {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true,
        onClose: async () => {
          // Delete from DB only if undo wasn't clicked
          try {
            await axios.delete(`/api/task/${taskId}`);
          } catch (error) {
            console.log("Error deleting task:", error);
          }
        },
        // Custom Undo button
        action: (
          <button
            className="dark"
            onClick={async () => {
              // Cancel the delete by re-adding the task to Redux
              dispatch(addTask(deletedTask));

              await axios.post("/api/task/", { deletedTask });
              toast.dismiss();
            }}
          >
            Undo
          </button>
        ),
      });
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const handleNewTask = async (task) => {
    try {
      // Add the new task to Redux state
      dispatch(addTask({ task }));

      // Add the new task to the database
      await axios.post("/api/task/", { task });

      toast.success("You added a new task! 🎉", {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true,
      });

      // Fetch the updated tasks from the database
      fetchTasks();
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  };

  if (tasks) {
    return (
      <Fragment>
        <div className="my-5 px-5">
          <h1>My Tasks List</h1>
          <hr></hr>
          <div className="container">
            <TaskField
              children="Create"
              onClick={(newTask) => handleNewTask(newTask)}
            />

            <TasksTable tasks={tasks} handleDelete={handleDelete} />
          </div>
        </div>
      </Fragment>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default HomePage;
