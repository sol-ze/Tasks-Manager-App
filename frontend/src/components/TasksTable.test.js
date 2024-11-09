import { render, screen, fireEvent } from "@testing-library/react";
import TasksTable from "./TasksTable";

describe("TasksTable Component", () => {
  const tasks = [
    { id: 1, task: "Write unit tests", creation_time: "2024-11-09 10:00" },
    { id: 2, task: "Run the tests", creation_time: "2024-11-09 11:00" },
  ];

  test("renders table with header", () => {
    render(<TasksTable tasks={[]} handleDelete={() => {}} />);

    // Check for the table header text
    expect(screen.getByText("Upcoming Tasks")).toBeInTheDocument();
    expect(screen.getByText("Task")).toBeInTheDocument();
    expect(screen.getByText("Creation time")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  test("renders a list of tasks", () => {
    render(<TasksTable tasks={tasks} handleDelete={() => {}} />);

    // Verify each task appears in the table
    tasks.forEach((task) => {
      expect(screen.getByText(task.task)).toBeInTheDocument();
      expect(screen.getByText(task.creation_time)).toBeInTheDocument();
    });
  });

  test("calls handleDelete with the correct task ID when delete button is clicked", () => {
    const handleDeleteMock = jest.fn();
    render(<TasksTable tasks={tasks} handleDelete={handleDeleteMock} />);

    // Click the delete button for the first task
    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    // Check if handleDelete was called with the correct ID
    expect(handleDeleteMock).toHaveBeenCalledWith(tasks[0].id);
  });
});
