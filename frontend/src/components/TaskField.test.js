import { render, screen, fireEvent } from "@testing-library/react";
import TaskField from "./TaskField";

test("renders TaskField with input and button", () => {
  render(<TaskField onClick={() => {}}>Create</TaskField>);

  expect(screen.getByPlaceholderText("Insert a task")).toBeInTheDocument();
  expect(screen.getByText("Create")).toBeInTheDocument();
});

test("calls onClick with the input value when button is clicked", () => {
  const onClickMock = jest.fn();
  render(<TaskField onClick={onClickMock}>Create</TaskField>);

  const input = screen.getByPlaceholderText("Insert a task");
  const button = screen.getByText("Create");

  fireEvent.change(input, { target: { value: "New Task" } });
  fireEvent.click(button);

  expect(onClickMock).toHaveBeenCalledWith("New Task");
});
