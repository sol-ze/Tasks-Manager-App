import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Button, { buttonOptions } from "./Button";

test("renders Button with specified text", () => {
  render(<Button btnOption="primary">Click Me</Button>);

  expect(screen.getByText("Click Me")).toBeInTheDocument();
});

test("uses default primary style when no btnOption is provided", () => {
  render(<Button>Primary Button</Button>);

  const button = screen.getByText("Primary Button");

  expect(button).toHaveClass("btn-primary");
});

test("calls onClick handler when button is clicked", () => {
  const onClickMock = jest.fn();
  render(
    <Button btnOption="danger" onClick={onClickMock}>
      Danger Button
    </Button>
  );

  const button = screen.getByText("Danger Button");
  fireEvent.click(button);

  // Verify the onClick handler was called once
  expect(onClickMock).toHaveBeenCalledTimes(1);
});

test("does not throw error if onClick prop is undefined", () => {
  render(<Button btnOption="warning">No Click Handler</Button>);

  const button = screen.getByText("No Click Handler");

  // Click the button and ensure it doesn’t throw an error
  fireEvent.click(button);

  // No assertion needed; if no error is thrown, this test passes
});
