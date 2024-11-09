import { render, screen, fireEvent } from "@testing-library/react";
import TaskField from "./TaskField";

// Test 1: Rendering the TaskField Component
test("renders TaskField with input and button", () => {
  render(<TaskField onClick={() => {}}>Create</TaskField>);

  expect(screen.getByPlaceholderText("Insert a task")).toBeInTheDocument();
  expect(screen.getByText("Create")).toBeInTheDocument();
});

// Test 2: Testing onClick Behavior
test("calls onClick with the input value when button is clicked", () => {
  const onClickMock = jest.fn();
  render(<TaskField onClick={onClickMock}>Create</TaskField>);

  const input = screen.getByPlaceholderText("Insert a task");
  const button = screen.getByText("Create");

  fireEvent.change(input, { target: { value: "New Task" } });
  fireEvent.click(button);

  expect(onClickMock).toHaveBeenCalledWith("New Task");
});

// Test 3: Testing error message when input is too short
test("shows error message if task is less than 5 characters", () => {
  const onClickMock = jest.fn();
  render(<TaskField onClick={onClickMock}>Create</TaskField>);

  const input = screen.getByPlaceholderText("Insert a task");
  const button = screen.getByText("Create");

  fireEvent.change(input, { target: { value: "abc" } });
  fireEvent.click(button);

  expect(
    screen.getByText("Text must be at least 5 characters long!")
  ).toBeInTheDocument();
  expect(onClickMock).not.toHaveBeenCalled();
});

// Test 4: Testing error message when input is too long
test("shows error message if task exceeds 250 characters", () => {
  const onClickMock = jest.fn();
  render(<TaskField onClick={onClickMock}>Create</TaskField>);

  const input = screen.getByPlaceholderText("Insert a task");
  const button = screen.getByText("Create");

  const longText = "a".repeat(251); // 251 characters long
  fireEvent.change(input, { target: { value: longText } });
  fireEvent.click(button);

  expect(
    screen.getByText("Text must not exceed 250 characters!")
  ).toBeInTheDocument();
  expect(onClickMock).not.toHaveBeenCalled();
});

// Test 5: Test if error message is cleaned after valid input
test("clears input and error message on valid task submission", () => {
  const onClickMock = jest.fn();
  render(<TaskField onClick={onClickMock}>Create</TaskField>);

  const input = screen.getByPlaceholderText("Insert a task");
  const button = screen.getByText("Create");

  fireEvent.change(input, { target: { value: "A valid task" } });
  fireEvent.click(button);

  expect(onClickMock).toHaveBeenCalledWith("A valid task");

  expect(input.value).toBe("");

  expect(
    screen.queryByText("Text must be at least 5 characters long!")
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText("Text must not exceed 250 characters!")
  ).not.toBeInTheDocument();
});
