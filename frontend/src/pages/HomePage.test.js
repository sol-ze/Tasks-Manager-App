import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "./HomePage";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { toast } from "react-toastify";
import axios from "axios";
import { setTasks, addTask, deleteTask } from "../store/tasksSlice";

jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    dismiss: jest.fn(),
  },
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("HomePage Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      tasks: [
        {
          id: 1,
          task: "Write tests for home page",
          creation_time: "2024-11-09 10:00",
        },
        { id: 2, task: "Run all tests", creation_time: "2024-11-09 11:00" },
      ],
    });
  });

  test("renders HomePage with header, TaskField, and TasksTable", () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    expect(screen.getByText("My Tasks List")).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
    expect(screen.getByText("Write tests for home page")).toBeInTheDocument();
    expect(screen.getByText("Run all tests")).toBeInTheDocument();
  });

  test("fetches tasks on component mount", async () => {
    const tasks = [
      { id: 1, task: "New Task 1", creation_time: "2024-11-09 12:00" },
    ];
    axios.get.mockResolvedValueOnce({ data: tasks });

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    await waitFor(() => {
      expect(store.getActions()).toContainEqual(setTasks(tasks));
    });
  });

  test("handles adding a new task", async () => {
    axios.post.mockResolvedValueOnce({});
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    const createButton = screen.getByText("Create");
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(store.getActions()).toContainEqual(addTask({ task: "New Task" }));
      expect(toast.success).toHaveBeenCalledWith("You added a new task! 🎉", {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true,
      });
    });
  });

  test("handles deleting a task with Undo option", async () => {
    axios.delete.mockResolvedValueOnce({});
    const taskId = 1;
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(store.getActions()).toContainEqual(deleteTask(taskId));
      expect(toast.error).toHaveBeenCalled();
    });

    // Simulate clicking "Undo" on the toast
    fireEvent.click(screen.getByText("Undo"));
    await waitFor(() => {
      expect(store.getActions()).toContainEqual(
        addTask(store.getState().tasks[0])
      );
      expect(toast.dismiss).toHaveBeenCalled();
    });
  });
});
